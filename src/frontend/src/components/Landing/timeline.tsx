"use client";

import { motion } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";

const experiences = [
  {
    title: "Senior Frontend Engineer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description:
      "Lead the frontend development team in building a SaaS platform. Implemented new features, improved performance, and mentored junior developers.",
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions Co.",
    period: "2019 - 2021",
    description:
      "Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products.",
  },
  {
    title: "Web Developer",
    company: "Creative Agency",
    period: "2017 - 2019",
    description:
      "Built websites and web applications for various clients. Worked with HTML, CSS, JavaScript, and WordPress.",
  },
  {
    title: "Intern",
    company: "Startup Hub",
    period: "2016 - 2017",
    description:
      "Assisted in developing web applications and learned modern web development practices.",
  },
];

export function Timeline() {
  const isMobile = useMobile();

  return (
    <div
      className={`relative space-y-12 ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:z-0 before:ml-0 before:h-full before:-translate-x-px before:border-l-2 before:border-zinc-700"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-25 blur transition duration-1000 hover:opacity-100 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="mb-4 text-zinc-400">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
              <motion.div
                className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
