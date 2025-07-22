use candid::CandidType;
use ic_cdk::export_candid;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub enum Level {
    Beginner,
    Intermediate,
    Advanced,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Competition {
    pub id: String,
    pub title: String,
    pub description: String,
    pub level: Level,
    pub prize_pool: u64, // Amount of CRY-tokens
    pub started_at: u64,
    pub ended_at: u64,
    pub category_id: String,
    pub rules: Vec<String>,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct Participation {
    pub user_id: String,
    pub competition_id: String,
    pub score: u64, // Score achieved by the user in the competition
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct Submission {
    pub user_id: String,
    pub competition_id: String,
    pub content: String, // Content submitted by the user
}

#[derive(Default, Serialize, Deserialize)]
pub struct CompetitionState {
    pub competitions: HashMap<String, Competition>,
}

thread_local! {
    static COMPETITIONS: RefCell<CompetitionState> = RefCell::new(CompetitionState::default());
}

#[ic_cdk::query]
fn get_all_competitions() -> Vec<Competition> {
    COMPETITIONS.with(|state| state.borrow().competitions.values().cloned().collect())
}

export_candid!();
