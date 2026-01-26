"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Zap, ArrowLeft, Camera, ShieldAlert, Sparkles, Loader2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AnalysisResult {
  disease: string;
  confidence: number;
  cure: string;
  prevention: string;
}

export default function CropDoctor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("http://localhost:8000/crop-doctor/analyze", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-emerald-500/30 overflow-x-hidden relative">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <Link href="/women-empowerment" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-12">
          <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Back to Hub</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-6 text-emerald-400 font-mono text-sm tracking-tighter">
              <Zap className="w-4 h-4 fill-emerald-400" />
              <span>AI Neural Vision Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-6">
              Crop <span className="text-emerald-500 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Doctor.</span>
            </h1>
            <div className="space-y-4 border-l-2 border-emerald-600 pl-6 mb-8">
              <p className="text-slate-300 text-lg font-medium">Identify diseases before they spread.</p>
              <p className="text-slate-500 leading-relaxed italic">
                "Fasal ki bimaari ko pehchanein aur sahi ilaaj paayein. Humara motive hai aapki mehnat ko kharaab hone se bachana aur pesticides ka kharcha kam karna."
              </p>
            </div>

            {/* Upload Area */}
            {!previewUrl ? (
              <div className="flex gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-emerald-500 text-black hover:bg-emerald-400 px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" /> Upload Photo
                </button>
                <button className="bg-white/5 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-bold border border-white/10 transition-all flex items-center gap-2">
                  <Camera className="w-5 h-5" /> Open Camera
                </button>
              </div>
            ) : (
              <div className="mt-8">
                <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden border border-white/10 mb-6">
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                  <button
                    onClick={reset}
                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!result && (
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full max-w-md bg-emerald-500 text-black hover:bg-emerald-400 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-black" />}
                    {analyzing ? "Analyzing Crop..." : "Run Diagnosis"}
                  </button>
                )}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/[0.03] border border-emerald-500/30 p-8 rounded-[2.5rem] backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-500">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Detected Issue</h3>
                      <p className="text-2xl font-bold text-white">{result.disease}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="block text-3xl font-bold text-emerald-400">{(result.confidence * 100).toFixed(0)}%</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Confidence</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                      <h4 className="text-rose-400 font-bold mb-2 text-sm uppercase tracking-wider">Recommended Cure</h4>
                      <p className="text-slate-300 pointer-events-none">{result.cure}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <h4 className="text-blue-400 font-bold mb-2 text-sm uppercase tracking-wider">Prevention</h4>
                      <p className="text-slate-300">{result.prevention}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="relative z-10 p-2 bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden">
                  {/* Placeholder visual when no result */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[2.5rem]">
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)]"
                    />
                  </div>
                  <Image src="/crop-doctor.png" alt="Crop Doctor" width={600} height={400} className="rounded-[2.5rem] opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-slate-500 text-sm font-mono tracking-widest uppercase">Waiting for sample...</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}