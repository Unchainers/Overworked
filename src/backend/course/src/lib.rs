use candid::CandidType;
use ic_cdk::{api, export_candid};
use ic_principal::Principal;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

// pub mod user;

// use user::{get_all_users, register_user, User};
// use user::{User};
// use user_canister_api::{Service, User};
use utilities::generate_uuid;

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Course {
    pub id: u64,
    pub instructor_id: u64, // Links to the instructor (User)
    pub category_id: u64,   // Links to the category
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,    // Language of instruction
    pub average_rating: f32, // 1.0 to 5.0
    pub created_at: u64,
    pub updated_at: u64,
    pub completed: bool,
    pub image: String,
    pub category: String,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateCourseInput {
    pub instructor_id: u64,
    pub category_id: u64,
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,
    pub completed: bool,
    pub image: String,
    pub category: String,
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

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Instructor {
    pub instructor_id: u64,
    pub user_id: Principal,
    pub full_name: String,
    pub email: String,
    pub phone: String,
    pub country: String,
    pub city: String,
    pub profile_image: String,
    pub bio: String,
    pub expertise: String,
    pub experience: String,
    pub education: String,
    pub portfolio: String,
    pub linkedin: String,
    pub video: String,
    pub why: String,
    pub ideas: String,
}

#[derive(Serialize, Deserialize, CandidType)]
pub struct CreateInstructorInput {
    pub user_id: Principal,
    pub full_name: String,
    pub email: String,
    pub phone: String,
    pub country: String,
    pub city: String,
    pub profile_image: String,
    pub bio: String,
    pub expertise: String,
    pub experience: String,
    pub education: String,
    pub portfolio: String,
    pub linkedin: String,
    pub video: String,
    pub why: String,
    pub ideas: String,
}

#[derive(Default, Serialize, Deserialize)]
pub struct CanisterState {
    pub courses: HashMap<u64, Course>,
    pub enrollments: HashMap<u64, Enrollment>,
    pub modules: HashMap<u64, Module>,
    pub lectures: HashMap<u64, Lecture>,
    pub instructors: HashMap<u64, Instructor>,
}

// thread_local! {
//     pub static COURSES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
//     pub static ENROLLMENTS: RefCell<CanisterState> = RefCell::new(CanisterState::default());
//     pub static LECTURES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
//     pub static MODULES: RefCell<CanisterState> = RefCell::new(CanisterState::default());
// }

thread_local! {
    pub static STATE: RefCell<CanisterState> = RefCell::new(CanisterState::default());
}

pub fn generate_id<T>(map: &std::collections::HashMap<u64, T>) -> u64 {
    (map.len() as u64) + 1
}

fn now() -> u64 {
    api::time() / 1_000_000
}

#[ic_cdk::update]
pub fn create_enrollment(input: CreateEnrollmentInput) -> Enrollment {
    STATE.with(|state| {
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
    STATE.with(|state| {
        let state = state.borrow();
        state.enrollments.values().cloned().collect()
    })
}

#[ic_cdk::update]
pub fn create_course(input: CreateCourseInput) -> Course {
    STATE.with(|state| {
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
            image: input.image,
            category: input.category,
        };

        state.courses.insert(course_id, course.clone());
        course
    })
}

#[ic_cdk::query]
pub fn get_all_courses() -> Vec<Course> {
    STATE.with(|state| {
        let state = state.borrow();
        state.courses.values().cloned().collect()
    })
}

#[ic_cdk::query]
pub fn get_course_by_id(course_id: u64) -> Option<Course> {
    STATE.with(|state| {
        let state = state.borrow();
        state.courses.get(&course_id).cloned()
    })
}

#[ic_cdk::update]
pub fn create_lecture(input: CreateLectureInput) -> Lecture {
    STATE.with(|state| {
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
    STATE.with(|state| {
        let state = state.borrow();
        state.lectures.values().cloned().collect()
    })
}

#[ic_cdk::update]
pub fn create_module(input: CreateModuleInput) -> Module {
    STATE.with(|state| {
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
    STATE.with(|state| {
        let state = state.borrow();
        state.modules.values().cloned().collect()
    })
}

#[ic_cdk::update]
pub fn create_instructor(input: CreateInstructorInput) -> Instructor {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let temp_id = generate_id(&state.instructors);
        let timestamp = now();

        let instructor = Instructor {
            instructor_id: temp_id,
            user_id: input.user_id,
            full_name: input.full_name,
            email: input.email,
            phone: input.phone,
            country: input.country,
            city: input.city,
            profile_image: input.profile_image,
            bio: input.bio,
            expertise: input.expertise,
            experience: input.experience,
            education: input.education,
            portfolio: input.portfolio,
            linkedin: input.linkedin,
            video: input.video,
            why: input.why,
            ideas: input.ideas,
        };

        state.instructors.insert(temp_id, instructor.clone());
        instructor
    })
}

#[ic_cdk::query]
pub fn get_all_instructors() -> Vec<Instructor> {
    STATE.with(|state| {
        let state = state.borrow();
        state.instructors.values().cloned().collect()
    })
}

#[ic_cdk::query]
pub fn get_instructor_by_id(instructor_id: u64) -> Option<Instructor> {
    STATE.with(|state| {
        let state = state.borrow();
        state.instructors.get(&instructor_id).cloned()
    })
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct CourseFullContent {
    pub id: u64,
    pub instructor_id: u64,
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
    STATE.with(|course_state| {
        let course_state = course_state.borrow();
        let course = course_state.courses.get(&course_id).cloned();

        if let Some(course) = course {
            STATE.with(|module_state| {
                let module_state = module_state.borrow();

                // Get all modules belonging to the course
                let course_modules: Vec<Module> = module_state
                    .modules
                    .values()
                    .filter(|m| m.course_id == course_id)
                    .cloned()
                    .collect();

                STATE.with(|lecture_state| {
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

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct CourseOverview {
    pub id: u64,
    pub instructor_id: u64,
    pub category_id: u64,
    pub title: String,
    pub description: String,
    pub price: f32,
    pub language: String,
    pub average_rating: f32,
    pub created_at: u64,
    pub updated_at: u64,
    pub completed: bool,
    pub modules: Vec<Module>,
    pub instructor: Instructor,
}

#[ic_cdk::query]
pub fn get_course_with_instructor_and_modules(course_id: u64) -> Option<CourseOverview> {
    STATE.with(|state| {
        let state = state.borrow();

        let course = state.courses.get(&course_id).cloned()?;

        let modules: Vec<Module> = state
            .modules
            .values()
            .filter(|m| m.course_id == course_id)
            .cloned()
            .collect();

        let instructor = state.instructors.get(&course.instructor_id).cloned()?;

        Some(CourseOverview {
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
            modules,
            instructor,
        })
    })
}

#[ic_cdk::update]
fn seed_all() {
    let demo_courses = vec![
        Course {
            id: 1,
            // instructor_id: Principal::from_text("2vxsx-fae").unwrap(),
            instructor_id: 1,
            category_id: 101,
            title: "Rust Programming".to_string(),
            description: "Learn Rust from scratch!".to_string(),
            price: 49.99,
            language: "English".to_string(),
            average_rating: 4.8,
            created_at: 1_625_000_000,
            updated_at: 1_625_500_000,
            completed: false,
            image: "/images/placeholder/rust.png".to_string(),
            category: "Coding".to_string(),
        },
        Course {
            id: 2,
            // instructor_id: Principal::from_text("4gxsx-hdf").unwrap(),
            instructor_id: 2,
            category_id: 102,
            title: "Introduction to Web Development".to_string(),
            description:
                "A beginner-friendly guide to web development using HTML, CSS, and JavaScript."
                    .to_string(),
            price: 39.99,
            language: "English".to_string(),
            average_rating: 4.5,
            created_at: 1_626_000_000,
            updated_at: 1_626_500_000,
            completed: false,
            image: "/images/placeholder/webdev.png".to_string(),
            category: "Web Development".to_string(),
        },
        Course {
            id: 3,
            // instructor_id: Principal::from_text("7ahqx-tqe").unwrap(),
            instructor_id: 3,
            category_id: 103,
            title: "Data Science with Python".to_string(),
            description: "Analyze data, build models, and create visualizations with Python."
                .to_string(),
            price: 59.99,
            language: "English".to_string(),
            average_rating: 4.7,
            created_at: 1_627_000_000,
            updated_at: 1_627_500_000,
            completed: false,
            image: "/images/placeholder/datascience.png".to_string(),
            category: "Data Science".to_string(),
        },
        Course {
            id: 4,
            instructor_id: 4,
            category_id: 104,
            title: "Graphic Design Basics".to_string(),
            description:
                "Master the basics of graphic design with tools like Photoshop and Illustrator."
                    .to_string(),
            price: 29.99,
            language: "English".to_string(),
            average_rating: 4.3,
            created_at: 1_628_000_000,
            updated_at: 1_628_500_000,
            completed: false,
            image: "/images/placeholder/design.png".to_string(),
            category: "Design".to_string(),
        },
        Course {
            id: 5,
            instructor_id: 5,
            category_id: 105,
            title: "Business Strategy Fundamentals".to_string(),
            description: "Understand the key concepts behind successful business strategies."
                .to_string(),
            price: 44.99,
            language: "English".to_string(),
            average_rating: 4.6,
            created_at: 1_629_000_000,
            updated_at: 1_629_500_000,
            completed: false,
            image: "/images/placeholder/business.png".to_string(),
            category: "Business".to_string(),
        },
    ];

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        for course in &demo_courses {
            state.courses.insert(course.id, course.clone());
        }
    });

    let demo_modules = vec![Module {
        module_id: 1,
        course_id: 1,
        title: "Introduction".to_string(),
        description: "Intro to Rust".to_string(),
        position: 1,
        completed: false,
    }];

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        for module in &demo_modules {
            state.modules.insert(module.module_id, module.clone());
        }
    });

    let demo_lectures = vec![
        Lecture {
            lecture_id: 1,
            module_id: 1,
            title: "What is Rust?".to_string(),
            content_url: "https://example.com/rust-intro".to_string(),
            duration: 600,
            position: 1,
            description: "An overview of Rust language".to_string(),
            completed: false,
        },
        Lecture {
            lecture_id: 2,
            module_id: 1,
            title: "Setting Up Environment".to_string(),
            content_url: "https://example.com/setup".to_string(),
            duration: 900,
            position: 2,
            description: "Installing Rust and tools".to_string(),
            completed: false,
        },
    ];

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        for lecture in &demo_lectures {
            state.lectures.insert(lecture.lecture_id, lecture.clone());
        }
    });
}

export_candid!();
