"use client";
import { motion } from "framer-motion";
import { Upload, Zap, ArrowLeft, Camera, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CropDoctor() {
  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-emerald-500/30 overflow-x-hidden relative">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <Link href="/get-started" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-12">
          <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Diagnostic Lab</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-6 text-emerald-400 font-mono text-sm tracking-tighter">
              <Zap className="w-4 h-4 fill-emerald-400" />
              <span>AI Neural Vision Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-6">
              Crop <span className="text-emerald-500 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Doctor.</span>
            </h1>
            <div className="space-y-4 border-l-2 border-emerald-600 pl-6 mb-8">
              <p className="text-slate-300 text-lg font-medium">Identify diseases before they spread.</p>
              <p className="text-slate-500 leading-relaxed italic">
                "Fasal ki bimaari ko pehchanein aur sahi ilaaj paayein. Humara motive hai aapki mehnat ko kharaab hone se bachana aur pesticides ka kharcha kam karna."
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
            <div className="relative z-10 p-2 bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden">
              {/* Scan Animation */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[2.5rem]">
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)]"
                />
              </div>
              <Image src="/crop-doctor.png" alt="Crop Doctor" width={600} height={400} className="rounded-[2.5rem] opacity-70 group-hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="absolute -inset-4 border border-emerald-500/10 rounded-[3.5rem] -z-10" />
          </motion.div>
        </div>

        {/* Action Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Start Diagnosis / Jaanch Shuru Karein</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-emerald-500 text-black hover:bg-emerald-400 px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" /> Upload Photo
            </button>
            <button className="bg-white/5 text-white hover:bg-white/10 px-10 py-4 rounded-2xl font-bold border border-white/10 transition-all flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" /> Open Camera
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}