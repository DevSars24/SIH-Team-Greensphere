"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowLeft, BarChart3, ShieldCheck, Globe2, Search, RefreshCw, MapPin, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/config";

interface MandiRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  min_price: string;
  max_price: string;
  modal_price: string;
  arrival_date: string;
}

const POPULAR_CROPS = ["All", "Wheat", "Rice", "Onion", "Tomato", "Potato", "Cotton", "Mustard", "Soybean", "Maize", "Gram (Chana)"];

export default function MandiPage() {
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState<MandiRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("Verified Mandi APMC Intel");

  const fetchMandiPrices = async (crop?: string, query?: string) => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/mandi/prices?limit=25`;
      const filterCrop = crop !== undefined ? crop : selectedCrop;
      if (filterCrop && filterCrop !== "All") {
        url += `&commodity=${encodeURIComponent(filterCrop.split(" ")[0])}`;
      }
      const q = query !== undefined ? query : searchQuery;
      if (q.trim()) {
        url += `&commodity=${encodeURIComponent(q.trim())}`;
      }
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
        setSource(data.source || "Mandi APMC Network");
      }
    } catch (err) {
      console.error("Error fetching mandi prices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMandiPrices("All", "");
  }, []);

  const handleCropSelect = (crop: string) => {
    setSelectedCrop(crop);
    fetchMandiPrices(crop, searchQuery);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMandiPrices(selectedCrop, searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-orange-500/30 overflow-x-hidden relative">
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <Link href="/get-started" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-12">
          <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Live Terminal</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-6 text-orange-400 font-mono text-sm tracking-tighter">
              <Globe2 className="w-4 h-4" />
              <span>Real-Time Mandi Data & APMC Intel</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-6">
              Market <span className="text-orange-500">Intel.</span>
            </h1>
            <div className="space-y-4 border-l-2 border-orange-600 pl-6 mb-8">
              <p className="text-slate-300 text-lg font-medium">Don't settle for less. Know the right price.</p>
              <p className="text-slate-500 leading-relaxed italic">
                "Bichauliyon (Middlemen) ki manmaani khatam karein. Local traders ki exploitation se bachein aur desh bhar ki mandiyon ke bhav jaante hue apni fasal ka sahi daam paayein."
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative group">
            <div className="p-2 bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden">
              <Image src="/market-intel.png" alt="Market Intel" width={600} height={400} className="rounded-[2.5rem] grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
            </div>
          </motion.div>
        </div>

        {/* Live Search & Filter Section */}
        <div className="mb-8 space-y-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commodity or mandi (e.g., Wheat, Lasalgaon, Onion)..."
                className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/20"
            >
              <Search className="w-4 h-4" />
              <span>Search Rates</span>
            </button>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setSelectedCrop("All"); fetchMandiPrices("All", ""); }}
              className="px-4 py-3.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </form>

          {/* Commodity Badges */}
          <div className="flex flex-wrap gap-2">
            {POPULAR_CROPS.map((crop) => (
              <button
                key={crop}
                onClick={() => handleCropSelect(crop)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  selectedCrop === crop
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                    : "bg-white/[0.03] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Source info */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Feed: <span className="text-slate-300 font-medium">{source}</span></span>
          </div>
          <span>Showing {records.length} mandi records</span>
        </div>

        {/* Mandi Cards Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 font-mono text-sm">Fetching real-time Mandi market rates...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center border border-white/10 rounded-3xl bg-white/[0.02]">
            <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">No mandi records found for this search.</p>
            <p className="text-xs text-slate-600 mt-1">Try another crop name or reset the filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.map((r, idx) => (
              <motion.div
                key={`${r.market}-${r.commodity}-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full">
                        {r.variety || "Standard"}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2">{r.commodity}</h3>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-bold">Live</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{r.market}, {r.district}, {r.state}</span>
                  </div>

                  {/* Price display */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-4">
                    <div className="text-xs text-slate-500 font-medium mb-1">Modal / Standard Price</div>
                    <div className="text-3xl font-extrabold text-orange-400 tracking-tight">
                      ₹{r.modal_price}
                      <span className="text-xs text-slate-400 font-normal ml-1.5">/ quintal</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-white/5">
                      <span>Min: <b className="text-slate-300">₹{r.min_price}</b></span>
                      <span>Max: <b className="text-slate-300">₹{r.max_price}</b></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Arrival: {r.arrival_date}
                  </span>
                  <span className="text-emerald-400 font-mono font-medium">Verified APMC</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}