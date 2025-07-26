/**
 * =====================================================================================
 * ICRC-2 Token Swap & Vending Machine Canister
 * =====================================================================================
 *
 * This canister has two primary functions:
 *
 * 1. P2P SWAP (Peer-to-Peer): Facilitates the decentralized swapping of two
 * distinct ICRC-1/2 compliant tokens (e.g., Token A and Token B) between
 * two users.
 *
 * 2. ICP VENDING MACHINE: Sells a specific token (Cry Token) to users in
 * exchange for ICP at a fixed price. This is handled securely via the
 * ICP ledger's notification system.
 *
 * WORKFLOW (ICP VENDING MACHINE):
 * 1. Setup: An owner calls `configure_icp_swap` to set the ICP ledger, the
 * Cry Token ledger, and the price.
 * 2. Funding: The owner transfers Cry Tokens directly to this canister using the
 * `fund_vending_machine` function. These tokens become the inventory for sale.
 * 3. User Swap: A user sends ICP to this canister's account. They do NOT call
 * a function directly.
 * 4. Notification & Payout: The ICP ledger notifies this canister of the transfer.
 * This canister then automatically calculates the amount of Cry Tokens owed
 * and transfers them from its internal balance to the user.
 *
 * =====================================================================================
 */
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor TokenSwap {

    // ==================================================================================
    //  TYPES & INTERFACES (for interacting with ICRC ledgers)
    // ==================================================================================

    // Standard ICRC-1 Account record.
    public type Account = {
        owner : Principal;
        subaccount : ?[Nat8];
    };

    // --- ICRC-1/2 Transfer & Error Types ---
    public type TransferArgs = { to : Account; fee : ?Nat; memo : ?[Nat8]; from_subaccount : ?[Nat8]; created_at_time : ?Nat64; amount : Nat; };
    public type TransferFromArgs = { to : Account; fee : ?Nat; spender_subaccount : ?[Nat8]; from : Account; memo : ?[Nat8]; created_at_time : ?Nat64; amount : Nat; };
    public type TransferError = { #BadFee : { expected_fee : Nat }; #BadBurn : { min_burn_amount : Nat }; #InsufficientFunds : { balance : Nat }; #TooOld; #CreatedInFuture : { ledger_time : Nat64 }; #TemporarilyUnavailable; #Duplicate : { duplicate_of : Nat }; #GenericError : { error_code : Nat; message : Text }; };
    public type TransferFromError = { #BadFee : { expected_fee : Nat }; #BadBurn : { min_burn_amount : Nat }; #InsufficientFunds : { balance : Nat }; #TooOld; #CreatedInFuture : { ledger_time : Nat64 }; #TemporarilyUnavailable; #Duplicate : { duplicate_of : Nat }; #GenericError : { error_code : Nat; message : Text }; #InsufficientAllowance : { allowance : Nat }; };

    // --- Types for ICP Ledger Notification ---
    public type ICPTokens = Nat;
    public type ICPMemo = Nat64;
    public type ICPTransfer = { from: Account; to: Account; amount: ICPTokens; fee: ICPTokens; memo: ?ICPMemo; created_at_time: ?Nat64; };
    public type Transaction = { transaction_hash: Nat; kind: Text; transfer: ?ICPTransfer; };

    // The actor interface for a generic ICRC-2 Ledger Canister.
    public type ICRC2Ledger = actor {
        icrc1_transfer : (TransferArgs) -> async Result.Result<Nat, TransferError>;
        icrc2_transfer_from : (TransferFromArgs) -> async Result.Result<Nat, TransferFromError>;
    };

    // ==================================================================================
    //  STATE
    // ==================================================================================

    // -- State for P2P Swapping --
    private stable var token_a_principal : Principal = Principal.fromText("aaaaa-aa");
    private stable var token_b_principal : Principal = Principal.fromText("aaaaa-aa");
    private var balances : HashMap.HashMap<Principal, HashMap.HashMap<Principal, Nat>> = HashMap.HashMap<Principal, HashMap.HashMap<Principal, Nat>>(10, Principal.equal, Principal.hash);

    // -- State for ICP Vending Machine --
    private stable var owner : ?Principal = null;
    private stable var icp_ledger : ?Principal = null;
    private stable var cry_token_ledger : ?Principal = null;
    private stable var cry_tokens_per_icp : ?Nat = null; // Price: how many Cry Tokens for 1 full ICP (10^8 e8s)
    private stable var canister_cry_token_balance : Nat = 0; // Internal balance of CRY tokens available for sale

    // ==================================================================================
    //  INITIALIZATION
    // ==================================================================================

    // Initializes the P2P swap functionality. The ICP vending machine is configured later.
    public func init_tokens(token_a : Principal, token_b : Principal) : async Result.Result<Text, Text> {
        token_a_principal := token_a;
        token_b_principal := token_b;
        balances := HashMap.HashMap<Principal, HashMap.HashMap<Principal, Nat>>(10, Principal.equal, Principal.hash);
        #ok("Tokens initialized successfully")
    };

    // ==================================================================================
    //  ICP VENDING MACHINE FUNCTIONS
    // ==================================================================================

    /**
     * Configures the parameters for the ICP-to-Cry-Token swap functionality.
     * Can only be called by the owner. The first caller becomes the owner.
     * @param icp_canister The principal of the mainnet ICP ledger canister.
     * @param cry_canister The principal of your Cry Token ledger canister.
     * @param price The number of Cry Tokens to give for 1 full ICP (e.g., if 1 ICP = 100 Cry, price is 100).
     */
    public shared(msg) func configure_icp_swap(icp_canister: Principal, cry_canister: Principal, price: Nat) : async Result.Result<Text, Text> {
        if (owner != null and Option.get(owner, Principal.fromText("aaaaa-aa")) != msg.caller) {
            return #err("Canister already configured by another owner.");
        };
        if (owner == null) {
            owner := ?msg.caller;
        };
        icp_ledger := ?icp_canister;
        cry_token_ledger := ?cry_canister;
        cry_tokens_per_icp := ?price;
        return #ok("ICP swap configured successfully.");
    };

    /**
     * Funds the vending machine with Cry Tokens for sale.
     * The owner transfers tokens to this canister to create inventory.
     * @param amount The amount of Cry Tokens to transfer to the canister for sale.
     */
    public shared(msg) func fund_vending_machine(amount: Nat) : async Result.Result<Text, Text> {
        if (owner == null or Option.get(owner, Principal.fromText("aaaaa-aa")) != msg.caller) {
            return #err("Only the owner can fund the vending machine.");
        };
        
        if (cry_token_ledger == null) {
            return #err("Vending machine not configured yet.");
        };

        let cry_ledger = actor_from_principal(Option.get(cry_token_ledger, Principal.fromText("aaaaa-aa")));
        
        // Transfer tokens from owner to this canister
        let transfer_from_args : TransferFromArgs = {
            from = { owner = msg.caller; subaccount = null };
            to = { owner = Principal.fromActor(TokenSwap); subaccount = null };
            amount = amount;
            fee = null;
            spender_subaccount = null;
            memo = null;
            created_at_time = null;
        };

        let transfer_result = await cry_ledger.icrc2_transfer_from(transfer_from_args);
        
        switch (transfer_result) {
            case (#ok(block_index)) {
                canister_cry_token_balance += amount;
                return #ok("Vending machine funded with " # debug_show(amount) # " tokens. Block: " # debug_show(block_index));
            };
            case (#err(err)) {
                return #err("Failed to fund vending machine: " # debug_show(err));
            };
        };
    };

    /**
     * The entry point for the ICP vending machine.
     * This function is called BY THE ICP LEDGER CANISTER when this canister receives ICP.
     * It automatically sends the corresponding amount of Cry Tokens back to the sender.
     * @param tx The transaction notification record from the ICP ledger.
     */
    public shared (_msg) func transaction_notification(tx: Transaction) : async Result.Result<Text, Text> {
        // Ensure the ICP swap functionality has been configured by the owner.
        if (icp_ledger == null or cry_token_ledger == null or cry_tokens_per_icp == null) {
            return #err("ICP swap functionality not configured.");
        };

        // Verify the notification is a valid transfer.
        switch (tx.transfer) {
            case null {
                return #err("Notification was not a transfer.");
            };
            case (?transfer) {
                // Verify the ICP was sent TO this canister.
                if (transfer.to.owner != Principal.fromActor(TokenSwap)) {
                    return #err("This transfer was not for this canister.");
                };

                let sender_principal = transfer.from.owner;
                let icp_received_e8s = transfer.amount;

                // Safely get the configured price.
                let price = Option.get(cry_tokens_per_icp, 0);

                // Calculate the amount of Cry Tokens to send.
                // Assumes both ICP and Cry Token have 8 decimal places.
                // Formula: (icp_e8s * price) / 10^8
                let cry_tokens_to_send = (icp_received_e8s * price) / 100_000_000;

                if (cry_tokens_to_send == 0) {
                    return #err("ICP amount too small to receive any tokens.");
                };

                // Check if we have enough inventory
                if (canister_cry_token_balance < cry_tokens_to_send) {
                    return #err("Insufficient token inventory. Available: " # debug_show(canister_cry_token_balance) # " tokens, Requested: " # debug_show(cry_tokens_to_send) # " tokens.");
                };

                // Create an actor for the Cry Token ledger.
                let cry_ledger_actor = actor_from_principal(Option.get(cry_token_ledger, Principal.fromText("aaaaa-aa")));

                // Prepare the arguments to send Cry Tokens back to the user.
                let payout_args : TransferArgs = {
                    to = { owner = sender_principal; subaccount = null };
                    amount = cry_tokens_to_send;
                    fee = null; from_subaccount = null; memo = null; created_at_time = null;
                };

                // Perform the payout.
                let payout_result = await cry_ledger_actor.icrc1_transfer(payout_args);

                switch (payout_result) {
                    case (#ok(block_index)) {
                        // Deduct from our inventory
                        canister_cry_token_balance -= cry_tokens_to_send;
                        return #ok("Swap successful. Sent " # debug_show(cry_tokens_to_send) # " tokens. Block: " # debug_show(block_index) # ". Remaining inventory: " # debug_show(canister_cry_token_balance));
                    };
                    case (#err(err)) {
                        // In a real-world scenario, you might want to implement a refund mechanism here.
                        return #err("Swap failed during Cry Token payout: " # debug_show(err));
                    };
                };
            };
        };
    };

    /**
     * Allows the owner to withdraw unsold Cry Tokens from the vending machine.
     * @param amount The amount of Cry Tokens to withdraw.
     */
    public shared(msg) func withdraw_vending_inventory(amount: Nat) : async Result.Result<Text, Text> {
        if (owner == null or Option.get(owner, Principal.fromText("aaaaa-aa")) != msg.caller) {
            return #err("Only the owner can withdraw from the vending machine.");
        };
        
        if (cry_token_ledger == null) {
            return #err("Vending machine not configured yet.");
        };

        if (canister_cry_token_balance < amount) {
            return #err("Insufficient inventory. Available: " # debug_show(canister_cry_token_balance));
        };

        let cry_ledger = actor_from_principal(Option.get(cry_token_ledger, Principal.fromText("aaaaa-aa")));
        
        let transfer_args : TransferArgs = {
            to = { owner = msg.caller; subaccount = null };
            amount = amount;
            fee = null;
            from_subaccount = null;
            memo = null;
            created_at_time = null;
        };

        let transfer_result = await cry_ledger.icrc1_transfer(transfer_args);
        
        switch (transfer_result) {
            case (#ok(block_index)) {
                canister_cry_token_balance -= amount;
                return #ok("Withdrew " # debug_show(amount) # " tokens from inventory. Block: " # debug_show(block_index));
            };
            case (#err(err)) {
                return #err("Failed to withdraw from inventory: " # debug_show(err));
            };
        };
    };

    /**
     * Returns the current inventory of Cry Tokens available for sale.
     */
    public query func get_vending_inventory() : async Nat {
        canister_cry_token_balance
    };

    // ==================================================================================
    //  P2P SWAP FUNCTIONS (Unchanged)
    // ==================================================================================

    public shared (msg) func deposit(token : Principal, amount : Nat) : async Result.Result<Nat, Text> {
        let caller = msg.caller;
        if (token != token_a_principal and token != token_b_principal) { return #err("Invalid token principal for this swap canister."); };
        let token_ledger = actor_from_principal(token);
        let transfer_from_args : TransferFromArgs = { from = { owner = caller; subaccount = null }; to = { owner = Principal.fromActor(TokenSwap); subaccount = null }; amount = amount; fee = null; spender_subaccount = null; memo = null; created_at_time = null; };
        let transfer_result = await token_ledger.icrc2_transfer_from(transfer_from_args);
        switch (transfer_result) {
            case (#ok(block_index)) { update_balance(caller, token, amount, true); return #ok(block_index); };
            case (#err(err)) { return #err(debug_show(err)); };
        };
    };

    public shared (_msg) func swap(user_a_principal : Principal, user_b_principal : Principal) : async Result.Result<Text, Text> {
        let user_a_balance_a = get_balance_for(user_a_principal, token_a_principal);
        let user_a_balance_b = get_balance_for(user_a_principal, token_b_principal);
        let user_b_balance_a = get_balance_for(user_b_principal, token_a_principal);
        let user_b_balance_b = get_balance_for(user_b_principal, token_b_principal);
        if (user_a_balance_a == 0 and user_a_balance_b == 0) { return #err("User A has no balance to swap."); };
        if (user_b_balance_a == 0 and user_b_balance_b == 0) { return #err("User B has no balance to swap."); };
        set_balance(user_a_principal, token_a_principal, user_b_balance_a);
        set_balance(user_a_principal, token_b_principal, user_b_balance_b);
        set_balance(user_b_principal, token_a_principal, user_a_balance_a);
        set_balance(user_b_principal, token_b_principal, user_a_balance_b);
        return #ok("Swap successful. Balances have been exchanged.");
    };

    public shared (msg) func withdraw(token : Principal, amount : Nat) : async Result.Result<Nat, Text> {
        let caller = msg.caller;
        let current_balance = get_balance_for(caller, token);
        if (current_balance < amount) { return #err("Insufficient balance to withdraw."); };
        let token_ledger = actor_from_principal(token);
        let transfer_args : TransferArgs = { to = { owner = caller; subaccount = null }; amount = amount; fee = null; from_subaccount = null; memo = null; created_at_time = null; };
        let transfer_result = await token_ledger.icrc1_transfer(transfer_args);
        switch (transfer_result) {
            case (#ok(block_index)) { update_balance(caller, token, amount, false); return #ok(block_index); };
            case (#err(err)) { return #err(debug_show(err)); };
        };
    };

    // ==================================================================================
    //  QUERY & HELPER FUNCTIONS
    // ==================================================================================

    public query func get_balance(user : Principal, token : Principal) : async Nat { 
        return get_balance_for(user, token); 
    };
    
    private func get_balance_for(user : Principal, token : Principal) : Nat { 
        switch (balances.get(user)) { 
            case null { return 0; }; 
            case (?user_balances) { 
                switch (user_balances.get(token)) {
                    case null { return 0; };
                    case (?balance) { return balance; };
                };
            }; 
        }; 
    };
    
    private func set_balance(user : Principal, token : Principal, new_balance : Nat) { 
        let user_balances = switch (balances.get(user)) {
            case null { HashMap.HashMap<Principal, Nat>(2, Principal.equal, Principal.hash); };
            case (?existing) { existing; };
        };
        user_balances.put(token, new_balance); 
        balances.put(user, user_balances); 
    };
    
    private func update_balance(user : Principal, token : Principal, amount : Nat, is_add : Bool) { 
        let current_balance = get_balance_for(user, token); 
        let new_balance = if (is_add) { 
            current_balance + amount 
        } else { 
            let result = Int.abs(current_balance - amount);
            if (current_balance >= amount) result else 0
        }; 
        set_balance(user, token, new_balance); 
    };
    
    private func actor_from_principal(p : Principal) : ICRC2Ledger { 
        return actor(Principal.toText(p)); 
    };
}