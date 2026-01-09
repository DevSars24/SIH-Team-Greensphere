"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  MoveRight, 
  Bot, 
  Sprout, 
  TrendingUp, 
  Gavel, 
  Users, 
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function GetStarted() {
  const router = useRouter();
  
  const features = [
    {
      title: "AI Chatbot",
      subtitle: "Krishi Sathi",
      desc: "Instant answers for crops & soil.",
      icon: <Bot className="w-5 h-5 text-blue-400" />,
      size: "col-span-1 row-span-1",
      color: "rgba(59, 130, 246, 0.1)",
      link: "/chatbot"
    },
    {
      title: "Crop Doctor",
      subtitle: "Disease Detection",
      desc: "Upload images to diagnose plant health immediately with AI vision.",
      icon: <Sprout className="w-5 h-5 text-emerald-400" />,
      size: "md:col-span-2 col-span-1 row-span-1",
      color: "rgba(16, 185, 129, 0.1)",
      link: "#"
    },
    {
      title: "Market Intel",
      subtitle: "Live Mandi",
      desc: "Real-time pricing data.",
      icon: <TrendingUp className="w-5 h-5 text-orange-400" />,
      size: "col-span-1 row-span-1",
      color: "rgba(249, 115, 22, 0.1)",
      link: "#"
    },
    {
      title: "Govt Schemes",
      subtitle: "Benefits",
      desc: "Financial aid and subsidies tailored for you.",
      icon: <Gavel className="w-5 h-5 text-purple-400" />,
      size: "col-span-1 md:row-span-2",
      color: "rgba(168, 85, 247, 0.1)",
      link: "#"
    },
    {
      title: "Women Farmers",
      subtitle: "Empowerment",
      desc: "Special resources and training modules.",
      icon: <Users className="w-5 h-5 text-rose-400" />,
      size: "md:col-span-2 col-span-1 row-span-1",
      color: "rgba(244, 63, 94, 0.1)",
      link: "#"
    },
  ];

  const handleFeatureClick = (link: string) => {
    if (link !== "#") {
      router.push(link);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* --- PREMIUM BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-emerald-600/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-20 relative z-10">
        
        {/* Top Nav */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12 md:mb-16"
        >
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all">
            <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">Portal Home</span>
          </Link>
          <div className="flex gap-2">
             <div className="h-1 w-8 md:w-12 bg-blue-600 rounded-full" />
             <div className="h-1 w-3 md:w-4 bg-white/10 rounded-full" />
          </div>
        </motion.div>

        {/* --- HERO SECTION --- */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="flex items-center gap-2 mb-4 md:mb-6 text-blue-400 font-mono text-xs md:text-sm tracking-tighter">
              <Sparkles className="w-4 h-4" />
              <span>Smarter Agriculture with AI</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-6 md:mb-8">
              Kisan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                Revolution.
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-xl max-w-lg leading-relaxed mb-8 md:mb-10 border-l-2 border-blue-600 pl-4 md:pl-6">
              Step into the future of Indian farming. High-performance tools for the modern agriculturist.
            </p>
            <Button size="lg" className="w-full md:w-auto bg-white text-black hover:bg-slate-200 rounded-full px-10 h-14 font-bold transition-all hover:scale-105 active:scale-95">
              Welcome Back <MoveRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative order-1 lg:order-2"
          >
            <div className="relative z-10 p-1.5 md:p-2 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl">
              <Image
                src="/krishi.png" 
                alt="Krishi Mitra"
                width={500}
                height={600}
                priority
                className="rounded-[2.2rem] md:rounded-[2.5rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-blue-600/30 rounded-br-[2.5rem] hidden md:block" />
          </motion.div>
        </div>

        {/* --- BENTO BOX FEATURES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 0.99 }}
              onClick={() => handleFeatureClick(item.link)}
              className={`${item.size} group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/5 bg-[#050505] p-6 md:p-8 hover:border-white/20 transition-all duration-500 min-h-[220px] md:min-h-0 cursor-pointer`}
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{ background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)` }}
              />

              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all">
                    {item.icon}
                  </div>
                  <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{item.subtitle}</h4>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">{item.title}</h3>
                </div>
                
                <div className="mt-6">
                  <p className="text-slate-500 text-sm leading-snug group-hover:text-slate-300 transition-colors">
                    {item.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-white md:opacity-0 md:group-hover:opacity-100 md:-translate-x-2 md:group-hover:translate-x-0 transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {item.link === "#" ? "Coming Soon" : "Go to Tool"}
                    </span>
                    {item.link !== "#" && <MoveRight className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 md:mt-32 flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 text-slate-600 gap-6">
           <div className="flex gap-6">
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase">Architecture v2.0</span>
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase">IIIT Bhagalpur</span>
           </div>
           <p className="text-[9px] md:text-[10px] max-w-xs text-center md:text-right">Designed for high-impact agricultural operations using Neural Networks.</p>
        </div>
      </div>
    </div>
  );
}