import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export function RetailcoreLogo({ className = "w-12 h-12", animate = true }: LogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="Retailcore Lanka Logo" 
      className={`${className} object-contain select-none`}
    />
  );
}

export function LogoText({ themeColor = "blue" }: { themeColor?: "blue" | "red" | "orange" }) {
  const accentClass = {
    blue: "text-blue-500",
    red: "text-rose-500",
    orange: "text-orange-500",
  }[themeColor];

  return (
    <div className="flex flex-col">
      <span className="text-2xl font-display font-bold tracking-tight text-white leading-tight uppercase">
        Retailcore <span className={`${accentClass} italic font-extrabold transition-colors duration-500`}>Lanka</span>
      </span>
      <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
        POS &amp; cloud systems
      </span>
    </div>
  );
}
