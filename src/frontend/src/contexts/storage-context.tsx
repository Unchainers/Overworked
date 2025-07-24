import { createContext } from "react";
import { StorageContextType } from "@/types/storage-types";
import { StoredFile } from "../../../declarations/storage/storage.did";

const StorageContext = createContext<StorageContextType>({
  storageCanisterID: undefined,
  isLoading: true,
  actor: null,
  getFilesByID: async (file_ids: Array<string>) => [],
  uploadFiles: async (files: Array<StoredFile>) => [],
  setIsLoading: (isLoading: boolean) => {},
});

export default StorageContext;
