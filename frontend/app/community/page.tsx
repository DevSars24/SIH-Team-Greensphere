"use client";

import "@livekit/components-styles";
import {
    LiveKitRoom,
    VideoConference,
    GridLayout,
    ParticipantTile,
    RoomAudioRenderer,
    ControlBar,
    useTracks,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { ArrowLeft, Loader2, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CommunityPage() {
    const [room, setRoom] = useState("krishi-charha");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [joined, setJoined] = useState(false);

    async function getToken() {
        if (!name) return;
        try {
            const resp = await fetch(
                `http://localhost:8000/community/token?room=${room}&username=${name}`
            );
            if (!resp.ok) {
                console.error("Failed to fetch token");
                return;
            }
            const data = await resp.json();
            setToken(data.token);
            setJoined(true);
        } catch (e) {
            console.error(e);
        }
    }

    if (joined && token) {
        return (
            <div className="h-screen w-full bg-[#111] overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                    <div className="flex items-center gap-4">
                        <Link href="/women-empowerment" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-white font-bold text-lg">Krishi Charcha</h1>
                            <p className="text-slate-400 text-xs flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Session
                            </p>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-rose-500/20 text-rose-400 rounded-full text-xs font-bold uppercase tracking-wider">
                        {room}
                    </div>
                </div>

                <LiveKitRoom
                    video={true}
                    audio={true}
                    token={token}
                    serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || "wss://code-saarthi-frwptwrp.livekit.cloud"}
                    data-lk-theme="default"
                    style={{ height: "calc(100vh - 80px)" }}
                >
                    <MyVideoConference />
                    <RoomAudioRenderer />
                    <ControlBar />
                </LiveKitRoom>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 selection:bg-rose-500/30 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 mx-auto flex items-center justify-center mb-6 shadow-xl shadow-rose-500/20">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Join Community</h1>
                    <p className="text-slate-400">Connect with other women farmers.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 transition-all placeholder:text-slate-600"
                            placeholder="Enter your name..."
                        />
                    </div>

                    <button
                        onClick={getToken}
                        disabled={!name}
                        className="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-rose-600/20"
                    >
                        Join Discussion
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

function MyVideoConference() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: false },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} style={{ height: 'calc(100% - var(--lk-control-bar-height))' }}>
            <ParticipantTile />
        </GridLayout>
    );
}
