"use client";
import { motion } from "framer-motion";
import { TrendingUp, ArrowLeft, BarChart3, ShieldCheck, Globe2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MandiPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-orange-500/30 overflow-x-hidden relative">
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <Link href="/get-started" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-12">
          <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Live Terminal</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-6 text-orange-400 font-mono text-sm tracking-tighter">
              <Globe2 className="w-4 h-4" />
              <span>Real-Time Mandi Data</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-6">
              Market <span className="text-orange-500">Intel.</span>
            </h1>
            <div className="space-y-4 border-l-2 border-orange-600 pl-6 mb-8">
              <p className="text-slate-300 text-lg font-medium">Don't settle for less. Know the right price.</p>
              <p className="text-slate-500 leading-relaxed italic">
                "Bichauliyon (Middlemen) ki manmaani khatam karein. Local traders ki exploitation se bachein aur desh bhar ki mandiyon ke bhav jaante hue apni fasal ka sahi daam paayein."
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative group">
            <div className="p-2 bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden">
              <Image src="/market-intel.png" alt="Market Intel" width={600} height={400} className="rounded-[2.5rem] grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
            </div>
          </motion.div>
        </div>

        {/* Live Ticker Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {['Wheat: ₹2,275', 'Rice: ₹4,500', 'Cotton: ₹7,100', 'Mustard: ₹5,400'].map((price, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <span className="font-bold text-white">{price}</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}