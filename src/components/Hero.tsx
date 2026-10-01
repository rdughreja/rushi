"use client";

import { motion } from "framer-motion";
import { HeroCanvas } from "./HeroCanvas";
import { cn } from "@/lib/utils";
import { heroContent, siteConfig } from "@/data/config";
import { useNormalizedMousePosition, useReducedMotion } from "@/hooks/useInteractions";

const gridPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%234f46e5' fill-opacity='0.03'/%3E%3C/g%3E%3C/svg%3E`;

const springTransition = { type: "spring", stiffness: 100, damping: 15 };
const easeOutCubic = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: easeOutCubic }
  }
};

export function Hero() {
  const mouse = useNormalizedMousePosition();
  const reducedMotion = useReducedMotion();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <HeroCanvas />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: `url(${gridPattern})` }}
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
      
      {/* Mouse-following glow */}
      {!reducedMotion && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${(mouse.x + 1) * 50}%`,
            top: `${(mouse.y + 1) * 50}%`,
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: mouse.x * 100,
            y: mouse.y * 100,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="w-full max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute h-full w-full rounded-full bg-indigo-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative h-full w-full rounded-full bg-indigo-400" />
              </span>
              Available for freelance projects
            </motion.span>
          </motion.div>

          {/* Greeting & Name */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-lg font-medium text-indigo-300 mb-3 tracking-wide uppercase">
              {heroContent.greeting}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              <span className="text-white">{heroContent.name.split(' ')[0]}</span>{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
                {heroContent.name.split(' ')[1]}
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xl md:text-2xl text-gray-300 font-medium">
              <span className="text-white">{heroContent.tagline.split(' ').slice(0, 2).join(' ')}</span>
              <span className="bg-gradient-to-r from-indigo-300 to-emerald-300 bg-clip-text text-transparent">
                {heroContent.tagline.split(' ').slice(2).join(' ')}
              </span>
              <span className="text-white">{heroContent.tagline.split(' ').slice(4).join(' ')}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-10 max-w-2xl">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              {heroContent.description}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mb-16 flex flex-wrap items-center gap-4">
            <motion.a
              href={heroContent.ctaPrimary.href}
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 text-black font-semibold rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.6)] transition-all duration-300"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{heroContent.ctaPrimary.label}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.a>
            <motion.a
              href={heroContent.ctaSecondary.href}
              className="px-8 py-4 text-white font-semibold rounded-xl border border-white/10 hover:border-indigo-300/50 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {heroContent.ctaSecondary.label}
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {heroContent.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-3 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
            <motion.div className="w-1 h-10 relative overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute left-1/2 top-0 w-0.5 h-3 bg-gradient-to-b from-indigo-300 to-emerald-300 -translate-x-1/2 rounded-full"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}