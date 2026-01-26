"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Program {
    title: string;
    organizer: string;
    description: string;
    duration: string;
    location: string;
    contact_info?: string;
}

export default function TrainingPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTraining() {
            try {
                const res = await fetch("http://localhost:8000/women/training");
                if (res.ok) {
                    const data = await res.json();
                    setPrograms(data);
                }
            } catch (error) {
                console.error("Failed to fetch training programs", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTraining();
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-rose-500/30 overflow-hidden relative">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <Link href="/women-empowerment" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-8">
                    <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Back</span>
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4 text-indigo-400 font-mono text-sm tracking-tighter">
                        <GraduationCap className="w-4 h-4" />
                        <span>Skill Development</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        Training <span className="text-indigo-500">& Workshops</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl">
                        Nayi takneek aur kheti ke tareeke seekhein.
                    </p>
                </div>

                {loading ? (
                    <p className="text-slate-500">Loading programs...</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {programs.map((program, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col"
                            >
                                <div className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider w-fit mb-4">
                                    {program.organizer}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 flex-grow">
                                    {program.description}
                                </p>

                                <div className="space-y-3 mt-auto border-t border-white/5 pt-4">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <Clock className="w-4 h-4 text-indigo-500" />
                                        <span>{program.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <MapPin className="w-4 h-4 text-indigo-500" />
                                        <span>{program.location}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
