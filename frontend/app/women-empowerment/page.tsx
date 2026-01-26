"use client";

import Image from "next/image";
import { ArrowLeft, GraduationCap, HandCoins, Users2, Heart, Sparkles, MoveRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WomenFarmers() {
  const resources = [
    {
      title: "Skill Training",
      desc: "Modern farming techniques aur organic certification ke courses.",
      icon: <GraduationCap className="w-6 h-6 text-rose-400" />,
      color: "rgba(244, 63, 94, 0.15)",
      link: "/women-empowerment/training"
    },
    {
      title: "Financial Aid",
      desc: "Mahila kisanon ke liye vishesh subsidies aur zero-interest loans.",
      icon: <HandCoins className="w-6 h-6 text-rose-400" />,
      color: "rgba(244, 63, 94, 0.15)",
      link: "/women-empowerment/financial-aid"
    },
    {
      title: "Self Help Groups",
      desc: "Apne ilake ki mahilaon ke saath jud kar vyapar shuru karein.",
      icon: <Users2 className="w-6 h-6 text-rose-400" />,
      color: "rgba(244, 63, 94, 0.15)",
      link: "/women-empowerment/shg"
    },
    {
      title: "Government Schemes",
      desc: "Sarkar ki taraf se milne wali suvidhayein aur labh.",
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      color: "rgba(244, 63, 94, 0.15)",
      link: "/women-empowerment/schemes"
    }
  ];

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

        {/* Content Cards (Glassmorphism) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((item, i) => (
            <Link href={item.link} key={i} className="block group">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:border-rose-500/30 transition-all h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-black transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 group-hover:text-slate-300">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-400 opacity-0 group-hover:opacity-100 transition-all">
                  Learn More <MoveRight className="w-3 h-3" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-20 text-center border-t border-white/5 pt-10">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.5em]">Special Initiative for IIIT Bhagalpur Hackathon</p>
        </div>

      </div>
    </div>
  );
}