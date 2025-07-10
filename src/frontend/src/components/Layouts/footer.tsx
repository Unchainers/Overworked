"use client";

import {
  Twitter,
  Github,
  DiscIcon as Discord,
  TextIcon as Telegram,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`border-t py-12 ${
        theme === "dark"
          ? "border-[#4fc4cf]/20 bg-[#181818]"
          : "border-[#994ff3]/20 bg-[#fffffe]"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <a href="/" className="mb-4 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4fc4cf] to-[#994ff3]">
                <span className="text-lg font-bold text-[#fffffe]">O</span>
              </div>
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-2xl font-bold text-transparent">
                Overworked
              </span>
            </a>
            <p
              className={`mb-6 max-w-md ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
            >
              A digital on-chain city for creators, thinkers, and workers. Build
              your influence, earn CRY tokens, and shape the future.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter className="h-5 w-5" />, href: "#" },
                { icon: <Discord className="h-5 w-5" />, href: "#" },
                { icon: <Telegram className="h-5 w-5" />, href: "#" },
                { icon: <Github className="h-5 w-5" />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] text-[#fffffe] transition-opacity hover:opacity-80"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3
              className={`mb-4 font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Platform
            </h3>
            <ul className="space-y-2">
              {["About", "How it Works", "Features", "Tokenomics"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className={`${
                        theme === "dark"
                          ? "text-[#fffffe]/80 hover:text-[#4fc4cf]"
                          : "text-[#181818]/80 hover:text-[#994ff3]"
                      } transition-colors`}
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3
              className={`mb-4 font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Resources
            </h3>
            <ul className="space-y-2">
              {["Whitepaper", "Documentation", "API", "Support"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`${
                      theme === "dark"
                        ? "text-[#fffffe]/80 hover:text-[#4fc4cf]"
                        : "text-[#181818]/80 hover:text-[#994ff3]"
                    } transition-colors`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 border-t pt-8 ${
            theme === "dark" ? "border-[#4fc4cf]/20" : "border-[#994ff3]/20"
          } text-center`}
        >
          <p
            className={`${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}
          >
            © 2025 Overworked. All rights reserved.
            <br />
            Every effort you put in pays off with CRY Tokens 🔥
          </p>
        </div>
      </div>
    </footer>
  );
}
