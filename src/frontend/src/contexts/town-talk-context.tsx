import { createContext } from "react";
import {
  AccountBriefInformation,
  TownTalkContextType,
} from "@/types/town-talk-types";
import { AccountVisibleInformation } from "../../../declarations/towntalk/towntalk.did";
import { boolean } from "zod";

const TownTalkContext = createContext<TownTalkContextType>({
  userAccounts: [],
  townTalkCanisterID: undefined,
  isLoading: true,
  actor: null,
  townTalkAccountIDCookieKey: "town_talk_account_id",
  isAuth: false,
  activeAccountID: undefined,
  setUserAccounts: (userAccounts: Array<AccountBriefInformation>) => {},
  verifySession: async () => false,
  fetchUserAccounts: async () => {},
  setIsLoading: (isLoading: boolean) => {},
  logout: () => {},
  setIsAuth: (isAuth: boolean) => {},
  setActiveAccountID: (accountID: string | undefined) => {},
});

export default TownTalkContext;
