"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useInteractions";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const scrollProgress = useScrollProgress();
  const isScrolled = scrollProgress > 0.05;

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(79,70,229,0.15)]" 
          : "bg-transparent",
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2 text-xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative">
              <span className="bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
                AM
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-300 to-emerald-300 rounded-full" />
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-indigo-300 after:to-emerald-300 hover:after:w-full after:transition-all after:duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#contact"
              className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-indigo-400/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#contact"
              className="px-5 py-2 text-sm font-medium text-black bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300 rounded-lg shadow-[0_4px_20px_rgba(99,102,241,0.5)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.6)] transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Project
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-white" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300"
        style={{ width: `${scrollProgress * 100}%` }}
        animate={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.nav>
  );
}