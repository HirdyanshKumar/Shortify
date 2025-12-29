import Link from "next/link";

export default function TermsPage() {
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
                        Terms <span className="text-neon-teal">of Service</span>
                    </h1>
                    <p className="text-xs text-gray-500 font-mono mb-12 uppercase tracking-widest">
                        Last Updated: 2024.12.30 // Section 1.0
                    </p>

                    <div className="space-y-8 text-gray-300 leading-relaxed font-light">
                        <section>
                            <h2 className="text-xl font-bold text-neon-teal mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-teal rounded-full"></span>
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing text or using the Shortify Protocol (the "Service"), you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-neon-teal mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-teal rounded-full"></span>
                                2. Acceptable Use
                            </h2>
                            <p>
                                You agree not to use the Service to shorten links that redirect to:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-400">
                                <li>Malware, viruses, or phishing scams.</li>
                                <li>Illegal content or material that promotes illegal activities.</li>
                                <li>Harassment, hate speech, or abuse.</li>
                                <li>Spam or unsolicited advertising.</li>
                            </ul>
                            <p className="mt-2 text-neon-red/80 italic">Violating these rules will result in immediate termination of your account and deletion of your links.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-neon-teal mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-teal rounded-full"></span>
                                3. Service Availability
                            </h2>
                            <p>
                                While we strive for 100% uptime, Shortify is provided "as is" and "as available". We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-neon-teal mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-teal rounded-full"></span>
                                4. Liability
                            </h2>
                            <p>
                                In no case shall Shortify, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
                            </p>
                        </section>

                        <div className="pt-8 mt-12 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-500">
                                Shortify reserves the right to update these terms at any time.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
