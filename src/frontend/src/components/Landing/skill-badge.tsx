"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  level: number;
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>

        <div className="relative">
          <div className="mb-4 text-center text-lg font-medium">{name}</div>

          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-zinc-700">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>

          <div className="mt-2 text-right text-sm text-zinc-400">{level}%</div>
        </div>
      </div>
    </motion.div>
  );
}
