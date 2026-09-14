"use client";

import { useState, useRef } from "react";
import { Mic, Square, Loader2 } from "lucide-react";

interface AudioRecorderProps {
    onRecordingComplete: (blob: Blob) => void;
    disabled?: boolean;
}

export default function AudioRecorder({ onRecordingComplete, disabled }: AudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            let mimeType = "";
            if (typeof MediaRecorder.isTypeSupported === "function") {
                if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
                    mimeType = "audio/webm;codecs=opus";
                } else if (MediaRecorder.isTypeSupported("audio/webm")) {
                    mimeType = "audio/webm";
                } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
                    mimeType = "audio/mp4";
                }
            }

            const mediaRecorder = mimeType
                ? new MediaRecorder(stream, { mimeType })
                : new MediaRecorder(stream);

            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const recordedType = mediaRecorder.mimeType || mimeType || "audio/webm";
                const blob = new Blob(chunksRef.current, { type: recordedType });
                onRecordingComplete(blob);
                chunksRef.current = [];
            };

            mediaRecorder.start(250);
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Microphone access denied or not available. Please check your browser permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            // Stop all tracks
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={disabled}
            className={`
        p-2 rounded-full transition-all duration-300 flex items-center justify-center
        ${isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10"
                }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
            title={isRecording ? "Stop Recording" : "Voice Input"}
        >
            {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
        </button>
    );
}
