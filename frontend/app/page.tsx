"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoveRight, Zap, Globe, BarChart3 } from "lucide-react";

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
        .animate-blob {
          animation: blob 7s infinite;
        }
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

        .text-glow {
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }
      `}</style>

      <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-blue-500/30 overflow-x-hidden">
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000" />
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-[100] px-6 py-4">
          <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex justify-between items-center border-white/5">
            <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              KRISHI MITRA
            </h1>
            <div className="flex items-center gap-6">
              <button className="hidden md:block text-sm font-medium hover:text-blue-400 transition-colors">Features</button>
              <button className="hidden md:block text-sm font-medium hover:text-blue-400 transition-colors">Developers</button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 shadow-lg shadow-blue-500/20">
                Launch App
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-44 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="reveal inline-flex items-center gap-2 glass px-3 py-1 rounded-full mb-8 border-white/10">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-0">New</Badge>
              <span className="text-xs font-medium text-blue-100/70 tracking-wide uppercase">AI-Driven Agriculture v2.0</span>
            </div>

            <h1 className="reveal text-6xl md:text-8xl font-black tracking-tight mb-8">
              Farming <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Smarter</span> <br />
              with Artificial Intelligence.
            </h1>

            <p className="reveal text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Empowering farmers with real-time crop intelligence, localized weather 
              analytics, and market predictions through a simple, multilingual interface.
            </p>

            <div className="reveal flex flex-wrap justify-center gap-4 mb-20">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 rounded-2xl px-8 h-14 font-semibold text-base transition-transform hover:scale-105">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="glass border-white/10 hover:bg-white/5 rounded-2xl px-8 h-14 font-semibold text-base transition-transform hover:scale-105">
                How it works <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Optimized Hero Image */}
            <div className="reveal relative max-w-4xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative glass rounded-[2rem] p-2 overflow-hidden border-white/10">
                <Image
                  src="/KrishiPage.png" 
                  alt="App Interface"
                  width={900}
                  height={500}
                  className="rounded-[1.8rem] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Developers Section */}
        <section className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="reveal text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Architected by Team IIIT Bhagalpur</h2>
              <div className="h-1.5 w-20 bg-blue-500 mx-auto rounded-full" />
              <p className="mt-6 text-slate-400">The engineering team behind Krishi Mitra</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { 
                  name: "Saurabh Singh Rajput", 
                  role: "System Architect", 
                  initials: "SSR", 
                  desc: "Specializes in scalable backend systems and high-performance ML model integration." 
                },
                { 
                  name: "Sudhanshu Shekhar", 
                  role: "AI Lead", 
                  initials: "SS", 
                  desc: "Focuses on deep learning optimization and agricultural data pattern recognition." 
                },
                { 
                  name: "Bhaskar Kumar", 
                  role: "UX Engineer", 
                  initials: "Bk", 
                  desc: "Crafting intuitive digital experiences for users in diverse rural environments." 
                }
              ].map((dev, i) => (
                <div key={i} className="reveal group">
                  <div className="h-full glass p-8 rounded-[2.5rem] border-white/5 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500" />
                        <Avatar className="h-20 w-20 border-2 border-white/10 relative">
                          <AvatarFallback className="bg-[#0f172a] text-blue-400 font-bold text-xl">
                            {dev.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{dev.name}</h3>
                      <p className="text-xs font-semibold uppercase tracking-widest text-blue-500/80 mb-4">{dev.role}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {dev.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">© 2026 Krishi Mitra. Designed for impact.</p>
            <div className="flex gap-8 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Github</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}