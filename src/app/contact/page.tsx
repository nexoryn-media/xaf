"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Send, XCircle } from "lucide-react";
import Link from "next/link";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name" && !value.trim()) {
      error = "Name is required";
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = "Invalid email address";
      }
    } else if (name === "message" && !value.trim()) {
      error = "Message is required";
    }
    return error;
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const nameErr = validateField("name", form.name);
    const emailErr = validateField("email", form.email);
    const messageErr = validateField("message", form.message);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (messageErr) newErrors.message = messageErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched on submit
    setTouched({
      name: true,
      email: true,
      company: true,
      message: true,
    });

    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // If field was already touched, validate on change for immediate feedback
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }
  };

  return (
    <main className="relative bg-black min-h-screen text-white overflow-hidden flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/nfavi.jpg" alt="Nexoryn Logo" className="w-8 h-8 rounded object-cover shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold tracking-widest uppercase">Nexoryn Media</span>
        </Link>
      </nav>

      {/* Contact Content */}
      <section className="flex-grow flex items-center justify-center px-6 pt-24 pb-12 relative">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ 
            backgroundImage: "radial-gradient(circle at top right, #3730a3 0%, #000000 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Let's Build the <span className="text-gradient">Apex.</span>
                  </motion.h1>
                  <p className="text-gray-400 text-lg">
                    Submit your application to join our elite performance network.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-widest">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="John Doe"
                          className={`w-full bg-white/5 border ${errors.name && touched.name ? "border-red-500/50" : "border-white/10"} focus:border-indigo-500/50 rounded-xl px-4 py-4 transition-all outline-none focus:ring-1 focus:ring-indigo-500/20`}
                        />
                        {errors.name && touched.name && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-0 text-xs text-red-400 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> {errors.name}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-widest">Work Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="john@company.com"
                          className={`w-full bg-white/5 border ${errors.email && touched.email ? "border-red-500/50" : "border-white/10"} focus:border-indigo-500/50 rounded-xl px-4 py-4 transition-all outline-none focus:ring-1 focus:ring-indigo-500/20`}
                        />
                        {errors.email && touched.email && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-0 text-xs text-red-400 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> {errors.email}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-widest">Company / Website</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-4 transition-all outline-none focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-widest">How can we help you scale?</label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        placeholder="Tell us about your goals..."
                        className={`w-full bg-white/5 border ${errors.message && touched.message ? "border-red-500/50" : "border-white/10"} focus:border-indigo-500/50 rounded-xl px-4 py-4 transition-all outline-none focus:ring-1 focus:ring-indigo-500/20 resize-none`}
                      />
                      {errors.message && touched.message && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-0 text-xs text-red-400 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> {errors.message}
                        </motion.span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="relative z-10">Send Application</span>
                        <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="flex justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                </div>
                <h2 className="text-4xl font-bold mb-4">Application Received.</h2>
                <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
                  Our team of performance experts will review your application and reach out within 24 hours.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Return Home <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/nfavi.jpg" alt="Nexoryn Logo" className="w-6 h-6 rounded object-cover" />
            <span className="text-sm font-bold tracking-widest uppercase">Nexoryn Media</span>
          </div>
          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Nexoryn Media. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
