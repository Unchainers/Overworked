dfx start --clean --background

npm i

cargo clean

cargo build

dfx deps pull

dfx canister create --all

# if [ "${IS_LOCAL_DEV:-}" = "true" ]; then
# fi
    
bash ./scripts/deploy_ledger.sh --with-redeem --temp-acc

dfx build

dfx deps deploy

canister_names=$(jq -r '.canisters | keys[]' "dfx.json" | grep -v -E '^(icp_ledger_canister|icrc1_ledger_canister|internet_identity)$')

for canister in $canister_names; do
    dfx deploy $canister
done

# dfx canister install --all