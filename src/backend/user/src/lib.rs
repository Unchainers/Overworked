use candid::CandidType;
use ic_cdk::api::caller;
use ic_cdk::export_candid;
use ic_principal::Principal;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(Clone, Serialize, Deserialize, CandidType)]
struct User {
    id: Principal,
    username: String,
}

#[derive(Default, Serialize, Deserialize, CandidType)]
struct CanisterState {
    users: HashMap<Principal, User>,
}

thread_local! {
    static USERS: RefCell<CanisterState> = RefCell::new(CanisterState::default());
}

// Seeder function for development/testing only
#[ic_cdk::update]
fn seeder() {
    use ic_principal::Principal;
    let demo_users = vec![
        User {
            id: Principal::anonymous(),
            username: "Alic".to_string(),
        },
        User {
            id: Principal::from_text("2vxsx-fae").unwrap(),
            username: "Bob".to_string(),
        },
        User {
            id: Principal::from_text("w7x7r-cok77-xa").unwrap(),
            username: "Charlie".to_string(),
        },
    ];
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        for user in demo_users {
            users.users.insert(user.id, user);
        }
    });
}

#[ic_cdk::update]
fn register_user(user: User) -> Option<User> {
    let principal = caller();

    USERS.with(|users| users.borrow_mut().users.insert(principal, user))
}

#[ic_cdk::query]
fn get_user() -> Option<User> {
    let principal = caller();

    USERS.with(|users| users.borrow().users.get(&principal).cloned())
}

#[ic_cdk::query]
fn get_all_users() -> Vec<(Principal, User)> {
    USERS.with(|users| {
        users
            .borrow()
            .users
            .iter()
            .map(|(p, u)| (*p, u.clone()))
            .collect()
    })
}

export_candid!();
