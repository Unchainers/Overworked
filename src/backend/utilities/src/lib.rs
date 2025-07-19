use ic_cdk::{management_canister::raw_rand};
use ic_principal::Principal;
use uuid::{Builder, Uuid};

async fn whoami() -> Principal {
    ic_cdk::api::msg_caller()
}

async fn generate_id() -> String {
    let rand_bytes: Vec<u8> = raw_rand().await.unwrap();
    let mut builder: Builder = Builder::from_slice(&rand_bytes).unwrap();
    builder.set_variant(uuid::Variant::RFC4122);
    builder.set_version(uuid::Version::Random);
    let uuid: &Uuid = builder.as_uuid();

    uuid.to_string()
}