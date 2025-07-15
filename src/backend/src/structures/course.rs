use ic_principal::Principal;
use serde::{Serialize, Deserialize};
use std::collections::HashMap;
use std::cell::RefCell;
use ic_cdk::api;
use candid::CandidType;

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Course {
    pub id: u64,
    pub instructor_id: Principal,  // Links to the instructor (User)
    pub category_id: u64,          // Links to the category
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,          // Language of instruction
    pub average_rating: f32,       // 1.0 to 5.0
    pub created_at: u64,
    pub updated_at: u64,
}

#[derive(Serialize, Deserialize)]
pub struct CreateCourseInput {
    pub instructor_id: Principal,
    pub category_id: u64,
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,
}

pub fn generate_id<T>(map: &std::collections::HashMap<u64, T>) -> u64 {
    (map.len() as u64) + 1
}

#[derive(Default, Serialize, Deserialize)]
pub struct CanisterState {
    pub courses: HashMap<u64, Course>,
}

thread_local! {
    pub static COURSES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
}

fn now() -> u64 {
    api::time() / 1_000_000
}

pub fn create_course(input: CreateCourseInput) -> Course {
    COURSES.with(|state| {
        let mut state = state.borrow_mut();
        let course_id = generate_id(&state.courses);
        let timestamp = now();

        let course = Course {
            id: course_id,
            instructor_id: input.instructor_id,
            category_id: input.category_id,
            title: input.title,
            description: input.description,
            price: input.price,
            language: input.language,
            average_rating: 0.0,
            created_at: timestamp,
            updated_at: timestamp,
        };

        state.courses.insert(course_id, course.clone());
        course
    })
}

#[ic_cdk::query]
pub fn get_all_courses() -> Vec<Course> {
    COURSES.with(|state| {
        let state = state.borrow();
        state.courses.values().cloned().collect()
    })
}
