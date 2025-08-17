import { useTheme } from "@/contexts/ThemeProvider";
import { cn } from "@/lib/utils";
import useTownTalk from "@/hooks/use-town-talk";
import { ArrowRight, ChevronDown, Play, Plus } from "lucide-react";
import TownTalkProvider from "@/providers/town-talk-provider";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import AccountBadge from "@/components/Town-Talk/account-badge";
import { useState } from "react";
import AccountCreationDialog from "@/components/Town-Talk/account-creation-dialog";
import TownTalkFeeds from "./feeds";

function TownTalkLanding() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [accountCreationDialogIsOpen, setAccountCreationDialogIsOpen] =
    useState<boolean>(false);

  const { userAccounts, isAuth, isLoading } = useTownTalk();

  if (isAuth) {
    return <TownTalkFeeds />;
  }

  return (
    <section
      id="hero"
      className={cn(
        "relative grid min-h-screen grid-cols-[0.6fr_0.4fr] grid-rows-1 overflow-hidden transition-colors duration-300",
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800/30 to-purple-900/30"
          : "bg-gradient-to-br from-gray-400 via-cyan-400/90 to-purple-300",
      )}
    >
      <AccountCreationDialog
        open={accountCreationDialogIsOpen}
        setIsOpen={setAccountCreationDialogIsOpen}
      />

      <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-[#4fc4cf]/20 mix-blend-multiply blur-3xl filter"></div>
          <div className="animation-delay-2000 absolute right-10 top-40 h-72 w-72 animate-pulse rounded-full bg-[#994ff3]/20 mix-blend-multiply blur-3xl filter"></div>
          <div className="animation-delay-4000 absolute bottom-20 left-1/3 h-72 w-72 animate-pulse rounded-full bg-[#fbdd74]/20 mix-blend-multiply blur-3xl filter"></div>

          {/* Floating Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-2 w-2 rounded-full ${
                i % 3 === 0
                  ? "bg-[#4fc4cf]"
                  : i % 3 === 1
                    ? "bg-[#994ff3]"
                    : "bg-[#fbdd74]"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container z-10 w-3/4 items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className={`mb-6 text-5xl font-bold md:text-7xl ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Connect in{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#fbdd74] bg-clip-text text-transparent">
                TownTalk
              </span>
            </motion.h1>

            <motion.p
              className="mb-8 text-xl text-[#181818]/80 md:text-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A digital on-chain city for creators, thinkers, and workers.
              <br />
              Build your influence, earn CRY tokens, and shape the future.
            </motion.p>
          </motion.div>
        </div>
      </div>
      <div
        className={cn(
          "bg-ow-white flex min-h-screen flex-col items-center space-y-8 overflow-hidden py-16",
          accountCreationDialogIsOpen && "z-50",
          !accountCreationDialogIsOpen && "z-[100]",
        )}
      >
        <div className="flex items-center justify-center">
          <h1 className="mb-4 text-center text-3xl font-bold">
            Choose Account
          </h1>
        </div>
        {userAccounts.length ? (
          userAccounts.map((acc, idx) => (
            <AccountBadge account={acc} key={idx} onClick={() => {}} />
          ))
        ) : (
          <div className="relative z-10 flex flex-col items-start justify-start">
            <strong>No accounts found.</strong>
            <p>
              <span
                className="cursor-pointer text-blue-600 underline hover:text-blue-600/60"
                onClick={() => setAccountCreationDialogIsOpen(true)}
              >
                Create an account
              </span>{" "}
              to be in our town talks!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default () => (
  <TownTalkProvider>
    <TownTalkLanding />
  </TownTalkProvider>
);
