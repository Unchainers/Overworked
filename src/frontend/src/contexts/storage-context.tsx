import { createContext } from "react";
import { FileUploadResolveType, StorageContextType } from "@/types/storage-types";
import { FileChunks } from "@/lib/utils";
import { StoredFile } from "../../../declarations/storage/storage.did";

const StorageContext = createContext<StorageContextType>({
  storageCanisterID: undefined,
  isLoading: true,
  uploadProgress: 0,
  actor: null,
  fileInUpload: "",
  fileIndex: 0,
  getFileByID: async (file_id: string) => undefined,
  getFilesByID: async (file_ids: Array<string>) => [],
  uploadFile: async (file: FileChunks, props: StoredFile) => [
    "",
    FileUploadResolveType.SuccessfullyUploaded,
    "",
  ],
  uploadFiles: async (files: Array<{ file: File; props: StoredFile }>) => [],
  setIsLoading: (isLoading: boolean) => {},
  setUploadProgress: (progress: number) => {},
  setFileInUpload: (file: string) => {},
  setFileIndex: (index: number) => {},
});

export default StorageContext;
