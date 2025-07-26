import useStorage from "@/hooks/use-storage";
import { AccountBriefInformation } from "@/types/grind-arena-types";
import { useEffect, useMemo, useState } from "react";
import { canisterId, createActor } from "../../../declarations/grindarena";
import { convertToFile, deleteCookie, getCookie } from "@/lib/utils";
import GrindArenaContext from "../contexts/grind-arena-context";
import { Principal } from "@dfinity/principal";

export default function GrindArenaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAccounts, setUserAccounts] = useState<
    Array<AccountBriefInformation>
  >([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isAuth, setAuth] = useState<boolean>(false);
  const grindArenaAccountIDCookieKey = "grind_arena_account_id";

  const { storageCanisterID } = useStorage();

  const actor = useMemo(() => {
    if (!canisterId) {
      console.warn("TownTalk canister ID not defined.");
      return null;
    }
    return createActor(canisterId);
  }, [canisterId]);

  async function fetchUserAccounts(): Promise<void> {
    if (actor) {
      try {
        const userAccounts = await actor.get_user_accounts(Principal.fromText(storageCanisterID ?? ""));
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
    if (!account_id || !canisterId) return false;

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

  useEffect(() => {
    setLoading(true);
    verifySession()
      .then((isValid) => {
        if (isValid) {
          setUserAccounts([]);
          setAuth(true);
        } else {
          deleteCookie(grindArenaAccountIDCookieKey);
          setAuth(false);
          fetchUserAccounts().then(() => {});
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <GrindArenaContext.Provider
      value={{
        userAccounts,
        actor,
        grindArenaAccountIDCookieKey,
        isLoading,
        isAuth,

        setLoading,
        verifySession,
        setUserAccounts,
        setAuth,
        logout,
      }}
    >
      {children}
    </GrindArenaContext.Provider>
  );
}
