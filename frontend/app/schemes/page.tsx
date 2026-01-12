"use client";
import { motion } from "framer-motion";
import { Gavel, ArrowLeft, Landmark, BadgeCheck, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SchemesPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-purple-500/30 overflow-x-hidden relative">
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <Link href="/get-started" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-12">
          <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Government Registry</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-6 text-purple-400 font-mono text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Direct Benefit Transfer (DBT)</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85] mb-8">
              Sarkari <br /><span className="text-purple-500">Yojana.</span>
            </h1>
            <p className="text-slate-400 text-lg border-l-2 border-purple-600 pl-6 mb-10 italic">
              "Sarkari labh ab har kisan ke haath mein. Humara maqsad hai ki koi bhi kisan jaankari ke abhaav mein subsidies aur financial help se peeche na rahe."
            </p>
          </motion.div>

          <motion.div className="lg:w-1/2 relative group">
            <div className="p-2 bg-[#0a0a0a] border border-white/10 rounded-[3.5rem] overflow-hidden">
              <Image src="/schemes.png" alt="Schemes" width={600} height={450} className="rounded-[3rem] opacity-80" />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-purple-600 text-white font-bold shadow-2xl flex items-center gap-2">
              <BadgeCheck className="w-6 h-6" /> 100% Verified
            </div>
          </motion.div>
        </div>

        {/* Schemes Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "PM-Kisan", icon: <Landmark />, color: "border-purple-500/20" },
            { title: "Kisan Credit", icon: <BadgeCheck />, color: "border-blue-500/20" },
            { title: "Fasal Bima", icon: <Gavel />, color: "border-emerald-500/20" }
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className={`p-8 rounded-[2rem] bg-white/[0.02] border ${item.color} backdrop-blur-xl flex flex-col items-center text-center`}>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-purple-400">{item.icon}</div>
              <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest">Apply in 5 Mins</p>
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white hover:text-black transition-all font-bold text-xs uppercase">Check Eligibility</button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}