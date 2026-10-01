"use client";

import { motion } from "framer-motion";
import { SectionCanvas } from "./HeroCanvas";
import { cn } from "@/lib/utils";
import { services } from "@/data/config";
import { useIntersectionObserver } from "@/hooks/useInteractions";
import { useRef, useState } from "react";

const serviceIcons: Record<string, React.ReactNode> = {
  Brain: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.734-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Zap: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Code: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Cpu: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Lightbulb: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.734-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Rocket: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

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

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 px-6 bg-black overflow-hidden"
    >
      {/* 3D Background */}
      <SectionCanvas type="particles" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />

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
            Services
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            What I <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">Offer</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
            Specialized in AI-powered solutions, automation, and modern web development. Each service is tailored to your unique needs.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              variants={itemVariants}
              className={cn(
                "relative group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm",
                "hover:border-indigo-400/30 hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)]",
                "transition-all duration-500",
                service.popular && "border-indigo-400/30 shadow-[0_0_40px_rgba(79,70,229,0.2)]"
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Popular badge */}
              {service.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-emerald-500 text-black text-xs font-bold rounded-full"
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  Most Popular
                </motion.div>
              )}

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-gradient-to-br group-hover:from-indigo-500/30 group-hover:to-emerald-500/30 group-hover:text-white transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {serviceIcons[service.icon]}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    className="flex items-center gap-3 text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + featureIndex * 0.05 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + featureIndex * 0.05 }}
                    />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Price & Timeline */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                    {service.price}
                  </span>
                  <span className="text-gray-500 ml-2">/ project</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 block">Timeline</span>
                  <span className="font-medium text-white">{service.timeline}</span>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-3xl border border-transparent pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #60a5fa, #34d399) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Don't see exactly what you need? I also offer custom solutions and technical consulting. Let's discuss your specific requirements.
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300 text-black font-semibold rounded-xl shadow-[0_8px_30px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.6)] transition-all duration-300"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Discuss Custom Project
            <motion.svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}