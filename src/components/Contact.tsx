"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { SectionCanvas } from "./HeroCanvas";
import { cn } from "@/lib/utils";
import { contactContent, siteConfig } from "@/data/config";
import { useIntersectionObserver } from "@/hooks/useInteractions";
import { useRef, useState } from "react";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const { scrollY } = useScroll();
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, replace with actual form submission (Formspree, Netlify Forms, etc.)
    setFormState("success");
    setFormData({
      name: "",
      email: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    });
    
    setTimeout(() => setFormState("idle"), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 px-6 bg-black overflow-hidden"
    >
      {/* 3D Background */}
      <SectionCanvas type="grid" />
      
      {/* Gradient orbs with parallax */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-blob"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000"
        style={{ y: y2 }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info Section */}
          <motion.div
            className="pr-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-indigo-400 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Contact
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Let's Build <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">Together</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-10 leading-relaxed">
              {contactContent.description}
            </motion.p>

            {/* Contact Info Cards */}
            <motion.div variants={itemVariants} className="space-y-4 mb-12">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a href={contactContent.cta.email} className="text-white hover:text-indigo-400 transition-colors font-medium">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="text-white font-medium">{siteConfig.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Availability</div>
                  <div className="text-white font-medium">Currently accepting projects for Q1 2025</div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-8 border-t border-white/10">
              <span className="text-gray-500 text-sm">Connect:</span>
              <motion.a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -3, scale: 1.1 }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </motion.a>
              <motion.a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -3, scale: 1.1 }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </motion.a>
              <motion.a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -3, scale: 1.1 }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
              variants={itemVariants}
            >
              {formState === "success" ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <motion.button
                    onClick={() => setFormState("idle")}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-300 to-emerald-300 text-black font-semibold rounded-xl hover:shadow-[0_4px_20px_rgba(99,102,241,0.5)] transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        {contactContent.formFields.name.label} <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={formState === "submitting"}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50"
                        placeholder={contactContent.formFields.name.placeholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        {contactContent.formFields.email.label} <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={formState === "submitting"}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50"
                        placeholder={contactContent.formFields.email.placeholder}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                        {contactContent.formFields.projectType.label}
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        disabled={formState === "submitting"}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50 appearance-none bg-no-repeat bg-right pr-10"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")` }}
                      >
                        <option value="">{contactContent.formFields.projectType.placeholder}</option>
                        {contactContent.formFields.projectType.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                        {contactContent.formFields.budget.label}
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        disabled={formState === "submitting"}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50 appearance-none bg-no-repeat bg-right pr-10"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")` }}
                      >
                        <option value="">{contactContent.formFields.budget.placeholder}</option>
                        {contactContent.formFields.budget.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                        {contactContent.formFields.timeline.label}
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        disabled={formState === "submitting"}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50 appearance-none bg-no-repeat bg-right pr-10"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")` }}
                      >
                        <option value="">{contactContent.formFields.timeline.placeholder}</option>
                        {contactContent.formFields.timeline.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {contactContent.formFields.message.label} <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={formState === "submitting"}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition-all duration-300 disabled:opacity-50 resize-none"
                      placeholder={contactContent.formFields.message.placeholder}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full py-4 px-6 rounded-xl font-semibold text-black bg-gradient-to-r from-indigo-300 via-blue-400 to-emerald-300 shadow-[0_8px_30px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {formState === "submitting" ? (
                      <>
                        <motion.div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    Or email me directly at{" "}
                    <a href={contactContent.cta.email} className="text-indigo-400 hover:underline font-medium">
                      {contactContent.cta.email}
                    </a>
                  </p>
                </>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}