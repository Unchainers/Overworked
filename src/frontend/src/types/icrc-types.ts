// icrc.ts

// Types for ICRC-1 and ICRC-2

export type Subaccount = Uint8Array; // 32 bytes
export type Principal = string; // textual representation

export interface Account {
  owner: Principal;
  subaccount?: Subaccount | null;
}

export type Tokens = bigint; // Nat
export type Timestamp = bigint; // Nat64

export type MetadataValue =
  | { Nat: Tokens }
  | { Int: bigint }
  | { Text: string }
  | { Blob: Uint8Array };

export interface TransferArg {
  from_subaccount?: Subaccount | null;
  to: Account;
  amount: Tokens;
  fee?: Tokens | null;
  memo?: Uint8Array | null;
  created_at_time?: Timestamp | null;
}

export type TransferError =
  | { BadFee: { expected_fee: Tokens } }
  | { BadBurn: { min_burn_amount: Tokens } }
  | { InsufficientFunds: { balance: Tokens } }
  | { TooOld: null }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { Duplicate: { duplicate_of: bigint } }
  | { TemporarilyUnavailable: null }
  | { GenericError: { error_code: bigint; message: string } };

export type TransferResult =
  | { Ok: bigint } // BlockIndex
  | { Err: TransferError };

export interface StandardRecord {
  name: string;
  url: string;
}

// ICRC-2 types
export interface ApproveArgs {
  from_subaccount?: Subaccount | null;
  spender: Account;
  amount: Tokens;
  expected_allowance?: Tokens | null;
  expires_at?: Timestamp | null;
  fee?: Tokens | null;
  memo?: Uint8Array | null;
  created_at_time?: Timestamp | null;
}

export type ApproveError =
  | { BadFee: { expected_fee: Tokens } }
  | { InsufficientFunds: { balance: Tokens } }
  | { AllowanceChanged: { current_allowance: Tokens } }
  | { Expired: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { Duplicate: { duplicate_of: bigint } }
  | { TemporarilyUnavailable: null }
  | { GenericError: { error_code: bigint; message: string } };

export type ApproveResult =
  | { Ok: bigint }
  | { Err: ApproveError };

export interface AllowanceArgs {
  account: Account;
  spender: Account;
}

export interface Allowance {
  allowance: Tokens;
  expires_at?: Timestamp | null;
}

export interface TransferFromArgs {
  spender_subaccount?: Subaccount | null;
  from: Account;
  to: Account;
  amount: Tokens;
  fee?: Tokens | null;
  memo?: Uint8Array | null;
  created_at_time?: Timestamp | null;
}

export type TransferFromError =
  | { BadFee: { expected_fee: Tokens } }
  | { BadBurn: { min_burn_amount: Tokens } }
  | { InsufficientFunds: { balance: Tokens } }
  | { InsufficientAllowance: { allowance: Tokens } }
  | { TooOld: null }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { Duplicate: { duplicate_of: bigint } }
  | { TemporarilyUnavailable: null }
  | { GenericError: { error_code: bigint; message: string } };

export type TransferFromResult =
  | { Ok: bigint }
  | { Err: TransferFromError };

// ICRC-1 and ICRC-2 method signatures (for use with @dfinity/agent or candid-js)
export interface ICRC1_2Service {
  // ICRC-1
  icrc1_name(): Promise<string>;
  icrc1_symbol(): Promise<string>;
  icrc1_decimals(): Promise<number>;
  icrc1_metadata(): Promise<[string, MetadataValue][]>;
  icrc1_total_supply(): Promise<Tokens>;
  icrc1_fee(): Promise<Tokens>;
  icrc1_minting_account(): Promise<Account | null>;
  icrc1_balance_of(account: Account): Promise<Tokens>;
  icrc1_transfer(args: TransferArg): Promise<TransferResult>;
  icrc1_supported_standards(): Promise<StandardRecord[]>;

  // ICRC-2
  icrc2_approve(args: ApproveArgs): Promise<ApproveResult>;
  icrc2_allowance(args: AllowanceArgs): Promise<Allowance>;
  icrc2_transfer_from(args: TransferFromArgs): Promise<TransferFromResult>;
}