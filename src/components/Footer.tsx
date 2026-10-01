"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { footerContent, siteConfig, navItems } from "@/data/config";
import { useNormalizedMousePosition, useReducedMotion } from "@/hooks/useInteractions";

const gridPattern = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 40H40M40 0V40' stroke='%23ffffff' stroke-opacity='0.02' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E`;

export function Footer() {
  const mouse = useNormalizedMousePosition();
  const reducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Mouse-following glow */}
      {!reducedMotion && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${(mouse.x + 1) * 50}%`,
            top: `-200px`,
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)',
            filter: 'blur(150px)',
          }}
          animate={{
            x: mouse.x * 150,
            y: mouse.y * 150,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url(${gridPattern})` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div className="md:col-span-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.a
              href="#hero"
              className="flex items-center gap-2 text-2xl font-bold text-white mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
                AM
              </span>
            </motion.a>
            <p className="text-gray-400 mb-8 max-w-xs leading-relaxed">
              Building intelligent web applications with modern tech. Specialized in AI integration, automation, and scalable web solutions.
            </p>
            <div className="flex items-center gap-4">
              <motion.a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -3, scale: 1.1 }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </motion.a>
              <motion.a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -3, scale: 1.1 }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </motion.a>
              <motion.a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -3, scale: 1.1 }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </motion.a>
              <motion.a href={siteConfig.social.email} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -3, scale: 1.1 }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors duration-200 group"
                  whileHover={{ x: 4 }}
                >
                  <motion.div className="w-1 h-1 rounded-full bg-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="font-bold text-white mb-6">Services</h4>
            <nav className="space-y-3">
              {[
                "AI-Powered Web Applications",
                "AI Automation & Workflows",
                "Full-Stack Web Development",
                "AI Model Integration",
                "Technical Consulting",
                "MVP Development",
              ].map((service) => (
                <motion.a
                  key={service}
                  href="#services"
                  className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors duration-200 group"
                  whileHover={{ x: 4 }}
                >
                  <motion.div className="w-1 h-1 rounded-full bg-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                  <span className="text-sm">{service}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter / Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-6">Get insights on AI, web development, and automation delivered to your inbox.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300"
                />
                <motion.button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gradient-to-r from-indigo-400 to-emerald-400 text-black text-sm font-semibold rounded-lg hover:shadow-[0_4px_20px_rgba(99,102,241,0.5)] transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Subscribe
                </motion.button>
              </div>
              <p className="text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-indigo-300 to-emerald-300" />
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href={footerContent.links[0].href} className="hover:text-indigo-400 transition-colors">{footerContent.links[0].label}</a>
            <span className="hidden sm:inline">·</span>
            <a href={footerContent.links[1].href} className="hover:text-indigo-400 transition-colors">{footerContent.links[1].label}</a>
            <span className="hidden sm:inline">·</span>
            <span>{footerContent.madeWith}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}