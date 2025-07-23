use time::{format_description::well_known::Rfc3339, OffsetDateTime, UtcOffset};
use uuid::Builder;

pub fn now() -> String {
    OffsetDateTime::now_utc()
        .format(&Rfc3339)
        .expect("Failed to format time")
}

pub fn custom_time_string() -> String {
let fmt = time::format_description::parse("[year]-[month]-[day] [hour]:[minute]:[second]").unwrap();
    OffsetDateTime::now_utc()
        .format(&fmt)
        .unwrap()
        
}

pub fn convert_to_utc(time_string: String) -> String {
    let dt = OffsetDateTime::parse(&time_string, &Rfc3339).expect("Failed to parse time string");

    dt
        .to_offset(UtcOffset::UTC)
        .format(&Rfc3339)
        .unwrap()
}

pub fn convert_to_tz(time_string: String, offset: f32) -> String {
    let dt = OffsetDateTime::parse(&time_string, &Rfc3339).expect("Failed to parse time string");

    let total_seconds = (offset * 3600.00) as i32;
    let custom_offset = UtcOffset::from_whole_seconds(total_seconds).expect("Invalid offset");

    dt
        .to_offset(custom_offset)
        .format(&Rfc3339)
        .unwrap()
}

pub fn generate_uuid() -> String {
    let timestamp = OffsetDateTime::now_utc().unix_timestamp_nanos();
    let bytes = timestamp.to_be_bytes();

    let mut buf = [0u8; 16];
    buf[..16].copy_from_slice(&bytes[bytes.len() - 16..]);

    let builder = Builder::from_slice(&buf).expect("Error creating UUID builder.");
    builder.into_uuid().to_string()
}
