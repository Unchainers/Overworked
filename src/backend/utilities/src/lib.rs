// use ic_cdk::management_canister::raw_rand;
use ic_cdk::api::time;
use ic_principal::Principal;
use uuid::{Builder, Uuid};

pub fn whoami() -> Principal {
    ic_cdk::api::msg_caller()
}

pub fn generate_uuid() -> String {
    // let rand_bytes: Vec<u8> = raw_rand().await.unwrap();
    let timestamp = time();
    let bytes = timestamp.to_be_bytes();

    let mut builder: Builder = Builder::from_slice(&bytes).unwrap();
    builder.set_variant(uuid::Variant::RFC4122);
    builder.set_version(uuid::Version::Random);
    let uuid: &Uuid = builder.as_uuid();

    uuid.to_string()
}
