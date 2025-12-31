"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
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


            const res = await api.auth.signup(formData);
            // Usually signup returns token or success message.
            if (res.success && res.data?.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                router.push("/dashboard");
            } else {
                router.push("/login"); // if no token returned (e.g. email verification required), go to login
            }
        } catch (err: any) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-dark text-white relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-neon-teal/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse delay-1000" />

            <div className="glass-panel p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl z-10">
                <h2 className="text-3xl font-bold text-center mb-6 text-neon-teal neon-text">INITIATE PROTOCOL</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Identity (Username)</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-all text-white placeholder-gray-600"
                            placeholder="Neo"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email Coordinate</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-neon-teal focus:ring-1 focus:ring-neon-teal transition-all text-white placeholder-gray-600"
                            placeholder="neo@matrix.com"
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
                        className="w-full py-3 bg-neon-teal/10 hover:bg-neon-teal/20 border border-neon-teal text-neon-teal font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,157,0.3)] disabled:opacity-50"
                    >
                        {loading ? "REGISTERING..." : "CREATE ACCOUNT"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already in the system?{" "}
                    <Link href="/login" className="text-neon-blue hover:underline hover:text-neon-blue/80">
                        Access Terminal
                    </Link>
                </p>
            </div>
        </div>
    );
}
