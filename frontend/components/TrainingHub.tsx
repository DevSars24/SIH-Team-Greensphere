"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, PlayCircle, BookOpen } from "lucide-react";
import Link from "next/link";

import { curriculum } from "@/lib/curriculum-data";


export default function TrainingHub() {
    const [activeWeek, setActiveWeek] = useState(0);

    return (
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">

            {/* Timeline Column */}
            <div className="lg:col-span-4 space-y-4">
                {curriculum.map((item, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveWeek(i)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${activeWeek === i
                            ? "bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/20"
                            : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${activeWeek === i ? "bg-white text-rose-600 border-white" : "border-white/20 text-slate-500"
                            }`}>
                            {i}
                        </div>
                        <div>
                            <p className={`text-xs font-bold uppercase tracking-wider ${activeWeek === i ? "text-rose-200" : "text-slate-600"}`}>
                                {item.week}
                            </p>
                            <p className={`font-bold ${activeWeek === i ? "text-white" : "text-slate-300"}`}>
                                {item.title}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8">
                <motion.div
                    key={activeWeek}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

                    <span className="inline-block px-4 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-widest mb-6">
                        Current Module
                    </span>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {curriculum[activeWeek].title}
                    </h2>

                    <p className="text-xl text-slate-400 leading-relaxed mb-10">
                        {curriculum[activeWeek].desc}
                    </p>

                    <div className="grid gap-4 mb-12">
                        {curriculum[activeWeek].topics.map((topic, i) => (
                            <div key={i} className="flex flex-col gap-2 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <span className="text-slate-200 font-bold text-lg">{topic.title}</span>
                                </div>
                                <p className="text-slate-400 text-sm ml-8 leading-relaxed">
                                    {topic.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Link
                            href={`/academy/lesson/${curriculum[activeWeek].slug}`}
                            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors"
                        >
                            <PlayCircle className="w-5 h-5" /> Start Lesson
                        </Link>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                            <BookOpen className="w-5 h-5" /> Read Notes
                        </button>
                    </div>

                </motion.div>
            </div>

        </div>
    );
}
