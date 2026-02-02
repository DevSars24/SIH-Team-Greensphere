"use client";

import Image from "next/image";
import { ArrowLeft, GraduationCap, MoveRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SchemesSection from "@/components/SchemesSection";
import SHGNetwork from "@/components/SHGNetwork";

export default function WomenFarmers() {


  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-rose-500/30 overflow-hidden relative">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

        {/* Back Button */}
        <Link href="/get-started" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-12">
          <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase">Back to Portal</span>
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-6 text-rose-400 font-mono text-sm tracking-tighter">
              <Sparkles className="w-4 h-4" />
              <span>Nari Shakti in Agriculture</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-6">
              Empowering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">
                Women Farmers.
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-lg border-l-2 border-rose-600 pl-6 mb-8">
              Providing modern tools, specialized training, and financial resources designed specifically for the women driving India's agriculture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative z-10 p-2 bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden">
              <Image
                src="/womenfarmers.png"
                alt="Women Farmers"
                width={600}
                height={400}
                className="rounded-[2.5rem] w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-4 border border-rose-500/10 rounded-[3.5rem] -z-10 animate-pulse" />
          </motion.div>
        </div>


        {/* Schemes Section */}
        <div id="schemes">
          <SchemesSection />
        </div>

        {/* SHG Network Section */}
        <div id="shg">
          <SHGNetwork />
        </div>

        {/* Footer Info */}
        <div className="mt-20 text-center border-t border-white/5 pt-10">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.5em]">Special Initiative for IIIT Bhagalpur Hackathon</p>
        </div>

      </div>
    </div>
  );
}