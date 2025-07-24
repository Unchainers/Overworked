import { createContext } from "react";
import {
  AccountBriefInformation,
  TownTalkContextType,
} from "@/types/town-talk-types";
import { AccountVisibleInformation } from "../../../declarations/towntalk/towntalk.did";

const TownTalkContext = createContext<TownTalkContextType>({
  userAccounts: [],
  townTalkCanisterID: undefined,
  isLoading: true,
  actor: null,
  setUserAccounts: (userAccounts: Array<AccountBriefInformation>) => {},
  verifySession: async () => false,
  fetchUserAccounts: async () => {},
  setIsLoading: (isLoading: boolean) => {},
  logout: () => {},
});

export default TownTalkContext;
