use candid::CandidType;
use ic_cdk::{api, export_candid};
use ic_principal::Principal;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Course {
    pub id: u64,
    pub instructor_id: Principal, // Links to the instructor (User)
    pub category_id: u64,         // Links to the category
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,    // Language of instruction
    pub average_rating: f32, // 1.0 to 5.0
    pub created_at: u64,
    pub updated_at: u64,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateCourseInput {
    pub instructor_id: Principal,
    pub category_id: u64,
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Enrollment {
    pub enrollment_id: u64,
    pub user_id: Principal, // Links to the user
    pub course_id: u64,     // Links to the course
    pub enrolled_at: u64,   // Unix timestamp (ms) for enrollment
    pub progress: f32,      // Progress percentage (0.0 to 100.0)
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateEnrollmentInput {
    pub user_id: Principal,
    pub course_id: u64,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Lecture {
    pub lecture_id: u64,
    pub course_id: u64,
    pub title: String,
    pub content_url: String,
    pub duration: u32,
    pub position: u32,
    pub description: String,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateLectureInput {
    pub course_id: u64,
    pub title: String,
    pub content_url: String,
    pub duration: u32,
    pub position: u32,
    pub description: String,
}

#[derive(Default, Serialize, Deserialize)]
pub struct CanisterState {
    pub courses: HashMap<u64, Course>,
    pub enrollments: HashMap<u64, Enrollment>,
    pub lectures: HashMap<u64, Lecture>,
}

thread_local! {
    pub static COURSES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
    pub static ENROLLMENTS: RefCell<CanisterState> = RefCell::new(CanisterState::default());
    pub static LECTURES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
}

pub fn generate_id<T>(map: &std::collections::HashMap<u64, T>) -> u64 {
    (map.len() as u64) + 1
}

fn now() -> u64 {
    api::time() / 1_000_000
}

#[ic_cdk::update]
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

#[ic_cdk::update]
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

#[ic_cdk::update]
pub fn create_lecture(input: CreateLectureInput) -> Lecture {
    LECTURES.with(|state| {
        let mut state = state.borrow_mut();
        let temp_id = generate_id(&state.lectures);

        let lecture = Lecture {
            lecture_id: temp_id,
            course_id: input.course_id,
            title: input.title,
            content_url: input.content_url,
            duration: input.duration,
            position: input.position,
            description: input.description
        };

        state.lectures.insert(temp_id, lecture.clone());
        lecture
    })
}

#[ic_cdk::query]
pub fn get_all_lectures() -> Vec<Lecture> {
    LECTURES.with(|state| {
        let state = state.borrow();
        state.lectures.values().cloned().collect()
    })
}

export_candid!();
