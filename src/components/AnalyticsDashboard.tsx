import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { 
  BarChart3, 
  TrendingUp, 
  Layers, 
  Activity, 
  MapPin, 
  Package, 
  RefreshCcw, 
  Users, 
  Clock, 
  ArrowUpRight 
} from "lucide-react";

import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip as RechartsTooltip, Cell } from "recharts";

interface AnalyticsDashboardProps {
  salesTotal: number;
  transactionsCount: number;
  brandColor: "blue" | "red" | "orange";
}

export function AnalyticsDashboard({ salesTotal, transactionsCount, brandColor }: AnalyticsDashboardProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [livePulse, setLivePulse] = useState<number>(0);

  // Auto trigger minor pulse state to mimic real-time network traffic
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePulse(prev => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Preset data for different branches
  const BRANCHES = [
    { id: "all", name: "All Lanka Consolidated", revenueMultiplier: 1.0, activeTerminals: 18, customers: 3450 },
    { id: "colombo", name: "Colombo 03 Flagship", revenueMultiplier: 0.55, activeTerminals: 8, customers: 1620 },
    { id: "kandy", name: "Kandy Lakeview Hub", revenueMultiplier: 0.25, activeTerminals: 4, customers: 980 },
    { id: "galle", name: "Galle Fort Boutique", revenueMultiplier: 0.20, activeTerminals: 6, customers: 850 },
  ];

  const currentBranch = BRANCHES.find(b => b.id === selectedBranch) || BRANCHES[0];

  // Colors config based on selected brand color of the Retailcore Ceylon logo
  const config = {
    blue: {
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      gradient: "from-blue-600 to-indigo-600",
      hex: "#3b82f6",
      fill: "fill-blue-500/20",
    },
    red: {
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      gradient: "from-rose-600 to-red-600",
      hex: "#f43f5e",
      fill: "fill-rose-500/20",
    },
    orange: {
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      gradient: "from-orange-500 to-amber-600",
      hex: "#f97316",
      fill: "fill-orange-500/20",
    },
  }[brandColor];

  // Dynamic values calculated based on multiplier
  const baseRevenue = 284500 + salesTotal;
  const displayRevenue = Math.round(baseRevenue * currentBranch.revenueMultiplier);
  const baseSalesVolume = 125 + transactionsCount;
  const displayVolume = Math.round(baseSalesVolume * currentBranch.revenueMultiplier);

    // Generate deterministic dummy data based on branch properties
    const resolvedHourlyData = useMemo(() => {
      let seed = 0;
      for (let i = 0; i < currentBranch.id.length; i++) {
        seed += currentBranch.id.charCodeAt(i);
      }
      
      const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      const hours = ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];
      
      // Random weights for distribution
      const weights = hours.map(() => 0.5 + random());
      const sumWeights = weights.reduce((a, b) => a + b, 0);
      
      return hours.map((hour, i) => {
        const weight = weights[i] / sumWeights;
        return {
          showLabel: hour.split(" ")[0],
          amount: Math.round(weight * displayRevenue),
          qty: Math.round(weight * displayVolume),
          visitors: Math.round(weight * currentBranch.customers)
        };
      });
    }, [currentBranch.id, currentBranch.customers, displayRevenue, displayVolume]);

    const maxAmount = Math.max(...resolvedHourlyData.map(h => h.amount));

    const VIBRANT_COLORS = ['#fbbf24', '#f97316', '#ef4444', '#ec4899', '#a855f7', '#6366f1', '#3b82f6', '#10b981'];


  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />
      
      {/* Header of SaaS Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-indigo-900/40 text-indigo-400 border border-indigo-800/60 rounded-full text-[10px] uppercase font-mono tracking-wider font-bold">
              Cloud Core Center
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 font-mono">Live Sync Engine: Connected</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold font-display text-white mt-1">Real-time SaaS Hub</h3>
        </div>

        {/* Branch Selector Toggles */}
        <div className="flex flex-wrap gap-2">
          {BRANCHES.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBranch(b.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                selectedBranch === b.id 
                  ? "bg-slate-800 text-white border border-slate-700 shadow-lg" 
                  : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 opacity-60" />
                {b.name.split(" ")[0]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Core Stats Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* STAT 1: Cloud Store Revenue */}
        <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Lanka Total Revenue</span>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500 text-xs flex items-center gap-1 font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> +14.8%
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-white mt-3 leading-tight">
            Rs. {displayRevenue.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
            <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold">Encrypted DB Upload</span>
          </div>
          {/* Subtle vector background curve */}
          <div className="absolute bottom-0 inset-x-0 h-10 overflow-hidden opacity-40">
            <svg viewBox="0 0 100 20" className="w-full h-full">
              <path d="M0,20 Q15,5 30,12 T60,5 T90,15 T100,5 L100,20 L0,20" fill={config.hex} className="fill-emerald-500/25" />
            </svg>
          </div>
        </div>

        {/* STAT 2: Transactions Count */}
        <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Consolidated Invoices</span>
            <div className="p-2 bg-indigo-500/10 rounded-full text-indigo-400">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-white mt-3 leading-tight">
            {displayVolume.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
            <Clock className="w-3 h-3" /> Average checkout: 42s
          </div>
        </div>

        {/* STAT 3: Active Terminal Nodes */}
        <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Terminal Nodes Online</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold tracking-wider">
              ONLINE
            </span>
          </div>
          <p className="text-3xl font-extrabold font-mono text-white mt-3 leading-tight">
            {currentBranch.activeTerminals} / 25
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
            <Users className="w-3 h-3 text-slate-400" />
            {currentBranch.customers} visitors today
          </div>
        </div>

        {/* STAT 4: Peak Activity Factor */}
        <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">SaaS Cloud Sync Health</span>
            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500 text-xs font-bold">
              100%
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-white mt-3 leading-tight">
            99.98%
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
            <RefreshCcw className="w-3 h-3 text-slate-400 animate-spin" style={{ animationDuration: "6s" }} />
            Replica active across 4 DCs
          </div>
        </div>
      </div>

      {/* Main Bar Chart - Revenue Hourly Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales charts vector */}
        <div className="lg:col-span-8 bg-slate-950/50 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-400 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-slate-500" /> Hourly Operational Volume
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Real-time revenue transmission intervals in LKR</p>
              </div>
              <span className={`text-xs px-2.5 py-1 ${config.bg} ${config.color} border ${config.border} rounded-lg font-bold flex items-center gap-1.5`}>
                <Layers className="w-3 h-3" /> Live Graph
              </span>
            </div>

            {/* Recharts Line Graph */}
            <div className="h-[210px] w-full pt-4 relative z-10 border-b border-slate-800 pb-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resolvedHourlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <XAxis 
                    dataKey="showLabel" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                    dy={10}
                  />
                  <RechartsTooltip 
                    cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 2, strokeDasharray: '4 4' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white text-slate-900 border border-slate-200 px-3 py-2 rounded-lg text-[10px] font-bold font-mono shadow-xl whitespace-nowrap">
                            <div className="text-sm mb-1" style={{ color: payload[0].color || VIBRANT_COLORS[0] }}>
                              Rs. {data.amount.toLocaleString()}
                            </div>
                            <div className="text-slate-500">{data.qty} Invoices</div>
                            <div className="text-slate-500 mt-1">{data.visitors} Visitors</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone"
                    dataKey="amount" 
                    stroke={config.hex}
                    strokeWidth={3}
                    dot={{ fill: config.hex, strokeWidth: 2, r: 4, stroke: '#1e293b' }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Left pane: Inventory status / alerts */}
        <div className="lg:col-span-4 bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-400 flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-slate-500" /> Core Stock Analytics
            </h4>

            {/* List of critical low inventory alerts */}
            <div className="space-y-4">
              {[
                { name: "Ceylon Tea Special", stock: 12, alert: "critical", color: "bg-rose-500/20 text-rose-400" },
                { name: "Cinnamon Tubes (50g)", stock: 34, alert: "warning", color: "bg-amber-500/20 text-amber-400" },
                { name: "Brass Sculptures", stock: 6, alert: "critical", color: "bg-rose-500/20 text-rose-400" },
                { name: "Peacock Traditional Masks", stock: 89, alert: "optimal", color: "bg-emerald-500/20 text-emerald-400" },
              ].map((stock, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800/60 hover:bg-slate-900/80 transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{stock.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Alert profile: {stock.alert}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] px-2.5 py-1 ${stock.color} font-mono font-bold tracking-wide rounded-lg`}>
                      {stock.stock} Left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/60">
            <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all outline-none">
              Auto Procurement Config <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
