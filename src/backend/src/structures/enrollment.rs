use ic_principal::Principal;
use serde::{Serialize, Deserialize};
use candid::CandidType;
use std::collections::HashMap;
use std::cell::RefCell;
use ic_cdk::api;

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Enrollment {
    pub enrollment_id: u64,
    pub user_id: Principal,       // Links to the user
    pub course_id: u64,           // Links to the course
    pub enrolled_at: u64,         // Unix timestamp (ms) for enrollment
    pub progress: f32,            // Progress percentage (0.0 to 100.0)
}

#[derive(Serialize, Deserialize)]
pub struct CreateEnrollmentInput {
    pub user_id: Principal,
    pub course_id: u64,
}

#[derive(Default, Serialize, Deserialize)]
pub struct CanisterState {
    pub enrollments: HashMap<u64, Enrollment>,
}

thread_local! {
    pub static ENROLLMENTS: RefCell<CanisterState> = RefCell::new(CanisterState::default());
}

pub fn generate_id<T>(map: &std::collections::HashMap<u64, T>) -> u64 {
    (map.len() as u64) + 1
}

fn now() -> u64 {
    api::time() / 1_000_000
}

pub fn create_enrollment(input: CreateEnrollmentInput) -> Enrollment {
    ENROLLMENTS.with(|state| {
        let mut state = state.borrow_mut();
        let temp_id = generate_id(&state.enrollments);
        let timestamp = now();

        let enrollment = Enrollment {
            enrollment_id: temp_id,
            user_id: input.user_id,
            course_id: input.course_id,
            enrolled_at: timestamp,
            progress: 0.0,
        };

        state.enrollments.insert(temp_id, enrollment.clone());
        enrollment
    })
}

#[ic_cdk::query]
pub fn get_all_enrollments() -> Vec<Enrollment> {
    ENROLLMENTS.with(|state| {
        let state = state.borrow();
        state.enrollments.values().cloned().collect()
    })
}