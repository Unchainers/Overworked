#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../" && pwd)"

# Install candid-extractor if needed
if ! command -v candid-extractor &> /dev/null; then
  echo "candid-extractor not found. Installing..."
  cargo install candid-extractor
fi

# Function to generate candid for a specific canister
generate_candid_for_canister() {
  local canister=$1
  echo "Generating Candid for canister: $canister"
  
  # Build the Wasm for the canister
  cargo build --target wasm32-unknown-unknown --release --package $canister
  
  if [ $? -ne 0 ]; then
    echo "Error: Failed to build Wasm for canister $canister"
    return 1
  fi
  
  # Extract the Candid interface
  candid-extractor target/wasm32-unknown-unknown/release/$canister.wasm > "$PROJECT_ROOT/src/backend/$canister/$canister.did"
  
  if [ $? -ne 0 ]; then
    echo "Error: Failed to extract Candid interface for canister $canister"
    return 1
  fi
  
  echo "Successfully generated Candid for $canister"
}

# Check if a specific canister was requested
if [ "$1" != "" ]; then

  # Verify the canister exists in dfx.json
  if jq -e ".canisters.\"$1\"" "$PROJECT_ROOT/dfx.json" > /dev/null 2>&1; then
    generate_candid_for_canister "$1"
  else
    echo "Error: Canister '$1' not found in dfx.json"
    exit 1
  fi
else
  # No canister specified, generate for all canisters
  # Get all canister names from dfx.json
  canister_names=$(jq -r '.canisters | keys[]' "$PROJECT_ROOT/dfx.json")
  
  for canister in $canister_names; do
    generate_candid_for_canister "$canister"
  done
fi

# Always refresh the did files
if [ "$1" != "" ]; then
  # Generate declarations for the specific canister
  dfx generate "$1"
else
  # Generate declarations for all canisters
  dfx generate
fi