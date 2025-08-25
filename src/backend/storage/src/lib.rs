use std::{cell::RefCell, collections::HashMap};

use candid::CandidType;
use ic_cdk::api::msg_caller;
use ic_cdk::export_candid;
use ic_principal::Principal;
use paginator::{HasFields, Paginator, PaginatorResponse};
use serde::{Deserialize, Serialize};

use utilities::{generate_uuid, now};

// Utils

#[derive(Clone, Debug, PartialEq, Eq, CandidType, Serialize, Deserialize)]
pub enum Access {
    Owner, // for checking purpose only, not to be used as a substitute for the owner field.
    Admin,
    Write,
    Read,
    Delete,
    Removed,
    Public,
}

#[derive(Clone, Debug, PartialEq, Eq, CandidType, Serialize, Deserialize)]
pub enum FileUploadResolveType {
    NotAuthorized,
    SuccessfullyUploaded,
    FailedToUpload,
    AlreadyUploaded,
}

impl Access {
    pub fn all() -> Vec<Access> {
        [
            Access::Admin,
            Access::Write,
            Access::Read,
            Access::Delete,
            Access::Public,
        ]
        .to_vec()
    }

    pub fn can_edit() -> Vec<Access> {
        [Access::Admin, Access::Write].to_vec()
    }

    pub fn admin_access() -> Vec<Access> {
        [Access::Admin, Access::Delete].to_vec()
    }
}

#[derive(Clone, Serialize, Deserialize, CandidType, Debug)]
pub struct Group {
    id: String,
    name: String,
    members: Vec<(Principal, Access)>,
    owner: Principal,
    public: bool,
}

impl HasFields for Group {
    fn get_field(&self, field_name: &str) -> String {
        match field_name {
            "id" => self.id.clone(),
            "name" => self.name.clone(),
            "owner" => self.owner.to_text(),
            "public" => self.public.to_string(),
            _ => "".to_string(),
        }
    }
}

#[derive(Clone, Serialize, Deserialize, CandidType, Debug)]
pub struct StoredFile {
    id: String,
    name: String,
    mime_type: String,
    size: usize,
    data: Vec<u8>,
    owner: Principal,
    groups: Vec<Group>,
    allowed_users: Vec<(Principal, Access)>,
    public: bool,
    uploaded_at: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, CandidType, Debug)]
pub struct StoredFileWithoutData {
    id: String,
    name: String,
    mime_type: String,
    size: usize,
    owner: Principal,
    groups: Vec<Group>,
    allowed_users: Vec<(Principal, Access)>,
    public: bool,
    uploaded_at: Option<String>,
}

impl HasFields for StoredFile {
    fn get_field(&self, field_name: &str) -> String {
        match field_name {
            "id" => self.id.clone(),
            "name" => self.name.clone(),
            "mime_type" => self.mime_type.clone(),
            "size" => self.size.to_string(),
            "owner" => self.owner.to_text(),
            "public" => self.public.to_string(),
            _ => "".to_string(),
        }
    }
}

thread_local! {
    static FILES: RefCell<HashMap<String, StoredFile>> = RefCell::new(HashMap::new());
    static GROUPS: RefCell<HashMap<String, Group>> = RefCell::new(HashMap::new());
}

#[ic_cdk::query]
fn get_all() -> Vec<StoredFile> {
    FILES.with_borrow(|file_map| file_map.values().cloned().collect())
}

// Groups
#[ic_cdk::query]
fn check_group_permission(
    group_id: String,
    operations: Vec<Access>,
    user: Option<Principal>,
) -> bool {
    GROUPS.with_borrow_mut(|groups: &mut HashMap<String, Group>| {
        let principal: Principal = user.unwrap_or(msg_caller());

        match groups.get_mut(&group_id) {
            Some(grp) => operations
                .iter()
                .any(|op| grp.owner == principal || grp.members.contains(&(principal, op.clone()))),
            None => false,
        }
    })
}

#[ic_cdk::query]
fn create_group(group: Group) {
    GROUPS.with_borrow_mut(|groups: &mut HashMap<String, Group>| {
        let principal: Principal = msg_caller();

        let mut inserted_group = group.clone();

        let id = generate_uuid();
        inserted_group.id = id.clone();
        inserted_group.owner = principal;

        groups.insert(id, group);
    });
}

#[ic_cdk::query]
fn delete_groups(group_ids: Vec<String>) -> usize {
    let mut deleted_group_count: usize = 0;

    GROUPS.with_borrow_mut(|groups: &mut HashMap<String, Group>| {
        let principal: Principal = msg_caller();

        for group_id in group_ids.iter() {
            if let Some(grp) = groups.get_mut(group_id) {
                if grp.owner == principal {
                    let was_deleted = GROUPS.with(|groups: &RefCell<HashMap<String, Group>>| {
                        groups.borrow_mut().remove(group_id).is_some()
                    });

                    if was_deleted {
                        deleted_group_count += 1;
                    }
                }
            }
        }
    });

    deleted_group_count
}

#[ic_cdk::query]
fn remove_group_files(group_id: String, file_ids: Vec<String>) -> usize {
    let mut removed_file_count: usize = 0;

    if check_group_permission(group_id, Access::admin_access(), None) {
        GROUPS.with_borrow_mut(|groups: &mut HashMap<String, Group>| {
            file_ids.iter().for_each(|file_id: &String| {
                if groups.remove(file_id).is_some() {
                    removed_file_count += 1;
                }
            });
        });
    }

    removed_file_count
}

#[ic_cdk::update]
fn assign_group_members(
    users: Vec<(Principal, Access)>,
    group_id: String,
) -> Result<String, &'static str> {
    GROUPS.with_borrow_mut(
        |groups: &mut HashMap<String, Group>| match groups.get_mut(&group_id) {
            Some(grp) => {
                let non_inserted_users: Vec<(Principal, Access)> = users
                    .iter()
                    .filter(|user: &&(Principal, Access)| {
                        !grp.members.contains(user) && user.1 != Access::Owner
                    })
                    .cloned()
                    .collect();

                if non_inserted_users.is_empty() {
                    return Ok("No new users to assign.".to_string());
                }

                if check_group_permission(group_id, Access::admin_access(), None) {
                    return Err("You are not authorized to assign members.");
                }

                for user in non_inserted_users.clone() {
                    grp.members.push(user);
                }

                Ok(format!("{} users assigned.", non_inserted_users.len()))
            }
            None => Err("Group not found."),
        },
    )
}

#[ic_cdk::update]
fn edit_group_members(group_id: String, new_accesses: Vec<(Principal, Access)>) -> usize {
    let mut updated_users: usize = 0;

    GROUPS.with_borrow_mut(|groups: &mut HashMap<String, Group>| {
        if let Some(group) = groups.get_mut(&group_id) {
            let principal: Principal = msg_caller();

            let is_owner = group.owner == principal;
            let is_admin = !is_owner && group.members.contains(&(principal, Access::Admin));

            if !is_owner && !is_admin {
                return;
            }

            let all_permissions = Access::all()
                .iter()
                .cloned()
                .chain(std::iter::once(Access::Removed))
                .collect::<Vec<_>>();

            for (user, access) in new_accesses.iter() {
                match access {
                    Access::Owner => {}

                    Access::Removed => {
                        if group.members.contains(&(*user, Access::Admin)) && is_owner {
                            group.members.retain(|(u, _)| u != user);
                            updated_users += 1;
                        } else {
                            group.members.retain(|(u, a)| !(u == user && a == access));
                        }
                    }

                    Access::Admin => {
                        if is_owner && !group.members.contains(&(*user, Access::Admin)) {
                            group.members.push((*user, Access::Admin));
                            updated_users += 1;
                        }
                    }

                    _ => {
                        // For Read/Write
                        let already_has = all_permissions
                            .iter()
                            .any(|perm| group.members.contains(&(*user, perm.clone())));

                        if !already_has {
                            group.members.push((*user, access.clone()));
                            updated_users += 1;
                        }
                    }
                }
            }
        }
    });

    updated_users
}

#[ic_cdk::query]
fn get_group(group_id: String) -> Result<Group, &'static str> {
    GROUPS.with_borrow(
        |groups: &HashMap<String, Group>| match groups.get(&group_id) {
            Some(grp) => {
                let principal: Principal = msg_caller();

                if grp.owner == principal || grp.members.iter().any(|(user, _)| user == &principal)
                {
                    Ok(grp.clone())
                } else {
                    Err("You do not have permission to view this group.")
                }
            }
            None => Err("Group not found."),
        },
    )
}

#[ic_cdk::query]
fn get_groups(page: usize, per_page: usize) -> PaginatorResponse<Group> {
    let groups = GROUPS.with_borrow(|groups: &HashMap<String, Group>| {
        let principal: Principal = msg_caller();
        groups
            .values()
            .filter(|grp: &&Group| {
                grp.owner == principal || grp.members.iter().any(|(user, _)| user == &principal)
            })
            .cloned()
            .collect()
    });

    Paginator::new(groups, vec![]).get(page, per_page)
}

// Files
#[ic_cdk::query]
fn check_file_permission(
    file: StoredFile,
    operations: Vec<Access>,
    user: Option<Principal>,
) -> bool {
    let principal = user.unwrap_or(msg_caller());

    if operations.contains(&Access::Owner) && file.owner == principal
        || operations.contains(&Access::Public) && file.public
        || operations
            .iter()
            .any(|op: &Access| file.allowed_users.contains(&(principal, op.clone())))
    {
        return true;
    }

    GROUPS.with_borrow_mut(|groups: &mut HashMap<String, Group>| {
        groups.iter().any(|(_id, group): (&String, &Group)| {
            operations
                .iter()
                .any(|op: &Access| group.members.contains(&(principal, op.clone())))
        })
    })
}

#[ic_cdk::update]
fn get_file(file_id: String, mutable: Option<bool>) -> Option<StoredFile> {
    FILES.with(
        |files: &RefCell<HashMap<String, StoredFile>>| match files.borrow().get(&file_id) {
            Some(file) => {
                let access_requirements: Vec<Access> = if mutable.unwrap_or(false) {
                    Access::can_edit()
                } else {
                    Access::all()
                };

                if check_file_permission(file.clone(), access_requirements, None) {
                    Some(file.clone())
                } else {
                    None
                }
            }
            None => None,
        },
    )
}

#[ic_cdk::update]
fn get_file_by_id(file_id: String) -> Option<StoredFileWithoutData> {
    FILES.with_borrow(|files_map| {
        if let Some(file) = files_map.get(&file_id)
            && check_file_permission((*file).clone(), vec![Access::Read], None)
        {
            Some(StoredFileWithoutData {
                id: file.id.clone(),
                name: file.name.clone(),
                mime_type: file.mime_type.clone(),
                size: file.size,
                owner: file.owner,
                groups: file.groups.clone(),
                allowed_users: file.allowed_users.clone(),
                public: file.public,
                uploaded_at: file.uploaded_at.clone(),
            })
        } else {
            None
        }
    })
}

#[ic_cdk::update]
fn get_files_by_id(file_ids: Vec<String>) -> Vec<StoredFileWithoutData> {
    file_ids
        .iter()
        .filter_map(|id| get_file_by_id(id.clone()))
        .collect()
}

#[ic_cdk::update]
fn get_bytes(file_id: String, chunk_size: usize, chunk_index: usize) -> Vec<u8> {
    FILES.with_borrow(|files_map| {
        if let Some(file) = files_map.get(&file_id) {
            let data = &file.data;

            let start = chunk_index.saturating_mul(chunk_size);
            if start >= data.len() {
                return vec![]; // index beyond data size
            }

            let end = usize::min(start + chunk_size, data.len());
            data[start..end].to_vec()
        } else {
            vec![]
        }
    })
}

// #[ic_cdk::update]
// fn get_files(
//     per_page: usize,
//     page: usize,
//     public: bool,
//     owned: bool,
// ) -> PaginatorResponse<StoredFile> {
//     let my_files: Vec<StoredFile> = FILES.with(|files: &RefCell<HashMap<String, StoredFile>>| {
//         if owned {
//             let principal: Principal = msg_caller();
//             return files
//                 .borrow()
//                 .values()
//                 .filter(|f| f.owner == principal)
//                 .cloned()
//                 .collect();
//         } else if public {
//             return files
//                 .borrow()
//                 .values()
//                 .filter(|f| f.public)
//                 .cloned()
//                 .collect();
//         } else {
//             return files
//                 .borrow()
//                 .values()
//                 .filter(|f| check_file_permission((*f).clone(), Access::all(), None))
//                 .cloned()
//                 .collect();
//         }
//     });

//     let paginator = Paginator::new(my_files, vec![]);
//     paginator.get(page, per_page)
// }

#[ic_cdk::update]
fn add_file(file: StoredFile) -> Option<String> {
    FILES.with_borrow_mut(|files_map| {
        let principal = msg_caller();

        let key: String = generate_uuid();

        let mut inserted_file = file.clone();

        inserted_file.id = key.clone();
        inserted_file.owner = principal;
        inserted_file.uploaded_at = None;

        if files_map.insert(key.clone(), inserted_file).is_none() {
            Some(key)
        } else {
            None
        }
    })
}

#[ic_cdk::update]
fn add_bytes(file_id: String, new_bytes: Vec<u8>, done: bool) -> bool {
    FILES.with_borrow_mut(|files_map| {
        if let Some(file) = files_map.get_mut(&file_id)
            && Option::is_none(&file.uploaded_at)
        {
            let principal = msg_caller();

            if done {
                file.uploaded_at = Some(now());
            }

            if file.owner == principal {
                file.data.extend_from_slice(&new_bytes);
                true
            } else {
                false
            }
        } else {
            false
        }
    })
}

// #[ic_cdk::update]
// fn upload_files(files: Vec<StoredFile>) -> Vec<(String, FileUploadResolveType, String)> {
//     let mut uploaded_files: Vec<(String, FileUploadResolveType, String)> = vec![];

//     let principal = msg_caller();

//     FILES.with_borrow_mut(|files_map: &mut HashMap<String, StoredFile>| {
//         for file in files.iter() {
//             if !file.groups.is_empty()
//                 && file.groups.iter().any(|grp: &Group| {
//                     !check_group_permission(grp.id.clone(), Access::can_edit(), None)
//                 })
//             {
//                 uploaded_files.push((
//                     file.name.clone(),
//                     FileUploadResolveType::NotAuthorized,
//                     "You are not authorized in this group.".to_string(),
//                 ));
//                 continue;
//             }

//             let key: String = generate_uuid();

//             let mut inserted_file = file.clone();

//             inserted_file.id = key.clone();
//             inserted_file.owner = principal;
//             inserted_file.uploaded_at = Some(now());

//             if files_map
//                 .insert(key.clone(), inserted_file.clone())
//                 .is_none()
//             {
//                 uploaded_files.push((
//                     key,
//                     FileUploadResolveType::SuccessfullyUploaded,
//                     "Successfully uploaded.".to_string(),
//                 ));
//             } else {
//                 uploaded_files.push((
//                     key,
//                     FileUploadResolveType::AlreadyUploaded,
//                     "StoredFile is already uploaded.".to_string(),
//                 ));
//             }
//         }
//     });

//     uploaded_files
// }

#[ic_cdk::update]
fn delete_files(file_ids: Vec<String>) -> usize {
    let mut deleted_file_count: usize = 0;

    for file_id in file_ids.iter() {
        FILES.with_borrow_mut(|files_map: &mut HashMap<String, StoredFile>| {
            if let Some(f) = files_map.get_mut(file_id) {
                let principal: Principal = msg_caller();
                if f.owner == principal {
                    let was_deleted =
                        FILES.with(|files| files.borrow_mut().remove(file_id).is_some());

                    if was_deleted {
                        deleted_file_count += 1;
                    }
                }
            }
        });
    }

    deleted_file_count
}

#[ic_cdk::update]
fn change_file_name(file_id: String, new_file_name: String) -> Result<&'static str, &'static str> {
    FILES.with_borrow_mut(
        |files: &mut HashMap<String, StoredFile>| match files.get_mut(&file_id) {
            Some(file) => {
                if !check_file_permission(file.clone(), Access::can_edit(), None) {
                    return Err("You are not authorized to change this file name.");
                }

                file.name = new_file_name;
                Ok("StoredFile name changed successfully.")
            }
            None => Err("StoredFile not found."),
        },
    )
}

#[ic_cdk::update]
fn edit_file_public_access(
    file_id: String,
    new_access: bool,
) -> Result<&'static str, &'static str> {
    FILES.with_borrow_mut(
        |files: &mut HashMap<String, StoredFile>| match files.get_mut(&file_id) {
            Some(file) => {
                if !check_file_permission(file.clone(), Access::can_edit(), None) {
                    if new_access {
                        return Err("You are not authorized to publish this file.");
                    } else {
                        return Err("You are not authroized to unpublish this file.");
                    }
                }

                file.public = new_access;
                if new_access {
                    Ok("The file has been published successfully.")
                } else {
                    Ok("The file has been unpublished successfully.")
                }
            }
            None => Err("StoredFile not found."),
        },
    )
}

#[ic_cdk::update]
fn edit_allowed_users(file_id: String, new_accesses: Vec<(Principal, Access)>) -> usize {
    let mut updated_users: usize = 0;

    FILES.with_borrow_mut(|files: &mut HashMap<String, StoredFile>| {
        if let Some(file) = files.get_mut(&file_id) {
            let principal: Principal = msg_caller();

            let is_owner = file.owner == principal;
            let is_admin = !is_owner && file.allowed_users.contains(&(principal, Access::Admin));

            if !is_owner && !is_admin {
                return;
            }

            let all_permissions = Access::all()
                .iter()
                .cloned()
                .chain(std::iter::once(Access::Removed))
                .collect::<Vec<_>>();

            for (user, access) in new_accesses.iter() {
                match access {
                    Access::Owner => {}

                    Access::Removed => {
                        if file.allowed_users.contains(&(*user, Access::Admin)) && is_owner {
                            file.allowed_users.retain(|(u, _)| u != user);
                            updated_users += 1;
                        } else {
                            file.allowed_users
                                .retain(|(u, a)| !(u == user && a == access));
                        }
                    }

                    Access::Admin => {
                        if is_owner && !file.allowed_users.contains(&(*user, Access::Admin)) {
                            file.allowed_users.push((*user, Access::Admin));
                            updated_users += 1;
                        }
                    }

                    _ => {
                        // For Read/Write
                        let already_has = all_permissions
                            .iter()
                            .any(|perm| file.allowed_users.contains(&(*user, perm.clone())));

                        if !already_has {
                            file.allowed_users.push((*user, access.clone()));
                            updated_users += 1;
                        }
                    }
                }
            }
        }
    });

    updated_users
}

export_candid!();
