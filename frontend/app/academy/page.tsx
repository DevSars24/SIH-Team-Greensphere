"use client";

import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import TrainingHub from "@/components/TrainingHub";


export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-rose-500/30 overflow-x-hidden relative">

      {/* Background Noise/Gradients */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-6">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight flex items-center gap-3">
              Krishi Vidya Academy <GraduationCap className="w-8 h-8 md:w-12 md:h-12 text-rose-500" />
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Comprehensive Agricultural Training System</p>
          </div>

          {/* Partners Logos (Mock) */}
          <div className="flex gap-4">
            {["ICAR", "NABARD", "KVK"].map((p, i) => (
              <div key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-500">
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Training Module */}
        <TrainingHub />

      </div>



    </div>
  );
}