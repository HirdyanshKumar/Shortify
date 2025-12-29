"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function UnlockPage() {
    const { shortId } = useParams();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.unlock.submit(shortId as string, password);
            if (res.success && res.data.originalUrl) {
                window.location.href = res.data.originalUrl;
            } else {
                setError("Incorrect password");
            }
        } catch (err: any) {
            setError(err.message || "Failed to unlock");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-dark text-white p-4">
            <div className="max-w-md w-full glass-panel p-8 rounded-2xl neon-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple" />

                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 rounded-full bg-neon-purple/10 text-neon-purple mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Protected Link</h1>
                    <p className="text-gray-400 text-sm mt-2">Enter access code to decrypt.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="**********"
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-center tracking-[0.5em] focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-400 text-sm justify-center bg-red-500/10 p-2 rounded">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-neon-purple text-white font-bold rounded-lg hover:bg-neon-purple/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? "DECRYPTING..." : <span>UNLOCK <ArrowRight className="inline ml-1" size={16} /></span>}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-600">SECURE SHORTIFY PROTOCOL</p>
                </div>
            </div>
        </div>
    );
}
