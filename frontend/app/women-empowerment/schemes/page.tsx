"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Loader2, Landmark } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Scheme {
    title: string;
    description: string;
    eligibility: string;
    benefits: string;
    application_link?: string;
}

export default function SchemesPage() {
    const [schemes, setSchemes] = useState<Scheme[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSchemes() {
            try {
                const res = await fetch("http://localhost:8000/women/schemes");
                if (res.ok) {
                    const data = await res.json();
                    setSchemes(data);
                }
            } catch (error) {
                console.error("Failed to fetch schemes", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSchemes();
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-rose-500/30 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
                {/* Back Button */}
                <Link href="/women-empowerment" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-8">
                    <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Back</span>
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4 text-rose-400 font-mono text-sm tracking-tighter">
                        <Landmark className="w-4 h-4" />
                        <span>Government Initiatives</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        Government <span className="text-rose-500">Schemes</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl">
                        Sarkar dwara mahila kisanon ke liye chalaayi gayi yojanaayein.
                    </p>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {schemes.map((scheme, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-rose-500/30 transition-all group"
                            >
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                                    {scheme.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    {scheme.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex gap-2 text-sm text-slate-300">
                                        <span className="text-white/40 font-mono text-xs uppercase tracking-wider w-24 shrink-0">Eligibility:</span>
                                        <span>{scheme.eligibility}</span>
                                    </div>
                                    <div className="flex gap-2 text-sm text-slate-300">
                                        <span className="text-white/40 font-mono text-xs uppercase tracking-wider w-24 shrink-0">Benefits:</span>
                                        <span className="text-emerald-400">{scheme.benefits}</span>
                                    </div>
                                </div>

                                {scheme.application_link && (
                                    <a
                                        href={scheme.application_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500 hover:text-rose-400 transition-colors bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 rounded-lg"
                                    >
                                        Apply Now <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
