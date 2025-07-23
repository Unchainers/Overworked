import type {
  AccountVisibleInformation,
  _SERVICE,
} from "../../declarations/towntalk/towntalk.did";
import type { ActorSubclass } from "@dfinity/agent";

export interface TownTalkContextType {
  userAccounts: Array<AccountVisibleInformation>;
  townTalkCanisterID: string | undefined;
  isLoading: boolean;
  actor: ActorSubclass<_SERVICE> | null;

  setUserAccounts: (userAccounts: Array<AccountVisibleInformation>) => void;
  verifySession: () => Promise<boolean>;
  fetchUserAccounts: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
}
