"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface RichTextProps {
  text: string
  maxLength?: number
  className?: string
}

export function RichText({ text, maxLength = 150, className = "" }: RichTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = text.length > maxLength

  const parseText = (text: string) => {
    const parts = []
    let currentIndex = 0

    // Regex to match @mentions and #hashtags
    const regex = /(@\w+)|#([\w-]+)/g
    let match

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push({
          type: "text",
          content: text.slice(currentIndex, match.index),
          key: `text-${currentIndex}`,
        })
      }

      if (match[1]) {
        // User mention
        parts.push({
          type: "mention",
          content: match[1],
          username: match[1].slice(1),
          key: `mention-${match.index}`,
        })
      } else if (match[2]) {
        // Hashtag
        parts.push({
          type: "hashtag",
          content: `#${match[2]}`,
          hashtag: match[2],
          key: `hashtag-${match.index}`,
        })
      }

      currentIndex = match.index + match[0].length
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(currentIndex),
        key: `text-${currentIndex}`,
      })
    }

    return parts
  }

  const displayText = shouldTruncate && !isExpanded ? text.slice(0, maxLength) + "..." : text

  const parsedParts = parseText(displayText)

  return (
    <div className={`text-gray-800 dark:text-gray-200 ${className}`}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {parsedParts.map((part) => {
          switch (part.type) {
            case "mention":
              return (
                <a
                  key={part.key}
                  href={`/town-talk/profile/${part.username}`}
                  className="font-bold text-cyan-600 dark:text-cyan-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                >
                  {part.content}
                </a>
              )
            case "hashtag":
              return (
                <a
                  key={part.key}
                  href={`/town-talk/search?q=${encodeURIComponent(part.hashtag ?? "")}`}
                  className="font-bold text-purple-600 dark:text-purple-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
                >
                  {part.content}
                </a>
              )
            default:
              return (
                <span key={part.key} className="whitespace-pre-wrap">
                  {part.content}
                </span>
              )
          }
        })}
      </motion.div>

      {shouldTruncate && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-600 dark:text-cyan-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium text-sm mt-1 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? "See Less" : "See More"}
        </motion.button>
      )}
    </div>
  )
}
