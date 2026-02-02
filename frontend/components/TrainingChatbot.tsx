"use client";

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Bot, Send, Loader2, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "bot";
    text: string;
}

export default function TrainingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: "Namaste! Main Krishi Vidya AI hoon. Is course ke baare mein koi bhi sawal puchein. (Hello! I am Krishi Vidya AI. Ask me anything about this course.)" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/women/training-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg })
            });

            const data = await res.json();
            setMessages(prev => [...prev, { role: "bot", text: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "bot", text: "Maaf karein, network error hai." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button (Fixed) */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-rose-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group border border-white/20"
            >
                <Bot className="w-8 h-8 text-white" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
            </motion.button>

            {/* Chat Sidebar Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#111] border-l border-white/10 z-50 flex flex-col shadow-2xl"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#151515]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-500">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Krishi Vidya AI</h3>
                                        <p className="text-xs text-emerald-400 font-mono">● Online</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/10 text-slate-400">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-rose-600 text-white rounded-tr-sm'
                                            : 'bg-white/10 text-slate-200 rounded-tl-sm'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-sm">
                                            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-white/5 bg-[#151515]">
                                <div className="flex gap-2">
                                    <Input
                                        value={input}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
                                        placeholder="Ask about the lesson..."
                                        className="bg-black border-white/10 text-white focus:ring-rose-500 rounded-xl"
                                    />
                                    <Button onClick={handleSend} className="bg-rose-600 hover:bg-rose-700 rounded-xl w-12 px-0">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
