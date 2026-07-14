// app/visualizer/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ThreeVisualizer from "@/components/ThreeVisualizer";
import { 
  Palette, Disc, ArrowDown, ChevronRight, 
  Sparkles, Calendar, Play, Pause, AlertCircle 
} from "lucide-react";

export default function VisualizerPage() {
  const router = useRouter();
  
  // Visualizer configuration parameters
  const [color, setColor] = useState("#0066ff");
  const [colorName, setColorName] = useState("Electric Blue");
  const [wheels, setWheels] = useState("alloy");
  const [spoiler, setSpoiler] = useState("none");
  const [suspension, setSuspension] = useState("normal");
  const [isDriving, setIsDriving] = useState(false);
  const [activeTab, setActiveTab] = useState("presets");

  // Cost estimates
  let totalCost = 65000; // wrap cost
  if (wheels === "alloy") totalCost += 120000;
  if (wheels === "chrome") totalCost += 160000;
  if (wheels === "beadlock") totalCost += 95000;
  if (wheels === "deepdish") totalCost += 145000;

  if (spoiler === "sports") totalCost += 32000;
  if (spoiler === "gt") totalCost += 68000;

  if (suspension === "lowered") totalCost += 42000;
  if (suspension === "raised") totalCost += 75000;

  // Compatibility and safety scores
  const getScores = () => {
    if (suspension === "lowered" && wheels === "beadlock") {
      return { compatibility: "45%", resale: "38/100", legality: "Illegal", status: "red" };
    }
    if (suspension === "lowered" || spoiler === "gt") {
      return { compatibility: "95%", resale: "72/100", legality: "Track-Only", status: "blue" };
    }
    return { compatibility: "100%", resale: "88/100", legality: "100% Legal", status: "green" };
  };

  const scores = getScores();

  const colorPresets = [
    { value: "#0066ff", name: "Electric Blue" },
    { value: "#ff3333", name: "Crimson Red" },
    { value: "#10b981", name: "Acid Green" },
    { value: "#0a0a0c", name: "Matte Obsidian" },
    { value: "#ffffff", name: "Pearl Satin White" },
    { value: "#f59e0b", name: "Speed Gold" },
    { value: "#8b5cf6", name: "Royal Velvet Purple" },
    { value: "#ff00ff", name: "Liquid Hot Pink" },
    { value: "#475569", name: "Battleship Grey" },
  ];

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-110px)] overflow-hidden">
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">AI Car Visualizer</h2>
        <p className="text-text-secondary text-xs mt-0.5">Customize your vehicle parts Procedurally in WebGL, verifying compatibility warnings and resale impact in real time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 flex-grow overflow-hidden min-h-0">
        {/* Left WebGL Configurator Canvas */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          <div className="flex-grow min-h-[380px] md:min-h-[420px] rounded-lg overflow-hidden relative">
            <ThreeVisualizer 
              color={color} 
              wheels={wheels} 
              spoiler={spoiler} 
              suspension={suspension} 
              isDriving={isDriving} 
            />
            
            {/* Driving simulation HUD controls */}
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button 
                onClick={() => setIsDriving(!isDriving)}
                className="bg-bg-secondary/80 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white text-xs font-bold px-4 py-2.5 rounded-sm flex items-center gap-2"
              >
                {isDriving ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isDriving ? "Park Vehicle" : "Simulate Drive"}</span>
              </button>
            </div>
          </div>

          {/* Dynamic AI Compatibility Warning Metrics */}
          <div className="glass-panel p-5 rounded-md">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent-blue" />
              <span>AI Parts Compatibility & Depreciation Forecast</span>
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/2 border border-white/5 p-4 rounded-md text-center flex flex-col items-center justify-center">
                <span className={`text-xl font-bold ${scores.status === "red" ? "text-accent-red" : "text-accent-green"}`}>
                  {scores.compatibility}
                </span>
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider mt-1">Parts Match</span>
              </div>
              
              <div className="bg-white/2 border border-white/5 p-4 rounded-md text-center flex flex-col items-center justify-center">
                <span className={`text-xl font-bold ${scores.status === "red" ? "text-accent-red" : "text-accent-blue"}`}>
                  {scores.resale}
                </span>
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider mt-1">Resale Score</span>
              </div>

              <div className="bg-white/2 border border-white/5 p-4 rounded-md text-center flex flex-col items-center justify-center">
                <span className={`text-xl font-bold ${
                  scores.status === "red" 
                    ? "text-accent-red" 
                    : scores.status === "blue" 
                      ? "text-accent-blue" 
                      : "text-accent-green"
                }`}>
                  {scores.legality}
                </span>
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider mt-1">RTO Legality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side controls panel */}
        <div className="glass-panel rounded-md p-5 flex flex-col h-full overflow-hidden">
          {/* Menu Tab selectors */}
          <div className="flex border-b border-white/10 mb-5 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab("presets")}
              className={`flex-1 text-center pb-3 border-b-2 ${activeTab === "presets" ? "border-accent-blue text-accent-blue" : "border-transparent text-text-muted"}`}
            >
              Presets
            </button>
            <button 
              onClick={() => setActiveTab("parts")}
              className={`flex-1 text-center pb-3 border-b-2 ${activeTab === "parts" ? "border-accent-blue text-accent-blue" : "border-transparent text-text-muted"}`}
            >
              Parts
            </button>
            <button 
              onClick={() => setActiveTab("wrap")}
              className={`flex-1 text-center pb-3 border-b-2 ${activeTab === "wrap" ? "border-accent-blue text-accent-blue" : "border-transparent text-text-muted"}`}
            >
              Wrap Paint
            </button>
          </div>

          {/* Interactive controls content */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-1">
            {activeTab === "presets" && (
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Template Car Models</span>
                <div className="p-3 bg-accent-blue/10 border border-accent-blue rounded-sm flex items-center gap-3 cursor-pointer">
                  <div className="w-9 h-9 rounded-sm bg-accent-blue flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Porsche 911 GT3 (992)</span>
                    <span className="text-[10px] text-text-muted">Luxury Sportscar Template</span>
                  </div>
                </div>
                <div className="p-3 bg-white/2 border border-white/5 hover:bg-white/5 rounded-sm flex items-center gap-3 cursor-pointer">
                  <div className="w-9 h-9 rounded-sm bg-white/5 flex items-center justify-center text-text-secondary"><Sparkles className="w-4 h-4" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Mahindra Thar Roxx</span>
                    <span className="text-[10px] text-text-muted">Offroad SUV Template</span>
                  </div>
                </div>
                <div className="p-3 bg-white/2 border border-white/5 hover:bg-white/5 rounded-sm flex items-center gap-3 cursor-pointer">
                  <div className="w-9 h-9 rounded-sm bg-white/5 flex items-center justify-center text-text-secondary"><Sparkles className="w-4 h-4" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Maruti Swift Sport</span>
                    <span className="text-[10px] text-text-muted">Hot Hatch Tuner Template</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "parts" && (
              <div className="space-y-6">
                {/* Wheels select */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Alloy Wheels</span>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setWheels("alloy")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${wheels === "alloy" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">BBS Multi-Spoke Alloys</span>
                      <span className="text-[10px] text-text-muted font-bold">+₹1,20,000</span>
                    </button>
                    <button 
                      onClick={() => setWheels("chrome")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${wheels === "chrome" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">Chrome Monoblock 5-Spoke</span>
                      <span className="text-[10px] text-text-muted font-bold">+₹1,60,000</span>
                    </button>
                    <button 
                      onClick={() => setWheels("beadlock")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${wheels === "beadlock" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">Rugged Offroad Beadlocks</span>
                      <span className="text-[10px] text-text-muted font-bold">+₹95,000</span>
                    </button>
                    <button 
                      onClick={() => setWheels("deepdish")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${wheels === "deepdish" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">JDM Deep Dish Rims</span>
                      <span className="text-[10px] text-text-muted font-bold">+₹1,45,000</span>
                    </button>
                  </div>
                </div>

                {/* Spoiler Wing */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Aerodynamic Spoiler Wing</span>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setSpoiler("none")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${spoiler === "none" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">Factory Stock Trunk Lip</span>
                      <span className="text-[10px] text-text-muted font-bold">₹0</span>
                    </button>
                    <button 
                      onClick={() => setSpoiler("sports")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${spoiler === "sports" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">Carbon Ducktail Aero Wing</span>
                      <span className="text-[10px] text-text-muted font-bold">+₹32,000</span>
                    </button>
                    <button 
                      onClick={() => setSpoiler("gt")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${spoiler === "gt" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">Track-Spec Raised GT Wing</span>
                      <span className="text-[10px] text-text-muted font-bold">+₹68,000</span>
                    </button>
                  </div>
                </div>

                {/* Suspension setup */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Suspension Coilovers</span>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setSuspension("normal")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${suspension === "normal" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">OEM Stock Suspension</span>
                      <span className="text-[10px] text-text-muted font-bold">₹0</span>
                    </button>
                    <button 
                      onClick={() => setSuspension("lowered")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${suspension === "lowered" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">Sport Lowering Springs (-30mm)</span>
                      <span className="text-[10px] text-text-muted font-bold">+₹42,000</span>
                    </button>
                    <button 
                      onClick={() => setSuspension("raised")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center ${suspension === "raised" ? "border-accent-blue bg-accent-blue/5 text-white" : "border-white/10 bg-white/2 text-text-secondary"}`}
                    >
                      <span className="text-xs font-semibold">Tough Dog 2-Inch Lift Kit</span>
                      <span className="text-[10px] text-text-muted font-bold">+₹75,000</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wrap" && (
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Select Vinyl Wrap Finish</span>
                <div className="grid grid-cols-3 gap-3">
                  {colorPresets.map((preset) => (
                    <button 
                      key={preset.value}
                      onClick={() => {
                        setColor(preset.value);
                        setColorName(preset.name);
                      }}
                      className={`h-12 rounded-sm border-2 flex items-center justify-center ${color === preset.value ? "border-white shadow-lg" : "border-transparent"}`}
                      style={{ backgroundColor: preset.value }}
                      title={preset.name}
                    />
                  ))}
                </div>

                <div className="p-3 bg-white/2 border border-white/5 rounded-sm space-y-1 mt-4 text-[11px] leading-relaxed">
                  <div>Active Wrap Paint: <strong className="text-accent-blue">{colorName}</strong></div>
                  <div>Vinyl Vendor Brand: <strong>Avery Dennison Supreme</strong></div>
                  <div>Warranty Guarantee: <strong>5 Years (Sun Damage protection)</strong></div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Total build footer */}
          <div className="border-t border-white/10 pt-4 mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">Estimated Build Quote:</span>
              <strong className="text-lg text-accent-blue">₹{totalCost.toLocaleString("en-IN")}</strong>
            </div>

            <button 
              onClick={() => router.push("/directory")}
              className="w-full bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-bold py-3.5 rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-accent-blue/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Slot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
