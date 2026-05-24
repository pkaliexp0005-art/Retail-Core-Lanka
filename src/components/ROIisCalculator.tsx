import { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Hourglass, Landmark, TrendingUp, HandCoins } from "lucide-react";

interface ROICalculatorProps {
  brandColor: "blue" | "red" | "orange";
}

export function ROICalculator({ brandColor }: ROICalculatorProps) {
  const [branches, setBranches] = useState<number>(1);
  const [dailySales, setDailySales] = useState<number>(50); // transactions per branch

  // Calculation parameters relative to average Lankan SME
  const avgSmeTicketPrice = 2800; // Rs.
  const hoursSavedPerBranchOnAudit = 40; // hours per month
  const leakageSavedRatio = 0.035; // 3.5% revenue recovered from stock pilferage

  // Output calculations
  const monthlyTransactions = dailySales * 30 * branches;
  const estimatedMonthlySales = monthlyTransactions * avgSmeTicketPrice;
  const hoursRecovered = branches * hoursSavedPerBranchOnAudit;
  const leakageRecoveredAmount = estimatedMonthlySales * leakageSavedRatio;
  const returnMultiplier = 6.2; // 620% standard SaaS ROI

  // Theme profiles to map perfectly to the colors of the user's logo
  const config = {
    blue: {
      sliderBg: "accent-blue-600",
      accentText: "text-blue-500",
      bgLight: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    red: {
      sliderBg: "accent-rose-600",
      accentText: "text-rose-500",
      bgLight: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
    orange: {
      sliderBg: "accent-orange-500",
      accentText: "text-orange-500",
      bgLight: "bg-orange-500/10",
      border: "border-orange-500/20",
    }
  }[brandColor];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className={`w-5 h-5 ${config.accentText}`} />
        <h4 className="text-sm uppercase tracking-wider font-bold font-mono text-slate-400">Retailcore Efficiency Index</h4>
      </div>

      <h3 className="text-2xl font-bold font-display text-white leading-snug mb-2">Estimate Your Lanka ROI</h3>
      <p className="text-xs text-slate-400 leading-relaxed mb-8">
        Slide to match your current retail footprint in Sri Lanka and watch how digital POS cloud synchronization helps you recover lost revenue.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Sliders Input (Left, 5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-end text-xs">
              <span className="text-slate-300 font-semibold uppercase tracking-wider text-[10px]">Active Storefronts / Branches</span>
              <span className={`text-sm font-bold font-mono ${config.accentText}`}>{branches} {branches === 15 ? "15+ Max" : "Stores"}</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={15} 
              value={branches} 
              onChange={(e) => setBranches(Number(e.target.value))}
              className={`w-full ${config.sliderBg} h-1.5 bg-slate-800 rounded-full cursor-pointer appearance-none transition-all`}
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 Boutique Store</span>
              <span>15+ Large Chain</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end text-xs">
              <span className="text-slate-300 font-semibold uppercase tracking-wider text-[10px]">Daily Invoices per Store</span>
              <span className={`text-sm font-bold font-mono ${config.accentText}`}>{dailySales} txs/day</span>
            </div>
            <input 
              type="range" 
              min={10} 
              max={250} 
              step={10}
              value={dailySales} 
              onChange={(e) => setDailySales(Number(e.target.value))}
              className={`w-full ${config.sliderBg} h-1.5 bg-slate-800 rounded-full cursor-pointer appearance-none transition-all`}
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Low Volume</span>
              <span>Busy Supermarket</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
            📌 Calculations are calibrated against standard Retailcore SLA benchmarks including live stock tracking, reduced invoice checkout, VAT reconciliation, and multi-user privilege guards.
          </div>
        </div>

        {/* Dynamic Calculations Display (Right, 7 cols) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Box 1: Time saved */}
          <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 w-fit">
                <Hourglass className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-[10px] mt-3">Monthly Personnel Reclaimed</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold font-mono text-white mt-4">{hoursRecovered} Hours</p>
              <p className="text-[10px] text-slate-500 mt-1">Equivalent to {(hoursRecovered / 8).toFixed(1)} workdays reallocated</p>
            </div>
          </div>

          {/* Box 2: Leakage recovered */}
          <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 w-fit">
                <HandCoins className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-[10px] mt-3">Shrinkage &amp; Leakage Savings</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold font-mono text-emerald-400 mt-4 leading-tight">
                Rs. {Math.round(leakageRecoveredAmount).toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Direct cash retained from stock loss</p>
            </div>
          </div>

          {/* Box 3: Estimated Sales processed */}
          <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
                <Landmark className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-[10px] mt-3">Projected Annual Volume</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold font-mono text-white mt-4 leading-tight">
                Rs. {Math.round(estimatedMonthlySales * 12).toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Secured transaction cloud-routing</p>
            </div>
          </div>

          {/* Box 4: Total ROI multiplier */}
          <div className={`border ${config.border} ${config.bgLight} p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-sm`}>
            <div>
              <div className="p-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-mono tracking-widest rounded-lg font-bold w-fit">
                SaaS Impact
              </div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider text-[10px] mt-3">ROI Index Factor</p>
            </div>
            <div>
              <p className="text-4xl font-black font-mono text-white mt-4 flex items-baseline gap-1">
                {returnMultiplier}x
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </p>
              <p className="text-[10px] text-slate-300 mt-1">Predicted revenue generation return</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
