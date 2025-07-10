"use client";

import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  repoUrl: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className="relative h-full overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>

        <div className="relative flex h-full flex-col">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            />
          </div>

          <div className="flex-grow p-6">
            <h3 className="mb-2 text-xl font-bold">{title}</h3>
            <p className="mb-4 text-zinc-400">{description}</p>

            <div className="mb-6 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-auto flex justify-between border-t border-zinc-700/50 pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:bg-zinc-700/50 hover:text-white"
                asChild
              >
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button
                size="sm"
                className="border-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
                asChild
              >
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="absolute right-3 top-3 z-20">
            <div
              className={`h-3 w-3 rounded-full ${isHovered ? "bg-green-500" : "bg-zinc-500"} transition-colors duration-300`}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
