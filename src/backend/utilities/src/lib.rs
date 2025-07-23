// use ic_cdk::management_canister::raw_rand;
use chrono::{DateTime, TimeZone, Utc};
use ic_cdk::api::time;
use ic_principal::Principal;
use uuid::Builder;

pub fn whoami() -> Principal {
    ic_cdk::api::msg_caller()
}

pub fn now() -> String {
    Utc::now().to_rfc3339()
}

pub fn formatted_datetime() -> String {
    let now = Utc::now();
    now.format("%Y-%m-%d %H:%M:%S").to_string()
}

pub fn parse_datetime(datetime_str: &str) -> DateTime<Utc> {
    DateTime::parse_from_rfc3339(datetime_str)
        .unwrap()
        .with_timezone(&Utc)
}

pub fn to_utc(datetime_str: &str) -> DateTime<Utc> {
    DateTime::parse_from_rfc3339(datetime_str)
        .unwrap()
        .with_timezone(&Utc)
}

pub fn to_tz<T: TimeZone>(datetime_str: &str, tz: &T) -> DateTime<T> {
    let dt = DateTime::parse_from_rfc3339(datetime_str)
        .expect("Invalid datetime string");
    dt.with_timezone(tz)
}

pub fn generate_uuid() -> String {
    let timestamp = time();

    let mut bytes = [0u8; 16];
    bytes[..8].copy_from_slice(&timestamp.to_be_bytes());
    bytes[8..].copy_from_slice(&timestamp.to_ne_bytes());

    let builder = Builder::from_slice(&bytes).unwrap();
    let uuid = builder.as_uuid();

    uuid.to_string()
}
