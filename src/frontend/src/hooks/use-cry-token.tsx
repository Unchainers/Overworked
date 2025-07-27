import CryTokenContext from "@/contexts/cry-token-context";
import { useContext } from "react";

export default function useCryCanister() {
  const context = useContext(CryTokenContext);

  if (!context) {
    throw new Error("useStorage must be used within StorageProvider.");
  }

  return context;
}
