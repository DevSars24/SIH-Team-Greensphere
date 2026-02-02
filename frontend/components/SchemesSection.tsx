"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, TrendingUp, Users, Sprout, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

const schemes = [
    {
        title: "MKSP (Mahila Kisan Sashaktikaran Pariyojana)",
        desc: "Empowering women in agriculture with sustainable farming training & market linkages.",
        details: "Project funding, higher support for hill states, access to inputs.",
        link: "https://mksp.gov.in",
        color: "from-green-500/20 to-emerald-500/5",
        icon: <Sprout className="w-6 h-6 text-green-400" />
    },
    {
        title: "PM-Kisan Samman Nidhi",
        desc: "Direct income support of ₹6,000/year for land-holding farmer families.",
        details: "Women landholders explicitly eligible. Provides basic liquidity.",
        link: "https://pmkisan.gov.in",
        color: "from-blue-500/20 to-indigo-500/5",
        icon: <Coins className="w-6 h-6 text-blue-400" />
    },
    {
        title: "NABARD WSHG Support",
        desc: "Funds promotion of Women Self-Help Groups, credit-linkage & FPOs.",
        details: "Capacity building, micro-enterprise promotion, bank linkage.",
        link: "https://www.nabard.org", // simplified
        color: "from-yellow-500/20 to-amber-500/5",
        icon: <Users className="w-6 h-6 text-yellow-400" />
    },
    {
        title: "ICAR Skill Training (KVK)",
        desc: "Tailored skill-development courses: processing, value-addition, entrepreneurship.",
        details: "Short courses, technical content, demo plots.",
        link: "https://icar.org.in",
        color: "from-rose-500/20 to-pink-500/5",
        icon: <TrendingUp className="w-6 h-6 text-rose-400" />
    }
];

const benefits = [
    { title: "Group Formation", desc: "Pool savings & negotiate better prices." },
    { title: "Skill Transfer", desc: "Learn modern techniques for higher yields." },
    { title: "Liquidity", desc: "Baseline cash flow & micro-loans." },
    { title: "Market Links", desc: "Move from raw produce to branded products." }
];

export default function SchemesSection() {
    return (
        <section className="py-12 md:py-20 relative">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Schemes & <span className="text-blue-500">Initiatives</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Government backed programs designed to accelerate your agricultural growth.
                    </p>
                </div>

                {/* Schemes Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    {schemes.map((scheme, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 md:p-8 rounded-[2rem] bg-gradient-to-br ${scheme.color} border border-white/5 hover:border-white/10 transition-all group`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                                    {scheme.icon}
                                </div>
                                <a href={scheme.link} target="_blank" rel="noreferrer">
                                    <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-full">
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                                    </Button>
                                </a>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{scheme.title}</h3>
                            <p className="text-slate-300 font-medium mb-3">{scheme.desc}</p>
                            <p className="text-slate-500 text-sm leading-relaxed">{scheme.details}</p>
                        </motion.div>
                    ))}
                </div>

                {/* How it helps & Financial Aid Checklist */}
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Benefits Column */}
                    <div className="lg:col-span-7">
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Users className="w-6 h-6 text-blue-500" /> Impact on Small Farmers
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {benefits.map((b, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/5">
                                    <h4 className="font-bold text-slate-200 mb-1">{b.title}</h4>
                                    <p className="text-sm text-slate-500">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Checklsit Column */}
                    <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <Coins className="w-5 h-5 text-yellow-500" /> Financial Aid Checklist
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "PM-Kisan: ₹6,000/yr (Apply via State Portal)",
                                "NABARD SHG: Seed funds & Bank Linkage",
                                "Convergence: MKSP + MGNREGA grants",
                                "Microfinance: MUDRA / NBFC channels"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-400 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-xs text-slate-600 mb-4">
                                Need help accessing these? Contact your local Krishi Vigyan Kendra.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
