"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoveRight, Github, Linkedin, Leaf, CloudSun, ScrollText } from "lucide-react";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [textIndex, setTextIndex] = useState(0);
  const animatedTexts = [
    { main: "Smarter Farming", sub: "Better Decisions" },
    { main: "Smarter Farming", sub: "Better Tomorrow" },
    { main: "Smarter Farming", sub: "Better Yield" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev: number) => (prev + 1) % animatedTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [animatedTexts.length]);

  return (
    <>
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .glass {
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .text-animate-in {
          /* We'll use framer-motion instead for the hero text */
        }
      `}</style>

      <div className="min-h-screen bg-black text-slate-100 overflow-x-hidden selection:bg-emerald-500/30">
        {/* Background blobs - more subtle for a pitch black theme */}
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[100px] animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-zinc-900/40 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-neutral-800/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-[100] px-6 py-4 transition-all duration-300">
          <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex justify-between items-center hover:bg-black/40 transition-colors duration-300">
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
              KRISHI MITRA
            </h1>

            <div className="flex items-center gap-6">
              <button className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300">
                Platform
              </button>

              <SignedOut>
                <SignUpButton mode="modal">
                  <Button className="bg-white text-black hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl px-5 font-bold">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-4">
                  <Link href="/get-started">
                    <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10 transition-all rounded-xl">
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-48 pb-24 px-6 text-center relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="reveal inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-10 hover:border-white/20 transition-colors cursor-default">
              <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors border-0">New</Badge>
              <span className="text-xs text-zinc-400 font-medium">
                Built for Indian Farmers • Powered by AI
              </span>
            </div>
            
            <h1 className="reveal text-6xl md:text-8xl lg:text-[7rem] font-black mb-10 leading-[1.1] tracking-tight min-h-[180px] md:min-h-[220px] lg:min-h-[260px] flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={textIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent block">
                    {animatedTexts[textIndex].main}
                  </span>

                  <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 bg-clip-text text-transparent block drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-2">
                    {animatedTexts[textIndex].sub}
                  </span>
                </motion.div>
              </AnimatePresence>
            </h1>

            <p className="reveal text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
              Krishi Mitra helps farmers make better decisions using AI — from crop
              health and weather alerts to government schemes.
            </p>

            <div className="reveal flex flex-col sm:flex-row justify-center gap-5 mb-24 items-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="h-14 bg-gradient-to-r from-emerald-400 to-green-500 text-black hover:from-emerald-300 hover:to-green-400 rounded-2xl px-10 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] font-bold text-lg hover:-translate-y-1 active:scale-95 transition-all duration-300">
                    Start Using Krishi Mitra
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link href="/get-started">
                  <Button size="lg" className="h-14 bg-gradient-to-r from-emerald-400 to-green-500 text-black hover:from-emerald-300 hover:to-green-400 rounded-2xl px-10 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] font-bold text-lg hover:-translate-y-1 active:scale-95 transition-all duration-300 group">
                    Go to Dashboard <MoveRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </SignedIn>

              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-2xl px-10 bg-black/40 backdrop-blur-md border-[1.5px] border-zinc-700 text-zinc-300 hover:border-white hover:text-white hover:bg-white/5 hover:-translate-y-1 active:scale-95 transition-all duration-300 font-semibold text-lg"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="reveal max-w-5xl mx-auto relative group perspective">
              <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="glass rounded-[2rem] p-3 md:p-4 transform transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5 group-hover:border-white/10 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20 rounded-[1.6rem] pointer-events-none opacity-60"></div>
                <Image
                  src="/KrishiPage.png"
                  alt="Krishi Mitra App"
                  width={1200}
                  height={675}
                  className="rounded-[1.3rem] w-full h-auto object-cover border border-white/5"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Features Highlight */}
        <section className="py-24 px-6 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">

              {/* Feature 1 */}
              <div className="reveal relative group cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-[2rem] blur-md opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative h-full bg-[#0a0a0a] border border-white/[0.08] rounded-[2rem] p-10 hover:border-emerald-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-emerald-500/20">
                    <Leaf className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-xl group-hover:text-emerald-400 transition-colors">Crop Health</h3>
                  <p className="text-base text-zinc-400 leading-relaxed">AI-powered disease detection from photos. Upload an image and get an accurate diagnosis and treatment plan in seconds.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="reveal relative group cursor-pointer" style={{ transitionDelay: "100ms" }}>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-transparent rounded-[2rem] blur-md opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative h-full bg-[#0a0a0a] border border-white/[0.08] rounded-[2rem] p-10 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 border border-blue-500/20">
                    <CloudSun className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-xl group-hover:text-blue-400 transition-colors">Weather Alerts</h3>
                  <p className="text-base text-zinc-400 leading-relaxed">Real-time localized precision forecasts and proactive farming tips to safely plan your harvest and watering schedule.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="reveal relative group cursor-pointer" style={{ transitionDelay: "200ms" }}>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/20 to-transparent rounded-[2rem] blur-md opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative h-full bg-[#0a0a0a] border border-white/[0.08] rounded-[2rem] p-10 hover:border-green-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.15)] transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-green-500/20">
                    <ScrollText className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-xl group-hover:text-green-400 transition-colors">Govt Schemes</h3>
                  <p className="text-base text-zinc-400 leading-relaxed">Instantly check your eligibility for subsidies and get step-by-step application assistance for agricultural benefits.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 px-6 relative z-10 border-t border-white/5 bg-black/50">
          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="reveal text-center mb-24">
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent inline-block">
                How Krishi Mitra Works
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-xl font-medium">
                <span className="text-emerald-400">Ask. Analyze. Act.</span><br/>
                Get accurate farming decisions powered by AI — in seconds.
              </p>
            </div>

            {/* Main Content - Image + Steps */}
            <div className="grid lg:grid-cols-5 gap-16 items-center mb-20">

              {/* Left: Visual Diagram */}
              <div className="reveal lg:col-span-3 order-2 lg:order-1 perspective">
                <div className="relative group cursor-pointer">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 via-green-500/10 to-transparent rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />

                  {/* Image container */}
                  <div className="relative glass rounded-[2.5rem] p-4 overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors duration-500 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-[2.5rem]"></div>
                    <div className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#050505]">
                      <Image
                        src="/how-it-works.png"
                        alt="How Krishi Mitra Chatbot Works"
                        width={800}
                        height={600}
                        className="w-full h-auto transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-1000"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-center text-zinc-400 mt-8 text-base font-medium">
                  <span className="text-emerald-400">✦</span> <span className="text-zinc-200">Interactive AI Chatbot</span> — Ask questions in your language, get instant expert advice
                </p>
              </div>

              {/* Right: Step-by-step explanation */}
              <div className="reveal lg:col-span-2 order-1 lg:order-2 space-y-6">

                {/* Step 1 */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 to-transparent rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-white/20 hover:-translate-x-2 transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                          <span className="text-2xl">💬</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs tracking-widest text-zinc-500 font-bold mb-2 uppercase">STEP 01</div>
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-200 transition-colors">Ask Your Question</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                          Type or speak your farming question in Hindi, English, or your local language. Upload crop photos for disease detection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 to-transparent rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-white/20 hover:-translate-x-2 transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                          <span className="text-2xl">🧠</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs tracking-widest text-zinc-500 font-bold mb-2 uppercase">STEP 02</div>
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-200 transition-colors">AI Analyzes Context</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                          Our AI processes your query with real-time weather data, soil info, and verified agricultural research instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 to-transparent rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-white/20 hover:-translate-x-2 transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                          <span className="text-2xl">⚡</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs tracking-widest text-zinc-500 font-bold mb-2 uppercase">STEP 03</div>
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-zinc-200 transition-colors">Get Expert Solutions</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                          Receive actionable advice, treatment plans, scheme eligibility, and personalized recommendations contextually.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom CTA */}
            <div className="reveal text-center mt-32">
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 glass px-10 py-8 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.05)] cursor-default">
                <span className="text-zinc-300 text-xl font-medium">Ready to transform your farm?</span>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button className="h-12 bg-white text-black hover:bg-zinc-200 rounded-xl px-8 font-bold text-base hover:scale-105 active:scale-95 transition-all">
                      Try Krishi Mitra Free
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/get-started">
                    <Button className="h-12 bg-white text-black hover:bg-zinc-200 rounded-xl px-8 font-bold text-base hover:scale-105 active:scale-95 transition-all group">
                      Go to Dashboard <MoveRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </div>

          </div>
        </section>

        {/* Developers */}
        <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="reveal text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Built by Engineers Who Care
            </h2>
            <p className="reveal text-zinc-400 mb-20 text-lg font-medium">
              Designed and engineered by Team IIIT Bhagalpur
            </p>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {[
                {
                  name: "Saurabh Singh",
                  role: "Lead Architect & Full Stack",
                  initials: "SS",
                  desc: "Backend-focused full-stack engineer passionate about AI agents, DevOps, and scalable systems.",
                  github: "https://github.com/DevSars24",
                  linkedin: "https://www.linkedin.com/in/saurabh-singh-25639a306",
                },
                {
                  name: "Nitesh Kumar Varma",
                  role: "AI/ML Lead",
                  initials: "NKV",
                  desc: "AI/ML engineer specializing in agentic chatbots, LLMs, and intelligent agricultural systems.",
                  github: "https://github.com/niteshkumarvarma30",
                  linkedin: "https://www.linkedin.com/in/niteshkumarvarmaa45",
                },
              ].map((dev, i) => (
                <div key={i} className="reveal bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] hover:border-white/20 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <Avatar className="h-24 w-24 mx-auto mb-6 border border-white/10 group-hover:border-zinc-500 group-hover:scale-110 transition-all duration-500 shadow-xl relative z-10">
                    <AvatarFallback className="text-2xl font-black bg-zinc-900 text-white">
                      {dev.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10 group-hover:text-zinc-200 transition-colors">{dev.name}</h3>
                  <Badge className="my-4 bg-zinc-900 text-zinc-300 border border-zinc-700 group-hover:border-zinc-500 group-hover:bg-zinc-800 transition-colors px-4 py-1 relative z-10">{dev.role}</Badge>
                  <p className="text-zinc-500 mb-8 max-w-sm mx-auto group-hover:text-zinc-400 transition-colors relative z-10">{dev.desc}</p>
                  <div className="flex justify-center gap-5 relative z-10">
                    <Link href={dev.github} target="_blank" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:scale-110 active:scale-95 transition-all">
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link href={dev.linkedin} target="_blank" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:scale-110 active:scale-95 transition-all">
                      <Linkedin className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-zinc-600 text-sm border-t border-white/5 bg-black">
          <p className="hover:text-zinc-400 transition-colors cursor-default">© 2026 Krishi Mitra — Empowering Indian Farmers with AI Technology.</p>
        </footer>
      </div>
    </>
  );
}
