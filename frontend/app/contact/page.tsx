import Link from "next/link";
import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
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

            <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">

                {/* Contact Info Panel */}
                <div className="md:w-1/3 space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-2 text-white uppercase tracking-tighter">
                            Contact <span className="text-neon-blue">Us</span>
                        </h1>
                        <p className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-8">
                            Establish Connection // Channel Open
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Have questions about the Shortify Protocol? Need assistance with your Quantum Analytics? Our team is ready to transmit answers.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-start gap-4 hover:border-neon-blue/30 transition-colors group">
                            <div className="mt-1 w-10 h-10 bg-neon-blue/10 rounded-lg flex items-center justify-center text-neon-blue group-hover:scale-110 transition-transform">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Email Transmission</h3>
                                <p className="text-sm text-gray-400">hirdyanshkumar@gmail.com</p>
                                <p className="text-xs text-gray-500 mt-1">Response time: ~24 hours</p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-start gap-4 hover:border-neon-purple/30 transition-colors group">
                            <div className="mt-1 w-10 h-10 bg-neon-purple/10 rounded-lg flex items-center justify-center text-neon-purple group-hover:scale-110 transition-transform">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Base Operations</h3>
                                <p className="text-sm text-gray-400">Digital Realm, Server 7</p>
                                <p className="text-xs text-gray-500 mt-1">Global Access</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="md:w-2/3">
                    <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-black/40 relative overflow-hidden">
                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-full blur-[50px] pointer-events-none" />

                        <form className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Identity Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Comms Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Subject Protocol</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all">
                                    <option>General Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Feature Request</option>
                                    <option>Enterprise Access</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Message Data</label>
                                <textarea rows={5} placeholder="Describe your request..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all resize-none" />
                            </div>

                            <button type="button" className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)]">
                                <Send size={18} />
                                TRANSMIT DATA
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
