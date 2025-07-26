use candid::{CandidType, Principal};
use ic_cdk::{api::msg_caller, export_candid};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;
use utilities::{StoredFile, generate_uuid, get_files, now};

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub enum Difficulty {
    Beginner,
    Intermediate,
    Advanced,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct CompetitionBriefInformation {
    pub id: String,
    pub title: String,
    pub description: String,
    pub difficulty: Difficulty,
    pub prize: u64, // Amount of CRY-tokens
    pub category: String,
    pub status: String, // "Hot" or "Normal"
    pub rules: Vec<String>,
    pub started_at: String,
    pub ended_at: String,

    pub participant_count: usize,
    pub time_left: String,
}

pub struct CompetitionDetailInformation {
    pub id: String,
    pub title: String,
    pub description: String,
    pub difficulty: Difficulty,
    pub prize: u64, // Amount of CRY-tokens
    pub category: String,
    pub status: String, // "Hot" or "Normal"
    pub rules: Vec<String>,
    pub started_at: String,
    pub ended_at: String,

    pub participant_count: usize,
    pub time_left: String,

    // coordinators
    pub coordinators: Vec<Coordinator>,

    // prizes
    pub prizes: Vec<Prize>,

    // timeline
    pub timeline: Vec<TimelineEvent>,
    
    // requirements
    pub requirements: Vec<String>, // Requirements to participate in the competition

    // judging criteria
    pub judging_criteria: Vec<JudgingCriteria>, // Criteria used to judge the competition

    // resources
    pub resources: Vec<StoredFile>, // Resources provided for the competition (e.g., problem statements, guidelines)
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
pub struct JudgingCriteria {
    pub competition_id: String,
    pub criteria: String, // Description of the judging criteria
    pub weight: u64, // Weight of this criteria in the overall score
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
pub struct TimelineEvent {
    pub order: u64, // Order of the event in the timeline
    pub competition_id: String,
    pub title: String,
    pub description: String,
    pub timestamp: String, // Timestamp of the event,
    pub status: String, // Status of the event (e.g., "Upcoming", "Ongoing", "Completed")
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
pub struct Prize {
    pub order: u64, // Order of the prize (1st, 2nd, 3rd, etc.)
    pub competition_id: String, // ID of the competition this prize belongs to
    pub amount: u64, // Amount of CRY-tokens for the prize
}

#[derive(CandidType, Clone, Serialize, Deserialize)]
struct AccountVisibleInformation {
    id: String,
    username: String,
    profile_picture: Option<StoredFile>,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Account {
    pub id: String,
    pub user_id: Principal,
    pub username: String,
    pub profile_picture: Option<String>,
    pub created_at: String,
    pub deleted_at: Option<String>,
    pub updated_at: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Competition {
    pub id: String,
    pub title: String,
    pub description: String,
    pub difficulty: Difficulty,
    pub prize: u64, // Amount of CRY-tokens
    // pub category_id: String,
    pub category: String,
    pub status: String, // "Hot" or "Normal"
    pub rules: Vec<String>,
    pub started_at: String,
    pub ended_at: String,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Coordinator {
    pub id: String,
    pub account_id: String,
    pub competition_id: String,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Participant {
    pub id: String,
    pub account_id: String,
    pub competition_id: String,
    pub score: Option<u64>, // Score achieved by the user in the competition
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Submission {
    pub id: String,
    pub participant_id: String,
    pub submitted_at: Option<String>,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateCompetitionInput {
    pub title: String,
    pub description: String,
    // pub image: StoredFile,
    pub difficulty: Difficulty,
    pub prize: u64, // Amount of CRY-tokens
    pub category: String,
    pub status: String, // "Hot" or "Normal"
    pub rules: Vec<String>,
    pub started_at: String,
    pub ended_at: String,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateAccountInput {
    pub username: String,
    pub profile_picture: Option<StoredFile>,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateCoordinatorInput {
    pub account_id: String,
    pub competition_id: String,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateParticipantInput {
    pub account_id: String,
    pub competition_id: String,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateSubmissionInput {
    pub participant_id: String,
    pub content: String,
}

thread_local! {
    static COMPETITIONS: RefCell<HashMap<String, Competition>> = RefCell::new(HashMap::new());
    static ACCOUNTS: RefCell<HashMap<String, Account>> = RefCell::new(HashMap::new());
    static COORDINATORS: RefCell<HashMap<String, Coordinator>> = RefCell::new(HashMap::new());
    static PARTICIPANTS: RefCell<HashMap<String, Participant>> = RefCell::new(HashMap::new());
    static SUBMISSIONS: RefCell<HashMap<String, Submission>> = RefCell::new(HashMap::new());
}

// SEEDERS

#[ic_cdk::update]
fn seeder_all() {
    account_seeders();
    competition_seeders();
    coordinator_seeders();
    participant_seeders();
    submission_seeders();
}

#[ic_cdk::update]
fn competition_seeders() {
    let demo_competitions = vec![
        Competition {
            id: "comp1".to_string(),
            title: "Beginner Coding Challenge".to_string(),
            description: "A simple coding challenge for beginners.".to_string(),
            difficulty: Difficulty::Beginner,
            prize: 1000,
            category: "coding".to_string(),
            status: "Hot".to_string(),
            rules: vec!["Rule 1".to_string(), "Rule 2".to_string()],
            started_at: now(), // Example timestamp
            ended_at: now(),   // Example timestamp
        },
        Competition {
            id: "comp2".to_string(),
            title: "Advanced Algorithm Contest".to_string(),
            description: "An advanced contest for algorithm enthusiasts.".to_string(),
            difficulty: Difficulty::Advanced,
            prize: 5000,
            category: "algorithms".to_string(),
            status: "Normal".to_string(),
            rules: vec!["Rule A".to_string(), "Rule B".to_string()],
            started_at: now(), // Example timestamp
            ended_at: now(),   // Example timestamp
        },
    ];

    COMPETITIONS.with(|state| {
        let mut state = state.borrow_mut();
        for competition in demo_competitions {
            state.insert(competition.id.clone(), competition);
        }
    });
}

#[ic_cdk::update]
fn account_seeders() {
    // These should match the demo users in the User canister seeder
    let demo_users = vec![
        ("Bob", "2vxsx-fae"),
        ("Charlie", "w7x7r-cok77-xa"),
        ("Dana", "aaaaa-aa"),
        ("Eve", "bbbbb-aa"),
        ("Frank", "ccccc-aa"),
    ];
    let now = now();
    let mut idx = 1;
    for (username, principal_str) in demo_users {
        let id = format!("acc{idx}");
        let user_id = Principal::from_text(principal_str).unwrap_or(Principal::anonymous());
        let account = Account {
            id: id.clone(),
            user_id,
            username: username.to_string(),
            profile_picture: None,
            created_at: now.clone(),
            deleted_at: None,
            updated_at: None,
        };
        // Insert into a global ACCOUNTS map (assume exists)
        ACCOUNTS.with(|state| state.borrow_mut().insert(id.clone(), account));
        idx += 1;
    }
}

#[ic_cdk::update]
fn coordinator_seeders() {
    // Example: assign first two accounts as coordinators for the two demo competitions
    let demo_coordinators = vec![("acc1", "comp1"), ("acc2", "comp2")];
    let mut idx = 1;
    for (account_id, competition_id) in demo_coordinators {
        let id = format!("coord{idx}");
        let coordinator = Coordinator {
            id: id.clone(),
            account_id: account_id.to_string(),
            competition_id: competition_id.to_string(),
        };
        COORDINATORS.with(|state| state.borrow_mut().insert(id.clone(), coordinator));
        idx += 1;
    }
}

#[ic_cdk::update]
fn participant_seeders() {
    // Example: assign all accounts as participants in both competitions
    let account_ids = vec!["acc1", "acc2", "acc3", "acc4", "acc5"];
    let competition_ids = vec!["comp1", "comp2"];
    let mut idx = 1;
    for account_id in &account_ids {
        for competition_id in &competition_ids {
            let id = format!("part{idx}");
            let participant = Participant {
                id: id.clone(),
                account_id: account_id.to_string(),
                competition_id: competition_id.to_string(),
                score: None,
            };
            PARTICIPANTS.with(|state| state.borrow_mut().insert(id.clone(), participant));
            idx += 1;
        }
    }
}

#[ic_cdk::update]
fn submission_seeders() {
    // Example: each participant submits once
    let mut idx = 1;
    PARTICIPANTS.with(|state| {
        for participant in state.borrow().values() {
            let id = format!("sub{idx}");
            let submission = Submission {
                id: id.clone(),
                participant_id: participant.id.clone(),
                submitted_at: Some(now()),
            };
            SUBMISSIONS.with(|subs| subs.borrow_mut().insert(id.clone(), submission));
            idx += 1;
        }
    });
}

async fn get_profile_picture(
    storage_canister_id: Principal,
    profile_picture_id: String,
) -> Option<StoredFile> {
    let files = get_files(storage_canister_id, vec![profile_picture_id.clone()]).await;
    files.first().cloned()
}

// ACCOUNT

#[ic_cdk::query]
fn get_all_accounts() -> Vec<Account> {
    ACCOUNTS.with(|state| state.borrow().values().cloned().collect())
}

#[ic_cdk::update]
async fn create_account(input: CreateAccountInput, storage_canister_id: Principal) -> String {
    let principal = msg_caller();

    let account_id = generate_uuid();

    // let profile_picture_id: String = upload_files(storage_canister_id, vec![])
    //     .await
    //     .iter()
    //     .map(|(id, _, _)| id.clone())
    //     .collect::<Vec<String>>()[0]
    //     .clone();

    let new_account: Account = Account {
        id: account_id.clone(),
        user_id: principal,
        username: input.username,
        // profile_picture: Some(profile_picture_id),
        profile_picture: None,
        created_at: now(),
        deleted_at: None,
        updated_at: None,
    };

    ACCOUNTS.with_borrow_mut(|state| {
        state.insert(account_id.clone(), new_account);
    });

    account_id
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
        let profile_picture = match &acc.profile_picture {
            Some(pic_id) => get_profile_picture(storage_canister_id, pic_id.clone()).await,
            None => None,
        };

        result.push(AccountVisibleInformation {
            id: acc.id.clone(),
            username: acc.username.clone(),
            profile_picture,
        });
    }

    result
}

#[ic_cdk::update]
fn verify_login(account_id: String) -> bool {
    ACCOUNTS.with_borrow(|account_map: &HashMap<String, Account>| {
        match account_map.values().find(|acc| *acc.id == account_id) {
            Some(acc) => acc.user_id == msg_caller(),
            None => false,
        }
    })
}

// COMPETITIONS

#[ic_cdk::query]
fn get_all_competitions() -> Vec<CompetitionBriefInformation> {
    // COMPETITIONS.with(|state| state.borrow().values().cloned().collect())

    let competitions =
        COMPETITIONS.with_borrow(|state| state.values().cloned().collect::<Vec<Competition>>());

    let mut result = Vec::new();
    for comp in competitions {
        let participant_count = PARTICIPANTS.with_borrow(|state| {
            state
                .values()
                .filter(|p| p.competition_id == comp.id)
                .count()
        });

        result.push(CompetitionBriefInformation {
            id: comp.id.clone(),
            title: comp.title.clone(),
            description: comp.description.clone(),
            difficulty: comp.difficulty.clone(),
            prize: comp.prize,
            category: comp.category.clone(),
            status: comp.status.clone(),
            rules: comp.rules.clone(),
            started_at: comp.started_at.clone(),
            ended_at: comp.ended_at.clone(),
            participant_count,
            // time_left: format!("{} seconds", comp.ended_at - comp.started_at), // Example calculation
            time_left: "10".to_string(),
        });
    }

    result
}

#[ic_cdk::update]
async fn create_competition(input: CreateCompetitionInput) -> String {
    let competition_id = generate_uuid();
    let new_competition = Competition {
        id: competition_id.clone(),
        category: input.category,
        status: input.status,
        description: input.description,
        title: input.title,
        difficulty: input.difficulty,
        prize: input.prize,
        rules: input.rules,
        started_at: input.started_at,
        ended_at: input.ended_at,
    };

    COMPETITIONS.with(|state| {
        state
            .borrow_mut()
            .insert(competition_id.clone(), new_competition)
    });

    competition_id
}

// COORDINATORS

#[ic_cdk::query]
fn get_all_coordinators(competition_id: String) -> Vec<Coordinator> {
    COORDINATORS.with(|state| {
        state
            .borrow()
            .values()
            .filter(|p| p.competition_id == competition_id)
            .cloned()
            .collect()
    })
}

#[ic_cdk::update]
fn create_coordinator(input: CreateCoordinatorInput) -> String {
    let competition_exist = COMPETITIONS.with(|state| {
        let state = state.borrow();
        state.contains_key(&input.competition_id)
    });

    if !competition_exist {
        // ic_cdk::println!("Invalid competition.");
        return "".to_string();
    };

    let coordinator_id = generate_uuid();
    let new_coordinator = Coordinator {
        id: coordinator_id.clone(),
        account_id: input.account_id,
        competition_id: input.competition_id,
    };

    COORDINATORS.with(|state| {
        state
            .borrow_mut()
            .insert(coordinator_id.clone(), new_coordinator);
    });

    coordinator_id
}

// PARTICIPANTS

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
        account_id: input.account_id,
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

// SUBMISSIONS

#[ic_cdk::query]
fn get_all_submissions(competition_id: String) -> Vec<Submission> {
    SUBMISSIONS.with(|state| {
        state
            .borrow()
            .values()
            .filter(|s| {
                let participants = get_all_participants(competition_id.clone());
                participants.iter().any(|p| p.id == s.participant_id)
            })
            .cloned()
            .collect()
    })
}

#[ic_cdk::update]
async fn create_submission(input: CreateSubmissionInput) -> String {
    // let competition_exist = COMPETITIONS.with(|state| {
    //     let state = state.borrow();
    //     state.contains_key(&input.competition_id)
    // });

    // if !competition_exist {
    //     // ic_cdk::println!("Invalid competition.");
    //     return "".to_string();
    // }

    let submission_id = generate_uuid();
    let new_submission = Submission {
        id: submission_id.clone(),
        participant_id: input.participant_id,
        submitted_at: Some(now()),
    };

    SUBMISSIONS.with(|state| {
        state
            .borrow_mut()
            .insert(submission_id.clone(), new_submission)
    });

    submission_id
}

export_candid!();
