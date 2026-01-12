"use client";
import { motion } from "framer-motion";
import { PlayCircle, BookOpen, ArrowLeft, Lightbulb, Star, ChevronRight, Eye, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AcademyPage() {
  const lessons = [
    { title: "Hydroponics 101", duration: "15 mins", level: "Beginner", views: "1.2k" },
    { title: "Organic Fertilizer Guide", duration: "10 mins", level: "Essential", views: "2.5k" },
    { title: "Modern Soil Testing", duration: "08 mins", level: "Advanced", views: "900" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0C10] text-slate-200 selection:bg-teal-500/30 overflow-x-hidden relative">
      {/* Background Glows for Depth */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-slate-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Top Navigation */}
        <Link href="/get-started" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-16">
          <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-teal-500/50 group-hover:bg-teal-500/10 transition-all">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Portal / Academy</span>
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/20 text-teal-400 font-mono text-[10px] uppercase tracking-widest">
              <Lightbulb className="w-3 h-3" />
              <span>Gyaan hi Shakti Hai</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85] mb-8">
              Krishi <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">Vidya.</span>
            </h1>
            <p className="text-slate-400 text-lg border-l-2 border-teal-500/50 pl-6 mb-10 max-w-md leading-relaxed">
              "Kheti ke naye tarike sikhein aur apni  aaamdani dugni karein. Digital kisan banein aur duniya ke saath kadam se kadam milayein."
            </p>
          </motion.div>

          {/* Featured Video Container */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
            <div className="p-3 bg-[#11141B] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              {/* Reference Image overlay style */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent z-10 opacity-60" />
              
              <div className="absolute bottom-10 left-10 z-20">
                <div className="flex items-center gap-4">
                   <div className="p-5 rounded-full bg-teal-500 text-black shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-transform group-hover:scale-110">
                      <PlayCircle className="w-8 h-8 fill-current" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-1">Featured Lesson</p>
                      <p className="text-xl font-bold text-white">Modern Soil Testing</p>
                   </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 z-20">
                <button className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              <Image 
                src="/krishi.png" 
                alt="Academy" 
                width={800} 
                height={500} 
                className="rounded-[2rem] opacity-50 group-hover:opacity-70 transition-all duration-700 object-cover aspect-video" 
              />
            </div>
            {/* Decorative soft glow behind image */}
            <div className="absolute -inset-4 bg-teal-500/5 blur-3xl rounded-[3rem] -z-10 transition-opacity group-hover:opacity-100 opacity-50" />
          </motion.div>
        </div>

        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">Recent Lessons</h2>
        </div>

        {/* Lesson Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {lessons.map((lesson, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] bg-[#11141B] border border-white/5 hover:border-teal-500/30 transition-all duration-500 flex flex-col group relative"
            >
              <div className="flex justify-between items-start mb-8">
                 <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/10 text-teal-500">
                    <BookOpen className="w-6 h-6" />
                 </div>
                 <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    <Star className="w-3 h-3" /> {lesson.level}
                 </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-teal-400 transition-colors">
                {lesson.title}
              </h3>

              <div className="flex items-center gap-6 mt-auto text-slate-500 text-[11px] font-mono mb-8 border-t border-white/5 pt-6">
                 <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                 </div>
                 <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> {lesson.views}
                 </div>
              </div>

              <button className="w-full py-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500 hover:text-black transition-all font-bold text-xs uppercase tracking-[0.15em] shadow-sm">
                Watch Lesson
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}