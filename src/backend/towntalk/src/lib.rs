use candid::{CandidType, Principal};
use futures::future::join_all;
use ic_cdk::{api::msg_caller, export_candid};
use paginator::{HasFields, Paginator, PaginatorResponse};
use serde::{Deserialize, Serialize};
use std::{cell::RefCell, collections::HashMap};

use utilities::{StoredFile, generate_uuid, get_files, now, upload_files};

#[derive(CandidType, Clone, Serialize, Deserialize, Debug)]
struct Comment {
    id: String,
    comment: String,
    post_id: String,
    poster_id: String,
    replied_to: Option<String>,
    created_at: String,
    updated_at: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Post {
    id: String,
    poster_id: String,
    title: String,
    caption: String,
    medias: Vec<String>,
    likes: Vec<String>,
    shares: Vec<String>,
    comments: Vec<Comment>,
    created_at: String,
    updated_at: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct PostCreationPayload {
    id: String,
    poster_id: String,
    title: String,
    caption: String,
    medias: Vec<StoredFile>,
    likes: Vec<String>,
    shares: Vec<String>,
    comments: Vec<Comment>,
    created_at: String,
    updated_at: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct FeedPost {
    id: String,
    poster: AccountVisibleInformation,
    title: String,
    caption: String,
    medias: Vec<StoredFile>,
    likes: Vec<String>,
    shares: Vec<String>,
    comments: Vec<Comment>,
    created_at: String,
    updated_at: String,
}

impl HasFields for FeedPost {
    fn get_field(&self, field_name: &str) -> String {
        match field_name {
            "id" => self.id.clone(),
            "poster" => self.poster.username.clone(),
            "title" => self.title.clone(),
            "caption" => self.caption.clone(),
            "medias" => format!("{:?}", self.medias),
            "likes" => format!("{:?}", self.likes),
            "shares" => format!("{:?}", self.shares),
            "comments" => format!("{:?}", self.comments),
            "created_at" => self.created_at.clone(),
            "updated_at" => self.updated_at.clone(),
            _ => "".to_string(),
        }
    }
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountProfile {
    username: String,
    profile_picture: Option<String>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Account {
    id: String,
    user_id: Principal,
    profile: AccountProfile,
    followers: Vec<(String, String)>,
    following: Vec<(String, String)>,
    posts: Vec<String>,
    echos: Vec<String>,
    blocked: Vec<(String, String)>,
    private: bool,
    deleted_at: Option<String>,
    created_at: String,
    updated_at: Option<String>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct UserAccountProfile {
    username: String,
    profile_picture: Option<StoredFile>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct UserAccount {
    id: String,
    user_id: Principal,
    profile: UserAccountProfile,
    followers: Vec<(String, String)>,
    following: Vec<(String, String)>,
    posts: Vec<String>,
    echos: Vec<String>,
    blocked: Vec<(String, String)>,
    private: bool,
    deleted_at: Option<String>,
    created_at: String,
    updated_at: Option<String>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountProfileCreationPayload {
    username: String,
    about: String,
    profile_picture: Option<StoredFile>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountCreationPayload {
    profile: AccountProfileCreationPayload,
    private: bool,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountDetails {
    account: Account,
    owned: bool,
    posts: Option<Vec<Post>>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountVisibleInformation {
    id: String,
    username: String,
    profile_picture: Option<StoredFile>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountDeletionPayload {
    account_id: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Echo {
    id: String,
    account_id: String,
    media: Vec<u8>,
    like: usize,
    share: usize,
    seen_by: Vec<(String, String)>,
    created_at: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
pub enum LikableType {
    POST,
    STORY,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Like {
    account_id: String,
    likable_id: String,
    likable_type: LikableType,
    created_at: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
pub enum ReportType {
    SPAM,
    TERRORISM,
    SCAM,
    PROFANITY,
    HATESPEECH,
    RACISM,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
pub enum ReportResolveType {
    ACCOUNTSUSPENDED,
    ACCOUNTDELETED,
    USERSUSPENDED,
    USERDELETED,
    WARNING,
    FALSE,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Report {
    id: String,
    reporter_id: String,
    reported_id: String,
    report_type: Vec<ReportType>,
    created_at: String,
    resolved: Vec<(ReportResolveType, Option<usize>, String)>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct FollowRequest {
    requester_id: String,
    requested_at: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct FollowRequestReturnPayload {
    requester: AccountVisibleInformation,
    requested_at: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct ValidityCheckingPayload {
    username: String,
}

thread_local! {
    static USER_ACCOUNTS: RefCell<HashMap<Principal, Vec<String>>> = RefCell::new(HashMap::new());
    static ACCOUNTS: RefCell<HashMap<String, Account>> = RefCell::new(HashMap::new());
    static FOLLOW_REQUESTS: RefCell<HashMap<String, FollowRequest>> = RefCell::new(HashMap::new());
    static POSTS: RefCell<HashMap<String, Post>> = RefCell::new(HashMap::new());
    static LIKES: RefCell<HashMap<String, Like>> = RefCell::new(HashMap::new());
    static COMMENTS: RefCell<HashMap<String, Comment>> = RefCell::new(HashMap::new());
    static ECHOS: RefCell<HashMap<String, Echo>> = RefCell::new(HashMap::new());
    static REPORTS: RefCell<HashMap<String, Report>> = RefCell::new(HashMap::new());
}

// Accounts

fn can_view(account_id: String, target_id: String) -> bool {
    ACCOUNTS.with_borrow(
        |accounts: &HashMap<String, Account>| match accounts.get(&target_id) {
            Some(acc) => {
                if is_owned(target_id) {
                    return true;
                }

                let is_blocked: bool = acc
                    .blocked
                    .iter()
                    .any(|(blocked_id, _)| blocked_id == &account_id);

                if is_blocked {
                    return false;
                }

                let is_private: bool = acc.private;

                if is_private {
                    acc.followers
                        .iter()
                        .any(|(follower_id, _)| follower_id == &account_id)
                } else {
                    true
                }
            }
            None => false,
        },
    )
}

fn is_owned(account_id: String) -> bool {
    let principal = msg_caller();
    ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
        match account_map.get(&account_id) {
            Some(acc) => acc.user_id == principal,
            None => false,
        }
    })
}

fn is_post_owner(post_id: String) -> bool {
    POSTS.with_borrow(|post_map| match post_map.get(&post_id) {
        Some(post) => ACCOUNTS.with_borrow(|account_map| match account_map.get(&post.poster_id) {
            Some(acc) => {
                let principal = msg_caller();
                acc.user_id == principal
            }
            None => false,
        }),
        None => false,
    })
}

fn is_account_owner(account_id: String) -> bool {
    ACCOUNTS.with_borrow(|account_map| match account_map.get(&account_id) {
        Some(acc) => {
            let principal = msg_caller();
            acc.user_id == principal
        }
        None => false,
    })
}

fn is_comment_owner(account_id: String, comment_id: String) -> bool {
    COMMENTS.with_borrow(|comment_map| match comment_map.get(&comment_id) {
        Some(c) => is_account_owner(account_id.clone()) && c.poster_id == account_id,
        None => false,
    })
}

async fn get_profile_picture(
    storage_canister_id: Principal,
    profile_picture_id: String,
) -> Option<StoredFile> {
    let files = get_files(storage_canister_id, vec![profile_picture_id.clone()]).await;
    files.first().cloned()
}

async fn get_account_visible_information(
    storage_canister_id: Principal,
    target_id: String,
) -> Option<AccountVisibleInformation> {
    let account_opt = ACCOUNTS
        .with_borrow(|account_map: &HashMap<String, Account>| account_map.get(&target_id).cloned());

    if let Some(acc) = account_opt {
        let mut profile_picture = None;

        if let Some(pfp) = acc.profile.profile_picture.clone() {
            profile_picture = get_profile_picture(storage_canister_id, pfp).await;
        }

        Some(AccountVisibleInformation {
            id: acc.id,
            username: acc.profile.username,
            profile_picture,
        })
    } else {
        None
    }
}

#[ic_cdk::query]
fn verify_login(account_id: String) -> bool {
    ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
        match account_map.values().find(|acc| *acc.id == account_id) {
            Some(acc) => acc.user_id == msg_caller(),
            None => false,
        }
    })
}

#[ic_cdk::query]
fn check_validity(payload: ValidityCheckingPayload) -> bool {
    ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
        let username_is_valid: bool = account_map
            .values()
            .all(|acc: &Account| acc.profile.username != payload.username);

        username_is_valid
    })
}

#[ic_cdk::update]
async fn create_account(
    payload: AccountCreationPayload,
    storage_canister_id: Principal,
) -> Account {
    let principal: Principal = msg_caller();

    let account_id: String = generate_uuid();

    let mut profile_picture_id: Option<String> = None;

    if let Some(pfp) = payload.profile.profile_picture {
        let upload_response = upload_files(storage_canister_id, vec![pfp]).await;

        if !upload_response.is_empty() {
            profile_picture_id = Some(
                upload_response
                    .iter()
                    .map(|(id, _, _)| id.clone())
                    .collect::<Vec<String>>()[0]
                    .clone(),
            );
        }
    }

    let account_data: Account = Account {
        id: account_id.clone(),
        user_id: principal,
        followers: Vec::new(),
        following: Vec::new(),
        posts: Vec::new(),
        echos: Vec::new(),
        blocked: Vec::new(),
        profile: AccountProfile {
            username: payload.profile.username.clone(),
            profile_picture: profile_picture_id,
        },
        private: payload.private,
        deleted_at: None,
        created_at: now(),
        updated_at: None,
    };

    ACCOUNTS.with_borrow_mut(|accounts: &mut HashMap<String, Account>| {
        accounts.insert(account_id.clone(), account_data.clone());
    });

    USER_ACCOUNTS.with_borrow_mut(
        |user_account_map| match user_account_map.get_mut(&principal) {
            Some(user_acc) => {
                user_acc.push(account_id.clone());
            }
            None => {
                user_account_map.insert(principal, vec![account_id.clone()]);
            }
        },
    );

    account_data
}

#[ic_cdk::update]
async fn get_account(account_id: String, storage_canister_id: Principal) -> Option<UserAccount> {
    if let Some(account) = ACCOUNTS
        .with_borrow(|account_map: &HashMap<String, Account>| account_map.get(&account_id).cloned())
    {
        let profile_picture_id = account.profile.profile_picture.clone();
        let profile_picture = match profile_picture_id {
            Some(ref pfp_id) => get_profile_picture(storage_canister_id, pfp_id.clone()).await,
            None => None,
        };

        Some(UserAccount {
            id: account.id.clone(),
            user_id: account.user_id,
            profile: UserAccountProfile {
                username: account.profile.username.clone(),
                profile_picture,
            },
            followers: account.followers.clone(),
            following: account.following.clone(),
            posts: account.posts.clone(),
            echos: account.echos.clone(),
            blocked: account.blocked.clone(),
            private: account.private,
            deleted_at: account.deleted_at.clone(),
            created_at: account.created_at.clone(),
            updated_at: account.updated_at.clone(),
        })
    } else {
        None
    }
}

#[ic_cdk::query]
async fn get_user_accounts(storage_canister_id: Principal) -> Vec<AccountVisibleInformation> {
    let principal: Principal = msg_caller();

    let accounts = ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
        account_map
            .values()
            .filter(|acc: &&Account| acc.user_id == principal)
            .cloned()
            .collect::<Vec<Account>>()
    });

    let mut result = Vec::new();
    for acc in accounts {
        let mut profile_picture = None;

        if let Some(pfp) = acc.profile.profile_picture.clone() {
            profile_picture = get_profile_picture(storage_canister_id, pfp).await;
        }

        result.push(AccountVisibleInformation {
            id: acc.id.clone(),
            username: acc.profile.username.clone(),
            profile_picture,
        });
    }
    result
}

#[ic_cdk::update]
fn delete_account(payload: AccountDeletionPayload) {
    let account_id = payload.account_id.clone();

    ACCOUNTS.with_borrow_mut(|accounts: &mut HashMap<String, Account>| {
        let account = accounts.get_mut(&account_id);

        if let Some(acc) = account {
            if is_owned(account_id.clone()) {
                acc.deleted_at = Some(now());
            }
        }
    });

    let principal: Principal = msg_caller();

    USER_ACCOUNTS.with_borrow_mut(
        |user_account_map| match user_account_map.get_mut(&principal) {
            Some(user_acc) => {
                user_acc.retain(|acc_id| *acc_id != account_id);
            }
            None => {
                user_account_map.retain(|user_principal, _| user_principal != &principal);
            }
        },
    );
}

#[ic_cdk::update]
fn report_account(payload: Report) {
    let mut report_data: Report = payload;
    report_data.id = generate_uuid();

    REPORTS.with_borrow_mut(|reports: &mut HashMap<String, Report>| {
        reports.insert(report_data.id.clone(), report_data);
    });
}

#[ic_cdk::update]
fn block_account(account_id: String, target_id: String) {
    ACCOUNTS.with_borrow_mut(|account_map: &mut HashMap<String, Account>| {
        if let Some(acc) = account_map.get_mut(&account_id) {
            if is_owned(account_id) {
                acc.blocked.push((target_id, now()));
            }
        }
    })
}

#[ic_cdk::update]
fn unblock_account(account_id: String, target_id: String) {
    ACCOUNTS.with_borrow_mut(|account_map: &mut HashMap<String, Account>| {
        if let Some(acc) = account_map.get_mut(&account_id) {
            if is_owned(account_id) {
                acc.blocked.retain(|(blocked, _)| blocked != &target_id);
            }
        }
    })
}

#[ic_cdk::query]
fn get_account_details(account_id: String, target_id: String) -> Option<AccountDetails> {
    let principal: Principal = msg_caller();

    let target_account = ACCOUNTS
        .with_borrow(|accounts: &HashMap<String, Account>| accounts.get(&target_id).cloned());

    match target_account {
        Some(acc) => {
            let owned: bool = acc.user_id == principal;
            if can_view(account_id, target_id.clone()) {
                let posts = POSTS.with_borrow(|post_map| {
                    Some(
                        post_map
                            .values()
                            .filter(|post| post.poster_id == target_id.clone())
                            .cloned()
                            .collect::<Vec<Post>>(),
                    )
                });

                Some(AccountDetails {
                    account: acc,
                    owned,
                    posts,
                })
            } else {
                Some(AccountDetails {
                    account: acc,
                    owned,
                    posts: None,
                })
            }
        }
        None => None,
    }
}

#[ic_cdk::query]
fn get_profile(account_id: String) -> Option<AccountProfile> {
    if is_owned(account_id.clone()) {
        ACCOUNTS
            .with_borrow(|account_map| account_map.get(&account_id).map(|acc| acc.profile.clone()))
    } else {
        None
    }
}

#[ic_cdk::update]
fn follow(account_id: String, target_id: String) {
    if is_owned(account_id.clone()) {
        let account_id_cloned = account_id.clone();
        ACCOUNTS.with_borrow_mut(|account_map| {
            if let Some(acc) = account_map.get_mut(&target_id) {
                if can_view(account_id_cloned.clone(), acc.id.clone()) {
                    if acc.private {
                        // create follow request
                        FOLLOW_REQUESTS.with_borrow_mut(|request_map| {
                            request_map.insert(
                                target_id,
                                FollowRequest {
                                    requester_id: account_id.clone(),
                                    requested_at: now(),
                                },
                            );
                        });
                    } else {
                        acc.followers.push((account_id_cloned.clone(), now()));
                    }
                }
            }
        });
    }
}

#[ic_cdk::update]
fn unfollow(account_id: String, target_id: String) -> f32 {
    if is_owned(account_id.clone()) {
        ACCOUNTS.with_borrow_mut(|account_map| match account_map.get_mut(&target_id) {
            Some(acc) => {
                acc.followers.retain(|(a, _)| a != &account_id);
                if acc.private { 0.0 } else { 1.0 }
            }
            None => -1.0,
        })
    } else {
        -1.0
    }
}

// #[ic_cdk::query]
// fn get_follow_requests(account_id: String) -> Vec<FollowRequestReturnPayload> {
//     if is_owned(account_id.clone()) {
//         FOLLOW_REQUESTS.with_borrow(| request_map | {
//             Some(request_map
//                     .iter()
//                     .filter(|(id, _)| id.as_str() == account_id.as_str())
//                     .map(|(id, req)| (id.clone(), req.clone()))
//                     .collect())
//         })
//     } else {
//         None
//     }
// }

#[ic_cdk::update]
fn accept_follow_request(account_id: String, target_id: String) {
    if is_owned(account_id.clone()) {
        let account_id_cloned = account_id.clone();
        ACCOUNTS.with_borrow_mut(|account_map| {
            if let Some(acc) = account_map.get_mut(&target_id) {
                if can_view(account_id_cloned.clone(), acc.id.clone()) {
                    if acc.private {
                        // create follow request
                        FOLLOW_REQUESTS.with_borrow_mut(|request_map| {
                            request_map.insert(
                                target_id,
                                FollowRequest {
                                    requester_id: account_id.clone(),
                                    requested_at: now(),
                                },
                            );
                        });
                    } else {
                        acc.followers.push((account_id_cloned.clone(), now()));
                    }
                }
            }
        });
    }
}

#[ic_cdk::query]
async fn get_followers(
    storage_canister_id: Principal,
    account_id: String,
    target_id: String,
) -> Option<Vec<AccountVisibleInformation>> {
    if can_view(account_id.clone(), target_id.clone()) {
        let followers_info = ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
            account_map.get(&target_id).map(|acc: &Account| {
                acc.followers
                    .iter()
                    .filter_map(|(fol, _)| account_map.get(fol).cloned())
                    .collect::<Vec<Account>>()
            })
        });

        if let Some(accounts) = followers_info {
            let mut result = Vec::new();
            for acc in accounts {
                let mut profile_picture = None;

                if let Some(pfp) = acc.profile.profile_picture.clone() {
                    profile_picture = get_profile_picture(storage_canister_id, pfp).await;
                }

                result.push(AccountVisibleInformation {
                    id: acc.id.clone(),
                    username: acc.profile.username.clone(),
                    profile_picture,
                });
            }
            Some(result)
        } else {
            None
        }
    } else {
        None
    }
}

#[ic_cdk::query]
async fn get_following(
    storage_canister_id: Principal,
    account_id: String,
    target_id: String,
) -> Option<Vec<AccountVisibleInformation>> {
    if can_view(account_id.clone(), target_id.clone()) {
        let accounts = ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
            account_map.get(&target_id).map(|acc: &Account| {
                acc.following
                    .iter()
                    .filter_map(|(fol, _)| account_map.get(fol).cloned())
                    .collect::<Vec<Account>>()
            })
        });

        if let Some(accounts) = accounts {
            let mut result = Vec::new();
            for acc in accounts {
                let mut profile_picture = None;

                if let Some(pfp) = acc.profile.profile_picture.clone() {
                    profile_picture = get_profile_picture(storage_canister_id, pfp).await;
                }

                result.push(AccountVisibleInformation {
                    id: acc.id.clone(),
                    username: acc.profile.username.clone(),
                    profile_picture,
                });
            }
            Some(result)
        } else {
            None
        }
    } else {
        None
    }
}

// Posts
#[ic_cdk::update]
fn create_post(account_id: String, post: Post) {
    if is_owned(account_id.clone()) {
        let account_id_cloned = account_id.clone();
        let post_cloned = post.clone();

        POSTS.with_borrow_mut(|post_map: &mut HashMap<String, Post>| {
            post_map.insert(account_id_cloned.clone(), post_cloned.clone());
        });

        ACCOUNTS.with_borrow_mut(|account_map: &mut HashMap<String, Account>| {
            if let Some(acc) = account_map.get_mut(&account_id_cloned) {
                acc.posts.push(post_cloned.id);
            }
        });
    }
}

#[ic_cdk::query]
fn get_posts(account_id: String) -> Vec<Post> {
    ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
        match account_map.get(&account_id) {
            Some(acc) => {
                if can_view(account_id.clone(), acc.id.clone()) {
                    POSTS.with_borrow(|post_map: &HashMap<String, Post>| {
                        post_map
                            .values()
                            .filter(|p| acc.posts.contains(&p.id))
                            .cloned()
                            .collect::<Vec<Post>>()
                    })
                } else {
                    Vec::new()
                }
            }
            None => Vec::new(),
        }
    })
}

#[ic_cdk::query]
async fn get_feeds(
    account_id: String,
    page: usize,
    storage_canister_id: Principal,
) -> PaginatorResponse<FeedPost> {
    // First, collect the posts that are viewable by the account
    let posts: Vec<Post> = ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
        match account_map.get(&account_id) {
            Some(acc) => {
                if can_view(account_id.clone(), acc.id.clone()) {
                    POSTS.with_borrow(|post_map: &HashMap<String, Post>| {
                        post_map
                            .values()
                            .filter(|p| can_view(account_id.clone(), p.poster_id.clone()))
                            .cloned()
                            .collect::<Vec<Post>>()
                    })
                } else {
                    Vec::new()
                }
            }
            None => Vec::new(),
        }
    });

    // Now, for each post, fetch the poster's visible information asynchronously
    let mut payloads = Vec::new();
    for post in posts {
        let poster_info =
            get_account_visible_information(storage_canister_id, post.poster_id.clone()).await;
        let poster_info = match poster_info {
            Some(info) => info,
            None => AccountVisibleInformation {
                id: post.poster_id.clone(),
                username: String::from("Unknown"),
                profile_picture: None,
            },
        };

        let post_medias = get_files(storage_canister_id, post.medias).await;

        payloads.push(FeedPost {
            id: post.id,
            poster: poster_info,
            title: post.title,
            caption: post.caption,
            medias: post_medias,
            likes: post.likes,
            shares: post.shares,
            comments: post.comments,
            created_at: post.created_at,
            updated_at: post.updated_at,
        });
    }

    Paginator::new(payloads, vec![]).get(page, 5)
}

#[ic_cdk::update]
fn like_post(account_id: String, post_id: String) {
    POSTS.with_borrow_mut(|post_map: &mut HashMap<String, Post>| {
        if let Some(post) = post_map.get_mut(&post_id) {
            if can_view(account_id.clone(), post.poster_id.clone()) {
                if post.likes.contains(&account_id) {
                    post.likes.retain(|p| p != &account_id);
                } else {
                    post.likes.push(account_id.clone());
                }
            }
        }
    });
}

#[ic_cdk::update]
fn comment_post(account_id: String, post_id: String, comment: Comment) {
    POSTS.with_borrow_mut(|post_map: &mut HashMap<String, Post>| {
        if let Some(post) = post_map.get_mut(&post_id) {
            if can_view(account_id.clone(), post.poster_id.clone()) {
                post.comments.push(comment.clone());
            }
        }
    });
}

#[ic_cdk::update]
fn remove_comment(account_id: String, post_id: String, comment_id: String) {
    POSTS.with_borrow_mut(|post_map: &mut HashMap<String, Post>| {
        if let Some(post) = post_map.get_mut(&post_id) {
            if is_comment_owner(account_id.clone(), comment_id.clone())
                || is_post_owner(post.id.clone())
            {
                post.comments.retain(|c| c.id != comment_id);
            }
        }
    });

    COMMENTS.with_borrow_mut(|comment_map: &mut HashMap<String, Comment>| {
        if is_comment_owner(account_id, comment_id.clone()) {
            comment_map.retain(|id, _| *id != comment_id);
        }
    });
}

// Echo
#[ic_cdk::update]
fn post_echo(account_id: String, echo: Echo) {
    let id: String = generate_uuid();

    if is_owned(account_id.clone()) {
        let id_clone = id.clone();
        ECHOS.with_borrow_mut(|echo_map: &mut HashMap<String, Echo>| {
            echo_map.insert(id, echo);
        });

        ACCOUNTS.with_borrow_mut(|account_map: &mut HashMap<String, Account>| {
            if let Some(acc) = account_map.get_mut(&account_id) {
                acc.echos.push(id_clone);
            }
        });
    }
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct EchoBriefInformation {
    account: AccountVisibleInformation,
    echos: Vec<String>,
    seen: bool,
}

#[ic_cdk::query]
async fn get_echos(
    storage_canister_id: Principal,
    account_id: String,
) -> Option<Vec<EchoBriefInformation>> {
    let mut accs: Vec<Account> = vec![];
    if is_owned(account_id.clone()) {
        let get_all = ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
            match account_map.get(&account_id) {
                Some(acc) => {
                    accs = account_map
                        .iter()
                        .filter(|(id, _)| acc.following.iter().any(|(f_id, _)| f_id == *id))
                        .map(|(_, account)| account.clone())
                        .collect::<Vec<Account>>();

                    let futures = accs.iter().map(|a: &Account| {
                        let echo_ids = a.echos.clone();

                        let seen = echo_ids.iter().all(|echo_id| {
                            ECHOS.with_borrow(|echo_map: &HashMap<String, Echo>| {
                                echo_map.get(echo_id).is_some_and(|echo| {
                                    echo.seen_by.iter().any(|(acc_id, _)| acc_id == &account_id)
                                })
                            })
                        });

                        let storage_canister_id = storage_canister_id;
                        let a_id = a.id.clone();

                        async move {
                            let account_info =
                                get_account_visible_information(storage_canister_id, a_id)
                                    .await
                                    .unwrap_or(AccountVisibleInformation {
                                        id: a.id.clone(),
                                        username: a.profile.username.clone(),
                                        profile_picture: None,
                                    });

                            EchoBriefInformation {
                                echos: echo_ids,
                                account: account_info,
                                seen,
                            }
                        }
                    });

                    Some(join_all(futures))
                }
                None => None,
            }
        });

        if let Some(call) = get_all {
            Some(call.await)
        } else {
            None
        }
    } else {
        None
    }
}

#[ic_cdk::query]
fn get_echo() {}

// #[ic_cdk::update]
// async fn seeder(storage_canister_id: Principal) -> String {

//     let demo_accounts = vec![
//         ("alice", "Welcome to Alice's adventures!"),
//         ("bob", "Bob's journey into decentralized land"),
//         ("carol", "Carol's creative corner"),
//     ];

//     let mut created_account_ids = Vec::new();

//     for (username, about) in &demo_accounts {
//         let payload = AccountCreationPayload {
//             profile: AccountProfileCreationPayload {
//                 username: username.to_string(),
//                 about: about.to_string(),
//                 profile_picture: None,
//             },
//             private: false,
//         };
//         let account_id = create_account(payload, storage_canister_id).await;
//         created_account_ids.push(account_id);
//     }

//     // Media templates to simulate different file types
//     let media_templates = vec![
//         ("image/jpeg", "sample_image.jpg"),
//         ("video/mp4", "sample_video.mp4"),
//         ("application/pdf", "sample_doc.pdf"),
//         ("image/png", "sample_graphic.png"),
//     ];

//     // Generate posts with unique content per user
//     for ((username, caption_text, file_name), account_id) in demo_accounts.into_iter().zip(created_account_ids.iter()) {
//         let post_id = generate_uuid();

//         let medias: Vec<StoredFile> = (0..8)
//             .map(|_| {

//                 StoredFile {
//                     id: generate_uuid(),
//                     name: template_name.to_string(),
//                     mime_type: mime_type.to_string(),
//                     size: fake_data.len(),
//                     data: fake_data,
//                     owner: *account_id,
//                     groups: vec![],
//                     allowed_users: vec![],
//                     public: true,
//                     uploaded_at: now(),
//                 }
//             })
//             .collect();

//         let post = Post {
//             id: post_id.clone(),
//             poster_id: account_id.clone(),
//             title: format!("{}'s First Post", username),
//             caption: caption_text.to_string(),
//             medias,
//             likes: vec![],
//             shares: vec![],
//             comments: vec![],
//             created_at: now(),
//             updated_at: now(),
//         };

//         create_post(account_id.clone(), post);
//     }

//     "Seeded demo accounts with personalized posts and varied media.".to_string()
// }

export_candid!();
