"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Clock, CreditCard, Headset, Layers, Target } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });

  // Parallax layers
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacityScroll = useTransform(scrollY, [0, 100], [1, 0]);

  const ctaScale = useTransform(ctaScroll, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const ctaOpacity = useTransform(ctaScroll, [0, 0.5, 1], [0, 0.4, 0]);

  return (
    <main ref={containerRef} className="relative bg-black min-h-screen text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/nfavi.jpg" alt="Nexoryn Logo" className="w-8 h-8 rounded object-cover shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <span className="text-xl font-bold tracking-widest uppercase">Nexoryn Media</span>
        </div>
        <Link href="/contact" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-sm tracking-wide">
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at center, #3730a3 0%, #000000 70%)",
            y: yBg
          }}
        />

        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen" />

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center"
          style={{ y: yText, opacity: opacityText }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            The Apex of Affiliate Marketing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-[1.1] md:leading-tight"
          >
            Unbeatable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Performance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-2xl text-gray-400 max-w-2xl font-light mb-10"
          >
            We don't just participate in the market. We dominate it. Nexoryn Media delivers exclusive conversions and relentless scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center gap-2 hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Partner With Us</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </motion.div>


      </section>

      {/* Features Parallax Section */}
      <section className="py-32 px-6 relative z-20 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Flawless Execution.<br />
              <span className="text-gray-500">Zero Compromise.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Our infrastructure is engineered for one thing: absolute dominance. We leverage proprietary technology to connect top-tier advertisers with premium traffic sources seamlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-6 relative z-20 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight">Why Choose <span className="text-indigo-500">Us</span></h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Layers,
                title: "All-in-One Solution",
                desc: "As a top-notch digital agency we offer a fully integrated service which include marketing, development, design and more."
              },
              {
                icon: CreditCard,
                title: "Affordable Prices",
                desc: "Our fully integrated services are offered to our customers at best prices"
              },
              {
                icon: Headset,
                title: "Superior Support",
                desc: "As a leading digital agency, we ensure that only fully trained, friendly and professional agents are available to offer support to our customers at all times."
              },
              {
                icon: Award,
                title: "Experience matters",
                desc: "You are sure to get creative ideas from us that helps you bring your campaigns to life and enable your business to grow beyond expectations"
              },
              {
                icon: Target,
                title: "Result oriented",
                desc: "Our system is designed in such a way that gives you confidence that we will deliver on our promises and this is why we can also work on a commission structure that is based on results"
              },
              {
                icon: Clock,
                title: "Time is Money",
                desc: "Your time is of essence to us and we ensure that your projects are completed in the best possible time."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Marquee */}
      <section className="py-20 border-y border-white/5 bg-black/50 overflow-hidden whitespace-nowrap relative">
        <div className="flex animate-marquee-slower">
          {[
            { name: "HF Markets", logo: "/partners/hfmarkets.png", scale: 1.7 },
            { name: "OctaFX", logo: "/partners/octafx.png", scale: 1.05 },
            { name: "IronFX", logo: "/partners/ironfx.png", scale: 1.05 },
            { name: "FBS", logo: "/partners/fbs.png", scale: 1 },
            { name: "RoboForex", logo: "/partners/roboforex.png", scale: 1.2 },
            { name: "Tickmill", logo: "/partners/tickmill.jpg", scale: 1 },
            { name: "Axi", logo: "/partners/axi.png", scale: 1 },
            { name: "Vantage", logo: "/partners/vantage.jfif", scale: 1.1 },
            { name: "VT Markets", logo: "/partners/vt.webp", scale: 1.1 },
            { name: "Eightcap", logo: "/partners/eightcap.png", scale: 1 },
            { name: "FP Markets", logo: "/partners/fpmarkets.webp", scale: 1.1 }
          ].map((partner, i) => (
            <div key={i} className="flex items-center mx-6 md:mx-12 gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white/5 transition-colors">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: `scale(${partner.scale})` }}
                />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white uppercase">{partner.name}</span>
            </div>
          ))}
          {/* Repeat for seamless loop */}
          {[
            { name: "HF Markets", logo: "/partners/hfmarkets.png", scale: 1.7 },
            { name: "OctaFX", logo: "/partners/octafx.png", scale: 1.05 },
            { name: "IronFX", logo: "/partners/ironfx.png", scale: 1.05 },
            { name: "FBS", logo: "/partners/fbs.png", scale: 1 },
            { name: "RoboForex", logo: "/partners/roboforex.png", scale: 1.2 },
            { name: "Tickmill", logo: "/partners/tickmill.jpg", scale: 1 },
            { name: "Axi", logo: "/partners/axi.png", scale: 1 },
            { name: "Vantage", logo: "/partners/vantage.jfif", scale: 1.1 },
            { name: "VT Markets", logo: "/partners/vt.webp", scale: 1.1 },
            { name: "Eightcap", logo: "/partners/eightcap.png", scale: 1 },
            { name: "FP Markets", logo: "/partners/fpmarkets.webp", scale: 1.1 }
          ].map((partner, i) => (
            <div key={`dup-${i}`} className="flex items-center mx-6 md:mx-12 gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white/5 transition-colors">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: `scale(${partner.scale})` }}
                />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white uppercase">{partner.name}</span>
            </div>
          ))}
        </div>
      </section>


      {/* Stats Parallax */}
      <section className="py-32 relative border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "$2B+", label: "Generated Revenue" },
              { value: "50M+", label: "Global Conversions" },
              { value: "99.9%", label: "Uptime Reliability" },
              { value: "No. 1", label: "In Performance" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                  {stat.value}
                </div>
                <div className="text-sm tracking-widest uppercase text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">The Unbeatable Standard</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Don't take our word for it. Our partners speak for themselves.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Nexoryn transformed our lead generation within weeks. Their scale is unmatched and their traffic quality is impeccable.",
                author: "HF Markets",
                role: "Marketing Partner"
              },
              {
                quote: "I've worked with dozens of networks, but none deliver the consistency and technical support that Nexoryn does. They are truly the apex.",
                author: "OctaFX",
                role: "Affiliate Manager"
              },
              {
                quote: "Reliability and scale are the two things we need most. Nexoryn delivers both without fail, every single day.",
                author: "IronFX",
                role: "Strategic Growth Lead"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-lg text-gray-300 italic mb-8">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-sm text-indigo-400">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Global Network Map */}
      <section className="py-32 px-6 relative bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-square relative flex items-center justify-center">
                {/* SVG Map Placeholder/Abstract */}
                <motion.svg
                  viewBox="0 0 800 400"
                  className="w-full h-full opacity-20 grayscale invert"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.15 }}
                  viewport={{ once: true }}
                >
                  <path d="M150 100 Q 200 80 250 120 T 350 100 T 450 130 T 550 110 T 650 140" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
                  <circle cx="150" cy="100" r="4" fill="#6366f1" />
                  <circle cx="350" cy="100" r="4" fill="#a855f7" />
                  <circle cx="550" cy="110" r="4" fill="#ec4899" />
                  <circle cx="650" cy="140" r="4" fill="#6366f1" />
                </motion.svg>

                {/* Pulsing Dots */}
                {[
                  { x: "20%", y: "30%" },
                  { x: "45%", y: "25%" },
                  { x: "70%", y: "35%" },
                  { x: "85%", y: "45%" },
                  { x: "30%", y: "60%" },
                  { x: "60%", y: "75%" },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-indigo-500 rounded-full"
                    style={{ left: pos.x, top: pos.y }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                  >
                    <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping" />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Infinite Reach.<br /><span className="text-gray-500">Universal Impact.</span></h2>
              <p className="text-xl text-gray-400 font-light mb-8">
                With a presence in over 150 countries, we bridge the gap between global brands and local audiences. Our network is designed for high-volume, cross-border performance.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-white">150+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">5k+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest">Active Offers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      <section ref={ctaRef} className="py-40 px-6 relative flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            scale: ctaScale,
            opacity: ctaOpacity,
            background: "radial-gradient(circle at center, rgba(107, 33, 168, 0.8) 0%, transparent 60%)",
            filter: "blur(80px)"
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Dominate?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 font-light">
            Stop settling for average returns. Join the elite network of advertisers and publishers achieving unparalleled growth.
          </p>
          <Link href="/contact" className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Apply For Access
          </Link>
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
            &copy; {new Date().getFullYear()} Nexoryn Media. Unbeatable Performance. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
