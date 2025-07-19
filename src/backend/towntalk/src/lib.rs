use std::{cell::RefCell, collections::HashMap};

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
  created_at: String,
  updated_at: String,
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
  created_at: String,
  updated_at: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Account {
  id: String,
  user_id: Principal,
  username: String,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountCreationPayload {
  account: Account,
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Echo {
  id: String,
  account_id: String,
  media: Vec<u8>,
  like: usize,
  share: usize,
  created_at: String,
}


#[derive(CandidType, Clone, Serialize, Deserialize)]
pub enum LikableType {
  POST,
  STORY
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct Like {
  account_id: String,
  likable_id: String,
  likable_type: LikableType,
  created_at: String,
}

thread_local! {
  static ACCOUNTS: RefCell<HashMap<String, Account>> = RefCell::new(HashMap::new());
  static POSTS: RefCell<HashMap<String, Post>> = RefCell::new(HashMap::new());
  static LIKES: RefCell<HashMap<String, Like>> = RefCell::new(HashMap::new());
  static COMMENTS: RefCell<HashMap<String, Comment>> = RefCell::new(HashMap::new());
  static ECHOS: RefCell<HashMap<String, Echo>> = RefCell::new(HashMap::new());
}

// Accounts
#[ic_cdk::update]
async fn create_account(payload: AccountCreationPayload) {
  let principal: Principal = msg_caller();

  let mut account_data: Account = payload.account.clone();
  account_data.id = generate_id().await;
  account_data.user_id = principal;

  ACCOUNTS.with_borrow_mut(|accounts: &mut HashMap<String, Account>| {
    accounts.insert(account_data.id.clone(), account_data);
  });
}

export_candid!();
