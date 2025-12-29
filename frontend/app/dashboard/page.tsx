"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Copy, Trash2, BarChart2, Globe, Lock, Unlock, Eye, EyeOff, Plus, Power, QrCode, X } from "lucide-react";

export default function Dashboard() {
    const router = useRouter();
    const [urls, setUrls] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    // Create Form State
    const [newUrl, setNewUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState("");
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // QR Modal State
    const [qrData, setQrData] = useState<{ src: string, link: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const userData = JSON.parse(localStorage.getItem("user") || "{}");
            setUser(userData);
        } catch (e) { }

        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const res = await api.url.getMyUrls();
            if (res.success) {
                setUrls(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setMessage("");
        try {
            const payload: any = {
                originalUrl: newUrl,
                isPrivate: isPrivate,
            };

            if (alias) payload.customAlias = alias;
            if (isPrivate && password) payload.password = password;

            const res = await api.url.create(payload);
            if (res.success) {
                setMessage("URL Secured & Shortened!");
                setIsError(false);
                setNewUrl("");
                setAlias("");
                setPassword("");
                setIsPrivate(false);
                fetchUrls(); // refresh list
            }
        } catch (err: any) {
            setMessage(err.message || "Operation Failed");
            setIsError(true);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Terminate this link?")) return;
        try {
            await api.url.delete(id);
            setUrls(urls.filter(u => u._id !== id));
        } catch (err) {
            alert("Deletion failed");
        }
    };

    const handleToggle = async (id: string, currentStatus: boolean) => {
        try {
            await api.url.toggle(id);
            setUrls(urls.map(u => u._id === id ? { ...u, isActive: !currentStatus } : u));
        } catch (err) {
            alert("Status change failed");
        }
    };

    const handlePrivacy = async (id: string, currentPrivate: boolean) => {
        let passwordInput = undefined;
        if (!currentPrivate) {
            const input = prompt("Set a password (min 6 chars) to lock this link:");
            if (input === null) return;
            if (!input || input.length < 6) {
                alert("Password is required (min 6 chars).");
                return;
            }
            passwordInput = input;
        }

        try {
            await api.url.updatePrivacy(id, !currentPrivate, passwordInput);
            setUrls(urls.map(u => u._id === id ? { ...u, isPrivate: !currentPrivate } : u));
        } catch (err) {
            alert("Privacy update failed");
        }
    };

    const handleGetQr = async (id: string) => {
        try {
            const res = await api.qr.get(id);
            if (res.success) {
                setQrData({ src: res.data.qr, link: res.data.shortUrl });
            }
        } catch (err) {
            alert("Failed to generate QR");
        }
    };

    const copyToClipboard = (shortId: string) => {
        // Assuming backend runs on same host or configured. 
        // Backend creates shortUrl using process.env.BASE_URL.
        // However, the api returns the full shortUrl in `res.data.shortUrl` usually?
        // Let's check create controller response: `shortUrl = ...`.
        // But `getMyUrls` returns URL documents. The document has `shortId`.
        // So we construct it.
        // For now I'll use localhost:5000 as base or just copy the path.
        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        const link = `${baseUrl}/${shortId}`;
        navigator.clipboard.writeText(link);
    };

    if (loading) return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-neon-blue">LOADING SYSTEM...</div>;

    return (
        <div className="min-h-screen bg-bg-dark text-white p-6 relative">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex justify-between items-center glass-panel p-6 rounded-2xl neon-border">
                    <div>
                        <h1 className="text-3xl font-bold neon-text text-neon-blue">DASHBOARD</h1>
                        <p className="text-gray-400 text-sm">Welcome back, {user?.username || "Commander"}</p>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/");
                        }}
                        className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded transition"
                    >
                        DISCONNECT
                    </button>
                </header>

                {/* Create Section */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-semibold mb-4 text-neon-teal">NEW UPLINK</h2>
                    <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-widest">Target URL</label>
                            <input
                                type="url"
                                required
                                value={newUrl}
                                onChange={e => setNewUrl(e.target.value)}
                                placeholder="https://example.com/very-long-path"
                                className="w-full bg-black/50 border border-white/10 rounded p-3 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition"
                            />
                        </div>
                        <div className="w-full md:w-48 space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-widest">Alias (Opt)</label>
                            <input
                                type="text"
                                value={alias}
                                onChange={e => setAlias(e.target.value)}
                                placeholder="my-link"
                                className="w-full bg-black/50 border border-white/10 rounded p-3 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition"
                            />
                        </div>
                        <div className="flex items-center gap-2 h-12 pb-1">
                            <button
                                type="button"
                                onClick={() => setIsPrivate(!isPrivate)}
                                className={cn(
                                    "p-3 rounded border transition",
                                    isPrivate ? "border-neon-purple text-neon-purple bg-neon-purple/10" : "border-gray-600 text-gray-400"
                                )}
                            >
                                {isPrivate ? <Lock size={20} /> : <Unlock size={20} />}
                            </button>
                        </div>

                        {/* Password Input for New Link */}
                        {isPrivate && (
                            <div className="w-full md:w-32 space-y-1 animate-in fade-in slide-in-from-left-4">
                                <label className="text-xs text-neon-purple uppercase tracking-widest">Password</label>
                                <input
                                    type="text"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="******"
                                    className="w-full bg-black/50 border border-neon-purple/50 rounded p-3 text-neon-purple placeholder-neon-purple/30 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition"
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={creating}
                            className="h-12 px-6 bg-neon-blue text-black font-bold rounded hover:bg-neon-blue/90 transition flex items-center gap-2"
                        >
                            <Plus size={18} /> {creating ? "..." : "SHORTEN"}
                        </button>
                    </form>
                    {message && <p className={cn("mt-2 text-sm animate-pulse", isError ? "text-red-500" : "text-neon-teal")}>{message}</p>}
                </div>

                {/* URL Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {urls.map((url) => (
                        <div key={url._id} className="glass-panel p-5 rounded-xl border border-white/5 hover:border-neon-blue/30 transition group relative overflow-hidden">
                            {/* Decorative line */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-blue to-transparent opacity-0 group-hover:opacity-100 transition" />

                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-white/5">
                                        <Globe size={18} className="text-neon-blue" />
                                    </div>
                                    <div>
                                        <h3 className="font-mono font-bold text-white text-lg">/{url.customAlias || url.shortId}</h3>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-500">{url.isPrivate ? "PRIVATE" : "PUBLIC"}</span>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(url._id)} className="text-gray-600 hover:text-red-500 transition">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <p className="text-gray-400 text-sm truncate mb-6" title={url.originalUrl}>
                                {url.originalUrl}
                            </p>

                            <div className="flex items-end justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-neon-teal">{url.clickCount}</span>
                                    <p className="text-xs text-gray-500">Total Clicks</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handlePrivacy(url._id, url.isPrivate)}
                                        className={cn(
                                            "p-2 rounded transition",
                                            url.isPrivate ? "text-neon-purple hover:bg-neon-purple/10" : "text-gray-500 hover:bg-white/10"
                                        )}
                                        title={url.isPrivate ? "Private (Click to Public)" : "Public (Click to Private)"}
                                    >
                                        {url.isPrivate ? <Lock size={18} /> : <Unlock size={18} />}
                                    </button>
                                    <button
                                        onClick={() => handleToggle(url._id, url.isActive)}
                                        className={cn(
                                            "p-2 rounded transition",
                                            url.isActive ? "text-green-400 hover:bg-green-400/10" : "text-gray-500 hover:bg-white/10"
                                        )}
                                        title={url.isActive ? "Active (Click to Disable)" : "Inactive (Click to Enable)"}
                                    >
                                        <Power size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleGetQr(url._id)}
                                        className="p-2 rounded hover:bg-white/10 text-neon-blue transition"
                                        title="Show QR Code"
                                    >
                                        <QrCode size={18} />
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(url.customAlias || url.shortId)}
                                        className="p-2 rounded hover:bg-white/10 text-gray-300 transition"
                                        title="Copy Link"
                                    >
                                        <Copy size={18} />
                                    </button>
                                    <Link href={`/dashboard/analytics/${url._id}`}>
                                        <button className="p-2 rounded hover:bg-white/10 text-neon-purple transition" title="Analytics">
                                            <BarChart2 size={18} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {urls.length === 0 && !loading && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No uplinks active. Initialize your first connection.</p>
                    </div>
                )}
            </div>

            {/* QR Modal */}
            {
                qrData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-bg-dark border border-neon-blue/30 p-6 rounded-2xl max-w-sm w-full relative shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                            <button
                                onClick={() => setQrData(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-bold text-center text-neon-blue mb-4">UPLINK QR CODE</h3>
                            <div className="bg-white p-4 rounded-xl flex justify-center mb-4">
                                <img src={qrData.src} alt="QR Code" className="w-full h-auto" />
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-500 mb-2 font-mono break-all">{qrData.link}</p>
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = qrData.src;
                                        link.download = 'qrcode.png';
                                        link.click();
                                    }}
                                    className="w-full py-2 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/50 rounded font-bold transition"
                                >
                                    DOWNLOAD ACCESS CODE
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
