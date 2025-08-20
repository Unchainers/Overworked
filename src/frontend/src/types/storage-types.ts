import { ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import {
  _SERVICE,
  FileUploadResolveType,
  StoredFile,
} from "../../../declarations/storage/storage.did";
import { FileChunks } from "@/lib/utils";

export interface StorageContextType {
  storageCanisterID: string | undefined;
  isLoading: boolean;
  actor: ActorSubclass<_SERVICE> | null;
  getFilesByID: (file_ids: Array<string>) => Promise<Array<File>>;
  uploadFile: (file: FileChunks) => Promise<boolean>;
  uploadFiles: (
    files: Array<File>,
  ) => Promise<
    Array<[file_id: string, resolve_id: FileUploadResolveType, message: string]>
  >;
  setIsLoading: (isLoading: boolean) => void;
}
