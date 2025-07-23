import TownTalkContext from "contexts/town-talk-context";
import { useContext } from "react";

export default function useTownTalk() {
  const context = useContext(TownTalkContext);

  if (!context) {
    throw new Error("useTownTalk must be used within TownTalkProvider.");
  }

  return context;
}
