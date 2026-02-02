"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Phone, Plus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner"; // Assuming sonner or similar toast
// If no toast lib installed, we can remove it or use simple alert

// Types
interface SHG {
    name: string;
    location: string;
    state: string;
    city: string;
    district: string;
    members_count: number;
    focus_area: string;
    contact_person: string;
    contact_number?: string;
}

export default function SHGNetwork() {
    const [shgs, setShgs] = useState<SHG[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"list" | "add">("list");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        state: "",
        city: "",
        district: "",
        members_count: "",
        focus_area: "",
        contact_person: "",
        contact_number: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchSHGs();
    }, []);

    const fetchSHGs = async () => {
        try {
            const res = await fetch("http://localhost:8000/women/shgs");
            const data = await res.json();
            setShgs(data);
        } catch (error) {
            console.error("Failed to fetch SHGs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                members_count: parseInt(formData.members_count),
                location: `${formData.city}, ${formData.state}` // Construct location string
            };

            const res = await fetch("http://localhost:8000/women/shgs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                // alert("SHG Added Successfully!");
                const newShg = await res.json();
                setShgs([...shgs, newShg]);
                setActiveTab("list");
                setFormData({ name: "", state: "", city: "", district: "", members_count: "", focus_area: "", contact_person: "", contact_number: "" });
            }
        } catch (error) {
            console.error("Error adding SHG", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-12 md:py-20 bg-[#050505] relative border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            SHG <span className="text-rose-500">Network</span>
                        </h2>
                        <p className="text-slate-400 max-w-xl text-lg">
                            Connect with Women Self-Help Groups across India. Find local chapters or register your own.
                        </p>
                    </div>

                    <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
                        <button
                            onClick={() => setActiveTab("list")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'list' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Find SHG
                        </button>
                        <button
                            onClick={() => setActiveTab("add")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'add' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Add Yours
                        </button>
                    </div>
                </div>

                {activeTab === "list" ? (
                    <div className="grid md:grid-cols-3 gap-6">

                        {/* Search/Filter Box - Visual Only for now */}
                        <div className="md:col-span-3 mb-4 flex gap-4">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input placeholder="Search by District or State..." className="pl-10 bg-[#0a0a0a] border-white/10 text-white focus:ring-rose-500" />
                            </div>
                        </div>

                        {loading ? (
                            <div className="md:col-span-3 text-center py-20 text-slate-500">Loading Network...</div>
                        ) : shgs.map((shg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:border-rose-500/30 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2.5 bg-rose-500/10 rounded-lg text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{shg.state}</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{shg.name}</h3>
                                <p className="text-rose-400 text-sm font-medium mb-4">{shg.focus_area}</p>

                                <div className="space-y-3 text-sm text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-600" />
                                        {shg.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-slate-600" />
                                        {shg.members_count} Members
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-slate-600" />
                                        {shg.contact_person}
                                        {shg.contact_number && <span className="text-slate-600">({shg.contact_number})</span>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Register your Group</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">SHG Name</label>
                                    <Input name="name" value={formData.name} onChange={handleInputChange} className="bg-black border-white/10 text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Focus Area</label>
                                    <Input name="focus_area" value={formData.focus_area} onChange={handleInputChange} placeholder="e.g. Dairy, Handicrafts" className="bg-black border-white/10 text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">State</label>
                                    <Input name="state" value={formData.state} onChange={handleInputChange} className="bg-black border-white/10 text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">City</label>
                                    <Input name="city" value={formData.city} onChange={handleInputChange} className="bg-black border-white/10 text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">District</label>
                                    <Input name="district" value={formData.district} onChange={handleInputChange} className="bg-black border-white/10 text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Members Count</label>
                                    <Input type="number" name="members_count" value={formData.members_count} onChange={handleInputChange} className="bg-black border-white/10 text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Contact Person</label>
                                    <Input name="contact_person" value={formData.contact_person} onChange={handleInputChange} className="bg-black border-white/10 text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                                    <Input name="contact_number" value={formData.contact_number} onChange={handleInputChange} className="bg-black border-white/10 text-white" />
                                </div>
                            </div>

                            <Button disabled={submitting} type="submit" size="lg" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl mt-4">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                                Register SHG
                            </Button>
                        </form>
                    </motion.div>
                )}

            </div>
        </section>
    );
}
