use std::{cell::RefCell, collections::HashMap, time::SystemTime};

use candid::{CandidType, Principal};
use ic_cdk::{api::msg_caller, export_candid};
use serde::{Deserialize, Serialize};

use utilities::generate_uuid;

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Comment {
    id: String,
    comment: String,
    post_id: String,
    poster_id: String,
    replied_to: Option<String>,
    created_at: SystemTime,
    updated_at: SystemTime,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Post {
    id: String,
    account_id: String,
    title: String,
    caption: String,
    medias: Vec<u8>,
    likes: Vec<String>,
    shares: Vec<String>,
    comments: Vec<Comment>,
    created_at: SystemTime,
    updated_at: SystemTime,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountProfile {
    username: String,
    profile_picture: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Account {
    id: String,
    user_id: Principal,
    profile: AccountProfile,
    followers: Vec<(String, SystemTime)>,
    following: Vec<(String, SystemTime)>,
    posts: Vec<Post>,
    blocked: Vec<(String, SystemTime)>,
    private: bool,
    deleted_at: Option<SystemTime>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountDetails {
    account: Account,
    owned: bool,
    posts: Option<Vec<Post>>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountVisibleInformation {
    username: String,
    // profile_picture: Vec<u8>,
    profile_picture: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountCreationPayload {
    account: Account,
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
    seen_by: Vec<String>,
    created_at: SystemTime,
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
    created_at: SystemTime,
    resolved: Vec<(ReportResolveType, Option<usize>, SystemTime)>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct FollowRequest {
    requester_id: String,
    requested_at: SystemTime,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct FollowRequestReturnPayload {
    requester: AccountVisibleInformation,
    requested_at: SystemTime,
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
    POSTS.with_borrow(| post_map | {
        match post_map.get(&post_id) {
            Some(post) => {
                ACCOUNTS.with_borrow(| account_map | {
                    match account_map.get(&post.account_id) {
                        Some(acc) => {
                            let principal = msg_caller();
                            acc.user_id == principal
                        },
                        None => {
                            false
                        }
                    }
                })
            },
            None => {
                false
            }
        }
    })
}

fn is_account_owner(account_id: String) -> bool {
    ACCOUNTS.with_borrow(| account_map | {
        match account_map.get(&account_id) {
            Some(acc) => {
                let principal = msg_caller();
                acc.user_id == principal
            },
            None => {
                false
            }
        }
    })
}

fn is_comment_owner(account_id: String, comment_id: String) -> bool {
    COMMENTS.with_borrow(| comment_map | {
        match comment_map.get(&comment_id) {
            Some(c) => {
                is_account_owner(account_id.clone()) && c.poster_id == account_id
            },
            None => {
                false
            }
        }
    })
}

#[ic_cdk::update]
async fn create_account(payload: AccountCreationPayload) {
    let principal: Principal = msg_caller();

    let mut account_data: Account = payload.account.clone();
    account_data.id = generate_uuid();
    account_data.user_id = principal;

    let account_id = account_data.id.clone();

    ACCOUNTS.with_borrow_mut(|accounts: &mut HashMap<String, Account>| {
        accounts.insert(account_id.clone(), account_data);
    });

    USER_ACCOUNTS.with_borrow_mut(
        |user_account_map| match user_account_map.get_mut(&principal) {
            Some(user_acc) => {
                user_acc.push(account_id.clone());
            }
            None => {
                user_account_map.insert(principal, vec![account_id]);
            }
        },
    );
}

#[ic_cdk::update]
fn delete_account(payload: AccountDeletionPayload) {
    let account_id = payload.account_id.clone();

    ACCOUNTS.with_borrow_mut(|accounts: &mut HashMap<String, Account>| {
        let account = accounts.get_mut(&account_id);

        if let Some(acc) = account {
            if is_owned(account_id.clone()) {
                acc.deleted_at = Some(SystemTime::now());
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
async fn report_account(payload: Report) {
    let mut report_data: Report = payload;
    report_data.id = generate_uuid();

    REPORTS.with_borrow_mut(|reports: &mut HashMap<String, Report>| {
        reports.insert(report_data.id.clone(), report_data);
    });
}

#[ic_cdk::update]
async fn block_account(account_id: String, target_id: String) {
    ACCOUNTS.with_borrow_mut(|account_map: &mut HashMap<String, Account>| {
        if let Some(acc) = account_map.get_mut(&account_id) {
            if is_owned(account_id) {
                acc.blocked.push((target_id, SystemTime::now()));
            }
        }
    })
}

#[ic_cdk::update]
async fn unblock_account(account_id: String, target_id: String) {
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
                            .filter(|post| post.account_id == target_id.clone())
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
                                    requested_at: SystemTime::now(),
                                },
                            );
                        });
                    } else {
                        acc.followers
                            .push((account_id_cloned.clone(), SystemTime::now()));
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
                                    requested_at: SystemTime::now(),
                                },
                            );
                        });
                    } else {
                        acc.followers
                            .push((account_id_cloned.clone(), SystemTime::now()));
                    }
                }
            }
        });
    }
}

#[ic_cdk::query]
fn get_followers(account_id: String, target_id: String) -> Option<Vec<AccountVisibleInformation>> {
    if can_view(account_id.clone(), target_id.clone()) {
        ACCOUNTS.with_borrow(|account_map| {
            account_map.get(&target_id).map(|acc| {
                acc.followers
                    .iter()
                    .filter_map(|(fol, _)| {
                        account_map.get(fol).map(|_acc| AccountVisibleInformation {
                            username: _acc.profile.username.clone(),
                            profile_picture: _acc.profile.profile_picture.clone(),
                        })
                    })
                    .collect::<Vec<_>>()
            })
        })
    } else {
        None
    }
}

#[ic_cdk::query]
fn get_following(account_id: String, target_id: String) -> Option<Vec<AccountVisibleInformation>> {
    if can_view(account_id.clone(), target_id.clone()) {
        ACCOUNTS.with_borrow(|account_map| {
            account_map.get(&target_id).map(|acc| {
                acc.following
                    .iter()
                    .filter_map(|(fol, _)| {
                        account_map.get(fol).map(|_acc| AccountVisibleInformation {
                            username: _acc.profile.username.clone(),
                            profile_picture: _acc.profile.profile_picture.clone(),
                        })
                    })
                    .collect::<Vec<_>>()
            })
        })
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

        ACCOUNTS.with_borrow_mut(|account_map| {
            match account_map.get_mut(&account_id_cloned) {
                Some(acc) => {
                    acc.posts.push(post_cloned);
                },
                None => {}
            }
        });
    }
}

#[ic_cdk::update]
fn like_post(account_id: String, post_id: String) {
    POSTS.with_borrow_mut(|post_map: &mut HashMap<String, Post>| {
        if let Some(post) = post_map.get_mut(&post_id) {
            if can_view(account_id.clone(), post.account_id.clone()) {
                if post.likes.contains(&account_id) {
                    post.likes.retain(|p| p != &account_id);
                } else {
                    post.likes.push(account_id.clone());
                }
            }
        }
    });

    ACCOUNTS.with_borrow_mut(|account_map| {
        match account_map.get_mut(&account_id) {
            Some(acc) => {
                if can_view(account_id.clone(), acc.id.clone()) {
                    acc
                        .posts
                        .iter_mut()
                        .for_each(|_post| {
                            if _post.likes.contains(&account_id) {
                                _post.likes.retain(|p| p != &account_id);
                            } else {
                                _post.likes.push(account_id.clone());
                            }
                        });
                }
            },
            None => {}
        }
    });
}

#[ic_cdk::update]
fn comment_post(account_id: String, post_id: String, comment: Comment) {
    POSTS.with_borrow_mut(|post_map: &mut HashMap<String, Post>| {
        if let Some(post) = post_map.get_mut(&post_id) {
            if can_view(account_id.clone(), post.account_id.clone()) {
                post.comments.push(comment.clone());
            }
        }
    });

    ACCOUNTS.with_borrow_mut(|account_map| {
        match account_map.get_mut(&account_id) {
            Some(acc) => {
                if can_view(account_id.clone(), acc.id.clone()) {
                    acc
                        .posts
                        .iter_mut()
                        .for_each(|_post| {
                            _post.comments.push(comment.clone());
                        });
                }
            },
            None => {}
        }
    });
}

#[ic_cdk::update]
fn remove_comment(account_id: String, post_id: String, comment_id: String) {
    POSTS.with_borrow_mut(|post_map: &mut HashMap<String, Post>| {
        if let Some(post) = post_map.get_mut(&post_id) {
            if is_comment_owner(account_id.clone(), comment_id.clone()) || is_post_owner(post.id.clone()) {
                post.comments.retain(|c| c.id != comment_id);
            }

            ACCOUNTS.with_borrow_mut(|account_map: &mut HashMap<String, Account>| {
                if let Some(acc) = account_map.get_mut(&post.account_id) {
                    if let Some(p) = acc.posts.iter_mut().find(|p| p.id == post.id) {
                        p.comments.retain(| c | c.id != comment_id);
                    }
                }
            });
        }
    });
}

// Echo

export_candid!();
