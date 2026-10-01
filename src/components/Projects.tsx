"use client";

import { motion } from "framer-motion";
import { SectionCanvas } from "./HeroCanvas";
import { cn } from "@/lib/utils";
import { projects } from "@/data/config";
import { useIntersectionObserver } from "@/hooks/useInteractions";
import { useRef, useState } from "react";

const categoryColors: Record<string, string> = {
  "Full-Stack Application": "from-indigo-500 to-blue-500",
  "Frontend Project": "from-emerald-500 to-teal-500",
  "E-commerce": "from-amber-500 to-orange-500",
  "Desktop Application": "from-purple-500 to-violet-500",
  "3D Visualization": "from-pink-500 to-rose-500",
  "Dashboard": "from-sky-500 to-blue-500",
  "FinTech": "from-lime-500 to-green-500",
  "Learning / Python": "from-blue-500 to-indigo-500",
};

const gridPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%234f46e5' fill-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [filter, setFilter] = useState<"all" | "featured" | string>("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = ["all", "featured", ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === "all" 
    ? projects 
    : filter === "featured"
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 px-6 bg-black overflow-hidden"
    >
      {/* 3D Background */}
      <SectionCanvas type="waves" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-indigo-400 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Projects
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Selected <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">Work</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl">
            A collection of AI-powered applications, automation systems, and full-stack platforms built for real-world impact.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                "backdrop-blur-sm border",
                filter === category
                  ? "bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 border-indigo-400/30 text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-indigo-400/30 hover:text-white hover:bg-white/10"
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === "all" ? "All Projects" : category === "featured" ? "Featured" : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-500"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - Project Preview`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundImage: `url(${gridPattern})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                >
                  <div className="w-full">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded text-white backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded text-gray-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                {/* Category & Featured */}
                <div className="flex items-center justify-between">
                  <motion.span
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full",
                      "bg-gradient-to-r",
                      categoryColors[project.category] || "from-cyan-400 to-pink-500",
                      "text-black"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {project.category}
                  </motion.span>
                  {project.featured && (
                    <motion.span
                      className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <span className="relative">
                        <motion.span className="absolute h-full w-full rounded-full bg-yellow-400 animate-ping opacity-75" />
                        <span className="relative">★</span>
                      </span>
                      Featured
                    </motion.span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Metrics */}
                {project.metrics && (
                  <motion.div
                    className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold bg-gradient-to-r from-indigo-300 to-emerald-300 bg-clip-text text-transparent">
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Links */}
                <div className="flex items-center gap-4 pt-4">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 text-center text-sm font-medium text-white bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 border border-indigo-400/30 rounded-xl hover:border-indigo-400 hover:bg-indigo-500/30 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 text-center text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:border-indigo-400/30 hover:text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Code
                  </motion.a>
                </div>
              </div>

              {/* Animated border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #60a5fa, #34d399) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* View More */}
        {filter === "all" && filteredProjects.length < projects.length && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => setFilter("all")}
              className="px-8 py-4 text-white font-semibold rounded-xl border border-white/10 hover:border-indigo-400/50 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All {projects.length} Projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}