import React, { useMemo, useState } from "react";
import { canisterId, createActor } from "../../../declarations/storage";
import type {
  StoredFile,
  PaginatorResponse,
} from "../../../declarations/storage/storage.did";
import StorageContext from "@/contexts/storage-context";
import { FileChunks, getFileChunks } from "@/lib/utils";
import { FileUploadResolveType } from "@/types/storage-types";

export default function StorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileInUpload, setFileInUpload] = useState<string>("");
  const [fileIndex, setFileIndex] = useState<number>(0);

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

  async function getFileByID(file_id: string): Promise<StoredFile | undefined> {
    try {
      // fetch metadata (without data)
      const canisterFile = await actor?.get_file_by_id(file_id);
      if (!canisterFile) return undefined;

      const chunkSize = 1024 * 1024; // 1MB chunks (tune this)
      let chunkIndex = 0;
      let chunks: Uint8Array[] = [];

      while (true) {
        const chunk: Uint8Array<ArrayBufferLike> | number[] | undefined =
          await actor?.get_bytes(
            file_id,
            BigInt(chunkSize),
            BigInt(chunkIndex),
          );

        if (!chunk || chunk.length === 0) {
          break; // no more chunks
        }

        chunks.push(new Uint8Array(chunk));
        chunkIndex++;
      }

      // merge chunks into one Uint8Array
      const totalSize = chunks.reduce((acc, c) => acc + c.length, 0);
      const data = new Uint8Array(totalSize);
      let offset = 0;
      for (const c of chunks) {
        data.set(c, offset);
        offset += c.length;
      }

      if (!canisterFile.length) {
        return undefined;
      }

      const file = { ...canisterFile[0], data } as StoredFile;

      // construct File
      // return convertToFiles([file])[0];
      return file;
    } catch (err) {
      console.error("Error fetching file:", err);
      return undefined;
    }
  }

  async function getFilesByID(
    file_ids: Array<string>,
  ): Promise<Array<StoredFile>> {
    try {
      const files = (
        await Promise.all(file_ids.map(async (id) => await getFileByID(id)))
      ).filter((f) => f !== undefined);

      return files;
    } catch {
      console.error("Failed to get files.");
      return [];
    }
  }

  async function uploadFile(
    file: FileChunks,
    props: StoredFile,
  ): Promise<
    [file_id: string, resolve_id: FileUploadResolveType, message: string]
  > {
    try {
      const { chunks } = file;
      // Add File
      const file_id = await actor?.add_file(props);

      if (file_id?.length) {
        // Upload chunks
        chunks.forEach(async (chunk, idx) => {
          const uint8 = new Uint8Array(chunk);
          const res = await actor?.add_bytes(
            file_id[0],
            uint8,
            idx == chunks.length - 1,
          );

          if (!res) {
            setUploadProgress(0);
            throw new Error("Failed to upload bytes.");
          } else {
            setUploadProgress((idx + 1) / chunks.length);
          }
        });
      } else {
        throw new Error("Failed to add file.");
      }

      setUploadProgress(1);
      return [file_id[0], FileUploadResolveType.SuccessfullyUploaded, ""];
    } catch (err) {
      return ["-1", FileUploadResolveType.FailedToUpload, ""];
    }
  }

  async function uploadFiles(
    files: Array<{ file: File; props: StoredFile }>,
  ): Promise<
    Array<[file_id: string, resolve_id: FileUploadResolveType, message: string]>
  > {
    try {
      const resolves = await Promise.all(
        files.map(async (file) => {
          const fileChunks = await getFileChunks(file.file);
          return await uploadFile(fileChunks, file.props);
        }),
      );
      return resolves;
    } catch {
      console.error("Failed to get files.");
      return [];
    }
  }

  // async function getFiles(
  //   per_page: number,
  //   page: number,
  //   is_public: boolean,
  //   owned: boolean,
  // ): Promise<PaginatorResponse | undefined> {
  //   try {
  //     const files = await actor?.get_files(
  //       BigInt(per_page),
  //       BigInt(page),
  //       is_public,
  //       owned,
  //     );

  //     return files;
  //   } catch (err) {
  //     return undefined;
  //   }
  // }

  return (
    <StorageContext.Provider
      value={{
        storageCanisterID: canisterId,
        isLoading,
        uploadProgress,
        actor,
        fileInUpload,
        fileIndex,
        getFileByID,
        getFilesByID,
        uploadFile,
        uploadFiles,
        setUploadProgress,
        setIsLoading,
        setFileInUpload,
        setFileIndex,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
