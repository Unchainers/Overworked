import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { StoredFile } from "../../../declarations/storage/storage.did";
import imageCompression, { Options } from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(key: string): string | undefined {
  const cookies = document.cookie.split("; ");
  const target = cookies.find((cookie) => cookie.startsWith(key + "="));
  return target ? decodeURIComponent(target.split("=")[1]) : undefined;
}

export function setCookie(
  key: string,
  value: string,
  max_age: number = 7200,
  path: string = "/",
) {
  document.cookie = `${key}=${encodeURIComponent(value)}; max-age=${max_age}; path=${path}`;
}

export function deleteCookie(key: string) {
  setCookie(key, "", 0);
}

export function convertToFiles(fetchedFiles: Array<StoredFile>): Array<File> {
  return fetchedFiles.map(
    (f) =>
      new File([new Uint8Array(f.data)], f.name, { type: f.mime_type ?? "" }),
  );
}

export function convertToFile(fetchedFile?: StoredFile): File | undefined {
  if (fetchedFile === undefined) return undefined;
  return new File([new Uint8Array(fetchedFile.data)], fetchedFile.name, {
    type: fetchedFile.mime_type ?? "",
  });
}

export async function compressFile({
  file,
  maxSizeMB = 2,
  maxWidthOrHeight,
  onProgress = (progress: number) => console.log(progress),
  useWebWorker = true,
  libURL = "https://cdn.jsdelivr.net/npm/browser-image-compression/dist/browser-image-compression.js",
  preserveExif = true,
  signal = undefined,
  maxIteration = 10,
  alwaysKeepResolution = true,
}: {
  file: File;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  onProgress: (progress: number) => void;
  useWebWorker: boolean;
  libURL: string;
  preserveExif: boolean;
  signal: AbortSignal | undefined;
  maxIteration: number;
  alwaysKeepResolution: boolean;
}): Promise<File> {
  const options: Options = {
    maxSizeMB,
    maxWidthOrHeight,

    onProgress,
    useWebWorker,
    libURL,
    preserveExif,

    signal,

    maxIteration,
    fileType: file.type,
    initialQuality: 1,
    alwaysKeepResolution,
  };

  const compressedFile = await imageCompression(file, options);

  return compressedFile;
}
