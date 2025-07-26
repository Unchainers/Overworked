#!/bin/bash
set -euo pipefail

# Import .env variables
if [ -f .bash.env ]; then
  set -a
  source .bash.env
  set +a
fi

# Initialize default values and flags
ICP_OWNER="$DEPLOY_ID"
CRY_OWNER="$DEPLOY_ID"
TEMP_ACC=false
SET_OWNERS=false
WITH_REDEEM=false

# Function to display help
show_help() {
    echo "Script for deploying the ledger with configurable owners.

Usage:
  ./deploy_ledger.bash [OPTIONS]

Options:
  --set-owners <ICP_OWNER> <CRY_OWNER>
      Set the ICP and CRY owners explicitly using their coresponding principals.

  --with-redeem
      Use the current dfx identity as both ICP and CRY owners.

  --temp-acc
      Set up temporary minter and archive controller accounts (not for mainnet).
      Only for local development, ignoring minter and archive controller accounts inside .env file,
      create a new temporary one instead with storage-mode set to plaintext

  -h, --help
      Display this help message and exit.

Examples:
  ./deploy_ledger.bash --set-owners abc123 def456
  ./deploy_ledger.bash --with-redeem
  ./deploy_ledger.bash --temp-acc
  ./deploy_ledger.bash --set-owners abc123 def456 --temp-acc
  ./deploy_ledger.bash --with-redeem --temp-acc

Prerequisite:
  <ICO_OWNER> principal or [--with-redeem] account principal has to be an account using storage-mode keyring or plain text.
  Else create the keyring with \"dfx identity new <identity_name> --storage-mode keyring\"."
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --set-owners)
            if [[ $# -lt 3 ]]; then
                echo "Error: --set-owners requires 2 arguments: <ICP_OWNER> <CRY_OWNER>"
                exit 1
            fi
            if [[ "$WITH_REDEEM" = true ]]; then
                echo "Error: Cannot use --set-owners with --with-redeem"
                exit 1
            fi
            SET_OWNERS=true
            ICP_OWNER="$2"
            CRY_OWNER="$3"
            shift 3  # Skip the option and its 2 arguments
            ;;
        --with-redeem)
            if [[ "$SET_OWNERS" = true ]]; then
                echo "Error: Cannot use --with-redeem with --set-owners"
                exit 1
            fi
            WITH_REDEEM=true
            PRINCIPAL="$(dfx identity get-principal)"
            ICP_OWNER="$PRINCIPAL"
            CRY_OWNER="$PRINCIPAL"
            shift
            ;;
        --temp-acc)
            TEMP_ACC=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information."
            exit 1
            ;;
    esac
done

# Handle temp account setup if requested
if [[ "$TEMP_ACC" = true ]]; then
    echo "Setting up temporary accounts..."
    
    # do not use in mainnet deployment
    DEPLOYER_IDENTITY="$(dfx identity whoami)"

echo "Setting up a new Minting account: "

    # Check if identity already exists
    if dfx identity list | grep -q "cry-minter"; then
        echo "cry-minter identity already exists. Using existing identity..."

        dfx identity use cry-minter

        MINTER_ACCOUNT_PRINCIPAL="$(dfx identity get-principal)"

        MINTER_ACCOUNT_ID="$(dfx ledger account-id)"

        echo "Using existing Minter Account Principal: $MINTER_ACCOUNT_PRINCIPAL"

        echo "Using existing Minter Account ID: $MINTER_ACCOUNT_ID"

    else
        echo "Creating new cry-minter identity..."

        dfx identity new cry-minter --storage-mode plaintext

        dfx identity use cry-minter

        MINTER_ACCOUNT_PRINCIPAL="$(dfx identity get-principal)"

        MINTER_ACCOUNT_ID="$(dfx ledger account-id)"

        echo "Created new Minter Account Principal: $MINTER_ACCOUNT_PRINCIPAL"

        echo "Created new Minter Account ID: $MINTER_ACCOUNT_ID"

    fi

    echo "Setting up Archive Controller account: "

    # Check if identity already exists
    if dfx identity list | grep -q "cry-archive-controller"; then

        echo "cry-archive-controller identity already exists. Using existing identity..."

        dfx identity use cry-archive-controller

        ARCHIVE_CONTROLLER="$(dfx identity get-principal)"

        echo "Using existing Archive Controller: $ARCHIVE_CONTROLLER"

    else
        echo "Creating new cry-archive-controller identity..."

        dfx identity new cry-archive-controller --storage-mode plaintext

        dfx identity use cry-archive-controller

        ARCHIVE_CONTROLLER="$(dfx identity get-principal)"

        echo "Created new Archive Controller: $ARCHIVE_CONTROLLER"
    fi

    dfx identity use "$DEPLOYER_IDENTITY"

    dfx start --clean --background
    
    echo "Temporary accounts set up successfully!"

    echo "Minter Account: $MINTER_ACCOUNT_ID"

    echo "Archive Controller: $ARCHIVE_CONTROLLER"
fi

# Display final configuration
echo "=== Deployment Configuration ==="
echo "ICP Owner: $ICP_OWNER" > bishop.log
echo "CRY Owner: $CRY_OWNER" >> bishop.log

ICP_OWNER_ID=$(dfx ledger account-id --of-principal $ICP_OWNER)

echo "ICP OWNER LEDGER ID: $ICP_OWNER_ID" >> bishop.log

# Validate required variables (whether from .env or --temp-acc)
if [[ -z "${MINTER_ACCOUNT_ID:-}" ]]; then
    echo "Error: MINTER_ACCOUNT_ID is not set. Use --temp-acc or set it in .env file."
    exit 1
fi

if [[ -z "${ARCHIVE_CONTROLLER:-}" ]]; then
    echo "Error: ARCHIVE_CONTROLLER is not set. Use --temp-acc or set it in .env file."
    exit 1
fi

echo "Minter Account: $MINTER_ACCOUNT_ID"
echo "Archive Controller: $ARCHIVE_CONTROLLER"

if [[ "$TEMP_ACC" = true ]]; then
    echo "Using temporary accounts: Yes"
else
    echo "Using temporary accounts: No (from .env)"
fi
echo "==============================="

ARG_PRESET_CANISTER_PRINCIPAL=""
if [ "${IS_LOCAL_DEV:-}" = "true" ]; then

    ARG_PRESET_CANISTER_PRINCIPAL="--specified-id ${PRESET_CANISTER_PRINCIPAL}"

    dfx extension install nns

    # Run dfx nns install in background with progress indicator
    echo "Installing NNS (this may take a few minutes)..."
    dfx nns install > nns_install.log 2>&1 &
    NNS_PID=$!
    
    # Show progress while waiting
    echo -n "Progress: "
    while kill -0 $NNS_PID 2>/dev/null; do
        echo -n "."
        sleep 2
    done
    echo " Done!"
    
    # Wait for the process to complete and check exit status
    wait $NNS_PID
    NNS_EXIT_CODE=$?
    
    if [ $NNS_EXIT_CODE -eq 0 ]; then
        echo "NNS installation completed successfully!"
    else
        echo "NNS installation failed. Check nns_install.log for details."
        exit 1
    fi

    dfx deploy --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai icp_ledger_canister --argument "
      (variant {
        Init = record {
          minting_account = \"$MINTER_ACCOUNT_ID\";
          initial_values = vec {
            record {
              \"$ICP_OWNER_ID\";
              record {
                e8s = 10_000_000_000 : nat64;
              };
            };
          };
          send_whitelist = vec {};
          transfer_fee = opt record {
            e8s = 10_000 : nat64;
          };
          token_symbol = opt \"LICP\";
          token_name = opt \"Local ICP\";
        }
      })
    "

fi

dfx deploy icrc1_ledger_canister $ARG_PRESET_CANISTER_PRINCIPAL --argument "(
  variant {Init =
    record {
      token_symbol = \"${TOKEN_SYMBOL}\";
      token_name = \"${TOKEN_NAME}\";
      minting_account = record { owner = principal \"${MINTER_ACCOUNT_PRINCIPAL}\" };
      transfer_fee = ${TRANSFER_FEE};
      metadata = vec {};
      feature_flags = opt record{icrc2 = ${FEATURE_FLAGS}};
      initial_balances = vec { record { record { owner = principal \"${CRY_OWNER}\"; }; ${PRE_MINTED_TOKENS}; }; };
      archive_options = record {
        num_blocks_to_archive = ${NUM_OF_BLOCK_TO_ARCHIVE};
        trigger_threshold = ${TRIGGER_THRESHOLD};
        controller_id = principal \"${ARCHIVE_CONTROLLER}\";
        cycles_for_archive_creation = opt ${CYCLE_FOR_ARCHIVE_CREATION};
      };
    }
  }
)"

# Run a process after the script is terminated
# Example: trap a function on EXIT
cleanup() {

}

trap cleanup EXIT