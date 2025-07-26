import {
  convertToFile,
  convertToFiles,
  deleteCookie,
  getCookie,
} from "@/lib/utils";
import TownTalkContext from "@/contexts/town-talk-context";
import React, { useEffect, useMemo, useState } from "react";
import { createActor } from "../../../declarations/towntalk";
import { AccountBriefInformation } from "@/types/town-talk-types";
import useStorage from "@/hooks/use-storage";

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
  const townTalkCanisterID = import.meta.env
    .VITE_CANISTER_ID_TOWNTALK as string;
  const townTalkAccountIDCookieKey = "town_talk_account_id";

  const { storageCanisterID } = useStorage();

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
        const userAccounts = await actor.get_user_accounts(storageCanisterID!);
        setUserAccounts(
          userAccounts.map((acc) => ({
            ...acc,
            profile_picture: acc.profile_picture.length
              ? convertToFile(acc.profile_picture[0])
              : undefined,
          })),
        );
      } catch (err) {
        console.error("fetchUserAccounts failed: ", err);
        setUserAccounts([]);
      }
    } else {
      setUserAccounts([]);
    }
  }

  async function verifySession(): Promise<boolean> {
    const account_id = getCookie(townTalkAccountIDCookieKey);
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
    deleteCookie(townTalkAccountIDCookieKey);
  }

  useEffect(() => {
    setIsLoading(true);
    verifySession()
      .then((isValid) => {
        if (isValid) {
          setUserAccounts([]);
          setIsAuth(true);
        } else {
          deleteCookie(townTalkAccountIDCookieKey);
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
        townTalkCanisterID,
        verifySession,
        fetchUserAccounts,
        isLoading,
        setIsLoading,
        actor,
        townTalkAccountIDCookieKey,
        logout,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </TownTalkContext.Provider>
  );
}
