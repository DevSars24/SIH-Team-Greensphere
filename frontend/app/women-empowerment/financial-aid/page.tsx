"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Wallet, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FinancialAid {
    title: string;
    provider: string;
    amount_range: string;
    interest_rate?: string;
    eligibility: string;
    application_process: string;
}

export default function FinancialAidPage() {
    const [aids, setAids] = useState<FinancialAid[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAid() {
            try {
                const res = await fetch("http://localhost:8000/women/financial-aid");
                if (res.ok) {
                    const data = await res.json();
                    setAids(data);
                }
            } catch (error) {
                console.error("Failed to fetch financial aid", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAid();
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-rose-500/30 overflow-hidden relative">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <Link href="/women-empowerment" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-8">
                    <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Back</span>
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4 text-emerald-400 font-mono text-sm tracking-tighter">
                        <Wallet className="w-4 h-4" />
                        <span>Financial Support</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        Loans & <span className="text-emerald-500">Subsidies</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl">
                        Kam byaaj dar par loan aur kheti ke liye aarthik madad.
                    </p>
                </div>

                {loading ? (
                    <p className="text-slate-500">Loading data...</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {aids.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-emerald-500/30 transition-all"
                            >
                                <div className="absolute top-6 right-6">
                                    <div className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {item.provider}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <div className="text-3xl font-bold text-emerald-400 mb-6 tracking-tight">
                                    {item.amount_range}
                                    <span className="text-sm text-slate-500 font-normal ml-2 tracking-normal">limit</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Interest Rate</span>
                                            <span className="text-slate-200">{item.interest_rate || "Not specified"}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                        <div>
                                            <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Eligibility</span>
                                            <span className="text-slate-200">{item.eligibility}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all">
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
