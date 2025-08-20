import React, { useMemo, useState } from "react";
import { canisterId, createActor } from "../../../declarations/storage";
import type {
  StoredFile,
  FileUploadResolveType,
} from "../../../declarations/storage/storage.did";
import StorageContext from "@/contexts/storage-context";
import { FileChunks, getFileChunks } from "@/lib/utils";

export default function StorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const actor = useMemo(() => {
    if (!canisterId) {
      console.warn("Storage canister ID not defined.");
      return null;
    }
    return createActor(canisterId);
  }, [canisterId]);

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

  async function uploadFile(file: FileChunks): Promise<boolean> {
    try {
      const { chunks, ...fileProps } = file;
      // Add File
      const file_id = 10;

      // Upload chunks
      chunks.forEach((chunk) => {
        const res = /* uploadChunks(file_id, chunk); */ chunk;
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  async function uploadFiles(
    files: Array<File>,
  ): Promise<
    Array<[file_id: string, resolve_id: FileUploadResolveType, message: string]>
  > {
    try {
      files.forEach(async (file) => {
        const fileChunks = await getFileChunks(file);
        uploadFile(fileChunks);
      });

      // const results: Array<
      //   [file_id: string, resolve_id: FileUploadResolveType, message: string]
      // > = (await actor?.upload_files(files)) ?? [];

      // return results;
      return [];
    } catch {
      console.error("Failed to get files.");
      return [];
    }
  }

  return (
    <StorageContext.Provider
      value={{
        storageCanisterID: canisterId,
        isLoading,
        actor,
        getFilesByID,
        uploadFile,
        uploadFiles,
        setIsLoading,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
