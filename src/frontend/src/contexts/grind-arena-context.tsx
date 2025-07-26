import { createContext } from "react";
import { Account, GrindArenaContextTypes } from "../types/grind-arena-types";

const GrindArenaContext = createContext<GrindArenaContextTypes>({
    grindArenaCanisterId: "",
    userAccounts: [],
    actor: null,
    grindArenaAccountIDCookieKey: "grind_arena_account_id",
    isAuth: false,
    isLoading: false,

    setUserAccounts: (userAccounts: Array<Account>) => {},
    verifySession: async() => false,
    setLoading: (isLoading:boolean) => {},
    logout: () => {},
    setAuth: (isAuth:boolean) => {}
});

export default GrindArenaContext;