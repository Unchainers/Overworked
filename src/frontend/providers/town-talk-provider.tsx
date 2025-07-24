import { deleteCookie, getCookie } from "@/lib/utils";
import TownTalkContext from "contexts/town-talk-context";
import React, { useEffect, useMemo, useState } from "react";
import { createActor } from "../../declarations/towntalk";
import type { AccountVisibleInformation } from "../../declarations/towntalk/towntalk.did";

export default function TownTalkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAccounts, setUserAccounts] = useState<
    Array<AccountVisibleInformation>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const townTalkCanisterID = import.meta.env
    .VITE_CANISTER_ID_TOWNTALK as string;

  const actor = useMemo(() => {
    if (!townTalkCanisterID) {
      console.warn("TownTalk canister ID not defined.");
      return null;
    }
    return createActor(townTalkCanisterID);
  }, [townTalkCanisterID]);

  async function fetchUserAccounts(): Promise<void> {
    if (actor) {
      try {
        const userAccounts = await actor.get_user_accounts();

        setUserAccounts(userAccounts);
      } catch (err) {
        console.error("fetchUserAccounts failed: ", err);
        setUserAccounts([]);
      }
    } else {
      setUserAccounts([]);
    }
  }

  async function verifySession(): Promise<boolean> {
    const account_id = getCookie("town_talk_account_id");
    if (!account_id || !townTalkCanisterID) return false;

    if (actor) {
      try {
        const isValid = await actor.verify_login(account_id);

        return isValid;
      } catch (err) {
        console.error("verifySession failed: ", err);
        return false;
      }
    } else {
      return false;
    }
  }

  function logout() {
    deleteCookie("town_talk_account_id");
  }

  useEffect(() => {
    setIsLoading(true);
    verifySession()
      .then((isValid) => {
        if (isValid) {
          setUserAccounts([]);
        } else {
          fetchUserAccounts().then(() => {});
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <TownTalkContext.Provider
      value={{
        userAccounts,
        setUserAccounts,
        townTalkCanisterID,
        verifySession,
        fetchUserAccounts,
        isLoading,
        setIsLoading,
        actor,
        logout,
      }}
    >
      {children}
    </TownTalkContext.Provider>
  );
}
