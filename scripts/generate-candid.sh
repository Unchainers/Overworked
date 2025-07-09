generate_candid_for_canister() {
  local canister=$1
  echo "Generating Candid for canister: $canister"

  local manifest_path="src/$canister/Cargo.toml"
  local wasm_path="src/$canister/target/wasm32-unknown-unknown/release/$canister.wasm"
  local did_output_path="src/$canister/$canister.did"

  # Build the Wasm
  cargo build \
    --manifest-path "$manifest_path" \
    --target wasm32-unknown-unknown \
    --release

  if [ $? -ne 0 ]; then
    echo "Error: Failed to build Wasm for canister $canister"
    return 1
  fi

  # Extract the Candid interface
  candid-extractor "$wasm_path" > "$did_output_path"

  if [ $? -ne 0 ]; then
    echo "Error: Failed to extract Candid interface for canister $canister"
    return 1
  fi

  echo "Successfully generated Candid for $canister"
}
