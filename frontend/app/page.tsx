"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoveRight, Github, Linkedin } from "lucide-react";
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
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
        {/* Background blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/20 rounded-full blur-[80px] animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full blur-[80px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-[80px] animate-blob animation-delay-4000" />
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-[100] px-6 py-4">
          <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              KRISHI MITRA
            </h1>

            <div className="flex items-center gap-6">
              <button className="hidden md:block text-sm font-medium hover:text-blue-400 transition">
                Platform
              </button>

              <SignedOut>
                <SignUpButton mode="modal">
                  <Button className="bg-blue-600 hover:bg-blue-500 rounded-xl px-5">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-4">
                  <Link href="/get-started">
                    <Button variant="ghost" className="text-blue-400">
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
        <section className="pt-44 pb-24 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            <div className="reveal inline-flex items-center gap-2 glass px-3 py-1 rounded-full mb-8">
              <Badge className="bg-blue-500/20 text-blue-300">New</Badge>
              <span className="text-xs text-slate-300">
                Built for Indian Farmers • Powered by AI
              </span>
            </div>
            <h1 className="reveal text-6xl md:text-8xl font-black mb-8 leading-[1.25]">
              <span className="bg-gradient-to-r from-slate-100 via-white to-slate-100 bg-clip-text text-transparent block">
                Smarter Farming
              </span>

              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-pulse block">
                Stronger Decisions
              </span>
            </h1>



            <p className="reveal text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Krishi Mitra helps farmers make better decisions using AI — from crop
              health and weather alerts to government schemes.
            </p>

            <div className="reveal flex justify-center gap-4 mb-20">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-gradient-to-r from-white to-slate-100 text-black hover:from-slate-100 hover:to-white rounded-2xl px-8 shadow-2xl shadow-white/20 font-semibold">
                    Start Using Krishi Mitra
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link href="/get-started">
                  <Button size="lg" className="bg-gradient-to-r from-white to-slate-100 text-black hover:from-slate-100 hover:to-white rounded-2xl px-8 shadow-2xl shadow-white/20 font-semibold">
                    Go to Dashboard <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>

              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="
    rounded-2xl px-8
    bg-transparent
    border border-slate-600
    text-slate-300
    hover:border-blue-400
    hover:text-blue-400
    hover:bg-blue-500/10
    focus:bg-transparent
    active:bg-transparent
    transition-all
  "
                >
                  See How It Works
                </Button>

              </Link>
            </div>

            <div className="reveal max-w-4xl mx-auto">
              <div className="glass rounded-[2rem] p-2">
                <Image
                  src="/KrishiPage.png"
                  alt="Krishi Mitra App"
                  width={900}
                  height={500}
                  className="rounded-[1.6rem]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Features Highlight */}
        <section className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">

              {/* Feature 1 */}
              <div className="reveal relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-emerald-500/40 transition-all">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">🌾</div>
                  <h3 className="font-bold text-white mb-2 text-lg">Crop Health</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">AI-powered disease detection from photos. diagnosis in seconds.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="reveal relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/30 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/40 transition-all">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">🌤️</div>
                  <h3 className="font-bold text-white mb-2 text-lg">Weather Alerts</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Real-time forecasts & farming tips to plan your harvest.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="reveal relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/40 transition-all">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">📋</div>
                  <h3 className="font-bold text-white mb-2 text-lg">Govt Schemes</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Eligibility checker & application help for subsidies.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-28 px-6 relative">
          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="reveal text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                How Krishi Mitra Works
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Ask. Analyze. Act.
                Get accurate farming decisions powered by AI — in seconds.
              </p>
            </div>

            {/* Main Content - Image + Steps */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

              {/* Left: Visual Diagram */}
              <div className="reveal order-2 lg:order-1">
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-emerald-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-700" />

                  {/* Image container */}
                  <div className="relative glass rounded-3xl p-4 overflow-hidden">
                    <div className="relative rounded-2xl overflow-hidden">
                      <Image
                        src="/how-it-works.png"
                        alt="How Krishi Mitra Chatbot Works - Step by Step Guide"
                        width={600}
                        height={400}
                        className="w-full h-auto transform group-hover:scale-105 transition duration-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-center text-slate-400 mt-6 text-sm">
                  💡 <span className="text-emerald-400 font-semibold">Interactive AI Chatbot</span> — Ask questions in your language, get instant expert advice
                </p>
              </div>

              {/* Right: Step-by-step explanation */}
              <div className="reveal order-1 lg:order-2 space-y-8">

                {/* Step 1 */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-emerald-500/40 transition-all">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                          <span className="text-2xl">💬</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs tracking-widest text-emerald-400 font-semibold mb-2">STEP 01</div>
                        <h3 className="text-xl font-bold mb-3 text-white">Ask Your Question</h3>
                        <p className="text-slate-400 leading-relaxed">
                          Type or speak your farming question in Hindi, English, or your local language. Upload crop photos for disease detection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/40 transition-all">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                          <span className="text-2xl">🤖</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs tracking-widest text-blue-400 font-semibold mb-2">STEP 02</div>
                        <h3 className="text-xl font-bold mb-3 text-white">AI Analyzes Context</h3>
                        <p className="text-slate-400 leading-relaxed">
                          Our AI processes your query with real-time weather data, soil info, and verified agricultural research.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/40 transition-all">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                          <span className="text-2xl">✅</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs tracking-widest text-purple-400 font-semibold mb-2">STEP 03</div>
                        <h3 className="text-xl font-bold mb-3 text-white">Get Expert Solutions</h3>
                        <p className="text-slate-400 leading-relaxed">
                          Receive actionable advice, treatment plans, scheme eligibility, and personalized recommendations instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom CTA */}
            <div className="reveal text-center">
              <div className="inline-flex items-center gap-3 glass px-6 py-4 rounded-2xl">
                <span className="text-slate-300">Ready to get started?</span>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 rounded-xl px-6">
                      Try Krishi Mitra Free
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/get-started">
                    <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 rounded-xl px-6">
                      Go to Dashboard <MoveRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </div>

          </div>
        </section>

        {/* Developers */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="reveal text-4xl md:text-5xl font-bold mb-4">
              Built by Engineers Who Care About Farmers
            </h2>
            <p className="reveal text-slate-400 mb-20">
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
                <div key={i} className="reveal bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:border-blue-500/40 transition-all group">
                  <Avatar className="h-24 w-24 mx-auto mb-6 border-2 border-white/10 group-hover:border-blue-500/40 transition-all">
                    <AvatarFallback className="text-xl font-bold bg-slate-950 text-slate-200">
                      {dev.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-slate-100">{dev.name}</h3>
                  <Badge className="my-4 bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">{dev.role}</Badge>
                  <p className="text-slate-400 mb-6">{dev.desc}</p>
                  <div className="flex justify-center gap-4">
                    <Link href={dev.github} target="_blank" className="text-slate-400 hover:text-white transition-colors">
                      <Github />
                    </Link>
                    <Link href={dev.linkedin} target="_blank" className="text-slate-400 hover:text-white transition-colors">
                      <Linkedin />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-slate-500 text-sm">
          © 2026 Krishi Mitra — Empowering Indian Farmers with Technology.
        </footer>
      </div>
    </>
  );
}
