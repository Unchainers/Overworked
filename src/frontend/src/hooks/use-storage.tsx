import StorageContext from "@/contexts/storage-context";
import { useContext } from "react";

export default function useStorage() {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error("useStorage must be used within StorageProvider.");
  }

  return context;
}
