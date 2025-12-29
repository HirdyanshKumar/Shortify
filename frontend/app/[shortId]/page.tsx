"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";

// Helper to determine backend URL from api helper or env
const getBackendUrl = () => {
    // Attempt to derive from env, otherwise default to localhost:3000
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL.replace('/api', '');
    }
    return "http://localhost:3000";
};

export default function RedirectPage() {
    const { shortId } = useParams();
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "error" | "404" | "expired">("loading");

    useEffect(() => {
        if (!shortId) return;

        const checkUrl = async () => {
            try {
                const backendUrl = getBackendUrl();
                // Use manual redirect to intercept 302 vs 401
                const res = await fetch(`${backendUrl}/${shortId}`, {
                    method: 'GET',
                    redirect: 'manual'
                });

                // Check if response is JSON (likely asking for password)
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    if (data.protected) {
                        router.push(`/unlock/${shortId}`);
                        return;
                    }
                    if (data.success === false && res.status === 404) {
                        setStatus("404");
                        return;
                    }
                }

                if (res.status === 401) {
                    // Explicit 401 from backend
                    router.push(`/unlock/${shortId}`);
                    return;
                }

                if (res.status === 404) {
                    setStatus("404");
                    return;
                }

                if (res.status === 410) {
                    setStatus("expired");
                    return;
                }

                if (res.type === 'opaqueredirect' || res.status === 301 || res.status === 302 || res.status === 200) {
                    // It's a redirect or success content. 
                    // If we are here, it wasn't the JSON "protected" case.
                    window.location.href = `${backendUrl}/${shortId}`;
                    return;
                }

                // Fallback
                window.location.href = `${backendUrl}/${shortId}`;

            } catch (err) {
                // If fetch fails (e.g. CORS on redirect), try direct navigation
                window.location.href = `${getBackendUrl()}/${shortId}`;
            }
        };

        checkUrl();
    }, [shortId, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-dark text-neon-blue">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="animate-spin" />
                    <p className="text-sm tracking-widest animate-pulse">ESTABLISHING UPLINK...</p>
                </div>
            </div>
        );
    }

    if (status === "404") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-dark text-white p-4 text-center">
                <div className="glass-panel p-8 rounded-2xl border border-red-500/20">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 mb-4">404</h1>
                    <p className="text-xl mb-2">Signal Lost</p>
                    <p className="text-gray-400">The requested uplink does not exist.</p>
                </div>
            </div>
        );
    }

    if (status === "expired") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-dark text-white p-4 text-center">
                <div className="glass-panel p-8 rounded-2xl border border-yellow-500/20">
                    <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
                    <h1 className="text-2xl font-bold text-yellow-500 mb-2">Uplink Expired</h1>
                    <p className="text-gray-400">This link has reached its time limit.</p>
                </div>
            </div>
        );
    }

    return null;
}
