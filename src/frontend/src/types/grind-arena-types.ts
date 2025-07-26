
import type { _SERVICE } from "../../../declarations/grindarena/grindarena.did";
import type { ActorSubclass } from "@dfinity/agent";

export interface Account {
    id: string,
    username: string,
    profile_picture: File
}

export interface GrindArenaContextTypes {
    grindArenaCanisterId: String,
    userAccounts: Array<Account>,
    actor: ActorSubclass<_SERVICE> | null,
    grindArenaAccountIDCookieKey: string;
    isLoading: boolean,
    isAuth: boolean

    setUserAccounts: (userAccounts: Array<Account>) => void,
    verifySession: () => Promise<boolean>,
    setLoading: (isLoading: boolean) => void,
    logout: () => void,
    setAuth: (isAuth:boolean) => void
} 