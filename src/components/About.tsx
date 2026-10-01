"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionCanvas } from "./HeroCanvas";
import { cn } from "@/lib/utils";
import { aboutContent, siteConfig } from "@/data/config";
import { useIntersectionObserver } from "@/hooks/useInteractions";
import { useRef } from "react";

const skillIcons: Record<string, React.ReactNode> = {
  Frontend: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Backend: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  "AI & ML": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "DevOps & Tools": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const gridPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%234f46e5' fill-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E`;

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 px-6 bg-black overflow-hidden"
    >
      {/* 3D Background */}
      <SectionCanvas type="grid" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-indigo-400 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            About Me
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {aboutContent.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
            {aboutContent.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Description */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Profile Photo */}
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-xs mx-auto md:mx-0"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 border border-white/10">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${gridPattern})` }} />
                <img
                  src={siteConfig.profileImage}
                  alt={`${siteConfig.name} - Profile`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-transparent rounded-3xl" style={{
                  background: 'linear-gradient(135deg, #818cf8, #60a5fa, #34d399) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }} />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 text-indigo-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="font-medium text-sm">Available for projects</span>
                </div>
              </motion.div>
            </motion.div>

            {aboutContent.description.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div variants={itemVariants} className="pt-8 border-t border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-white">Highlights</h3>
              <ul className="space-y-3">
                {aboutContent.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <motion.div
                      className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 mt-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Technical Expertise</h3>
            <div className="space-y-6">
              {aboutContent.skills.map((skillGroup, groupIndex) => (
                <motion.div
                  key={skillGroup.category}
                  variants={itemVariants}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-indigo-400">
                      {skillIcons[skillGroup.category] || (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-white">{skillGroup.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-indigo-500/10 hover:border-indigo-400/30 hover:text-indigo-400 transition-all duration-300 cursor-default"
                        whileHover={{ y: -2, scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  {/* Decorative line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-300 to-emerald-300 rounded-b-2xl"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5 + groupIndex * 0.1, duration: 0.8 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}