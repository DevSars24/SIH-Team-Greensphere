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
              <button className="hidden md:block text-sm font-medium hover:text-blue-400 transition">
                Team
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

            <h1 className="reveal text-6xl md:text-8xl font-black mb-8">
              Smarter Farming.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Stronger Decisions.
              </span>
            </h1>

            <p className="reveal text-lg text-slate-400 max-w-2xl mx-auto mb-12">
              Krishi Mitra helps farmers make better decisions using AI — from crop
              health and weather alerts to mandi prices and government schemes.
            </p>

            <div className="reveal flex justify-center gap-4 mb-20">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-white text-black rounded-2xl px-8">
                    Start Using Krishi Mitra
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link href="/get-started">
                  <Button size="lg" className="bg-white text-black rounded-2xl px-8">
                    Go to Dashboard <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>

              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="rounded-2xl px-8">
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

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

      {/* Card 1 */}
      <div className="reveal relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
        <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 h-full hover:border-emerald-500/40 transition-all">

          <div className="flex items-center justify-between mb-8">
            <span className="text-sm tracking-widest text-emerald-400 font-semibold">
              STEP 01
            </span>
            <span className="text-4xl">💬</span>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-white">
            Ask Your Question
          </h3>

          <p className="text-slate-400 leading-relaxed">
            Ask anything about crops, soil, weather, mandi prices,
            or upload a photo for instant disease detection.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="reveal relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/30 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
        <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 h-full hover:border-blue-500/40 transition-all">

          <div className="flex items-center justify-between mb-8">
            <span className="text-sm tracking-widest text-blue-400 font-semibold">
              STEP 02
            </span>
            <span className="text-4xl">🤖</span>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-white">
            AI Understands the Problem
          </h3>

          <p className="text-slate-400 leading-relaxed">
            Our AI analyzes your query using real-time weather,
            market data, and verified agricultural knowledge.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="reveal relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
        <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 h-full hover:border-emerald-500/40 transition-all">

          <div className="flex items-center justify-between mb-8">
            <span className="text-sm tracking-widest text-emerald-400 font-semibold">
              STEP 03
            </span>
            <span className="text-4xl">✅</span>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-white">
            Get Actionable Solutions
          </h3>

          <p className="text-slate-400 leading-relaxed">
            Receive step-by-step advice, remedies, price trends,
            or government scheme details instantly.
          </p>
        </div>
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
                <div key={i} className="reveal glass p-10 rounded-3xl">
                  <Avatar className="h-24 w-24 mx-auto mb-6">
                    <AvatarFallback className="text-xl font-bold">
                      {dev.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{dev.name}</h3>
                  <Badge className="my-4">{dev.role}</Badge>
                  <p className="text-slate-400 mb-6">{dev.desc}</p>
                  <div className="flex justify-center gap-4">
                    <Link href={dev.github} target="_blank">
                      <Github />
                    </Link>
                    <Link href={dev.linkedin} target="_blank">
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
