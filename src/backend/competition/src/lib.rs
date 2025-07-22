use candid::{CandidType, Principal};
use ic_cdk::export_candid;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;
use utilities::generate_uuid;

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
pub struct Participant {
    pub id: String,
    pub user_id: Principal,
    pub competition_id: String,
    pub score: Option<u64>, // Score achieved by the user in the competition
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
    pub participants: HashMap<String, Participant>,
    pub submissions: HashMap<String, Submission>,
}

thread_local! {
    static COMPETITIONS: RefCell<HashMap<String, Competition>> = RefCell::new(HashMap::new());
    static PARTICIPANTS: RefCell<HashMap<String, Participant>> = RefCell::new(HashMap::new());
    static SUBMISSIONS: RefCell<HashMap<String, Submission>> = RefCell::new(HashMap::new());
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
            state.insert(competition.id.clone(), competition);
        }
    });
    
}

#[ic_cdk::query]
fn get_all_competitions() -> Vec<Competition> {
    COMPETITIONS.with(|state| state.borrow().values().cloned().collect())
}

#[ic_cdk::update]
async fn create_competition(input: CreateCompetitionInput) -> String {
    let competition_id = generate_uuid();
    let new_competition = Competition {
        id: competition_id.clone(),
        category_id: input.category_id,
        description: input.description,
        title: input.title,
        level: input.level,
        prize_pool: input.prize_pool,
        rules: input.rules,
        started_at: input.started_at,
        ended_at: input.started_at,
    };

    COMPETITIONS.with(|state| {
        state
            .borrow_mut()
            .insert(competition_id.clone(), new_competition)
    });

    competition_id
}

#[ic_cdk::query]
fn get_all_participants(competition_id: String) -> Vec<Participant> {
    PARTICIPANTS.with(|state| {
        state
            .borrow()
            .values()
            .filter(|p| p.competition_id == competition_id)
            .cloned()
            .collect()
    })
}

#[ic_cdk::update]
async fn create_participant(input: CreateParticipantInput) -> String {
    let competition_exist = COMPETITIONS.with(|state| {
        let state = state.borrow();
        state.contains_key(&input.competition_id)
    });

    if !competition_exist {
        // ic_cdk::println!("Invalid competition.");
        return "".to_string();
    }

    let particant_id = generate_uuid();
    let new_participant = Participant {
        id: particant_id.clone(),
        user_id: input.user_id,
        competition_id: input.competition_id,
        score: None,
    };

    PARTICIPANTS.with(|state| {
        state
            .borrow_mut()
            .insert(particant_id.clone(), new_participant);
    });

    particant_id
}

#[ic_cdk::query]
fn get_all_submissions(competition_id: String) -> Vec<Submission> {
    SUBMISSIONS.with(|state| {
        state
            .borrow()
            .values()
            .filter(|s| s.competition_id == competition_id)
            .cloned()
            .collect()
    })
}

#[ic_cdk::update]
async fn create_submission(input: CreateSubmissionInput) -> String {
    let competition_exist = COMPETITIONS.with(|state| {
        let state = state.borrow();
        state.contains_key(&input.competition_id)
    });

    if !competition_exist {
        // ic_cdk::println!("Invalid competition.");
        return "".to_string();
    }

    let submission_id = generate_uuid();
    let new_submission = Submission {
        id: submission_id.clone(),
        user_id: input.user_id,
        competition_id: input.competition_id,
        content: input.content,
    };

    SUBMISSIONS.with(|state| {
        state
            .borrow_mut()
            .insert(submission_id.clone(), new_submission)
    });

    submission_id
}

export_candid!();
