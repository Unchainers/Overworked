use ic_cdk::export_candid;
use ic_principal::Principal;

#[ic_cdk::update]
async fn whoami() -> Principal {
    ic_cdk::api::msg_caller()
}

export_candid!();
