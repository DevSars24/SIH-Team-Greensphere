"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Bot, Send, ArrowLeft, Loader2,
  Sparkles, Paperclip, X, Image as ImageIcon,
  Menu, Plus, MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AudioRecorder from "@/components/AudioRecorder";

interface Message {
  role: "user" | "assistant";
  text: string;
  image?: string;
  timestamp?: string;
}

interface Session {
  session_id: string;
  title: string;
  last_updated: string;
}

export default function ChatbotPage() {
  // State
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [language, setLanguage] = useState("Hindi");

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userId = "default_user";
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // --- Effects ---

  // 1. Load Sessions on Mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // 2. Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages, isLoading, scrollToBottom]);

  // --- API Functions ---

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/sessions/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        // If no current session, load the most recent one or create new
        if (!currentSessionId && data.length > 0) {
          loadSession(data[0].session_id);
        } else if (data.length === 0) {
          createNewSession();
        }
      }
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
  };

  const createNewSession = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
      });
      if (res.ok) {
        const newSession = await res.json();
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newSession.session_id);
        setMessages([]); // Clear messages for new chat
        setIsSidebarOpen(false); // Close sidebar on mobile
      }
    } catch (err) {
      console.error("Failed to create session", err);
    }
  };

  const loadSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setIsSidebarOpen(false);
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Failed to load session", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleVoiceRecorded = async (audioBlob: Blob) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "voice_input.webm");

      const res = await fetch(`${API_BASE_URL}/chat/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setInputText(data.text);
      }
    } catch (err) {
      console.error("Voice Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if ((!inputText.trim() && !selectedImage) || isLoading || !currentSessionId) return;

    let imageBase64 = null;
    if (imagePreview) {
      imageBase64 = imagePreview.split(",")[1];
    }

    const newUserMsg: Message = {
      role: "user",
      text: inputText,
      image: imagePreview || undefined,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMsg]);

    // Payload
    const payload = {
      session_id: currentSessionId,
      message: inputText || (selectedImage ? "[Image Uploaded]" : ""),
      image: imageBase64,
      language: language
    };

    setInputText("");
    clearImage();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed");
      const data = await response.json();

      const botMsg: Message = {
        role: "assistant",
        text: data.content,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMsg]);

      // Refresh sessions list to update "last_updated" or title
      fetchSessions();

    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-slate-200 font-sans overflow-hidden">

      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Button
            onClick={createNewSession}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white justify-start gap-2"
          >
            <Plus className="w-4 h-4" /> New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          <p className="px-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-2">Recent</p>
          {sessions.map(session => (
            <button
              key={session.session_id}
              onClick={() => loadSession(session.session_id)}
              className={`w-full text-left p-3 rounded-lg text-sm truncate transition-colors flex items-center gap-2
                ${currentSessionId === session.session_id
                  ? "bg-white/10 text-white border border-white/5"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }
              `}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">{session.title}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-black text-xs">
              KS
            </div>
            <div>
              <p className="text-sm font-bold text-white">Krishi Sathi</p>
              <p className="text-[10px] text-emerald-500">Pro Plan Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative w-full h-full">

        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-black/60 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30">
                <Image src="/kishanseva.png" alt="Bot" fill className="object-cover" />
              </div>
              <div>
                <h1 className="font-bold text-white text-sm md:text-base">Krishi Sathi AI</h1>
                <p className="text-[10px] text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
                </p>
              </div>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Marathi">Marathi (मराठी)</option>
            <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
          </select>
        </header>

        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar relative">

          {/* Welcome Screen if Empty */}
          {messages.length === 0 && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-60">
              <div className="w-24 h-24 relative mb-6 rounded-3xl overflow-hidden border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                <Image src="/kishanseva.png" alt="Logo" fill className="object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Namaste, Farmer Bhai! 🙏</h2>
              <p className="text-slate-400 max-w-xs text-sm">
                I can help you with crop diseases, weather updates, and market prices.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 w-full max-w-md">
                {["Tomatoes have black spots", "Wheat mandi price today", "Best fertilizer for Rice", "Weather in Patna"].map(q => (
                  <button
                    key={q}
                    onClick={() => { setInputText(q); }}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start max-w-[85%] md:max-w-[70%] gap-3
                   ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}
                `}>
                  {/* Avatar Icons */}
                  <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-white/10 mt-1">
                    {msg.role === "user" ? (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xs">U</div>
                    ) : (
                      <div className="w-full h-full relative">
                        <Image src="/kishanseva.png" alt="Bot" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  <div className={`p-4 rounded-2xl shadow-sm
                    ${msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-[#1a1a1a] border border-white/10 text-slate-200 rounded-tl-none"
                    }
                  `}>
                    {msg.image && (
                      <div className="mb-3 rounded-lg overflow-hidden border border-white/10 relative w-full aspect-video">
                        <Image src={msg.image} alt="Upload" fill className="object-cover" />
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-[9px] opacity-40 mt-2 block w-full text-right">
                      {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start pl-12">
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                <span className="text-xs text-slate-400">Analyzing...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <div className="shrink-0 p-4 pt-2 bg-gradient-to-t from-black via-black/95 to-transparent z-20">
          {/* Image Preview */}
          <AnimatePresence>
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="mb-3 ml-2 relative inline-block"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-emerald-500 relative group">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <button onClick={clearImage} className="absolute top-0 right-0 bg-black/60 p-1 text-white hover:bg-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-2 bg-[#1a1a1a] border border-white/10 rounded-[2rem] p-2 pl-4 focus-within:border-emerald-500/50 transition-colors shadow-lg">

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
              accept="image/*"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-white/5 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <AudioRecorder onRecordingComplete={handleVoiceRecorded} disabled={isLoading} />

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500 py-3 max-h-[120px] resize-none overflow-y-auto custom-scrollbar"
              rows={1}
            />

            <button
              onClick={handleSendMessage}
              disabled={(!inputText.trim() && !selectedImage) || isLoading}
              className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all disabled:opacity-50 disabled:grayscale transform active:scale-95"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-slate-600">
              Krishi Sathi can make mistakes. Verify important info.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}