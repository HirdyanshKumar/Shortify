"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/dashboard");
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.auth.login(formData);
            if (res.success && res.data?.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-dark text-white relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[100px] animate-pulse delay-1000" />

            <div className="glass-panel p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl z-10">
                <h2 className="text-3xl font-bold text-center mb-6 text-neon-blue neon-text">SYSTEM ACCESS</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email Coordinates</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-all text-white placeholder-gray-600"
                            placeholder="user@shortify.net"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Passcode</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-all text-white placeholder-gray-600"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue text-neon-blue font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] disabled:opacity-50"
                    >
                        {loading ? "AUTHENTICATING..." : "LOGIN"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    New to the network?{" "}
                    <Link href="/signup" className="text-neon-teal hover:underline hover:text-neon-teal/80">
                        Initialize Protocol
                    </Link>
                </p>
            </div>
        </div>
    );
}
