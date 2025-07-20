use std::{cell::RefCell, collections::HashMap, path, time::SystemTime};

use candid::{CandidType, Principal};
use ic_cdk::{api::msg_caller, export_candid};
use serde::{Deserialize, Serialize};

use utilities::generate_id;

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
    like: usize,
    share: usize,
    comments: Vec<Comment>,
    created_at: SystemTime,
    updated_at: SystemTime,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountProfile {
    username: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Account {
    id: String,
    user_id: Principal,
    profile: AccountProfile,
    followers: Vec<(String, SystemTime)>,
    following: Vec<(String, SystemTime)>,
    blocked: Vec<(String, SystemTime)>,
    private: bool,
    deleted_at: Option<SystemTime>,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountDetails {
    account: Account,
    owned: bool,
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
    created_at: SystemTime,
    resolved: Vec<(ReportResolveType, Option<usize>, SystemTime)>,
}

thread_local! {
    static USER_ACCOUNTS: RefCell<HashMap<Principal, Vec<String>>> = RefCell::new(HashMap::new());
    static ACCOUNTS: RefCell<HashMap<String, Account>> = RefCell::new(HashMap::new());
    static POSTS: RefCell<HashMap<String, Post>> = RefCell::new(HashMap::new());
    static LIKES: RefCell<HashMap<String, Like>> = RefCell::new(HashMap::new());
    static COMMENTS: RefCell<HashMap<String, Comment>> = RefCell::new(HashMap::new());
    static ECHOS: RefCell<HashMap<String, Echo>> = RefCell::new(HashMap::new());
    static REPORTS: RefCell<HashMap<String, Report>> = RefCell::new(HashMap::new());
}

// Accounts

fn can_view(account_id: String, target_id: String) -> bool {
    ACCOUNTS.with_borrow(| accounts: &HashMap<String, Account> | {
        match accounts.get(&target_id) {
            Some(acc) => {
                let principal: Principal = msg_caller();
                if (acc.user_id == principal) {
                    return true;
                }

                let is_blocked: bool = acc.blocked.iter().any(|(blocked_id, _)| blocked_id == &account_id);

                if is_blocked {
                    return false;
                }

                let is_private: bool = acc.private;

                if is_private {
                    let is_follower = acc
                                                .followers
                                                .iter()
                                                .any(| ( follower_id, _) | follower_id == &account_id);

                    is_follower
                } else {
                    true
                }
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
    account_data.id = generate_id().await;
    account_data.user_id = principal;

    ACCOUNTS.with_borrow_mut(| accounts: &mut HashMap<String, Account> | {
        accounts.insert(account_data.id.clone(), account_data);
    });
}

#[ic_cdk::update]
fn delete_account(payload: AccountDeletionPayload) {
    let principal: Principal = msg_caller();

    ACCOUNTS.with_borrow_mut(| accounts: &mut HashMap<String, Account> | {
        let account = accounts.get_mut(&payload.account_id);

        match account {
            Some(acc) => {
                if principal == acc.user_id {
                    acc.deleted_at = Some(SystemTime::now());
                }
            },
            None => {}
        }
    });
}

#[ic_cdk::update]
async fn report_account(payload: Report) {
    let mut report_data: Report = payload;
    report_data.id = generate_id().await;

    REPORTS.with_borrow_mut(| reports: &mut HashMap<String, Report> |  {
        reports.insert(report_data.id.clone(), report_data);
    });
}

#[ic_cdk::update]
async fn block_account(account_id: String, target_id: String) {
    let principal = msg_caller();

    ACCOUNTS.with_borrow_mut(| account_map: &mut HashMap<String, Account> | {
        match account_map.get_mut(&account_id) {
            Some(acc) => {
                if acc.user_id == principal {
                    acc.blocked.push((target_id, SystemTime::now()));
                }
            },
            None => {}
        }
    })
}

#[ic_cdk::update]
async fn unblock_account(account_id: String, target_id: String) {
    let principal = msg_caller();

    ACCOUNTS.with_borrow_mut(| account_map: &mut HashMap<String, Account> | {
        match account_map.get_mut(&account_id) {
            Some(acc) => {
                if acc.user_id == principal {
                    acc.blocked.retain(|(blocked, _)| blocked != &target_id);
                }
            },
            None => {}
        }
    })
}

#[ic_cdk::query]
async fn get_account_details(account_id: String, target_id: String) -> Option<AccountDetails> {
    let principal: Principal = msg_caller();

    let target_account = ACCOUNTS.with_borrow(|accounts: &HashMap<String, Account>| {
        accounts.get(&target_id).cloned()
    });

    match target_account {
        Some(acc) => {
            let owned: bool = acc.user_id == principal;
            if can_view(account_id, target_id) {
                Some(AccountDetails {
                    account: acc,
                    owned,
                })
            } else {
                None
            }
        },
        None => {
            None
        }
    }

}

export_candid!();
