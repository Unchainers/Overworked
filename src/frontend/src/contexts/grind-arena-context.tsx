import { createContext } from "react";
import {
  AccountBriefInformation,
  GrindArenaContextTypes,
} from "../types/grind-arena-types";

const GrindArenaContext = createContext<GrindArenaContextTypes>({
  userAccounts: [],
  actor: null,
  grindArenaAccountIDCookieKey: "grind_arena_account_id",
  isAuth: false,
  isLoading: false,

  setUserAccounts: (userAccounts: Array<AccountBriefInformation>) => {},
  verifySession: async () => false,
  setLoading: (isLoading: boolean) => {},
  logout: () => {},
  setAuth: (isAuth: boolean) => {},
});

export default GrindArenaContext;
