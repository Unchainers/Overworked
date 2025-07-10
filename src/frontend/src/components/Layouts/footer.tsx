"use client"

import { Twitter, Github, DiscIcon as Discord, TextIcon as Telegram } from "lucide-react"
import { useTheme } from "@/contexts/ThemeProvider"

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className={`py-12 border-t ${
        theme === "dark" ? "bg-[#181818] border-[#4fc4cf]/20" : "bg-[#fffffe] border-[#994ff3]/20"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <a href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center">
                <span className="text-[#fffffe] font-bold text-lg">O</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Overworked
              </span>
            </a>
            <p className={`mb-6 max-w-md ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
              A digital on-chain city for creators, thinkers, and workers. Build your influence, earn CRY tokens, and
              shape the future.
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
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center text-[#fffffe] hover:opacity-80 transition-opacity"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`font-bold mb-4 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>Platform</h3>
            <ul className="space-y-2">
              {["About", "How it Works", "Features", "Tokenomics"].map((item) => (
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
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`font-bold mb-4 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>Resources</h3>
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
          className={`mt-12 pt-8 border-t ${
            theme === "dark" ? "border-[#4fc4cf]/20" : "border-[#994ff3]/20"
          } text-center`}
        >
          <p className={`${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}>
            © 2024 Overworked. All rights reserved. Built with ❤️ for the future of work.
          </p>
        </div>
      </div>
    </footer>
  )
}
