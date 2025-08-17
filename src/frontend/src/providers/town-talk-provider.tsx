import {
  convertToFile,
  convertToFiles,
  deleteCookie,
  getCookie,
} from "@/lib/utils";
import TownTalkContext from "@/contexts/town-talk-context";
import React, { useEffect, useMemo, useState } from "react";
import { canisterId, createActor } from "../../../declarations/towntalk";
import { AccountBriefInformation } from "@/types/town-talk-types";
import useStorage from "@/hooks/use-storage";
import { Principal } from "@dfinity/principal";

export default function TownTalkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAccounts, setUserAccounts] = useState<
    Array<AccountBriefInformation>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const townTalkAccountIDCookieKey = "town_talk_account_id";
  const [activeAccountID, setActiveAccountID] = useState<string | undefined>(
    getCookie(townTalkAccountIDCookieKey),
  );

  const { storageCanisterID } = useStorage();

  const actor = useMemo(() => {
    if (!canisterId) {
      console.warn("TownTalk canister ID not defined.");
      return null;
    }
    return createActor(canisterId);
  }, [canisterId]);

  async function setAccount() {
    if (actor) {
      try {
        const account = await actor.get_account(
          getCookie(townTalkAccountIDCookieKey)!,
          Principal.fromText(storageCanisterID!),
        );

        if (account.length) {
          localStorage.setItem("town_talk_account", JSON.stringify(account));
        }
      } catch (err) {
      } finally {
      }
    }
  }

  useEffect(() => {
    setAccount();
  }, []);

  async function fetchUserAccounts(): Promise<void> {
    if (actor) {
      try {
        const userAccounts = await actor.get_user_accounts(
          Principal.fromText(storageCanisterID ?? ""),
        );

        setUserAccounts(
          userAccounts.map((acc) => ({
            ...acc,
            profile_picture: acc.profile_picture.length
              ? convertToFile(acc.profile_picture[0])
              : undefined,
          })),
        );
      } catch (err) {
        console.log("fetchUserAccounts failed: ", err);
        setUserAccounts([]);
      }
    } else {
      console.log("empty because of empty actor");
      setUserAccounts([]);
    }
  }

  useEffect(() => {
    fetchUserAccounts();
  }, []);

  async function verifySession(): Promise<boolean> {
    const account_id = getCookie(townTalkAccountIDCookieKey);
    if (!account_id || !canisterId) return false;

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
    deleteCookie(townTalkAccountIDCookieKey);
  }

  useEffect(() => {
    setIsLoading(true);
    verifySession()
      .then((isValid) => {
        if (isValid) {
          setIsAuth(true);
          setAccount();
        } else {
          deleteCookie(townTalkAccountIDCookieKey);
          localStorage.removeItem("town_talk_account");
          setIsAuth(false);
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
        townTalkCanisterID: canisterId,
        verifySession,
        fetchUserAccounts,
        isLoading,
        setIsLoading,
        actor,
        townTalkAccountIDCookieKey,
        logout,
        isAuth,
        setIsAuth,
        activeAccountID,
        setActiveAccountID,
      }}
    >
      {children}
    </TownTalkContext.Provider>
  );
}
