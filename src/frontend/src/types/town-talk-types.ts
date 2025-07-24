import type { _SERVICE } from "../../../declarations/towntalk/towntalk.did";
import type { ActorSubclass } from "@dfinity/agent";

export interface AccountBriefInformation {
  id: string;
  username: string;
  profile_picture?: File;
}

export interface TownTalkContextType {
  userAccounts: Array<AccountBriefInformation>;
  townTalkCanisterID: string | undefined;
  isLoading: boolean;
  actor: ActorSubclass<_SERVICE> | null;

  setUserAccounts: (userAccounts: Array<AccountBriefInformation>) => void;
  verifySession: () => Promise<boolean>;
  fetchUserAccounts: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}
