import { ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import {
  _SERVICE,
  PaginatorResponse,
  StoredFile,
} from "../../../declarations/storage/storage.did";
import { FileChunks } from "@/lib/utils";

export enum FileUploadResolveType {
  NotAuthorized,
  SuccessfullyUploaded,
  FailedToUpload,
  AlreadyUploaded,
}

export interface StorageContextType {
  storageCanisterID: string | undefined;
  isLoading: boolean;
  uploadProgress: number;
  actor: ActorSubclass<_SERVICE> | null;
  fileInUpload: string;
  fileIndex: number;
  getFileByID: (file_id: string) => Promise<StoredFile | undefined>;
  getFilesByID: (file_ids: Array<string>) => Promise<Array<StoredFile>>;
  uploadFile: (
    file: FileChunks,
    props: StoredFile,
  ) => Promise<
    [file_id: string, resolve_id: FileUploadResolveType, message: string]
  >;
  uploadFiles: (
    files: Array<{ file: File; props: StoredFile }>,
  ) => Promise<
    Array<[file_id: string, resolve_id: FileUploadResolveType, message: string]>
  >;
  // getFiles: (
  //   per_page: number,
  //   page: number,
  //   is_public: boolean,
  //   owned: boolean,
  // ) => Promise<PaginatorResponse | undefined>;
  setUploadProgress: (progress: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFileInUpload: (file: string) => void;
  setFileIndex: (index: number) => void;
}
