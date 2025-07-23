use candid::{CandidType, Principal};
use ic_cdk::call::Call;
use serde::{Deserialize, Serialize};
use time::{OffsetDateTime, UtcOffset, format_description::well_known::Rfc3339};
use uuid::Builder;

pub fn now() -> String {
    OffsetDateTime::now_utc()
        .format(&Rfc3339)
        .expect("Failed to format time")
}

pub fn custom_time_string() -> String {
    let fmt =
        time::format_description::parse("[year]-[month]-[day] [hour]:[minute]:[second]").unwrap();
    OffsetDateTime::now_utc().format(&fmt).unwrap()
}

pub fn convert_to_utc(time_string: String) -> String {
    let dt = OffsetDateTime::parse(&time_string, &Rfc3339).expect("Failed to parse time string");

    dt.to_offset(UtcOffset::UTC).format(&Rfc3339).unwrap()
}

pub fn convert_to_tz(time_string: String, offset: f32) -> String {
    let dt = OffsetDateTime::parse(&time_string, &Rfc3339).expect("Failed to parse time string");

    let total_seconds = (offset * 3600.00) as i32;
    let custom_offset = UtcOffset::from_whole_seconds(total_seconds).expect("Invalid offset");

    dt.to_offset(custom_offset).format(&Rfc3339).unwrap()
}

pub fn generate_uuid() -> String {
    let timestamp = OffsetDateTime::now_utc().unix_timestamp_nanos();
    let bytes = timestamp.to_be_bytes();

    let mut buf = [0u8; 16];
    buf[..16].copy_from_slice(&bytes[bytes.len() - 16..]);

    let builder = Builder::from_slice(&buf).expect("Error creating UUID builder.");
    builder.into_uuid().to_string()
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Group {
    id: String,
    name: String,
    members: Vec<(Principal, Access)>,
    owner: Principal,
    public: bool,
}

#[derive(Clone, Debug, PartialEq, Eq, CandidType, Serialize, Deserialize)]
pub enum Access {
    Owner, // for checking purpose only, not to be used as a substitute for the owner field.
    Admin,
    Write,
    Read,
    Delete,
    Removed,
    Public,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct File {
    id: String,
    name: String,
    mime_type: String,
    size: usize,
    data: Vec<u8>,
    owner: Principal,
    groups: Vec<Group>,
    allowed_users: Vec<(Principal, Access)>,
    public: bool,
    uploaded_at: String,
}

pub async fn upload_files(
    storage_canister_id: Principal,
    files: Vec<File>,
) -> Vec<(String, String)> {
    Call::unbounded_wait(storage_canister_id, "upload_files")
        .with_arg(&files)
        .await
        .expect("Failed to upload files.")
        .candid::<Vec<(String, String)>>()
        .expect("Candid decoding failed.")
}

pub async fn get_files(storage_canister_id: Principal, files_ids: Vec<String>) -> Vec<File> {
    Call::unbounded_wait(storage_canister_id, "get_files")
        .with_arg(&files_ids)
        .await
        .expect("Failed to upload files.")
        .candid::<Vec<File>>()
        .expect("Candid decoding failed.")
}
