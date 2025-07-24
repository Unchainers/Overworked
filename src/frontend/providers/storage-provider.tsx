import React, { useMemo, useState } from "react";
import { createActor } from "../../declarations/storage";
import type {
  StoredFile,
  FileUploadResolveType,
} from "../../declarations/storage/storage.did";
import StorageContext from "contexts/storage-context";

export default function StorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const storageCanisterID = import.meta.env.VITE_CANISTER_ID_STORAGE as string;

  const actor = useMemo(() => {
    if (!storageCanisterID) {
      console.warn("Storage canister ID not defined.");
      return null;
    }
    return createActor(storageCanisterID);
  }, [storageCanisterID]);

  function convertToFiles(fetchedFiles: Array<StoredFile>): Array<File> {
    return fetchedFiles.map(
      (f) =>
        new File([new Uint8Array(f.data)], f.name, { type: f.mime_type ?? "" }),
    );
  }

  async function getFilesByID(file_ids: Array<string>): Promise<Array<File>> {
    try {
      const canisterFiles: Array<StoredFile> =
        (await actor?.get_files_by_id(file_ids)) ?? [];

      return convertToFiles(canisterFiles);
    } catch {
      console.error("Failed to get files.");
      return [];
    }
  }

  async function uploadFiles(
    files: Array<StoredFile>,
  ): Promise<
    Array<[file_id: string, resolve_id: FileUploadResolveType, message: string]>
  > {
    try {
      const results: Array<
        [file_id: string, resolve_id: FileUploadResolveType, message: string]
      > = (await actor?.upload_files(files)) ?? [];

      return results;
    } catch {
      console.error("Failed to get files.");
      return [];
    }
  }

  return (
    <StorageContext.Provider
      value={{
        storageCanisterID,
        isLoading,
        actor,
        getFilesByID,
        uploadFiles,
        setIsLoading,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
