"use client";

import { motion } from "framer-motion";
import { SectionCanvas } from "./HeroCanvas";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/config";
import { useIntersectionObserver } from "@/hooks/useInteractions";
import { useRef, useState, useEffect, useCallback } from "react";

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
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStart(null);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 px-6 bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Background */}
      <SectionCanvas type="particles" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />

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
            Testimonials
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Trusted by <span className="bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">Leaders</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real results from real clients. See how AI-powered solutions transformed their businesses.
          </motion.p>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            key={currentIndex}
            className="relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            {/* Quote Icon */}
            <motion.div
              className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-12 h-12 text-indigo-400/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </motion.div>

            {/* Stars */}
            <motion.div
              className="flex items-center gap-1 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-yellow-400 text-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 200 }}
                >
                  ★
                </motion.span>
              ))}
            </motion.div>

            {/* Content */}
            <motion.blockquote
              className="text-xl md:text-2xl text-white leading-relaxed mb-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              "{currentTestimonial.content}"
            </motion.blockquote>

            {/* Author Info */}
            <motion.div
              className="flex items-center gap-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-300 to-emerald-300 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                  {currentTestimonial.name.charAt(0)}
                </div>
                <motion.div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-4 border-black"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <div className="font-bold text-white">{currentTestimonial.name}</div>
                <div className="text-indigo-400 text-sm">{currentTestimonial.role} at {currentTestimonial.company}</div>
                <div className="text-gray-500 text-xs mt-1">{currentTestimonial.project}</div>
              </div>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-indigo-300 to-emerald-300 rounded-t-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Navigation Dots */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-gradient-to-r from-indigo-300 to-emerald-300 w-8"
                    : "bg-white/10 hover:bg-white/20"
                )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Arrow Navigation */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={prevSlide}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-indigo-400/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-indigo-400/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* All Testimonials Grid (Mobile) */}
        <motion.div
          className="mt-16 hidden lg:grid lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-300 to-emerald-300 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{testimonial.name}</div>
                  <div className="text-indigo-400 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}