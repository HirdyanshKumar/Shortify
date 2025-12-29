import Link from "next/link";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-bg-dark text-white selection:bg-neon-blue selection:text-black font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-md border-b border-white/5 shadow-lg">
                <Link href="/">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-4 h-4">
                            <div className="absolute inset-0 bg-neon-blue rounded-full animate-ping opacity-75" />
                            <div className="relative w-4 h-4 bg-neon-blue rounded-full" />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter text-white group-hover:text-neon-blue transition-colors">SHORTIFY</span>
                    </div>
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/login">
                        <button className="px-6 py-2 bg-neon-blue/10 border border-neon-blue/50 text-neon-blue text-xs font-bold rounded-sm uppercase tracking-widest hover:bg-neon-blue hover:text-black transition-all duration-300">
                            Get Started
                        </button>
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <header className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        SYSTEM <span className="text-neon-blue">FEATURES</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Explore the advanced capabilities of the Shortify Protocol. Designed for speed, security, and control.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <FeatureCard
                        title="Quantum Analytics"
                        description="Get real-time insights into your traffic. Track clicks, geographic locations, device types, and browser stats instantly."
                        icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                    />

                    {/* Feature 2 */}
                    <FeatureCard
                        title="Bio-Lock Security"
                        description="Password protect your sensitive links. Share confidentially with authorized users only via a custom access portal."
                        icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                    />

                    {/* Feature 3 */}
                    <FeatureCard
                        title="Custom Aliases"
                        description="Brand your links. Replace random characters with meaningful words to increase click-through rates and trust."
                        icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                    />

                    {/* Feature 4 */}
                    <FeatureCard
                        title="QR Code Generator"
                        description="Instantly generate downloadable QR codes for every link. Perfect for print marketing and physical campaigns."
                        icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>}
                    />

                    {/* Feature 5 */}
                    <FeatureCard
                        title="Device Targeting"
                        description="See exactly what devices your audience uses. Optimize your content for mobile, desktop, or tablet users."
                        icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                    />

                    {/* Feature 6 */}
                    <FeatureCard
                        title="History Log"
                        description="Keep track of every link you've ever created. Search, filter, and manage your entire link portfolio from a single dashboard."
                        icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 text-center text-gray-600 border-t border-white/5 bg-black/80">
                <p>© 2024 SHORTIFY PROTOCOL. ALL RIGHTS RESERVED.</p>
            </footer>
        </div>
    );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-neon-blue/50 transition-all duration-300 group bg-black/20 hover:bg-black/40">
            <div className="w-16 h-16 bg-neon-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-neon-blue">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-blue transition-colors">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                {description}
            </p>
        </div>
    );
}
