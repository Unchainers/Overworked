import { createContext } from "react";
import { HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import type {
  Account,
  Tokens,
  TransferArg,
  TransferResult,
  ApproveArgs,
  ApproveResult,
  AllowanceArgs,
  Allowance,
  TransferFromArgs,
  TransferFromResult,
  MetadataValue,
  StandardRecord,
} from "../../../declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";

export interface CryTokenContextType {
  agent: HttpAgent | null;
  tokenCanisterID: Principal | null;
  icpCanisterID: Principal | null;
  isLoading: boolean;
  cryCanister: IcrcLedgerCanister | null;
}

const CryTokenContext = createContext<CryTokenContextType>({
  agent: null,
  tokenCanisterID: null,
  icpCanisterID: null,
  isLoading: true,
  cryCanister: null
});

export default CryTokenContext;
