import { useTheme } from "@/contexts/ThemeProvider";
import { getCookie } from "@/lib/utils";
import useTownTalk from "hooks/use-town-talk";
import TownTalkProvider from "providers/town-talk-provider";
import { useEffect, useState } from "react";

function TownTalkLanding() {
  const { theme } = useTheme();

  const {} = useTownTalk();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800/30 to-purple-900/30"
          : "bg-gradient-to-br from-gray-50 via-cyan-50 to-purple-50"
      } transition-colors duration-300`}
    ></div>
  );
}

export default () => {
  <TownTalkProvider>
    <TownTalkLanding />
  </TownTalkProvider>;
};
