"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Users, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface SHG {
    name: string;
    location: string;
    members_count: number;
    focus_area: string;
    contact_person: string;
    contact_number?: string;
}

export default function SHGPage() {
    const [shgs, setShgs] = useState<SHG[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSHGs() {
            try {
                const res = await fetch("http://localhost:8000/women/shgs");
                if (res.ok) {
                    const data = await res.json();
                    setShgs(data);
                }
            } catch (error) {
                console.error("Failed to fetch SHGs", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSHGs();
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-rose-500/30 overflow-hidden relative">
            <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <div className="flex justify-between items-center mb-12">
                    <Link href="/women-empowerment" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all">
                        <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase">Back</span>
                    </Link>

                    <Link href="/community" className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2">
                        <Users className="w-4 h-4" /> Join Online Community
                    </Link>
                </div>

                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4 text-purple-400 font-mono text-sm tracking-tighter">
                        <Users className="w-4 h-4" />
                        <span>Community Groups</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        Self Help <span className="text-purple-500">Groups</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl">
                        Apne aas-paas ke samuh se judkar ek doosre ki madad karein.
                    </p>
                </div>

                {loading ? (
                    <p className="text-slate-500">Loading groups...</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {shgs.map((shg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        {shg.members_count} Members
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{shg.name}</h3>
                                <p className="text-purple-400 text-sm font-medium mb-6">Focus: {shg.focus_area}</p>

                                <div className="space-y-3 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <MapPin className="w-4 h-5 text-slate-500" />
                                        <span>{shg.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <Phone className="w-4 h-4 text-slate-500" />
                                        <span>{shg.contact_person}</span>
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
