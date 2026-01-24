"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Bot, Send, ArrowLeft, Loader2,
  BookOpen, BarChart3, Cloud,
  Shield, Sparkles, Mic, Paperclip, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Namaste! 🙏 I'm Krishi Sathi. I've analyzed your local soil data and current weather patterns. How can I help your farm thrive today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), text: inputText, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputText; // Store input for the request
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the server. Please check if the backend is running.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-emerald-500/30 font-sans pb-10">

      {/* PEAK BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-emerald-600/10 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 relative z-10">

        {/* MOBILE RESPONSIVE HEADER */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-2 z-50 flex items-center justify-between p-3 mb-6 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm md:text-base font-bold text-white">Krishi Sathi AI</h1>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
                </p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">
            History
          </Button>
        </motion.header>

        {/* MAIN CONTENT: No longer fixed height, scrolls naturally */}
        <div className="flex flex-col gap-6">

          {/* CHAT BUBBLES CONTAINER */}
          <div className="flex flex-col space-y-6 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm
                    ${message.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white/5 border border-white/10 backdrop-blur-sm rounded-tl-none"
                    }
                  `}>
                    {message.sender === "bot" && <Sparkles className="w-3 h-3 text-emerald-400 mb-1" />}
                    {message.text}
                    <div className={`text-[9px] mt-1 opacity-50 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center text-emerald-500 pl-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Analyzing Soil Data...</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* STICKY INPUT AT BOTTOM */}
          <div className="sticky bottom-4 z-50">
            <div className="p-1.5 rounded-[2rem] bg-black/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="rounded-full text-slate-400 hover:text-white shrink-0">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about crops or weather..."
                  className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-sm text-white placeholder:text-slate-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="rounded-full w-10 h-10 bg-emerald-500 hover:bg-emerald-400 text-black shrink-0 transition-transform active:scale-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* MOBILE QUICK TAGS */}
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar py-1">
              {["Weather Alert", "Tomato Prices", "Urea Subsidy"].map((tag) => (
                <button key={tag} className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-white/5 my-4" />

          {/* BENTO STATS: Stacks below chat on mobile, scrolls naturally */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                  <Cloud className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
              <h4 className="text-2xl font-bold text-white">28°C</h4>
              <p className="text-xs text-slate-400">Mostly Sunny • Humidity 45%</p>
              <p className="text-[10px] text-orange-400 mt-2 font-bold uppercase tracking-wider">⚠️ No rain expected for 4 days</p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              className="p-5 rounded-3xl bg-white/[0.03] border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4 text-purple-400">
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Market Pulse</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Wheat (Kanak)</span>
                  <span className="text-emerald-400 font-bold">₹2,450 ↑</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Mustard</span>
                  <span className="text-red-400 font-bold">₹5,100 ↓</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ADDITIONAL FEATURES LIST */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] px-1">Farmer Tools</h3>
            {[
              { icon: <Shield />, label: "Pest & Disease Diagnosis", color: "text-red-400" },
              { icon: <BookOpen />, label: "Crop Knowledge Base", color: "text-blue-400" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className={item.color}>{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600 -rotate-90" />
              </div>
            ))}
          </div>

        </div>

        {/* FOOTER */}
        <footer className="mt-20 text-center opacity-30 text-[10px] uppercase tracking-widest">
          Krishi Sathi AI • Secure Data Encryption • 2026
        </footer>
      </div>
    </div>
  );
}