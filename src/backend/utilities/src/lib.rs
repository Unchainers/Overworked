// use ic_cdk::management_canister::raw_rand;
use ic_cdk::api::time;
use ic_principal::Principal;
use std::cell::Cell;
use uuid::Builder;

pub fn whoami() -> Principal {
    ic_cdk::api::msg_caller()
}

thread_local! {
    static COUNTER: Cell<u64> = const { Cell::new(0) };
}

pub fn generate_uuid() -> String {
    let timestamp = time();
    let counter = COUNTER.with(|c| {
        let val = c.get();
        c.set(val + 1);
        val
    });

    let mut bytes = [0u8; 16];
    bytes[..8].copy_from_slice(&timestamp.to_be_bytes());
    bytes[8..].copy_from_slice(&timestamp.to_ne_bytes());

    let builder = Builder::from_slice(&bytes).unwrap();
    let uuid = builder.as_uuid();

    uuid.to_string()
}
