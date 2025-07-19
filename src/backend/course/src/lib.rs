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
    pub completed: bool,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateCourseInput {
    pub instructor_id: Principal,
    pub category_id: u64,
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,
    pub completed: bool,
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
pub struct Module {
    pub module_id: u64,
    pub course_id: u64,
    pub title: String,
    pub description: String,
    pub position: u32,
    pub completed: bool,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateModuleInput {
    pub course_id: u64,
    pub title: String,
    pub position: u32,
    pub description: String,
    pub completed: bool,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Lecture {
    pub lecture_id: u64,
    pub module_id: u64,
    pub title: String,
    pub content_url: String,
    pub duration: u32,
    pub position: u32,
    pub description: String,
    pub completed: bool,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateLectureInput {
    pub module_id: u64,
    pub title: String,
    pub content_url: String,
    pub duration: u32,
    pub position: u32,
    pub description: String,
    pub completed: bool,
}

#[derive(Default, Serialize, Deserialize)]
pub struct CanisterState {
    pub courses: HashMap<u64, Course>,
    pub enrollments: HashMap<u64, Enrollment>,
    pub modules: HashMap<u64, Module>,
    pub lectures: HashMap<u64, Lecture>,
}

thread_local! {
    pub static COURSES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
    pub static ENROLLMENTS: RefCell<CanisterState> = RefCell::new(CanisterState::default());
    pub static LECTURES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
    pub static MODULES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
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
            completed: false,
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

#[ic_cdk::query]
pub fn get_course_by_id(course_id: u64) -> Option<Course> {
    COURSES.with(|state| {
        let state = state.borrow();
        state.courses.get(&course_id).cloned()
    })
}

#[ic_cdk::update]
pub fn create_lecture(input: CreateLectureInput) -> Lecture {
    LECTURES.with(|state| {
        let mut state = state.borrow_mut();
        let temp_id = generate_id(&state.lectures);

        let lecture = Lecture {
            lecture_id: temp_id,
            module_id: input.module_id,
            title: input.title,
            content_url: input.content_url,
            duration: input.duration,
            position: input.position,
            description: input.description,
            completed: false,
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

#[ic_cdk::update]
pub fn create_module(input: CreateModuleInput) -> Module {
    MODULES.with(|state| {
        let mut state = state.borrow_mut();
        let temp_id = generate_id(&state.modules);

        let module = Module {
            module_id: temp_id,
            course_id: input.course_id,
            title: input.title,
            position: input.position,
            description: input.description,
            completed: false,
        };

        state.modules.insert(temp_id, module.clone());
        module
    })
}

#[ic_cdk::query]
pub fn get_all_modules() -> Vec<Module> {
    MODULES.with(|state| {
        let state = state.borrow();
        state.modules.values().cloned().collect()
    })
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct CourseFullContent {
    pub id: u64,
    pub instructor_id: Principal,
    pub category_id: u64,
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,
    pub average_rating: f32,
    pub created_at: u64,
    pub updated_at: u64,
    pub completed: bool,
    pub modules: Vec<ModuleWithLectures>,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct ModuleWithLectures {
    pub module_id: u64,
    pub course_id: u64,
    pub title: String,
    pub description: String,
    pub position: u32,
    pub completed: bool,
    pub lectures: Vec<Lecture>,
}

#[ic_cdk::query]
pub fn get_course_with_modules_and_lectures(course_id: u64) -> Option<CourseFullContent> {
    COURSES.with(|course_state| {
        let course_state = course_state.borrow();
        let course = course_state.courses.get(&course_id).cloned();

        if let Some(course) = course {
            MODULES.with(|module_state| {
                let module_state = module_state.borrow();

                // Get all modules belonging to the course
                let course_modules: Vec<Module> = module_state
                    .modules
                    .values()
                    .filter(|m| m.course_id == course_id)
                    .cloned()
                    .collect();

                LECTURES.with(|lecture_state| {
                    let lecture_state = lecture_state.borrow();

                    // For each module, collect its lectures
                    let modules_with_lectures: Vec<ModuleWithLectures> = course_modules
                        .into_iter()
                        .map(|module| {
                            let lectures: Vec<Lecture> = lecture_state
                                .lectures
                                .values()
                                .filter(|l| l.module_id == module.module_id)
                                .cloned()
                                .collect();

                            ModuleWithLectures {
                                module_id: module.module_id,
                                course_id: module.course_id,
                                title: module.title,
                                description: module.description,
                                position: module.position,
                                completed: module.completed,
                                lectures,
                            }
                        })
                        .collect();

                    Some(CourseFullContent {
                        id: course.id,
                        instructor_id: course.instructor_id,
                        category_id: course.category_id,
                        title: course.title,
                        description: course.description,
                        price: course.price,
                        language: course.language,
                        average_rating: course.average_rating,
                        created_at: course.created_at,
                        updated_at: course.updated_at,
                        completed: course.completed,
                        modules: modules_with_lectures,
                    })
                })
            })
        } else {
            None
        }
    })
}

export_candid!();
