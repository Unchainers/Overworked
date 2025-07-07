use ic_cdk::export_candid;
use std::cell::RefCell;
use std::collections::HashMap;
use ic_cdk::api::{Principal, caller};
use ic_cdk::api::caller;
use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize)]
struct User {
  id: Principal,
  username: String,
}

#[derive(Default, Serialize, Deserialize)]
struct CanisterState {
  users: HashMap<Principal, User>
}

thread_local! {
  static USERS: RefCell<CanisterState> = RefCell::new(CanisterState::default());
}

#[ic_cdk::update]
fn registerUser(userInfo: User) {
  let principal = caller();

  USERS.with(|users| {
    users.borrow_mut().users.insert(principal, user)
  })
}

#[ic_cdk::query]
fn getUser() -> Option<User> {
  let principal = caller();

  USERS.with(|users| {
    users.borrow().users.get(&principal).cloned()
  })
}

#[ic_cdk::query]
fn get_all_users() -> Vec<(Principal, User)> {
    USERS.with(|users| {
        users.borrow().users.iter().map(|(p, u)| (*p, u.clone())).collect()
    })
}

export_candid!();