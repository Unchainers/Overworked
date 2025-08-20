import { createContext } from "react";
import { StorageContextType } from "@/types/storage-types";
import { FileChunks } from "@/lib/utils";

const StorageContext = createContext<StorageContextType>({
  storageCanisterID: undefined,
  isLoading: true,
  actor: null,
  getFilesByID: async (file_ids: Array<string>) => [],
  uploadFile: async (file: FileChunks) => true,
  uploadFiles: async (files: Array<File>) => [],
  setIsLoading: (isLoading: boolean) => {},
});

export default StorageContext;
