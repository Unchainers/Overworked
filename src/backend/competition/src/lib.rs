use candid::{CandidType, Principal};
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
    pub category_id: String,
    pub rules: Vec<String>,

    pub thumbnail: 

    pub started_at: u64,
    pub ended_at: u64,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Participants {
    pub id: String,
    pub user_id: Principal,
    pub competition_id: String,
    pub score: u64, // Score achieved by the user in the competition
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Submission {
    pub id: String,
    pub user_id: Principal,
    pub competition_id: String,
    pub content: String, // Content submitted by the user
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateCompetitionInput {
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
pub struct CreateParticipantInput {
    pub user_id: Principal,
    pub competition_id: String,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateSubmissionInput {
    pub user_id: Principal,
    pub competition_id: String,
    pub content: String,
}

#[derive(Default, Serialize, Deserialize)]
pub struct CompetitionState {
    pub competitions: HashMap<String, Competition>,
    pub participants: HashMap<String, Participants>,
    pub submissions: HashMap<String, Submission>,
}

thread_local! {
    static COMPETITIONS: RefCell<CompetitionState> = RefCell::new(CompetitionState::default());
    static PARTICIPANTS: RefCell<CompetitionState> = RefCell::new(CompetitionState::default());
    static SUBMISSIONS: RefCell<CompetitionState> = RefCell::new(CompetitionState::default());
}

#[ic_cdk::query]
fn get_all_competitions() -> Vec<Competition> {
    COMPETITIONS.with(|state| state
        .borrow()
        .competitions
        .values()
        .cloned()
        .collect()
    )
}

#[ic_cdk::query]
fn get_all_participants(competition_id: String) -> Vec<Participants> {
    PARTICIPANTS.with(|state| {
        state
            .borrow()
            .participants
            .values()
            .filter(|p| p.competition_id == competition_id)
            .cloned()
            .collect()
    })
}

#[ic_cdk::query]
fn get_all_submissions(competition_id: String) -> Vec<Submission> {
    SUBMISSIONS.with(|state| {
        state
            .borrow()
            .submissions
            .values()
            .filter(|s| s.competition_id == competition_id)
            .cloned()
            .collect()
    })
}

export_candid!();
