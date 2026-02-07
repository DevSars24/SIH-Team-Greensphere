"use client";
import { motion } from "framer-motion";
import { Gavel, ArrowLeft, Landmark, BadgeCheck, Sparkles, ExternalLink, Sprout, Store, IndianRupee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SchemesPage() {
  const schemes = [
    {
      title: "PM-Kisan Samman Nidhi",
      desc: "Income support of ₹6,000 per year for all land-holding farmers.",
      link: "https://pmkisan.gov.in/",
      icon: <IndianRupee className="w-6 h-6 text-emerald-400" />,
      color: "border-emerald-500/20",
      official: true
    },
    {
      title: "PM Fasal Bima Yojana",
      desc: "Crop insurance scheme to provide financial support in case of crop failure.",
      link: "https://pmfby.gov.in/",
      icon: <Gavel className="w-6 h-6 text-blue-400" />,
      color: "border-blue-500/20",
      official: true
    },
    {
      title: "Soil Health Card",
      desc: "Get information on nutrient status of your soil and recommendation on dosage.",
      link: "https://www.nic.gov.in/project/soil-health-card-portal/",
      icon: <Sprout className="w-6 h-6 text-green-400" />,
      color: "border-green-500/20",
      official: true
    },
    {
      title: "Ministry Agriculture Schemes",
      desc: "Comprehensive list of all major schemes by the Ministry of Agriculture.",
      link: "https://agriwelfare.gov.in/en/Major",
      icon: <Landmark className="w-6 h-6 text-orange-400" />,
      color: "border-orange-500/20",
      official: true
    },
    {
      title: "PM Kisan Maandhan Yojana",
      desc: "Pension scheme for small and marginal farmers for social security.",
      link: "https://nfwpis.da.gov.in/Home/PMKisanMaandhanYojana",
      icon: <BadgeCheck className="w-6 h-6 text-purple-400" />,
      color: "border-purple-500/20",
      official: true
    },
    {
      title: "eNAM (National Market)",
      desc: "Online trading platform for agricultural commodities in India.",
      link: "https://digitalmarketindia.org/",
      icon: <Store className="w-6 h-6 text-yellow-400" />,
      color: "border-yellow-500/20",
      official: true
    }
  ];

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

        {/* Hero Section */}
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
              "Complete list of verified government schemes for financial aid, insurance, and market access."
            </p>
          </motion.div>

          <motion.div className="lg:w-1/2 relative group">
            <div className="p-2 bg-[#0a0a0a] border border-white/10 rounded-[3.5rem] overflow-hidden">
              <Image src="/schemes.png" alt="Schemes" width={600} height={450} className="rounded-[3rem] opacity-80" />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-purple-600 text-white font-bold shadow-2xl flex items-center gap-2">
              <BadgeCheck className="w-6 h-6" /> Verified Links
            </div>
          </motion.div>
        </div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[2rem] bg-white/[0.02] border ${item.color} backdrop-blur-xl flex flex-col justify-between h-full group hover:bg-white/[0.05] transition-colors`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <Link href={item.link} target="_blank" className="w-full">
                <button className="w-full py-4 rounded-xl bg-white text-black font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-purple-500 hover:text-white transition-all">
                  Visit Official Portal <ExternalLink className="w-3 h-3" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}