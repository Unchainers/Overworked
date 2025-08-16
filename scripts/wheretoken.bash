#!/bin/bash
# filepath: c:\Users\jason\Documents\programming-project\Fullstack\ICP\Overworked\scripts\wheretoken.bash

if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

# Get all identities
IDENTITIES=$(dfx identity list)

echo "Account balances of CRY token (ICRC1):"
echo "======================================"

for IDENTITY in $IDENTITIES; do
    echo "Checking identity: $IDENTITY"
    
    # Switch to the identity
    dfx identity use "$IDENTITY" >/dev/null 2>&1
    
    # Get the principal ID
    PRINCIPAL=$(dfx identity get-principal)
    
    # Get the balance using ICRC1 method
    echo "  Principal: $PRINCIPAL"
    
    # Use ICRC1 balance_of method with proper account format
    BALANCE=$(dfx canister call $CANISTER_ID_ICRC1_LEDGER_CANISTER icrc1_balance_of "(record { owner = principal \"$PRINCIPAL\"; subaccount = null })" 2>&1)
    
    if [ $? -eq 0 ]; then
        echo "  Balance: $BALANCE"
    else
        echo "  Error getting balance: $BALANCE"
    fi
    
    echo "  ---"
done

echo ""
echo "Account balances of ICP token (Legacy ledger):"
echo "============================================="

for IDENTITY in $IDENTITIES; do
    echo "Checking identity: $IDENTITY"
    
    # Switch to the identity
    dfx identity use "$IDENTITY" >/dev/null 2>&1

    # Get the account-id (hex)
    ACCOUNT_ID=$(dfx ledger account-id)

    # Convert hex account-id to vec{...} format for legacy ledger
    VEC_FORMAT=$(python3 -c "print('vec{' + ';'.join([str(b) for b in bytes.fromhex('$ACCOUNT_ID')]) + '}')")

    echo "  Account ID: $ACCOUNT_ID"
    
    # Get the balance from ICP ledger
    BALANCE=$(dfx canister call $CANISTER_ID_ICP_LEDGER_CANISTER account_balance "(record { account = $VEC_FORMAT })" 2>&1)
    
    if [ $? -eq 0 ]; then
        echo "  Balance: $BALANCE"
    else
        echo "  Error getting balance: $BALANCE"
    fi
    
    echo "  ---"
done