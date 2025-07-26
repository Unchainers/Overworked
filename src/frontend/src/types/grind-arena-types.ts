
import type { _SERVICE } from "../../../declarations/grindarena/grindarena.did";
import type { ActorSubclass } from "@dfinity/agent";

export interface AccountBriefInformation {
  id: string;
  username: string;
  profile_picture?: File;
}

export interface GrindArenaContextTypes {
    grindArenaCanisterId: String,
    userAccounts: Array<AccountBriefInformation>,
    actor: ActorSubclass<_SERVICE> | null,
    grindArenaAccountIDCookieKey: string;
    isLoading: boolean,
    isAuth: boolean

    setUserAccounts: (userAccounts: Array<AccountBriefInformation>) => void,
    verifySession: () => Promise<boolean>,
    setLoading: (isLoading: boolean) => void,
    logout: () => void,
    setAuth: (isAuth:boolean) => void
} 