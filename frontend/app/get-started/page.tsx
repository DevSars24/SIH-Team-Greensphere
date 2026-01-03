"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Welcome Farmers of India 🇮🇳 <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Krishi Mitra is here for you
            </span>
          </h1>

          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Krishi Mitra is an AI-powered agricultural platform built to support
            Indian farmers, developers, and researchers with real-time insights,
            smart decision tools, and accessible technology.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500">
              Launch Dashboard <MoveRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">

          {[
            {
              title: "🤖 AI Chatbot (Krishi Sathi)",
              desc: "Ask farming questions in simple language. Get instant answers about crops, soil, weather, and best practices."
            },
            {
              title: "🌱 Crop Doctor",
              desc: "Upload crop images and detect diseases early using ML models with recommended treatments."
            },
            {
              title: "📈 Market Price Intelligence",
              desc: "Live mandi prices, demand trends, and best time-to-sell insights for better profit decisions."
            },
            {
              title: "🏛 Government Schemes",
              desc: "Discover central and state government schemes with eligibility, benefits, and application guidance."
            },
            {
              title: "👩‍🌾 Women Farmers Support",
              desc: "Special resources, schemes, and training opportunities dedicated to empowering women farmers."
            },
            {
              title: "🧑‍💻 Developer & Research Tools",
              desc: "APIs, datasets, and ML pipelines for developers building the future of agri-tech."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition"
            >
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* WHY KRISHI MITRA */}
        <section className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Krishi Mitra?
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Agriculture is not just a profession — it is the backbone of India.
            Krishi Mitra is built with the vision of combining technology,
            artificial intelligence, and ground-level farming realities to
            create meaningful impact.
          </p>
          <p className="text-slate-500 mt-4">
            Built by students & developers, inspired by farmers.
          </p>
        </section>

      </div>
    </div>
  );
}
