import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cloud, 
  BarChart3, 
  ShieldCheck, 
  Smartphone, 
  Zap,
  ArrowRight,
  ChevronRight,
  Store,
  Database,
  MapPin,
  Clock,
  Sparkles,
  Award,
  CircleDollarSign,
  Coffee,
  CheckCircle2,
  Calendar,
  Send,
  Sliders,
  ChevronDown
} from "lucide-react";
import { RetailcoreLogo, LogoText } from "./components/Logo";
import { POSTerminal } from "./components/POSTerminal";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { ROICalculator } from "./components/ROIisCalculator";

export default function App() {
  const brandColor = "orange";
  const [salesTotalHistory, setSalesTotalHistory] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [lastNotificationMsg, setLastNotificationMsg] = useState<string>("");
  
  // Demo Booking state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "supermarket",
    branches: "1",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Trigger notification when a POS check-out happens
  const handleSaleCompleted = (amount: number, itemCount: number) => {
    setSalesTotalHistory(prev => prev + amount);
    setTransactionCount(prev => prev + 1);
    setLastNotificationMsg(`Synced invoice of Rs. ${amount.toLocaleString()} (${itemCount} items) to Cloud HQ!`);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessType: "supermarket",
        branches: "1",
        message: ""
      });
    }, 5000);
  };

  // Color theme configs matching the logo
  const themes = {
    blue: {
      accent: "text-blue-500",
      bgGradient: "from-blue-600 to-indigo-700",
      bgGradientHover: "hover:from-blue-700 hover:to-indigo-800",
      border: "border-blue-500/20",
      borderActive: "border-blue-500",
      textAccent: "text-blue-600",
      glowColor: "bg-blue-500/20",
      shadow: "shadow-blue-500/10",
      bgBadge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    red: {
      accent: "text-rose-500",
      bgGradient: "from-rose-600 to-red-700",
      bgGradientHover: "hover:from-rose-700 hover:to-red-800",
      border: "border-rose-500/20",
      borderActive: "border-rose-500",
      textAccent: "text-rose-600",
      glowColor: "bg-rose-500/20",
      shadow: "shadow-rose-500/10",
      bgBadge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    },
    orange: {
      accent: "text-orange-500",
      bgGradient: "from-orange-500 to-amber-600",
      bgGradientHover: "hover:from-orange-600 hover:to-amber-700",
      border: "border-orange-500/20",
      borderActive: "border-orange-500",
      textAccent: "text-orange-600",
      glowColor: "bg-orange-500/20",
      shadow: "shadow-orange-500/10",
      bgBadge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    }
  }[brandColor];

  const valueProps = [
    {
      title: "Real-time Cloud Sync",
      desc: "Instant synchronization from hardware terminals to Central SaaS dashboards. Automatic transaction logging protected by AES-256.",
      icon: <Cloud className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Offline-Active High Speed",
      desc: "Our dual-engine lets POS operators draft cash bills even without internet. Secure offline caching pushes transactions automatically upon re-link.",
      icon: <Store className="w-6 h-6" />,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Unified Inventory Pipeline",
      desc: "Integrated Stock Ledger alerts you when Fast-Moving Goods (Teas, Spices) trigger low procurement thresholds. Prevent stockouts instantly.",
      icon: <Database className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Multi-device Terminal Layout",
      desc: "Optimized interface compatible with desktop terminals, touch iPads, and mobile billing scanners. Bring your own hardware freely.",
      icon: <Smartphone className="w-6 h-6" />,
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Decorative Grid Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Dynamic Aura Glow behind hero logo */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] ${themes.glowColor} rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-1000`} />

      {/* Dynamic Toast Notification when sale is captured */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] w-full max-w-md px-4"
          >
            <div className="bg-slate-900 border border-emerald-500/30 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Cloud Sync Connected</p>
                <p className="text-xs text-slate-300 mt-0.5">{lastNotificationMsg}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Header */}
      <nav className="fixed top-0 w-full z-[90] bg-slate-950/70 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Header Brand Logo */}
            <div className="flex items-center gap-3 group">
              <RetailcoreLogo className="w-10 h-10 transform group-hover:scale-105 transition-transform duration-300 pointer-events-none" />
              <LogoText themeColor={brandColor} />
            </div>

            {/* Menu Links */}
            <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <a href="#core-values" className="hover:text-white transition-colors">Architecture</a>
              <a href="#demo-terminal" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live POS Terminal
              </a>
              <a href="#analytics" className="hover:text-white transition-colors">Cloud Dashboard</a>
              <a href="#calculator" className="hover:text-white transition-colors">ROI Calculator</a>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6">
              <a 
                href="#demo-form" 
                className={`hidden md:inline-block px-5 py-2.5 bg-gradient-to-r ${themes.bgGradient} text-white text-xs font-bold rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-widest`}
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-36 pb-20 lg:pt-52 lg:pb-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Information (7 columns) */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase border rounded-full ${themes.bgBadge} transition-all duration-500`}>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
                  Sri Lankans High-Performance POS Core
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.08] mb-6">
                  Next-Gen Retail with <br />
                  <span className={`bg-gradient-to-r font-extrabold ${themes.accent} to-amber-400 bg-clip-text text-transparent transition-all animate-text-flow`}>
                    Retailcore Lanka
                  </span>
                </h1>

                <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-300 leading-relaxed mb-10">
                  The business engages in software development, including the design and implementation of Point of Sale (POS) systems, along with providing cloud-based Software-as-a-Service (SaaS) solutions to clients on a subscription basis, system customization, technical support, and IT consultancy services.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href="#demo-terminal" 
                    className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r ${themes.bgGradient} ${themes.bgGradientHover} text-white font-bold rounded-full transition-all shadow-xl shadow-indigo-950/20 flex items-center justify-center gap-2 group cursor-pointer text-sm tracking-wide uppercase`}
                  >
                    Test Live Sandbox POS <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                  <a 
                    href="#demo-form" 
                    className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold rounded-full hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-sm tracking-wide uppercase"
                  >
                    Book Consultations
                  </a>
                </div>

                {/* Micro metrics */}
                <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-slate-900/60 max-w-md mx-auto lg:mx-0">
                  <div className="text-left">
                    <p className="text-2xl font-black font-mono text-white">0%</p>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-1">Stockout Rate</p>
                  </div>
                  <div className="text-left border-l border-slate-900 pl-6">
                    <p className="text-2xl font-black font-mono text-white">4x</p>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-1">Print Speeds</p>
                  </div>
                  <div className="text-left border-l border-slate-900 pl-6">
                    <p className="text-2xl font-black font-mono text-white">12ms</p>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-1">SaaS Sync Speed</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hero Graphic / Majestic spinning Logo Frame (5 columns) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] flex items-center justify-center"
              >
                {/* Glowing Outer Rings */}
                <div className="absolute inset-0 rounded-full border border-dashed border-slate-800 animate-spin" style={{ animationDuration: "120s" }} />
                <div className="absolute inset-8 rounded-full border border-slate-900 animate-spin" style={{ animationDuration: "60s" }} />
                <div className="absolute inset-16 rounded-full border border-slate-800/50 animate-spin" style={{ animationDuration: "30s" }} />
                <div className="absolute inset-24 rounded-full border border-indigo-500/10 blur-xl animate-pulse" />

                {/* Floating telemetry metrics cards around our Logo */}
                <div className="absolute -top-4 right-2 bg-slate-950 p-3 rounded-xl border border-slate-800 shadow-2xl z-20 flex items-center gap-2 animate-bounce cursor-default" style={{ animationDuration: "4s" }}>
                  <Award className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-white leading-tight">Sri Lankan Choice</p>
                    <p className="text-[8px] text-slate-500 font-mono uppercase mt-0.5">Top POS SME 2026</p>
                  </div>
                </div>

                <div className="absolute -bottom-2 -left-6 bg-slate-950 p-3 rounded-xl border border-slate-800 shadow-2xl z-20 flex items-center gap-2 animate-bounce cursor-default" style={{ animationDuration: "5s", animationDelay: "1s" }}>
                  <CircleDollarSign className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-white leading-tight">VAT &amp; Tax Compliant</p>
                    <p className="text-[8px] text-slate-500 font-mono uppercase mt-0.5">Automated Receipts LKR</p>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-10 bg-slate-950 p-3 rounded-xl border border-slate-800 shadow-2xl z-20 flex items-center gap-2 animate-pulse cursor-default">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 block animate-ping" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-300 leading-tight">HQ Active Link</p>
                    <p className="text-[8px] text-emerald-400 font-mono uppercase mt-0.5">99.99% Cloud Node Uptime</p>
                  </div>
                </div>

                {/* Huge Vector Logo itself nested perfectly within glowing bounds */}
                <div className="relative w-52 h-52 sm:w-[280px] sm:h-[280px] bg-slate-950/60 backdrop-blur-sm rounded-full p-8 flex items-center justify-center border border-slate-800 shadow-2xl">
                  <RetailcoreLogo className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </header>

      {/* Core Strengths Bento Section */}
      <section id="core-values" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] tracking-widest font-mono text-slate-400 uppercase rounded-full">
              CORE BLUEPRINTS
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-black text-white mt-4 mb-4">
              Pristine Architecture Solutions
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
              We remove the friction points of Sri Lankan retail. Seamless cloud integrations, dual-channel caching, and rapid cash-register mechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((val, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all hover:-translate-y-1 group"
              >
                <div className={`p-3.5 rounded-xl ${val.bg} ${val.color} w-fit group-hover:scale-105 transition-transform duration-300`}>
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-display mt-5 mb-2.5">{val.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POS Sandbox Interactive Section (POS terminal + Cloud feed) */}
      <section id="demo-terminal" className="py-24 bg-slate-950 border-t border-b border-slate-900 relative">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-16">
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] tracking-widest font-mono text-slate-400 uppercase rounded-full">
              Interactive Testflight
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-black text-white mt-4 mb-4">
              Experience the POS Terminal Sandbox
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-sm leading-relaxed">
              Touch the items below in our simulated Cash Register. Compile an invoice, select the payment method, and watch how cloud synchronization transfers sales metrics instantly into the SaaS telemetry.
            </p>
          </div>

          {/* Connected Grid (POS Terminal + Live Cloud View) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* POS client */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  💡 SANDBOX INSTRUCTIONS
                </span>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  1. Click any item (e.g. Ceylon Tea, Kandy sculptures) inside the Left Catalog panel. <br />
                  2. Review VAT calculations and click <strong>"Charge & Transmit Sync"</strong>.<br />
                  3. Verify thermal printed receipt output and note the live cloud synchronization transmission!
                </p>
              </div>
              <POSTerminal onSaleCompleted={handleSaleCompleted} brandColor={brandColor} />
            </div>

            {/* Cloud Server metrics */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  💻 TELEMETRY TELEGRAPH
                </span>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  These metrics update dynamically in real-time each time you complete a checkout on the left. Toggle Sri Lankan district branches below to inspect segmented SaaS indices.
                </p>
              </div>
              <AnalyticsDashboard salesTotal={salesTotalHistory} transactionsCount={transactionCount} brandColor={brandColor} />
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Calculator Section */}
      <section id="calculator" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4">
              <span className={`px-2.5 py-1 ${themes.bgBadge} text-xs font-bold uppercase tracking-widest rounded-lg`}>
                Lankan SME Projections
              </span>
              <h2 className="text-4xl font-display font-black text-white mt-4 mb-4">
                Platform Profitability
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Most cashier drawers lose 3-5% of inventory revenue due to poor billing synchronization, tax errors, or pilfering. Retailcore Lanka locks these leaks instantly in our centralized cloud ledger.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-1">✓</div>
                  <p className="text-xs text-slate-300">Prevent checkout shrinkage entirely</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-1">✓</div>
                  <p className="text-xs text-slate-300">Eliminate time spent on midnight stock audit balance</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-1">✓</div>
                  <p className="text-xs text-slate-300">Accurate integrated VAT reports in LKR</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ROICalculator brandColor={brandColor} />
            </div>

          </div>
        </div>
      </section>

      {/* Sri Lankan Testimonials Section */}
      <section id="testimonials" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-display font-black text-white">Loved by High-Growth Lankan Merchants</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed mt-4">
              From Colombo multi-store fashion chains to tea bungalows in Nuwara Eliya, our system powers checkout speeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Switching to Retailcore Lanka systems lowered blockages at our billing registers. The cloud sync is solid; we monitor stock metrics directly from our laptop anywhere.",
                author: "Owner",
                role: "Guruge Stores",
                location: "Tissa Road, Ranna",
                stars: "⭐⭐⭐⭐⭐"
              },
              {
                quote: "Before Retailcore, manual inventory tallying after hours was a nightmare for our staff. Now, stock levels reduce automatically as bills are scanned. Truly game-changing POS software.",
                author: "Proprietor",
                role: "Peacock Handlooms",
                location: "Kandy Fort",
                stars: "⭐⭐⭐⭐⭐"
              },
              {
                quote: "Managing a hardware store involves tracking thousands of items and handling fast checkouts. The POS system from Retailcore Lanka handles our cash and card transactions seamlessly. The robust inventory tracking and daily billing reports have made running the shop incredibly efficient.",
                author: "Owner",
                role: "Dasa Hardware",
                location: "Hungama road, Middeniya",
                stars: "⭐⭐⭐⭐⭐"
              }
            ].map((test, i) => (
              <div key={i} className="bg-slate-900/40 p-8 rounded-2xl border border-slate-900/80 hover:border-slate-800 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-sm block mb-4">{test.stars}</span>
                  <p className="text-slate-300 text-xs italic leading-relaxed">"{test.quote}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{test.author}</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">{test.role}</p>
                  </div>
                  <span className="text-[9px] font-mono tracking-wider font-bold text-slate-500 uppercase">{test.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Booking Form Section */}
      <section id="demo-form" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className={`px-2.5 py-1 ${themes.bgBadge} text-[10px] font-mono tracking-widest uppercase rounded-lg`}>
                Enterprise Inquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-4 mb-4">
                Schedule Personal Demo
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Connect with our systems architects. We visit your boutique, configure customized hardware terminals, and map secure cloud accounts suited to your branch workflow.
              </p>
            </div>

            <form onSubmit={handleSubmitDemo} className="space-y-6">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center text-white"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold font-display uppercase tracking-wider text-emerald-400">Request Received</h4>
                  <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                    Thank you! Our systems engineers in Colombo will schedule your consultation shortly. A custom configuration brief has been generated for your business profile.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">Contact Person Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Priyantha Perera"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-slate-700 rounded-xl px-4 py-3.5 text-xs text-white outline-none transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">Work Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="priyantha@myretail.lk"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-slate-700 rounded-xl px-4 py-3.5 text-xs text-white outline-none transition-all"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">Mobile Phone (e.g. Dialog/Mobitel) *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+94 (77) 123-4567"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-slate-700 rounded-xl px-4 py-3.5 text-xs text-white outline-none transition-all"
                    />
                  </div>

                  {/* Business Type Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">Business Category</label>
                    <div className="relative">
                      <select 
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-slate-700 rounded-xl px-4 py-3.5 text-xs text-white outline-none appearance-none transition-all"
                      >
                        <option value="supermarket">Groceries &amp; Supermarket</option>
                        <option value="tea">Ceylon Tea Outlet</option>
                        <option value="clothing">Clothing &amp; Sarong Handlooms</option>
                        <option value="multi-branch">Restaurant / Food Chain</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Multi-node branch description */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">Consolidated Core Setup Brief</label>
                    <textarea 
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please note down specific hardware requests or if you intend to link existing accounting ERP programs..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-slate-700 rounded-xl p-4 text-xs text-white outline-none transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className={`w-full py-4 bg-gradient-to-r ${themes.bgGradient} ${themes.bgGradientHover} text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer uppercase text-xs tracking-widest`}
                    >
                      <Send className="w-4 h-4" /> Transmit Demo Registration
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footprint Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Info and dynamic logo */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <RetailcoreLogo className="w-8 h-8 pointer-events-none" />
                <span className="text-lg font-display font-black tracking-tight text-white uppercase">
                  Retailcore <span className={`${themes.accent} italic`}>Lanka</span>
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                The business engages in software development, including the design and implementation of Point of Sale (POS) systems, along with providing cloud-based Software-as-a-Service (SaaS) solutions to clients on a subscription basis, system customization, technical support, and IT consultancy services.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-4">SaaS Solutions</h5>
              <ul className="space-y-3">
                <li><a href="#demo-terminal" className="hover:text-white transition-colors">Cashier Register POS</a></li>
                <li><a href="#analytics" className="hover:text-white transition-colors">Real-time Sales Index</a></li>
                <li><a href="#core-values" className="hover:text-white transition-colors">Offline Database cache</a></li>
                <li><a href="#calculator" className="hover:text-white transition-colors">LKR VAT Ledgering</a></li>
              </ul>
            </div>

            {/* Column 3: Colombo HQ */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-4">Colombo HQ Office</h5>
              <p className="leading-relaxed text-[11px] text-slate-500">
                RETAILCORE LANKA<br />
                WEERAKETIYA ROAD, MIDDENIYA<br />
                SRI LANKA
              </p>
              <p className="mt-2 text-[10px] text-slate-400">
                📧 engineering@retailcorelanka.lk<br />
                📞 +94 (71) 1012190
              </p>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-4">Stay Upgraded</h5>
              <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">Join our retail network for monthly performance reports and firmware releases.</p>
              <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-full">
                <input 
                  type="email" 
                  placeholder="name@company.lk" 
                  className="bg-transparent text-xs text-white px-3 py-1 bg-none border-none outline-none flex-1 min-w-0" 
                />
                <button className={`px-4 py-2 bg-gradient-to-r ${themes.bgGradient} text-white rounded-full font-bold cursor-pointer hover:opacity-90`}>
                  Join
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
            <p>&copy; {new Date().getFullYear()} RETAILCORE LANKA (PVT) LTD. ALL RIGHTS RESERVED REGISTERED SME.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">TERMS OF SALE</a>
              <a href="#" className="hover:text-white">CLOUD SLA AGREEMENT</a>
              <a href="#" className="hover:text-white">LANKA SECURE GUARANTEE</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
