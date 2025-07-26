import { ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import {
  _SERVICE,
  FileUploadResolveType,
  StoredFile,
} from "../../../declarations/storage/storage.did";

export interface StorageContextType {
  storageCanisterID: string | undefined;
  isLoading: boolean;
  actor: ActorSubclass<_SERVICE> | null;
  getFilesByID: (file_ids: Array<string>) => Promise<Array<File>>;
  uploadFiles: (
    files: Array<StoredFile>,
  ) => Promise<
    Array<[file_id: string, resolve_id: FileUploadResolveType, message: string]>
  >;
  setIsLoading: (isLoading: boolean) => void;
}
