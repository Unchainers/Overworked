import useStorage from "@/hooks/use-storage";
import { AccountBriefInformation } from "@/types/grind-arena-types";
import { useMemo, useState } from "react";
import { createActor } from "../../../declarations/grindarena";
import { convertToFile, deleteCookie, getCookie } from "@/lib/utils";
import GrindArenaContext from "../contexts/grind-arena-context"

export default function GrindArenaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAccounts, setUserAccounts] = useState<Array<AccountBriefInformation>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isAuth, setAuth] = useState<boolean>(false);
  const grindArenaCanisterId = import.meta.env
    .VITE_CANISTER_ID_GRINDARENA as string;
  const grindArenaAccountIDCookieKey = "grind_arena_account_id";

  const { storageCanisterID } = useStorage();

  const actor = useMemo(() => {
    if (!grindArenaCanisterId) {
      console.warn("TownTalk canister ID not defined.");
      return null;
    }
    return createActor(grindArenaCanisterId);
  }, [grindArenaCanisterId]);

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
    const account_id = getCookie(grindArenaAccountIDCookieKey);
    if (!account_id || !grindArenaCanisterId) return false;

    if (actor) {
      try {
        // const isValid = await actor.verify_login(account_id);
        const isValid = true;

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
    deleteCookie(grindArenaAccountIDCookieKey);
  }

  return <GrindArenaContext.Provider value={{
    grindArenaCanisterId,
    userAccounts,
    actor,
    grindArenaAccountIDCookieKey,
    isLoading,
    isAuth,

    setLoading,
    verifySession,
    setUserAccounts,
    setAuth,
    logout
  }}>{children}</GrindArenaContext.Provider>
}
