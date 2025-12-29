import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-bg-dark text-white selection:bg-neon-blue selection:text-black font-sans">
            {/* Navbar - Simplified */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
                <Link href="/">
                    <span className="font-bold text-xl tracking-tighter text-white hover:text-neon-blue transition-colors">SHORTIFY PROTOCOL</span>
                </Link>
                <Link href="/">
                    <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">
                        Back to Terminal
                    </button>
                </Link>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="glass-panel p-10 md:p-16 rounded-3xl border border-white/5 bg-black/40">
                    <h1 className="text-4xl md:text-5xl font-black mb-2 text-white uppercase tracking-tighter">
                        Privacy <span className="text-neon-purple">Protocol</span>
                    </h1>
                    <p className="text-xs text-gray-500 font-mono mb-12 uppercase tracking-widest">
                        Last Updated: 2024.12.30 // Section 4.1
                    </p>

                    <div className="space-y-8 text-gray-300 leading-relaxed font-light">
                        <section>
                            <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                                1. Data Collection
                            </h2>
                            <p>
                                Shortify collects minimal data necessary to function. When you create a URL, we store the original link, the generated alias, and creation timestamp. When a link is visited, we anonymously aggregate non-PII (Personally Identifiable Information) such as:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-400">
                                <li>Device Type (Mobile/Desktop)</li>
                                <li>Browser User Agent (Chrome/Safari/etc.)</li>
                                <li>Approximate Geo-location (Country level only)</li>
                                <li>Referral Source</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                                2. Purpose of Usage
                            </h2>
                            <p>
                                The collected data is strictly used to provide analytics dashboards to the link creator. This allows users to understand the performance of their short links. We do not sell, trade, or transfer your data to outside parties for marketing purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                                3. Encrypted Security
                            </h2>
                            <p>
                                All passwords for protected links are hashed using industry-standard bcrypt algorithms before storage. We cannot see or recover your custom passwords. User accounts are secured via JWT (JSON Web Tokens).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                                4. Data Retention
                            </h2>
                            <p>
                                Links and their associated analytics data are retained indefinitely unless deleted by the user or if they violate our Terms of Service (e.g., malicious content).
                            </p>
                        </section>

                        <div className="pt-8 mt-12 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-500">
                                By using the Shortify Protocol, you acknowledge and agree to these data practices.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
