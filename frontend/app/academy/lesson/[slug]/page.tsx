"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, PlayCircle, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { curriculum } from "@/lib/curriculum-data";
import TrainingChatbot from "@/components/TrainingChatbot";


export default function LessonPage() {
    const params = useParams();
    const router = useRouter();

    // Find the lesson based on the slug from the URL
    // Handle both string and array for slug (Next.js dynamic routes)
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const lesson = curriculum.find(item => item.slug === slug);

    if (!lesson) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold mb-4">Lesson Not Found</h1>
                <Link href="/academy" className="text-rose-500 hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Academy
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-rose-500/30 font-sans">

            {/* Top Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/academy" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Academy</span>
                    </Link>
                    <div className="text-xs font-bold text-rose-500 uppercase tracking-widest border border-rose-500/20 bg-rose-500/10 px-3 py-1 rounded-full">
                        {lesson.week}
                    </div>
                </div>
            </div>

            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Hero Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {lesson.title}
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                        {lesson.desc}
                    </p>
                </div>

                {/* Video Player */}
                {lesson.videoId ? (
                    <div className="relative aspect-video bg-black rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10">
                        <iframe
                            src={`https://www.youtube.com/embed/${lesson.videoId}`}
                            title={lesson.title}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <div className="relative aspect-video bg-white/5 border border-white/10 rounded-3xl overflow-hidden mb-12 group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <div className="w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center shadow-2xl shadow-rose-900/50 group-hover:scale-110 transition-transform">
                                <PlayCircle className="w-8 h-8 text-white fill-current" />
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                            <div>
                                <span className="inline-block px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-xs font-bold mb-2">
                                    No Video
                                </span>
                                <p className="text-slate-200 text-sm font-medium">Coming soon...</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Layout */}
                <div className="grid md:grid-cols-1 gap-12">

                    {/* Left Column: Lesson Content */}
                    <div className="space-y-12">

                        {/* Dynamic HTML Content */}
                        <div className="prose prose-invert prose-lg max-w-none 
                            prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400
                            prose-headings:font-bold prose-h3:text-2xl prose-h4:text-xl prose-h4:text-rose-400
                            prose-strong:text-white prose-strong:font-bold
                        ">
                            <div dangerouslySetInnerHTML={{ __html: lesson.content || "" }} />
                        </div>

                        {/* Topics List from previous data */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-rose-500" />
                                Topics Covered
                            </h3>
                            <div className="grid gap-4">
                                {lesson.topics.map((topic, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">{topic.title}</h4>
                                            <p className="text-slate-400 text-sm">{topic.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sidebar / Resources */}
                    <div className="space-y-6">
                        <div className="sticky top-24">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h4 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-4">
                                    Lesson Resources
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 text-sm">
                                            <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center text-xs font-bold">PDF</span>
                                            Download Notes
                                        </button>
                                    </li>
                                    <li>
                                        <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 text-sm">
                                            <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-bold">DOC</span>
                                            Worksheet
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-6 bg-gradient-to-br from-rose-600/20 to-purple-600/20 border border-rose-500/20 rounded-2xl p-6">
                                <h4 className="text-white font-bold mb-2">Need Help?</h4>
                                <p className="text-slate-400 text-xs mb-4">Ask our AI tutor anything about this lesson.</p>
                                <button className="w-full py-2 bg-rose-600 text-white rounded-lg font-bold text-sm hover:bg-rose-500 transition-colors">
                                    Open Chatbot
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
