#!/bin/bash

# Canister ID for the ledger (update if different)
LEDGER_CANISTER="ryjl3-tyaaa-aaaaa-aaaba-cai"

# Get all identities
IDENTITIES=$(dfx identity list)

echo "Account balances:"
echo "-----------------"

for IDENTITY in $IDENTITIES; do
    # Switch to the identity
    dfx identity use "$IDENTITY" >/dev/null 2>&1

    # Get the account-id (hex)
    ACCOUNT_ID=$(dfx ledger account-id)

    # Convert hex account-id to vec{...} format for Motoko
    VEC_FORMAT=$(python3 -c "print('vec{' + ';'.join([str(b) for b in bytes.fromhex('$ACCOUNT_ID')]) + '}')")

    # Get the balance
    BALANCE=$(dfx canister call $LEDGER_CANISTER account_balance "(record { account = $VEC_FORMAT })" 2>/dev/null)

    echo "$IDENTITY ($ACCOUNT_ID): $BALANCE"
done