// app/estimator/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, MapPin, Wrench, Shield, Check } from "lucide-react";

export default function EstimatorPage() {
  const router = useRouter();
  const [segment, setSegment] = useState("sedan");
  const [modType, setModType] = useState("wrap");
  const [tier, setTier] = useState("mid");
  const [city, setCity] = useState("mumbai");

  // Pricing values registry
  const pricingData: Record<string, { min: number, avg: number, prem: number, labor: number, time: string, warranty: string }> = {
    wrap: { min: 45000, avg: 75000, prem: 130000, labor: 15000, time: "3 Days", warranty: "5 Years" },
    exhaust: { min: 25000, avg: 55000, prem: 120000, labor: 8000, time: "1 Day", warranty: "3 Years" },
    tuning: { min: 18000, avg: 35000, prem: 75000, labor: 4000, time: "4 Hours", warranty: "Lifetime" },
    wheels: { min: 30000, avg: 60000, prem: 150000, labor: 2000, time: "2 Hours", warranty: "2 Years" },
    suspension: { min: 35000, avg: 70000, prem: 160000, labor: 12000, time: "2 Days", warranty: "3 Years" }
  };

  const calculateEstimate = () => {
    const data = pricingData[modType];
    if (!data) return { min: 0, avg: 0, prem: 0, base: 0, labor: 0, gst: 0, total: 0 };

    let multiplier = 1.0;
    if (segment === "hatchback") multiplier = 0.8;
    if (segment === "suv") multiplier = 1.25;
    if (segment === "luxury") multiplier = 1.8;

    const min = Math.round(data.min * multiplier);
    const avg = Math.round(data.avg * multiplier);
    const prem = Math.round(data.prem * multiplier);

    let base = avg;
    if (tier === "budget") base = min;
    if (tier === "premium") base = prem;

    const labor = Math.round(data.labor * (segment === "luxury" ? 1.5 : 1));
    const gst = Math.round(base * 0.18);
    const total = base + labor + gst;

    return { min, avg, prem, base, labor, gst, total, time: data.time, warranty: data.warranty };
  };

  const results = calculateEstimate();

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">Modification Cost Estimator</h2>
        <p className="text-text-secondary text-xs mt-0.5">Audit itemized billing predictions including parts, labor, and taxes across India.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        {/* Left form details */}
        <div className="glass-panel p-5 rounded-md space-y-4">
          <h3 className="text-sm font-bold text-white mb-2">Configure Parameters</h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Car Segment</label>
              <select 
                value={segment} 
                onChange={(e) => setSegment(e.target.value)}
                className="bg-white/4 border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-accent-blue"
              >
                <option value="hatchback" className="bg-bg-secondary">Hatchback (Swift, i20, Altroz)</option>
                <option value="sedan" className="bg-bg-secondary">Sedan / Compact SUV (City, Verna, Creta)</option>
                <option value="suv" className="bg-bg-secondary">Large SUV / 4x4 (Thar, Scorpio-N, Harrier)</option>
                <option value="luxury" className="bg-bg-secondary">Luxury Supercar (BMW, Porsche, Audi)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Modification Category</label>
              <select 
                value={modType} 
                onChange={(e) => setModType(e.target.value)}
                className="bg-white/4 border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-accent-blue"
              >
                <option value="wrap" className="bg-bg-secondary">Full Body Gloss/Matte Vinyl Wrap</option>
                <option value="exhaust" className="bg-bg-secondary">High-Flow Catback Exhaust System</option>
                <option value="tuning" className="bg-bg-secondary">Stage 1 or Stage 2 ECU Tuning Remaps</option>
                <option value="wheels" className="bg-bg-secondary">Premium Upgraded Alloy Wheels</option>
                <option value="suspension" className="bg-bg-secondary">Coilovers Suspension Lowering / Lift Kit</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Quality Tier</label>
              <select 
                value={tier} 
                onChange={(e) => setTier(e.target.value)}
                className="bg-white/4 border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-accent-blue"
              >
                <option value="budget" className="bg-bg-secondary">Budget Level (Chinese Unbranded)</option>
                <option value="mid" className="bg-bg-secondary">Mid-Range Tier (3M, Avery, H&R)</option>
                <option value="premium" className="bg-bg-secondary">Premium Boutique (BBS, Akrapovic, Bilstein)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Location</label>
              <select 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="bg-white/4 border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-accent-blue"
              >
                <option value="mumbai" className="bg-bg-secondary">Mumbai</option>
                <option value="delhi" className="bg-bg-secondary">Delhi NCR</option>
                <option value="bengaluru" className="bg-bg-secondary">Bengaluru</option>
                <option value="hyderabad" className="bg-bg-secondary">Hyderabad</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right billing estimates */}
        <div className="glass-panel p-5 rounded-md space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white">Itemized Quote Prediction</h3>
            <span className="text-[10px] text-text-muted uppercase tracking-wider block mt-1">Estimations offset by vehicle multipliers</span>
          </div>

          {/* Three Tier box checks */}
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => setTier("budget")}
              className={`p-3 border rounded-sm text-center flex flex-col items-center justify-center transition-all ${
                tier === "budget" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Budget Tier</span>
              <strong className="text-sm mt-1">₹{results.min?.toLocaleString("en-IN")}</strong>
            </button>
            
            <button 
              onClick={() => setTier("mid")}
              className={`p-3 border rounded-sm text-center flex flex-col items-center justify-center transition-all ${
                tier === "mid" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Average Rate</span>
              <strong className="text-sm mt-1">₹{results.avg?.toLocaleString("en-IN")}</strong>
            </button>

            <button 
              onClick={() => setTier("premium")}
              className={`p-3 border rounded-sm text-center flex flex-col items-center justify-center transition-all ${
                tier === "premium" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Boutique Premium</span>
              <strong className="text-sm mt-1">₹{results.prem?.toLocaleString("en-IN")}</strong>
            </button>
          </div>

          {/* Detailed breakdown billing rows */}
          <div className="space-y-3.5 text-xs text-text-secondary">
            <div className="flex justify-between">
              <span>Equipment / Parts Fee:</span>
              <strong className="text-white">₹{results.base?.toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex justify-between">
              <span>Garage Installation Labor:</span>
              <strong className="text-white">₹{results.labor?.toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex justify-between">
              <span>GST (18% Service Tax):</span>
              <strong className="text-white">₹{results.gst?.toLocaleString("en-IN")}</strong>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-3.5 text-sm">
              <span className="font-bold text-white">Total Expected Billing Quote:</span>
              <strong className="text-accent-blue">₹{results.total?.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          {/* Logistics summary details */}
          <div className="p-3 bg-white/2 border border-white/5 rounded-sm flex gap-6 text-[11px] text-text-muted justify-between">
            <div>Duration: <strong className="text-white">{results.time}</strong></div>
            <div>Warranty Coverage: <strong className="text-white">{results.warranty}</strong></div>
          </div>

          <button 
            onClick={() => router.push("/directory")}
            className="w-full bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-bold py-3.5 rounded-sm flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Compare Local Shop Quotes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
