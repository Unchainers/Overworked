import React, { useMemo, useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { HttpAgent, ActorSubclass } from "@dfinity/agent";
import CryTokenContext from "@/contexts/cry-token-context";
import { createActor } from "../../../declarations/icrc1_ledger_canister";
import type { _SERVICE } from "../../../declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";
import { createAgent } from "@dfinity/utils";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { AuthClient } from "@dfinity/auth-client";
import { useAuth } from "@/hooks/use-auth-client";
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

export default function CryCanisterAgentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [agent, setAgent] = useState<HttpAgent | null>(null);
  const [tokenActor, setTokenActor] = useState<ActorSubclass<_SERVICE> | null>(
    null,
  );
  const [cryCanister, setCryCanister] = useState<IcrcLedgerCanister | null>(
    null,
  );

  const { identity, isAuthenticated } = useAuth();

  const tokenCanisterID = useMemo(() => {
    const id = import.meta.env.CANISTER_ID_ICRC1_LEDGER_CANISTER;
    return id ? Principal.fromText(id) : null;
  }, []);

  const icpCanisterID = useMemo(() => {
    const id = import.meta.env.CANISTER_ID_ICP_LEDGER_CANISTER;
    return id ? Principal.fromText(id) : null;
  }, []);

  // Initialize agent and token actor
  useEffect(() => {
    async function initializeAgent() {
      try {
        setIsLoading(true);

        // Handle unauthenticated state gracefully
        if (!isAuthenticated || !identity) {
          console.log("User not authenticated, clearing agent and canister");
          setAgent(null);
          setCryCanister(null);
          setIsLoading(false);
          return;
        }

        // Check if token canister ID is available
        if (!tokenCanisterID) {
          console.warn("Token canister ID not available");
          setAgent(null);
          setCryCanister(null);
          setIsLoading(false);
          return;
        }

        // Create agent for the IC network

        const agent = await createAgent({
          identity, // your authenticated identity
          host:
            process.env.NODE_ENV === "development"
              ? "http://localhost:4943"
              : "https://icp0.io", // mainnet gateway
        });

        const cryCanister = IcrcLedgerCanister.create({
          agent,
          canisterId: tokenCanisterID,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize agent:", error);
        setIsLoading(false);
      }
    }

    initializeAgent();
  }, [tokenCanisterID, identity, isAuthenticated]);

  return (
    <CryTokenContext.Provider
      value={{
        agent,
        tokenCanisterID,
        icpCanisterID,
        isLoading,
        cryCanister,
      }}
    >
      {children}
    </CryTokenContext.Provider>
  );
}
