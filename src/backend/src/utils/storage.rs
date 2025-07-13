use std::{cell::RefCell, collections::HashMap};

use candid::CandidType;
use ic_cdk::{caller, export_candid};
use ic_principal::Principal;
use serde::{Deserialize, Serialize};
use sha2::Digest;

use crate::utils::paginator::{Paginator, PaginatorResponse};

#[derive(Clone, Debug, PartialEq, Eq, CandidType, Serialize, Deserialize)]
pub enum Access {
    Admin,
    Write,
    Read,
    Owner,
}

impl Access {
    pub const fn all() -> &'static [Access] {
        &[Access::Owner, Access::Admin, Access::Write, Access::Read]
    }
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
struct Group {
    id: String,
    name: String,
    members: Vec<(Principal, Access)>,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
struct File {
    id: String,
    name: String,
    mime_type: String,
    size: usize,
    data: Vec<u8>,
    owner: Principal,
    groups: Vec<Group>,
    public: bool,
}

thread_local! {
  static FILES: RefCell<HashMap<String, File>> = RefCell::new(HashMap::new());
  static GROUPS: RefCell<HashMap<String, Group>> = RefCell::new(HashMap::new());
}

// Files
#[ic_cdk::query]
fn check_file_permission(file: File, operations: Vec<Access>) -> bool {
    let principal: Principal = caller();

    if file.owner == principal {
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

#[ic_cdk::query]
fn get_file(file_id: String, mutable: Option<bool>) -> Option<File> {
    FILES.with(
        |files: &RefCell<HashMap<String, File>>| match files.borrow().get(&file_id) {
            Some(file) => {
                let access_requirements: Vec<Access>;
                if mutable.unwrap_or(false) {
                    access_requirements = vec![Access::Write, Access::Admin, Access::Owner];
                } else {
                    access_requirements =
                        vec![Access::Read, Access::Write, Access::Admin, Access::Owner];
                }

                if check_file_permission(file.clone(), access_requirements) {
                    Some(file.clone())
                } else {
                    None
                }
            }
            None => None,
        },
    )
}

#[ic_cdk::query]
fn get_files(per_page: usize, page: usize) -> PaginatorResponse<File> {
    let my_files: Vec<File> = FILES.with(|files| {
        files
            .borrow()
            .values()
            .filter(|f| check_file_permission((*f).clone(), Access::all().to_vec()))
            .cloned()
            .collect()
    });

    let paginator = Paginator::new(my_files);
    paginator.get(page, per_page)
}

#[ic_cdk::update]
fn upload_files(files: Vec<File>) -> Vec<(String, String)> {
    let mut uploaded_files: Vec<(String, String)> = vec![];

    FILES.with_borrow_mut(|files_map: &mut HashMap<String, File>| {
        for file in files.iter() {
            if !file.groups.is_empty()
                && file.groups.iter().any(|grp: &Group| {
                    !check_group_permission(
                        grp.id.clone(),
                        vec![Access::Write, Access::Admin, Access::Owner],
                    )
                })
            {
                uploaded_files.push((
                    file.name.clone(),
                    "You are not authorized in this group.".to_string(),
                ));
                continue;
            }

            let key: String = hex::encode(sha2::Sha256::digest(&file.data));
            if files_map.insert(key, file.clone()).is_none() {
                uploaded_files.push((file.name.clone(), "Successfully uploaded.".to_string()));
            } else {
                uploaded_files.push((file.name.clone(), "File is already uploaded.".to_string()));
            }
        }
    });

    uploaded_files
}

#[ic_cdk::update]
fn delete_files(file_ids: Vec<String>) -> usize {
    let mut deleted_file_count: usize = 0;

    for file_id in file_ids.iter() {
        if let Some(_file) = get_file(file_id.clone(), Some(true)) {
            // Only delete if permission check passes
            let was_deleted = FILES.with(|files| files.borrow_mut().remove(file_id).is_some());

            if was_deleted {
                deleted_file_count += 1;
            }
        }
    }

    deleted_file_count
}

// Groups
#[ic_cdk::query]
fn check_group_permission(group_id: String, operations: Vec<Access>) -> bool {
    GROUPS.with_borrow_mut(|groups: &mut HashMap<String, Group>| {
        let principal: Principal = caller();

        match groups.get_mut(&group_id) {
            Some(grp) => operations
                .iter()
                .any(|op| grp.members.contains(&(principal, op.clone()))),
            None => false,
        }
    })
}

#[ic_cdk::update]
fn assign_members(
    users: Vec<(Principal, Access)>,
    group_id: String,
) -> Result<String, &'static str> {
    GROUPS.with_borrow_mut(
        |groups: &mut HashMap<String, Group>| match groups.get_mut(&group_id) {
            Some(grp) => {
                let non_inserted_users: Vec<(Principal, Access)> = users
                    .iter()
                    .filter(|user: &&(Principal, Access)| !grp.members.contains(user))
                    .cloned()
                    .collect();

                if non_inserted_users.is_empty() {
                    return Ok("No new users to assign.".to_string());
                }

                if check_group_permission(group_id, vec![Access::Owner, Access::Admin]) {
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

export_candid!();
