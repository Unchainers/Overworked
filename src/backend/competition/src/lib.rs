use candid::{CandidType, Principal};
use ic_cdk::export_candid;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;
use utilities::generate_id;

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

#[ic_cdk::update]
fn seeder_all() {
    let demo_competitions = vec![
        Competition {
            id: "comp1".to_string(),
            title: "Beginner Coding Challenge".to_string(),
            description: "A simple coding challenge for beginners.".to_string(),
            level: Level::Beginner,
            prize_pool: 1000,
            category_id: "coding".to_string(),
            rules: vec!["Rule 1".to_string(), "Rule 2".to_string()],
            started_at: 1633036800, // Example timestamp
            ended_at: 1633123200,   // Example timestamp
        },
        Competition {
            id: "comp2".to_string(),
            title: "Advanced Algorithm Contest".to_string(),
            description: "An advanced contest for algorithm enthusiasts.".to_string(),
            level: Level::Advanced,
            prize_pool: 5000,
            category_id: "algorithms".to_string(),
            rules: vec!["Rule A".to_string(), "Rule B".to_string()],
            started_at: 1633036800, // Example timestamp
            ended_at: 1633123200,   // Example timestamp
        },
    ];

    COMPETITIONS.with(|state| {
        let mut state = state.borrow_mut();
        for competition in demo_competitions {
            state
                .competitions
                .insert(competition.id.clone(), competition);
        }
    });
}

#[ic_cdk::query]
fn get_all_competitions() -> Vec<Competition> {
    COMPETITIONS.with(|state| state.borrow().competitions.values().cloned().collect())
}

#[ic_cdk::update]
async fn create_competition(input: CreateCompetitionInput) -> String {
    let competition_id = generate_id().await;
    let new_competition = Competition{
        id: competition_id.clone(),
        category_id: input.category_id,
        description: input.description,
        title: input.title,
        level: input.level,
        prize_pool: input.prize_pool,
        rules: input.rules,
        started_at: input.started_at,
        ended_at: input.started_at
    };

    COMPETITIONS.with(|state| 
        state.borrow_mut().competitions.insert(competition_id.clone(), new_competition)
    );

    return competition_id
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
