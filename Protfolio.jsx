import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Code, 
  Layers, 
  Smartphone, 
  Database, 
  Cpu, 
  Globe, 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Twitter, 
  MessageSquare, 
  Mail, 
  Send, 
  Sparkles, 
  ArrowUpRight, 
  Monitor, 
  ShieldCheck, 
  Zap, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Terminal,
  Award,
  Layers3,
  Flame,
  MousePointer,
  Volume2,
  VolumeX,
  Play
} from 'lucide-react';

// ============================================================================
// COMPONENT: APP (THE MAIN IMMERSIVE PORTFOLIO APPLICATION)
// ============================================================================
export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef(null);

  // App Loading state
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Custom Cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [cursorText, setCursorText] = useState("");

  // Navigation mobile state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter for Projects
  const [activeCategory, setActiveCategory] = useState("all");

  // Contact form submission status
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ idle: true, sending: false, success: false, error: false });

  // Testimonial index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Active section tracker
  const [activeSection, setActiveSection] = useState('hero');

  // Trigger loading progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // Set up scroll progress & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Track sections
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'contact'];
      let currentSection = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tracking Mouse Coordinates for custom cursor and glow shader effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Dynamic lighting follow
      const glows = document.querySelectorAll('.interactive-glow');
      glows.forEach(glow => {
        const rect = glow.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.setProperty('--mouse-x', `${x}px`);
        glow.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Web Audio Synthesizer for high-end cinematic feedback
  const playSynthesizedSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'click') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.setValueAtTime(50, ctx.currentTime + 0.08);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(900, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn("Audio Context init failed", e);
    }
  };

  // Switch dark/light modes
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    playSynthesizedSound('click');
  };

  // Custom Cursor Hover Bindings
  const cursorInteract = (enter, text = "") => {
    setCursorHover(enter);
    setCursorText(text);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden selection:bg-purple-500 selection:text-white ${
      isDarkMode ? 'bg-[#030014] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-[#030014] flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15)_0%,rgba(3,0,20,1)_80%)]" />
          
          <div className="relative flex flex-col items-center">
            {/* Elegant futuristic spinning portal */}
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-t-2 border-r-2 border-purple-500 rounded-full animate-spin duration-1000"></div>
              <div className="absolute inset-2 border-b-2 border-l-2 border-cyan-400 rounded-full animate-spin duration-1500" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute inset-4 border-t-2 border-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center text-purple-400 text-sm font-mono tracking-widest font-bold">
                {loadingProgress}%
              </div>
            </div>

            {/* Glowing Brand text */}
            <h1 className="text-3xl font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-2 font-mono">
              NEXUS.CORE
            </h1>
            <p className="text-purple-300/60 font-mono text-xs uppercase tracking-[0.4em] animate-pulse">
              Synthesizing Experience...
            </p>
          </div>
          
          {/* Progress bar line */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-150" style={{ width: `${loadingProgress}%` }} />
        </div>
      )}

      {/* CUSTOM CURSOR */}
      <div 
        className={`hidden md:flex fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 rounded-full justify-center items-center transition-all duration-75 ease-out font-mono font-bold text-[8px] uppercase tracking-widest ${
          cursorHover 
            ? 'w-24 h-24 bg-purple-500/15 border-2 border-purple-400 scale-100 backdrop-blur-sm text-purple-200' 
            : 'w-4 h-4 bg-cyan-400/80 border-0 scale-100 mix-blend-difference'
        }`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          boxShadow: cursorHover ? '0 0 25px rgba(168,85,247,0.4)' : '0 0 10px rgba(34,211,238,0.8)'
        }}
      >
        {cursorHover && (
          <div className="flex flex-col items-center justify-center animate-pulse text-center px-1">
            <Sparkles className="w-3 h-3 mb-1 text-cyan-300" />
            <span>{cursorText || 'EXPLORE'}</span>
          </div>
        )}
      </div>

      {/* SCROLL PROGRESS INDICATOR */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-white/5 z-[999]">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* AUDIO AND THEME ACCESSORIES DOCK */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3">
        {/* Scroll To Top */}
        {scrollProgress > 15 && (
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              playSynthesizedSound('click');
            }}
            className="w-12 h-12 rounded-full border border-purple-500/30 bg-purple-950/40 backdrop-blur-md flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-400 transition-all group shadow-lg"
            onMouseEnter={() => cursorInteract(true, "SCROLL UP")}
            onMouseLeave={() => cursorInteract(false)}
          >
            <ArrowUpRight className="w-5 h-5 -rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
        
        {/* Sound FX Toggle */}
        <button 
          onClick={() => {
            const newState = !soundEnabled;
            setSoundEnabled(newState);
            // Quick tone confirmation if turning on
            if (newState) {
              setTimeout(() => {
                setSoundEnabled(true);
                playSynthesizedSound('success');
              }, 100);
            }
          }}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all shadow-lg ${
            soundEnabled 
              ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-400' 
              : 'border-slate-500/30 bg-slate-900/40 text-slate-400'
          }`}
          onMouseEnter={() => cursorInteract(true, soundEnabled ? "MUTE FX" : "UNMUTE FX")}
          onMouseLeave={() => cursorInteract(false)}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full border border-purple-500/30 bg-purple-950/40 backdrop-blur-md flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-400 transition-all shadow-lg"
          onMouseEnter={() => cursorInteract(true, isDarkMode ? "LIGHT MODE" : "DARK MODE")}
          onMouseLeave={() => cursorInteract(false)}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* HEADER NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        scrollProgress > 2 
          ? (isDarkMode ? 'bg-[#030014]/80 backdrop-blur-xl border-purple-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-md')
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a 
            href="#hero" 
            className="flex items-center gap-2 font-mono font-black text-xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 group"
            onMouseEnter={() => { cursorInteract(true, "HOME"); playSynthesizedSound('hover'); }}
            onMouseLeave={() => cursorInteract(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-xs shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:rotate-12 transition-transform">
              N
            </div>
            <span>NEXUS</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Timeline' },
              { id: 'services', label: 'Services' },
              { id: 'testimonials', label: 'Reviews' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 relative group`}
                onMouseEnter={() => { cursorInteract(true, item.label); playSynthesizedSound('hover'); }}
                onMouseLeave={() => cursorInteract(false)}
              >
                <span className={`relative z-10 ${
                  activeSection === item.id 
                    ? 'text-purple-400 font-bold' 
                    : (isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-black')
                }`}>
                  {item.label}
                </span>
                
                {/* Active Indicator & Hover Ambient */}
                {activeSection === item.id && (
                  <span className="absolute inset-0 bg-purple-500/10 border border-purple-500/20 rounded-full animate-pulse" />
                )}
                <span className="absolute inset-0 bg-white/5 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}

            <a 
              href="#contact"
              className="ml-4 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:scale-105 transition-all flex items-center gap-2"
              onMouseEnter={() => { cursorInteract(true, "HIRE ME"); playSynthesizedSound('hover'); }}
              onMouseLeave={() => cursorInteract(false)}
            >
              <span>HIRE ME</span>
              <Sparkles className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-purple-400 hover:text-white"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playSynthesizedSound('click');
            }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#030014]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center gap-6">
          <div className="absolute top-6 right-6">
            <button 
              className="p-2 text-purple-400"
              onClick={() => {
                setMobileMenuOpen(false);
                playSynthesizedSound('click');
              }}
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {[
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'experience', label: 'Timeline' },
            { id: 'services', label: 'Services' },
            { id: 'testimonials', label: 'Reviews' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setMobileMenuOpen(false);
                playSynthesizedSound('click');
              }}
              className="text-2xl font-mono tracking-widest text-slate-300 hover:text-purple-400 transition-colors"
            >
              {item.label}
            </a>
          ))}

          <a 
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 px-8 py-4 rounded-full text-base font-mono font-bold tracking-widest bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-xl"
          >
            GET IN TOUCH
          </a>
        </div>
      )}

      {/* THREE.JS HERO BACKGROUND */}
      <div className="absolute inset-0 z-[1] h-screen pointer-events-none overflow-hidden">
        <ThreeBackground isDarkMode={isDarkMode} />
      </div>

      {/* MAIN CONTAINER */}
      <main className="relative z-[2]">
        
        {/* ==========================================
            1. HERO SECTION 
            ========================================== */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030014]/80 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              
              {/* Premium micro badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-950/20 backdrop-blur-md animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-300">
                  Ready for Elite Contracts • 2026 Edition
                </span>
              </div>

              {/* Headings */}
              <div className="space-y-1">
                <span className="font-mono text-purple-400 tracking-[0.2em] uppercase text-sm block">
                  SYSTEM ARCHITECT & DESIGNER
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    NEXUS CORE
                  </span>
                </h1>
              </div>

              {/* TYPING CAROUSEL TEXT */}
              <div className="h-10 flex items-center">
                <p className="text-xl md:text-2xl font-mono text-slate-300">
                  Specializing in: <TypingCarousel words={["Web App Systems", "Next.js & React Architectures", "High-Performance Mobile Apps", "Cinematic Motion UI/UX"]} />
                </p>
              </div>

              {/* Rich Narrative / Intro */}
              <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
                We craft scalable, interactive web and mobile environments that merge 
                computational power with high-end premium visual engineering. 
                Optimized for performance, conversion, and global-scale compliance.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
                <a 
                  href="#projects"
                  className="px-8 py-4 rounded-full text-sm font-mono font-bold tracking-wider bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] hover:scale-[1.03] transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
                  onMouseEnter={() => { cursorInteract(true, "VIEW WORK"); playSynthesizedSound('hover'); }}
                  onMouseLeave={() => cursorInteract(false)}
                >
                  <span>PROJECTS ENGINE</span>
                  <Layers3 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </a>

                <a 
                  href="#contact"
                  className="px-8 py-4 rounded-full text-sm font-mono font-bold tracking-wider border border-purple-500/30 bg-purple-950/20 backdrop-blur-md text-purple-300 hover:bg-purple-900/30 hover:border-purple-400 hover:text-white transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                  onMouseEnter={() => { cursorInteract(true, "TALK NOW"); playSynthesizedSound('hover'); }}
                  onMouseLeave={() => cursorInteract(false)}
                >
                  <span>LAUNCH DISPATCH</span>
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>

              {/* Micro Status Badges */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-purple-500/10 w-full">
                <div>
                  <div className="text-2xl font-extrabold font-mono text-white">99.9%</div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500">System Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold font-mono text-white">100+</div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500">Deployments</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold font-mono text-white">&lt; 100ms</div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500">Load Latency</div>
                </div>
              </div>

            </div>

            {/* Right Hero Column: Premium Profile Holo */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] group">
                
                {/* Neon back glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
                
                {/* Cyber ring outer */}
                <div className="absolute -inset-1 rounded-full border-2 border-dashed border-purple-500/40 animate-spin duration-30000" />

                {/* Glass core shield */}
                <div className="absolute inset-4 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md overflow-hidden flex items-center justify-center p-2 shadow-2xl">
                  {/* Cyber grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
                  
                  {/* Highly polished profile placeholder graphic */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-purple-950/50 to-[#030014] flex flex-col items-center justify-center text-center px-6 border border-purple-500/20">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                      <Terminal className="w-10 h-10 animate-pulse" />
                    </div>
                    
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1">Nexus Core Engine</span>
                    <h3 className="text-xl font-black text-white tracking-wide">ELITE DEVELOPER</h3>
                    <p className="text-[11px] font-mono text-slate-500 mt-2 max-w-[200px]">
                      A digital interface merging physical human creative vision with cloud computing nodes.
                    </p>

                    {/* Ping indicators */}
                    <div className="absolute bottom-6 flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <span className="font-mono text-[9px] text-green-400 font-bold uppercase tracking-wider">SECURE CONNECTION STATUS</span>
                    </div>
                  </div>

                </div>

                {/* Futuristic labels floating */}
                <div className="absolute top-10 -left-6 bg-slate-900/90 border border-purple-500/30 px-3 py-1.5 rounded-md text-[10px] font-mono text-purple-300 tracking-wider shadow-lg backdrop-blur-md animate-bounce">
                  ⚡ LATENCY: 12ms
                </div>

                <div className="absolute bottom-12 -right-8 bg-slate-900/90 border border-cyan-500/30 px-3 py-1.5 rounded-md text-[10px] font-mono text-cyan-300 tracking-wider shadow-lg backdrop-blur-md">
                  🛰️ GEOLOCATION: CAIRO_NODE
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            2. ABOUT ME SECTION
            ========================================== */}
        <section id="about" className="py-32 relative px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Title Header */}
            <div className="flex flex-col mb-16 space-y-2">
              <span className="font-mono text-xs text-purple-400 tracking-[0.4em] uppercase">SYSTEM.SPECS</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">THE HUMAN ENGINE</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
            </div>

            {/* Glassmorphism content layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Profile Card details */}
              <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#030014]/60 backdrop-blur-md p-8 md:p-12 flex flex-col justify-between relative overflow-hidden interactive-glow">
                {/* Glow follower marker inside card */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_250px_at_var(--mouse-x,0px)_var(--mouse-y,0px),#a855f7,transparent)]" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">Senior Full-Stack Architect</h3>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    With over a decade of deep technical experience, I conceptualize, construct, and launch comprehensive web and mobile ecosystem architectures. I focus heavily on optimal render optimization, modern reactive frameworks, and elegant layout animations that optimize conversion and metrics.
                  </p>

                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    I believe code is simply the canvas for beautiful, intuitive interfaces. Whether deploying ultra-secure payment structures, designing 3D interactive graphics, or building fast cross-platform Flutter engines, my target remains identical: zero compromise on absolute visual and engineering premium-grade quality.
                  </p>

                  <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl flex items-start gap-3">
                    <Terminal className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <span className="font-mono text-xs text-slate-300 leading-relaxed">
                      <strong>Current Directive:</strong> Engineering AI-powered SaaS platforms and immersive NextJS applications. Utilizing Edge-rendering setups and micro-frontend structures for maximum velocity.
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 relative z-10 flex flex-wrap gap-4 items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Available for International Freelance & Advisory</span>
                  <a 
                    href="#contact"
                    className="flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
                  >
                    <span>PING THE COMMS DECK</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Statistics Panel */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {[
                  { count: "12+", label: "Years Experience", desc: "Building core platforms" },
                  { count: "120+", label: "Projects Shipped", desc: "Enterprise to startup" },
                  { count: "98%", label: "Client Retainer", desc: "Continuous cooperation" },
                  { count: "16+", label: "Frameworks Mastered", desc: "Fullstack engineering" }
                ].map((stat, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl border border-white/5 bg-[#030014]/40 backdrop-blur-md flex flex-col justify-between hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 group"
                    onMouseEnter={() => playSynthesizedSound('hover')}
                  >
                    <div>
                      <span className="text-3xl md:text-4xl font-mono font-black text-white bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-100 to-purple-400 group-hover:from-purple-400 group-hover:to-cyan-400 transition-colors">
                        {stat.count}
                      </span>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 group-hover:text-cyan-300 transition-colors">{stat.label}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ==========================================
            3. SKILLS SECTION
            ========================================== */}
        <section id="skills" className="py-24 relative px-6 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Title */}
            <div className="flex flex-col items-center text-center mb-16 space-y-2">
              <span className="font-mono text-xs text-purple-400 tracking-[0.4em] uppercase">EXPERTISE.MATRIX</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">ENGINEERING SPECTRUM</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Tech Icons Float Board */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl border border-white/5 bg-[#030014]/50 backdrop-blur-md p-8 relative overflow-hidden">
                  <h3 className="font-mono text-xs text-purple-400 uppercase tracking-widest mb-6">Core Stack Inventory</h3>
                  
                  {/* Dynamic Cloud of Skills */}
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { name: 'React', level: 'Expert' },
                      { name: 'TypeScript', level: 'Expert' },
                      { name: 'Next.js', level: 'Expert' },
                      { name: 'NodeJS', level: 'Expert' },
                      { name: 'Express', level: 'Advanced' },
                      { name: 'Firebase', level: 'Expert' },
                      { name: 'MySQL', level: 'Advanced' },
                      { name: 'MongoDB', level: 'Advanced' },
                      { name: 'Flutter', level: 'Expert' },
                      { name: 'Tailwind', level: 'Expert' },
                      { name: 'GraphQL', level: 'Advanced' },
                      { name: 'Laravel', level: 'Advanced' },
                    ].map((tech, i) => (
                      <div 
                        key={i} 
                        className="aspect-square rounded-xl border border-white/5 bg-white/5 flex flex-col items-center justify-center p-2 text-center hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 cursor-help group relative"
                        onMouseEnter={() => playSynthesizedSound('hover')}
                      >
                        <span className="font-mono font-bold text-white text-[11px] group-hover:text-purple-400 transition-colors">{tech.name}</span>
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter mt-1 group-hover:text-cyan-400">{tech.level}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse" />
                    <p className="text-[11px] font-mono text-slate-400">
                      Our systems are tested against rigorous modern security benchmarks and run fully responsive pipelines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Skill Progress Bars */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl border border-white/5 bg-[#030014]/50 backdrop-blur-md p-8 md:p-10 space-y-8">
                  <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Active Development Proficiencies</h3>
                  
                  {[
                    { title: "Frontend UI/UX Architecture", value: 98, color: "from-purple-500 to-pink-500", desc: "Next.js, TypeScript, React Three Fiber, Custom Layout Motors" },
                    { title: "Mobile Application Systems", value: 92, color: "from-cyan-500 to-blue-600", desc: "Flutter SDK, Dart, Clean Architecture, Native Modules & Bridges" },
                    { title: "Backend Systems & Database Design", value: 89, color: "from-green-400 to-emerald-600", desc: "NodeJS, RESTful APIs, Complex SQL/NoSQL Engines, Serverless Pipelines" },
                    { title: "Optimization & Security Auditing", value: 94, color: "from-orange-400 to-red-500", desc: "Core Web Vitals, Performance Analytics, Cloudflare Shielding, Secure Handshakes" },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white tracking-wide">{skill.title}</h4>
                          <span className="text-[10px] font-mono text-slate-500">{skill.desc}</span>
                        </div>
                        <span className="font-mono text-sm text-purple-400 font-bold">{skill.value}%</span>
                      </div>
                      
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==========================================
            4. PROJECTS SECTION WITH FILTERS
            ========================================== */}
        <section id="projects" className="py-24 relative px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-purple-400 tracking-[0.4em] uppercase">SYSTEM.OUTPUT</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">ACTIVE PRODUCTIONS</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 bg-[#030014]/60 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                {[
                  { id: 'all', label: 'All Engines' },
                  { id: 'web', label: 'Web Apps' },
                  { id: 'mobile', label: 'Mobile Apps' },
                  { id: 'saas', label: 'SaaS Platforms' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveCategory(tab.id);
                      playSynthesizedSound('click');
                    }}
                    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                      activeCategory === tab.id 
                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects(activeCategory).map((proj, i) => (
                <div 
                  key={i} 
                  className="group rounded-3xl border border-white/5 bg-[#030014]/60 backdrop-blur-md overflow-hidden hover:border-purple-500/30 transition-all duration-500 flex flex-col justify-between relative interactive-glow h-[480px] hover:-translate-y-2"
                  onMouseEnter={() => playSynthesizedSound('hover')}
                >
                  
                  {/* Aspect-ratio header with simulated device viewport */}
                  <div className="h-48 bg-slate-950/80 relative overflow-hidden border-b border-white/5">
                    {/* Glowing mesh background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/10" />
                    
                    {/* Simulated window frame */}
                    <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">{proj.tech[0]} V1.0.0</span>
                    </div>

                    {/* Render visual icon pattern inside simulated viewport */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform duration-700">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-2xl relative">
                        {proj.category === 'web' && <Monitor className="w-8 h-8" />}
                        {proj.category === 'mobile' && <Smartphone className="w-8 h-8" />}
                        {proj.category === 'saas' && <Cpu className="w-8 h-8" />}
                        <div className="absolute -inset-1 rounded-2xl border border-white/20 animate-ping duration-3000" />
                      </div>
                    </div>

                    {/* Gradient Fade overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">{proj.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{proj.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>

                    {/* Tech tag list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tech.map((t, idx) => (
                        <span key={idx} className="font-mono text-[9px] text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTA Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <a 
                        href="#contact"
                        className="flex-1 py-2.5 rounded-xl font-mono text-xs font-bold text-center border border-purple-500/30 bg-purple-950/20 text-purple-300 hover:text-white hover:border-purple-400 hover:bg-purple-900/30 transition-all flex items-center justify-center gap-1.5"
                        onMouseEnter={() => { cursorInteract(true, "MOCK ENGINE DEMO"); playSynthesizedSound('hover'); }}
                        onMouseLeave={() => cursorInteract(false)}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE ENGINE</span>
                      </a>
                      
                      <a 
                        href="#contact"
                        className="p-2.5 rounded-xl border border-slate-500/20 text-slate-400 hover:text-white hover:border-slate-400 transition-all"
                        onMouseEnter={() => { cursorInteract(true, "SOURCE REPO"); playSynthesizedSound('hover'); }}
                        onMouseLeave={() => cursorInteract(false)}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==========================================
            5. TIMELINE EXPERIENCE SECTION
            ========================================== */}
        <section id="experience" className="py-24 relative px-6 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
          <div className="max-w-4xl mx-auto">
            
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-20 space-y-2">
              <span className="font-mono text-xs text-purple-400 tracking-[0.4em] uppercase">SYSTEM.LOGS</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">EXPERIENCE TIMELINE</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
            </div>

            {/* Vertical Timeline Track */}
            <div className="relative border-l-2 border-purple-500/30 pl-8 md:pl-12 space-y-12">
              {[
                {
                  period: "2024 - Present",
                  role: "Lead Full-Stack Architect",
                  company: "Cybernetix Labs",
                  desc: "Spearheaded complex reactive dashboard ecosystems and secure enterprise database integrations. Reduced client platform render latencies by 42% through aggressive React hydration caching strategies and Vite-level asset segmentations.",
                  metrics: ["NextJS 14 Engine Integration", "42% Performance Boost", "Managed team of 6 engineers"]
                },
                {
                  period: "2022 - 2024",
                  role: "Senior Mobile Engineer",
                  company: "Aero Logistics SaaS",
                  desc: "Engineered ultra-responsive Flutter interfaces integrated with robust Firestore multi-user real-time synchronizations. Set up automatic pipeline triggers supporting high-frequency tracking modules used globally.",
                  metrics: ["99.99% Offline sync uptime", "Flutter Core architecture", "Delivered 4 native mobile binaries"]
                },
                {
                  period: "2020 - 2022",
                  role: "UI/UX Developer",
                  company: "Stratos Interactive Studio",
                  desc: "Created highly custom interactive portfolios and marketing environments with dynamic physics using GSAP and ThreeJS assets. Successfully recognized by three Awwwards nominations.",
                  metrics: ["3 Awwwards nominations", "Custom WebGL interfaces", "Pixel perfect designs"]
                }
              ].map((exp, idx) => (
                <div key={idx} className="relative group">
                  
                  {/* Floating Circle Anchor */}
                  <span className="absolute -left-[45px] md:-left-[61px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center text-[10px] text-purple-400 font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-115 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    {idx + 1}
                  </span>

                  {/* Content Container */}
                  <div className="p-6 md:p-8 rounded-2xl border border-white/5 bg-[#030014]/60 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden interactive-glow">
                    {/* Ambient light pulse */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-bold">{exp.period}</span>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{exp.role}</h3>
                        <p className="text-xs font-mono text-slate-500">{exp.company}</p>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
                      {exp.desc}
                    </p>

                    {/* Metrics / Achievement Badges */}
                    <div className="flex flex-wrap gap-2">
                      {exp.metrics.map((met, mIdx) => (
                        <span key={mIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[9px]">
                          <Zap className="w-2.5 h-2.5" />
                          <span>{met}</span>
                        </span>
                      ))}
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==========================================
            6. SERVICES SECTION
            ========================================== */}
        <section id="services" className="py-24 relative px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-16 space-y-2">
              <span className="font-mono text-xs text-purple-400 tracking-[0.4em] uppercase">CATALOG.OFFERINGS</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">TACTICAL DIGITAL SERVICES</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
            </div>

            {/* Grid distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Monitor className="w-8 h-8 text-purple-400" />,
                  title: "High-Performance Web Apps",
                  desc: "Engineered with Next.js or React frameworks, optimized for extreme search index visibility, sub-second latency, and fluid interaction structures.",
                  list: ["Server-Side Rendering", "Tailwind styling", "SEO optimization"]
                },
                {
                  icon: <Smartphone className="w-8 h-8 text-pink-400" />,
                  title: "Secure Native Mobile Apps",
                  desc: "Comprehensive cross-platform engines utilizing Dart/Flutter pathways. Connecting seamlessly to offline cache layers and security nodes.",
                  list: ["Native performance", "Push Notification suites", "Biometric authentications"]
                },
                {
                  icon: <Cpu className="w-8 h-8 text-cyan-400" />,
                  title: "Intuitive UI/UX Blueprints",
                  desc: "Extensive functional blueprints engineered with precise visual contrast guides, interactive user scenarios, and responsive grids.",
                  list: ["Interactive Prototypes", "Figma Design Tokens", "Consistent Brand Guidelines"]
                },
                {
                  icon: <Database className="w-8 h-8 text-green-400" />,
                  title: "Complex Server Frameworks",
                  desc: "Securing systems using modern Node.js and REST architectures. High emphasis on database scaling and request limit shields.",
                  list: ["Rate-Limiting Shields", "Express pathways", "PostgreSQL structures"]
                },
                {
                  icon: <Layers className="w-8 h-8 text-yellow-400" />,
                  title: "Continuous Deployments",
                  desc: "Setting up continuous delivery workflows mapping repository triggers straight into modern Edge CDNs.",
                  list: ["GitHub Actions Integration", "CDN optimization", "Instant Rollbacks"]
                },
                {
                  icon: <Globe className="w-8 h-8 text-blue-400" />,
                  title: "3D Interactive WebGL Experiences",
                  desc: "Stunning browser animations built on lightweight Three.js algorithms, maintaining exceptional mobile response ratios.",
                  list: ["Dynamic Canvas Logic", "ThreeJS rendering", "High Framerates"]
                }
              ].map((service, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl border border-white/5 bg-[#030014]/60 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group interactive-glow"
                  onMouseEnter={() => playSynthesizedSound('hover')}
                >
                  <div className="space-y-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{service.desc}</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
                    <ul className="space-y-2">
                      {service.list.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-center gap-2 text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==========================================
            7. TESTIMONIALS SECTION
            ========================================== */}
        <section id="testimonials" className="py-24 relative px-6 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
          <div className="max-w-4xl mx-auto">
            
            {/* Section Title */}
            <div className="flex flex-col items-center text-center mb-16 space-y-2">
              <span className="font-mono text-xs text-purple-400 tracking-[0.4em] uppercase">SYSTEM.FEEDBACK</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">CLIENT COMMENDATIONS</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
            </div>

            {/* Testimonial Core Box */}
            <div className="relative rounded-3xl border border-white/10 bg-[#030014]/60 backdrop-blur-md p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
              
              {/* Massive double quotes asset */}
              <div className="absolute -top-6 -left-6 text-white/5 text-[150px] font-serif select-none pointer-events-none">
                “
              </div>

              {/* Slider content wrapper */}
              <div className="relative z-10 min-h-[160px] flex flex-col justify-between">
                
                {/* Quote body text */}
                <p className="text-base md:text-xl text-slate-200 italic leading-relaxed">
                  "{testimonialsList[testimonialIndex].quote}"
                </p>

                {/* Author Credentials */}
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/5 pt-6 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {testimonialsList[testimonialIndex].name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{testimonialsList[testimonialIndex].name}</h4>
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{testimonialsList[testimonialIndex].role}</p>
                      <p className="text-[10px] font-mono text-slate-500">{testimonialsList[testimonialIndex].company}</p>
                    </div>
                  </div>

                  {/* Rating Stars mock */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Carousel Control Buttons */}
              <div className="absolute top-6 right-6 flex gap-2">
                <button 
                  onClick={() => {
                    setTestimonialIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
                    playSynthesizedSound('click');
                  }}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-purple-400 hover:text-white text-slate-400 bg-[#030014]/60 backdrop-blur-md flex items-center justify-center transition-all"
                  onMouseEnter={() => cursorInteract(true, "PREVIOUS")}
                  onMouseLeave={() => cursorInteract(false)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setTestimonialIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
                    playSynthesizedSound('click');
                  }}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-purple-400 hover:text-white text-slate-400 bg-[#030014]/60 backdrop-blur-md flex items-center justify-center transition-all"
                  onMouseEnter={() => cursorInteract(true, "NEXT")}
                  onMouseLeave={() => cursorInteract(false)}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ==========================================
            8. SOCIAL MEDIA LINKS VAULT
            ========================================== */}
        <section className="py-16 relative px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-[0.3em] mb-8">GLOBAL NODES COMMS EXCHANGE</span>
            
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'GitHub', icon: <Github className="w-5 h-5" />, color: 'hover:text-white hover:border-white/50 hover:bg-white/5', link: 'https://github.com' },
                { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10', link: 'https://linkedin.com' },
                { name: 'X / Twitter', icon: <Twitter className="w-5 h-5" />, color: 'hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10', link: 'https://twitter.com' },
                { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: 'hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10', link: 'https://instagram.com' },
                { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/10', link: 'https://facebook.com' },
                { name: 'WhatsApp', icon: <MessageSquare className="w-5 h-5 text-emerald-400" />, color: 'hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-400/10', link: 'https://whatsapp.com' },
                { name: 'Email Link', icon: <Mail className="w-5 h-5" />, color: 'hover:text-purple-400 hover:border-purple-400/50 hover:bg-purple-400/10', link: 'mailto:contact@nexuscore.dev' }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border border-white/5 bg-[#030014]/40 backdrop-blur-md text-slate-400 transition-all duration-300 font-mono text-xs uppercase tracking-wider ${social.color}`}
                  onMouseEnter={() => { cursorInteract(true, `VISIT ${social.name}`); playSynthesizedSound('hover'); }}
                  onMouseLeave={() => cursorInteract(false)}
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            9. CONTACT SECTION
            ========================================== */}
        <section id="contact" className="py-24 relative px-6">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Comm Deck Left Column info */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <span className="font-mono text-xs text-purple-400 tracking-[0.4em] uppercase">SYSTEM.COMMS</span>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white">OPEN A COMMS PORTAL</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
                  <p className="text-slate-400 text-sm leading-relaxed pt-4">
                    Ready to initiate your enterprise product or request an audit? Fill out the secure transfer envelope on the right. Our support nodes monitor replies with latency below 2 hours.
                  </p>
                </div>

                {/* Direct info list */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <div>
                      <span className="text-slate-500 block">ENVELOPE ADDRESS</span>
                      <a href="mailto:contact@nexuscore.dev" className="text-slate-200 hover:text-purple-400">contact@nexuscore.dev</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <div>
                      <span className="text-slate-500 block">SECURE GEOLOCATION</span>
                      <span className="text-slate-200">CAIRO CO-LOCATION CENTER (NODE E1)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-slate-500 block">ENCRYPTION PROTOCOL</span>
                      <span className="text-slate-200">TLS 1.3 / AES-256 GCM MOCKED SYSTEM</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-600">
                  Secure cryptographic signatures are verified automatically upon dispatching.
                </div>
              </div>

              {/* Secure Form Right Column */}
              <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#030014]/60 backdrop-blur-md p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="font-mono text-xs text-purple-400 uppercase tracking-widest mb-6">SECURE COMMUNICATIONS TRANSFER</h3>

                {formStatus.success ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-xl">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">COMMS DISPATCHED SUCCESSFULLY</h4>
                    <p className="text-xs font-mono text-slate-400 max-w-sm">
                      Your transmission envelope was routed successfully through our active gateway. Expect immediate diagnostic responses.
                    </p>
                    <button 
                      onClick={() => {
                        setFormStatus({ idle: true, sending: false, success: false, error: false });
                        setContactForm({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="mt-6 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white"
                    >
                      RESET TRANSCEIVER
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormStatus({ idle: false, sending: true, success: false, error: false });
                      playSynthesizedSound('click');
                      
                      // Simulated routing handshake latency
                      setTimeout(() => {
                        setFormStatus({ idle: false, sending: false, success: true, error: false });
                        playSynthesizedSound('success');
                      }, 1800);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">HUMAN IDENTIFIER (NAME)</label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Your identity..."
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">DIGITAL MAILBOX (EMAIL)</label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="address@server.com"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">TRANSMISSION SUBJECT</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Project scope or inquiry title..."
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">TRANSMISSION payload (MESSAGE)</label>
                      <textarea 
                        rows={5}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Details of your business specs or framework requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus.sending}
                      className="w-full py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      onMouseEnter={() => { cursorInteract(true, "TRANSMIT DISPATCH"); playSynthesizedSound('hover'); }}
                      onMouseLeave={() => cursorInteract(false)}
                    >
                      {formStatus.sending ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>ROUTING HANDSHAKE...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>LAUNCH TRANSMISSION GATEWAY</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER SYSTEM */}
      <footer className="relative z-10 py-12 border-t border-white/5 bg-[#030014]/90 backdrop-blur-md px-6 text-slate-500 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-[10px]">
              N
            </div>
            <span className="font-black tracking-widest text-slate-300">NEXUS.CORE</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-slate-500">© 2026 Nexus Core Platforms. All rights reserved. Built with Vite + R3F.</p>
            <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider">Authorized core connection endpoint - CAIRO NODE</p>
          </div>

        </div>
      </footer>

    </div>
  );
}

// ============================================================================
// TYPING CAROUSEL COMPONENT
// ============================================================================
function TypingCarousel({ words }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor simulation
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  // Typing logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-cyan-400 font-bold border-r-2 border-cyan-400 ml-1">
      {words[index].substring(0, subIndex)}
    </span>
  );
}

// ============================================================================
// DATA STRUCTURE FOR PROJECTS & TESTIMONIALS
// ============================================================================
const projectsData = [
  {
    title: "Vercel Shield Analytics System",
    category: "saas",
    tech: ["NextJS 14", "Tailwind CSS", "GraphQL", "PostgreSQL"],
    desc: "A secure analytical suite optimized for high-performance traffic auditing. Incorporates complex SVG rendering logic with less than 20ms update cycles, featuring real-time firewall threat notifications.",
    year: "2025",
  },
  {
    title: "NeuroComms AI Portal",
    category: "web",
    tech: ["React", "Three.js", "Zustand", "Express"],
    desc: "Interactive 3D WebGL user workspace allowing simple neural network parameters generation directly inside a customizable browser mesh. Leverages robust matrix calculators on client machines.",
    year: "2025",
  },
  {
    title: "AeroTransport Logistics App",
    category: "mobile",
    tech: ["Flutter SDK", "Dart", "Firebase", "SQLite"],
    desc: "An enterprise courier shipment router built from clean architectural patterns. Synchronizes live GPS tracks to offline caching targets ensuring full zero-connectivity persistence protocols.",
    year: "2024",
  },
  {
    title: "Stripe-Enabled SaaS Engine",
    category: "saas",
    tech: ["NextJS", "TypeScript", "Prisma", "Stripe API"],
    desc: "A fully integrated automated invoicing portal mapping billing triggers into regional taxing authorities. Handles complex user credit allocation mechanics with 100% test coverage metrics.",
    year: "2024",
  },
  {
    title: "Horizon Interactive Globe",
    category: "web",
    tech: ["HTML5 Canvas", "ThreeJS", "Vite", "GSAP"],
    desc: "High-fidelity planetary weather monitor presenting climate analytics interactively on a responsive WebGL sphere. Renders multi-layer particle animations with minimal GPU load.",
    year: "2023",
  },
  {
    title: "SafePulse Personal Vault",
    category: "mobile",
    tech: ["Flutter", "Dart", "SQLite", "Biometric SDK"],
    desc: "Super-secure mobile vault protecting personal user credential lists. Incorporates instant local memory sanitation logic upon app suspension triggers.",
    year: "2023",
  }
];

function filteredProjects(category) {
  if (category === "all") return projectsData;
  return projectsData.filter(p => p.category === category);
}

const testimonialsList = [
  {
    quote: "Working with Nexus Core transformed our entire SaaS. The visual polish combined with clean, high-performance rendering architecture immediately elevated our brand in our series funding rounds.",
    name: "Marcus Aurelius",
    role: "VP of Product Engineering",
    company: "Stratos Cloud Services"
  },
  {
    quote: "The attention to UX, micro-interactions, and fast load times was remarkable. Our conversion metrics jumped 35% after the first week of deployment.",
    name: "Elena Rostova",
    role: "CEO & Co-Founder",
    company: "AeroTransport Group"
  },
  {
    quote: "Absolute wizards of ThreeJS and React. They built an immersive 3D diagnostic pipeline that was extremely fluid and flawless on mobile devices.",
    name: "Dr. David Sterling",
    role: "Head of AI Research",
    company: "Cybernetix Labs"
  }
];

// ============================================================================
// THREEJS CANVAS BACKGROUND ENGINE
// ============================================================================
function ThreeBackground({ isDarkMode }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create high-end dynamic particle cluster geometry
    const particleCount = 240;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Palette definition based on dark/light values
    const primaryColor = isDarkMode ? new THREE.Color('#8b5cf6') : new THREE.Color('#3b82f6'); // purple vs blue
    const accentColor = isDarkMode ? new THREE.Color('#22d3ee') : new THREE.Color('#ec4899');  // cyan vs pink

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random coordinates in a spherical or cloud distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 5.0;

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      // Color interpolation
      const mixedColor = primaryColor.clone().lerp(accentColor, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture (using procedural circular canvas marker to avoid external URLs)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    
    const texture = new THREE.CanvasTexture(pCanvas);

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add a glowing core wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(1.6, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0xa855f7 : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.04
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Mouse interactive target
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      
      // Rotate the systems
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.02;
      sphere.rotation.y = -elapsed * 0.03;

      // Parallax hover smooth dampening
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, [isDarkMode]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full" 
    />
  );
}