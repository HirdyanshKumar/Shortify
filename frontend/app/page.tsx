"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import * as THREE from 'three';
import { Github, Linkedin } from "lucide-react";

function HolographicCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2; // slow down rotation for massive object
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[7, 7, 7]} /> {/* Enlarged */}
        <meshStandardMaterial
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.15} // More transparent so it doesn't block text too much
        />
      </mesh>
    </Float>
  );
}

export default function Home() {
  const [exploding, setExploding] = useState(false);
  const [matrixText, setMatrixText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", stagger: 0.2 }
    )
      .fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1, repeat: -1, yoyo: true },
        "-=0.5"
      );
  }, []);

  // Scroll "Explosion" Logic
  useEffect(() => {
    let lastScrollTime = 0;

    const handleWheel = (e: WheelEvent) => {
      if (exploding) return;

      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (isAtBottom && e.deltaY > 0) {
        const now = Date.now();
        if (now - lastScrollTime < 500) return;
        lastScrollTime = now;

        triggerExplosion();
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [exploding]);

  const triggerExplosion = () => {
    setExploding(true);

    // Matrix Rain Effect (Subtle background detail)
    const chars = "10XYZΩπ#@&%!";
    const interval = setInterval(() => {
      setMatrixText(Array(500).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
    }, 50);

    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(interval);
        router.push("/signup");
      }
    });

    // Sequence: Smooth Blur & System Start
    // 1. Fade in dark blurred overlay
    tl.to(".explosion-overlay", { opacity: 1, duration: 0.8, ease: "power2.inOut" })

      // 2. Fade in Text
      .to(".explosion-text", { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3")

      // 3. Fill Progress Bar
      .to(".animate-progress", { width: "100%", duration: 1.5, ease: "power1.inOut" })

      // 4. Brief hold before redirect
      .to({}, { duration: 0.5 });
  };

  return (
    <div className="relative bg-bg-dark text-white min-h-screen selection:bg-neon-blue selection:text-black">

      {/* Matrix Overlay (Behind blur) */}
      <div className="matrix-overlay fixed inset-0 z-[90] pointer-events-none opacity-0 break-all font-mono text-neon-green text-[10px] leading-3 overflow-hidden mix-blend-screen">
        {matrixText}
      </div>

      {/* Transition Overlay */}
      <div className={`explosion-overlay fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl pointer-events-none opacity-0 flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="explosion-text opacity-0 text-3xl md:text-5xl font-black font-mono text-white tracking-[0.2em] mb-8 drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">
            INITIATING PROTOCOL<span className="animate-pulse">_</span>
          </h1>
          <div className="explosion-text opacity-0 w-96 h-1 bg-gray-800 mx-auto rounded-full overflow-hidden border border-white/20">
            <div className="animate-progress h-full bg-neon-blue w-0 shadow-[0_0_10px_#00f3ff]" />
          </div>
        </div>
      </div>

      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <HolographicCube />
        </Canvas>
      </div>

      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-md border-b border-white/5 shadow-lg">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 bg-neon-blue rounded-full animate-ping opacity-75" />
            <div className="relative w-4 h-4 bg-neon-blue rounded-full" />
          </div>
          <span className="font-bold text-2xl tracking-tighter text-white group-hover:text-neon-blue transition-colors">SHORTIFY</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login">
            <button className="px-6 py-2 bg-neon-blue/10 border border-neon-blue/50 text-neon-blue text-xs font-bold rounded-sm uppercase tracking-widest hover:bg-neon-blue hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]">
              Login / Initialize
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">
              Dashboard
            </button>
          </Link>
        </div>
        {/* Scanner Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
      </nav>

      {/* Scrollable Content Overlay */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-6">
          <main className="flex flex-col items-center text-center space-y-8 p-12 max-w-4xl glass-panel rounded-3xl neon-border backdrop-blur-md relative overflow-hidden">
            {/* Gradient glow behind text */}
            <div className="absolute inset-0 bg-neon-blue/5 blur-[100px] pointer-events-none" />

            <h1 className="hero-text text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neon-blue to-neon-purple drop-shadow-lg">
              SHORTIFY
            </h1>
            <p className="hero-text text-xl md:text-2xl text-gray-300 max-w-2xl font-light">
              The Next-Gen URL Shortener. <span className="font-bold text-neon-teal">Cyberpunk Aesthetics.</span> Powerful Analytics.
            </p>

            <div className="hero-text flex gap-6 mt-8">
              <Link href="/login">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-neon-blue hover:scale-105 transition-all duration-300 shadow-xl">
                  GET STARTED
                </button>
              </Link>
            </div>
          </main>

          {/* Scroll Indicator */}
          <div className="mt-16 scroll-indicator opacity-0">
            <p className="text-[10px] text-neon-blue tracking-[0.3em] uppercase mb-2 text-center">Scroll to Explore</p>
            <div className="w-[1px] h-16 bg-gradient-to-b from-neon-blue to-transparent mx-auto" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 md:px-20 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-24 text-white uppercase tracking-tighter">
              System <span className="text-neon-purple">Capabilities</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Feature 1 */}
              <div className="glass-panel p-10 rounded-3xl border border-white/5 hover:border-neon-teal/50 transition-all duration-500 group bg-black/40 hover:bg-black/60">
                <div className="w-14 h-14 bg-neon-teal/20 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-300 border border-neon-teal/30">
                  <svg className="w-6 h-6 text-neon-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-teal transition-colors">Quantum Analytics</h3>
                <p className="text-gray-400 leading-relaxed">Real-time data stream tracking every click, location, and device. Visualize your traffic with advanced holographic charts.</p>
              </div>

              {/* Feature 2 */}
              <div className="glass-panel p-10 rounded-3xl border border-white/5 hover:border-neon-purple/50 transition-all duration-500 group bg-black/40 hover:bg-black/60">
                <div className="w-14 h-14 bg-neon-purple/20 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-300 border border-neon-purple/30">
                  <svg className="w-6 h-6 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-purple transition-colors">Bio-Lock Security</h3>
                <p className="text-gray-400 leading-relaxed">Secure your uplinks with military-grade password protection. Control access privileges with a single toggle.</p>
              </div>

              {/* Feature 3 */}
              <div className="glass-panel p-10 rounded-3xl border border-white/5 hover:border-neon-blue/50 transition-all duration-500 group bg-black/40 hover:bg-black/60">
                <div className="w-14 h-14 bg-neon-blue/20 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-300 border border-neon-blue/30">
                  <svg className="w-6 h-6 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-blue transition-colors">Hyper-Speed Routing</h3>
                <p className="text-gray-400 leading-relaxed">Lightning fast redirects powered by our optimized edge network. Zero latency, maximum efficiency.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 neon-text text-white tracking-widest uppercase">Visual Interface</h2>
            <div className="relative aspect-video glass-panel rounded-3xl overflow-hidden border border-neon-blue/20 shadow-[0_0_100px_rgba(0,243,255,0.05)] group">
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
              {/* YouTube Embed */}
              <iframe
                width="100%"
                height="100%"
                src="https://drive.google.com/file/d/1mjkAYogWMqgoWfgVZYLQF4kaM9Nnui9l/preview"
                title="Shortify Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <p className="mt-8 text-sm text-neon-blue/60 uppercase tracking-widest">Protocol v1.0 // Demonstration</p>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-20 px-6 border-t border-white/5 bg-black/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-6">SHORTIFY<span className="text-neon-blue">.</span></h3>
              <p className="text-gray-400 max-w-sm mb-6">
                The advanced URL protocol for the digital age. Secure, fast, and beautifully designed.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/hirdyanshkumar25/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue hover:text-black transition cursor-pointer">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/HirdyanshKumar/Shortify" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue hover:text-black transition cursor-pointer">
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link href="/features" className="hover:text-neon-blue cursor-pointer transition">Features</Link></li>
                <li><Link href="/dashboard" className="hover:text-neon-blue cursor-pointer transition">Analytics</Link></li>
                <li><Link href="/contact" className="hover:text-neon-blue cursor-pointer transition">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link href="/privacy" className="hover:text-neon-blue cursor-pointer transition">Privacy Protocol</Link></li>
                <li><Link href="/terms" className="hover:text-neon-blue cursor-pointer transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">© 2024 SHORTIFY INC. ALL SYSTEMS NOMINAL.</p>
            <p className="text-[10px] text-neon-red animate-pulse tracking-[0.2em] uppercase cursor-help" title="Scroll deeper to break the system">
              ↓ SCROLL TO INITIATE PROTOCOL ↓
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
