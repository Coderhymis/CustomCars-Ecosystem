// app/visualizer/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ThreeVisualizer from "@/components/ThreeVisualizer";
import { 
  Palette, Disc, ArrowDown, ChevronRight, GitCommit, GitBranch, Terminal,
  Sparkles, Calendar, Play, Pause, AlertCircle, Wrench, Shield, CheckCircle2, Zap, Sliders
} from "lucide-react";

interface CommitLog {
  hash: string;
  message: string;
  date: string;
}

function VisualizerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Extract query parameters for the Digital Twin
  const brand = searchParams.get("brand") || "Hyundai";
  const model = searchParams.get("model") || "Creta (2024)";
  const variant = searchParams.get("variant") || "SX(O) DCT";
  const initialColor = searchParams.get("color") || "#0c0d12";
  const initialColorName = searchParams.get("colorName") || "Abyss Black";
  const carType = searchParams.get("type") || "suv";

  // Visualizer configuration states
  const [color, setColor] = useState(initialColor);
  const [colorName, setColorName] = useState(initialColorName);
  const [paintFinish, setPaintFinish] = useState("glossy");
  const [wheels, setWheels] = useState("alloy");
  const [spoiler, setSpoiler] = useState("none");
  const [suspension, setSuspension] = useState("normal");
  const [neonColor, setNeonColor] = useState("off");
  const [headlightsActive, setHeadlightsActive] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [activeTab, setActiveTab] = useState("wrap");

  // Git states
  const [commitMessage, setCommitMessage] = useState("");
  const [commits, setCommits] = useState<CommitLog[]>([]);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalProgress, setTerminalProgress] = useState(0);

  // Sync color changes if URL updates
  useEffect(() => {
    if (searchParams.get("color")) {
      setColor(searchParams.get("color")!);
      setColorName(searchParams.get("colorName")!);
    }
  }, [searchParams]);

  // Load Git Commits from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("twinCommits");
    if (saved) {
      setCommits(JSON.parse(saved));
    } else {
      const defaultCommits: CommitLog[] = [
        { hash: "7df1a3b", message: "chore: initialized digital twin base setup", date: "4 days ago" },
        { hash: "4c8d9e2", message: `style(paint): set default factory paint to ${initialColorName}`, date: "3 days ago" }
      ];
      setCommits(defaultCommits);
      localStorage.setItem("twinCommits", JSON.stringify(defaultCommits));
    }
  }, [initialColorName]);

  // Generate automated commit message based on active setup
  useEffect(() => {
    let msg = `feat(twin): style=${paintFinish} color=${colorName.toLowerCase()}`;
    if (wheels !== "alloy") msg += ` wheels=${wheels}`;
    if (spoiler !== "none") msg += ` spoiler=${spoiler}`;
    if (suspension !== "normal") msg += ` suspension=${suspension}`;
    if (neonColor !== "off") msg += ` underglow=${neonColor}`;
    
    setCommitMessage(msg);
  }, [paintFinish, colorName, wheels, spoiler, suspension, neonColor]);

  // Color options
  const colorPresets = [
    { value: "#0066ff", name: "Electric Blue" },
    { value: "#ff3333", name: "Crimson Red" },
    { value: "#10b981", name: "Acid Green" },
    { value: "#0c0d12", name: "Abyss Black" },
    { value: "#f3f4f6", name: "Atlas White" },
    { value: "#f59e0b", name: "Speed Gold" },
    { value: "#8b5cf6", name: "Royal Velvet Purple" },
    { value: "#ff00ff", name: "Liquid Hot Pink" },
    { value: "#475569", name: "Battleship Grey" },
  ];

  // Dynamic calculations for itemized parts
  const getSelectedPartsList = () => {
    const list = [];
    
    // 1. Vinyl Wrap / Paint Finish
    let wrapPrice = 65000;
    if (paintFinish === "matte") wrapPrice = 82000;
    if (paintFinish === "chrome") wrapPrice = 135000;
    list.push({
      category: "Premium Vinyl Wrap",
      part: `${colorName} (${paintFinish.toUpperCase()})`,
      brand: paintFinish === "chrome" ? "Inozetek Supergloss" : "Avery Dennison Supreme",
      price: wrapPrice,
      compatibility: `100% custom fit for ${model}`,
      legality: "RTO Endorsement Required"
    });

    // 2. Wheels
    if (wheels === "alloy") {
      list.push({
        category: "Alloy Wheels",
        part: "BBS Multi-Spoke Alloys (19\")",
        brand: "BBS Germany",
        price: 120000,
        compatibility: `Exact Bolt Pattern Match (5x114.3)`,
        legality: "RTO Compliant"
      });
    } else if (wheels === "chrome") {
      list.push({
        category: "Chrome Wheels",
        part: "Chrome Monoblock 5-Spoke (20\")",
        brand: "Vossen Forged",
        price: 160000,
        compatibility: `Fender Roll Recommended`,
        legality: "RTO Compliant"
      });
    } else if (wheels === "beadlock") {
      list.push({
        category: "Offroad Wheels",
        part: "Rugged Beadlock Offroad Rims (17\")",
        brand: "Fuel Offroad",
        price: 95000,
        compatibility: `High Load Rating Match`,
        legality: "Offroad / Trail Only"
      });
    } else if (wheels === "deepdish") {
      list.push({
        category: "Tuner Wheels",
        part: "JDM Deep Dish Rims (18\")",
        brand: "Work Meister S1",
        price: 145000,
        compatibility: `Requires Stretch Tires`,
        legality: "Track / Offroad Only"
      });
    }

    // 3. Spoiler Wing
    if (spoiler === "sports") {
      list.push({
        category: "Rear Wing",
        part: "Carbon fiber Trunk Ducktail",
        brand: "Seibon Carbon",
        price: 32000,
        compatibility: `Chassis Bolt-On Mounted`,
        legality: "100% Legal"
      });
    } else if (spoiler === "gt") {
      list.push({
        category: "Rear Wing",
        part: "Track-Spec High Raised GT Spoiler",
        brand: "Voltex Racing",
        price: 68000,
        compatibility: `Requires Trunk Reinforcement`,
        legality: "Track Only (Height Warning)"
      });
    }

    // 4. Suspension
    if (suspension === "lowered") {
      list.push({
        category: "Coilover Suspension",
        part: "Sport Lowering Springs (-30mm)",
        brand: "Eibach Pro-Kit",
        price: 42000,
        compatibility: `OEM Strut Damper Compatible`,
        legality: "RTO Compliant"
      });
    } else if (suspension === "raised") {
      list.push({
        category: "Lift Kit Suspension",
        part: "Tough Dog 2-Inch Suspension Lift",
        brand: "Tough Dog Australia",
        price: 75000,
        compatibility: `Requires Extended Brake Lines`,
        legality: "RTO Endorsement Required"
      });
    }

    // 5. Neon Underglow
    if (neonColor !== "off") {
      list.push({
        category: "Chassis Lighting",
        part: `Neon Underglow System (${neonColor.toUpperCase()})`,
        brand: "OPT7 Aura Pro",
        price: 15000,
        compatibility: `12V DC Relay Fuse Harness`,
        legality: "Offroad / Show Use Only"
      });
    }

    return list;
  };

  const selectedParts = getSelectedPartsList();
  const totalCost = selectedParts.reduce((acc, curr) => acc + curr.price, 0);

  // Auto-calculated compatibility warnings
  const getLegalitySummary = () => {
    const hasTrackOnly = selectedParts.some(p => p.legality.includes("Track") || p.legality.includes("Offroad"));
    const needsEndorsement = selectedParts.some(p => p.legality.includes("RTO Endorsement"));
    
    if (hasTrackOnly) {
      return { text: "Track/Offroad Parts (Non-Street Legal)", color: "text-accent-red bg-accent-red/5 border-accent-red/20", iconColor: "text-accent-red" };
    }
    if (needsEndorsement) {
      return { text: "Street Legal (RTO Endorsement Required)", color: "text-accent-yellow bg-accent-yellow/5 border-accent-yellow/20", iconColor: "text-accent-yellow" };
    }
    return { text: "100% Street Legal & RTO Compliant", color: "text-accent-green bg-accent-green/5 border-accent-green/20", iconColor: "text-accent-green" };
  };

  const legalitySummary = getLegalitySummary();

  const handleRequestBids = () => {
    const params = new URLSearchParams({
      brand,
      model,
      variant,
      color,
      colorName,
      type: carType,
      wheels,
      spoiler,
      suspension,
      paintFinish,
      neonColor,
      headlightsActive: headlightsActive ? "true" : "false",
      totalCost: totalCost.toString(),
      partsCount: selectedParts.length.toString()
    }).toString();

    router.push(`/bids?${params}`);
  };

  // Simulated Terminal Git Commit workflow
  const handleGitCommit = () => {
    if (!commitMessage.trim()) return;

    setTerminalVisible(true);
    setTerminalProgress(0);
    setTerminalLines(["$ git add twin-blueprint.json", "Staging modifications blueprint..."]);

    const script = [
      { t: 1000, l: `$ git commit -m "${commitMessage}"` },
      { t: 1800, l: `[main ${Math.random().toString(36).substring(2, 9)}] ${commitMessage}` },
      { t: 2400, l: ` 4 files changed, partsCost=${totalCost}, RTO_status=checked` },
      { t: 3000, l: "$ git push origin main" },
      { t: 3600, l: "Uploading pack contents..." },
      { t: 4200, l: "Writing objects: 100% (4/4), done." },
      { t: 4800, l: "To github.com/arjun-das/my-garage-twin.git" },
      { t: 5400, l: "   e4d2a9f..b8c3f1d  main -> main" },
      { t: 6000, l: "✔ Success! Build successfully pushed to RideCanvas cloud repository." }
    ];

    script.forEach((step) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, step.l]);
        setTerminalProgress((prev) => prev + 12);
      }, step.t);
    });

    setTimeout(() => {
      // Add commit to history list
      const newCommit: CommitLog = {
        hash: Math.random().toString(36).substring(2, 9),
        message: commitMessage,
        date: "Just now"
      };
      const updatedCommits = [newCommit, ...commits];
      setCommits(updatedCommits);
      localStorage.setItem("twinCommits", JSON.stringify(updatedCommits));

      // Close terminal
      setTimeout(() => {
        setTerminalVisible(false);
      }, 1500);

    }, 6600);
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-110px)] overflow-hidden">
      {/* Page Title & Vehicle Summary Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Sliders className="w-5 h-5 text-accent-blue" />
            <span>Digital Twin Configurator Studio</span>
          </h2>
          <p className="text-text-secondary text-xs mt-0.5 font-medium">
            Active Digital Twin: <strong className="text-text-primary">{brand} {model}</strong> ({variant} Trim)
          </p>
        </div>

        <div className={`flex items-center gap-2 border px-3.5 py-2 rounded-sm text-xs font-bold ${legalitySummary.color}`}>
          <AlertCircle className="w-4 h-4" />
          <span>{legalitySummary.text}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 flex-grow overflow-hidden min-h-0">
        
        {/* Left WebGL Configurator Canvas Panel */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          <div className="flex-grow min-h-[380px] md:min-h-[420px] rounded-lg overflow-hidden relative border border-border shadow-2xl">
            <ThreeVisualizer 
              color={color} 
              wheels={wheels} 
              spoiler={spoiler} 
              suspension={suspension} 
              isDriving={isDriving} 
              type={carType}
              paintFinish={paintFinish}
              neonColor={neonColor}
              headlightsActive={headlightsActive}
            />
            
            {/* Driving simulation HUD controls overlay */}
            <div className="absolute bottom-4 left-4 z-10 flex gap-2">
              <button 
                onClick={() => setHeadlightsActive(!headlightsActive)}
                className={`bg-bg-secondary/90 border backdrop-blur-md text-xs font-bold px-3 py-2.5 rounded-md flex items-center gap-2 transition-all duration-300 ${
                  headlightsActive 
                    ? "border-accent-blue text-accent-blue shadow-lg shadow-accent-blue/10" 
                    : "border-border text-text-secondary hover:text-text-primary"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Headlights: {headlightsActive ? "ON" : "OFF"}</span>
              </button>
            </div>

            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button 
                onClick={() => setIsDriving(!isDriving)}
                className="bg-bg-secondary/90 border border-border backdrop-blur-md hover:bg-bg-primary text-text-primary text-xs font-bold px-4 py-2.5 rounded-md flex items-center gap-2 transition-all duration-300"
              >
                {isDriving ? <Pause className="w-3.5 h-3.5 text-accent-red" /> : <Play className="w-3.5 h-3.5 text-accent-green" />}
                <span>{isDriving ? "Park Car" : "Drive Simulation"}</span>
              </button>
            </div>
          </div>

          {/* Dynamic Interactive Parts Checklist */}
          <div className="glass-panel p-5 rounded-lg border border-border space-y-4">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Wrench className="w-4 h-4 text-accent-blue" />
              <span>Blueprint Configured Parts Checklist</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-text-muted pb-2">
                    <th className="font-bold py-2">Category</th>
                    <th className="font-bold py-2">Retrofitted Part Spec</th>
                    <th className="font-bold py-2">Manufacturer Brand</th>
                    <th className="font-bold py-2">Legality</th>
                    <th className="font-bold py-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  {selectedParts.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2.5 font-semibold text-text-primary">{item.category}</td>
                      <td className="py-2.5">{item.part}</td>
                      <td className="py-2.5">
                        <span className="text-[9px] uppercase font-bold tracking-wide bg-bg-primary border border-border rounded-sm px-1.5 py-0.5 inline-block mt-1">
                          {item.brand}
                        </span>
                      </td>
                      <td className={`py-2.5 text-[11px] font-semibold ${
                        item.legality.includes("Track") || item.legality.includes("Offroad") 
                          ? "text-accent-red" 
                          : item.legality.includes("RTO") 
                            ? "text-accent-yellow" 
                            : "text-accent-green"
                      }`}>{item.legality}</td>
                      <td className="py-2.5 font-bold text-text-primary text-right">₹{item.price.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right side configurator options panel */}
        <div className="glass-panel rounded-lg p-5 flex flex-col h-full overflow-hidden border border-border">
          {/* Tab Selection */}
          <div className="flex border-b border-border mb-5 text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => setActiveTab("wrap")}
              className={`flex-1 text-center pb-3 border-b-2 ${activeTab === "wrap" ? "border-accent-blue text-text-primary font-bold" : "border-transparent text-text-muted"}`}
            >
              Wrap
            </button>
            <button 
              onClick={() => setActiveTab("parts")}
              className={`flex-1 text-center pb-3 border-b-2 ${activeTab === "parts" ? "border-accent-blue text-text-primary font-bold" : "border-transparent text-text-muted"}`}
            >
              Hardware
            </button>
            <button 
              onClick={() => setActiveTab("git")}
              className={`flex-1 text-center pb-3 border-b-2 ${activeTab === "git" ? "border-accent-blue text-text-primary font-bold" : "border-transparent text-text-muted"}`}
            >
              Version Git
            </button>
          </div>

          {/* Interactive controls items */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-1">
            {activeTab === "wrap" && (
              <div className="space-y-5">
                
                {/* 1. Paint Color presets */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Select Vinyl Wrap Color</span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {colorPresets.map((preset) => (
                      <button 
                        key={preset.value}
                        onClick={() => {
                          setColor(preset.value);
                          setColorName(preset.name);
                        }}
                        className={`h-11 rounded-sm border-2 flex items-center justify-center transition-all duration-300 ${
                          color === preset.value ? "border-text-primary scale-105 shadow-xl" : "border-transparent hover:scale-102"
                        }`}
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-text-secondary block mt-1">Active Color: <strong className="text-text-primary">{colorName}</strong></span>
                </div>

                {/* 2. Paint Finish types */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Vinyl Wrap Material Finish</span>
                  <div className="grid grid-cols-3 gap-2">
                    {["glossy", "matte", "chrome"].map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setPaintFinish(finish)}
                        className={`p-2 rounded-sm border text-[11px] font-bold uppercase tracking-wide text-center transition-all duration-300 ${
                          paintFinish === finish
                            ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm"
                            : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Underglow lights */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Neon Underglow Colors</span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {["off", "blue", "red", "green", "purple"].map((glow) => (
                      <button
                        key={glow}
                        onClick={() => setNeonColor(glow)}
                        className={`py-2 rounded-sm border text-[10px] font-bold uppercase text-center transition-all duration-300 ${
                          neonColor === glow
                            ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm"
                            : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                        }`}
                      >
                        {glow}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {activeTab === "parts" && (
              <div className="space-y-6">
                
                {/* Wheels select */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Retrofit Wheels Upgrade</span>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setWheels("alloy")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        wheels === "alloy" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-primary">BBS Multi-Spoke Alloys</span>
                        <span className="text-[9px] text-text-muted">Brand: BBS Germany</span>
                      </div>
                      <span className="text-[10px] text-accent-blue font-bold">+₹1,20,000</span>
                    </button>
                    <button 
                      onClick={() => setWheels("chrome")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        wheels === "chrome" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-primary">Chrome Monoblock 5-Spoke</span>
                        <span className="text-[9px] text-text-muted">Brand: Vossen Forged</span>
                      </div>
                      <span className="text-[10px] text-accent-blue font-bold">+₹1,60,000</span>
                    </button>
                    <button 
                      onClick={() => setWheels("beadlock")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        wheels === "beadlock" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-primary">Rugged Offroad Beadlocks</span>
                        <span className="text-[9px] text-text-muted">Brand: Fuel Offroad</span>
                      </div>
                      <span className="text-[10px] text-accent-blue font-bold">+₹95,000</span>
                    </button>
                    <button 
                      onClick={() => setWheels("deepdish")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        wheels === "deepdish" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-primary">JDM Deep Dish Rims</span>
                        <span className="text-[9px] text-text-muted">Brand: Work Meister</span>
                      </div>
                      <span className="text-[10px] text-accent-blue font-bold">+₹1,45,000</span>
                    </button>
                  </div>
                </div>

                {/* Spoiler Wing */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Aerodynamic Rear Spoiler Wing</span>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setSpoiler("none")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        spoiler === "none" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <span className="text-xs font-semibold text-text-primary">OEM Factory Stock Trunk Lip</span>
                      <span className="text-[10px] text-text-muted font-bold">₹0</span>
                    </button>
                    <button 
                      onClick={() => setSpoiler("sports")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        spoiler === "sports" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-primary">Carbon Ducktail Wing</span>
                        <span className="text-[9px] text-text-muted">Brand: Seibon Carbon</span>
                      </div>
                      <span className="text-[10px] text-accent-blue font-bold">+₹32,000</span>
                    </button>
                    <button 
                      onClick={() => setSpoiler("gt")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        spoiler === "gt" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-primary">Track-Spec Raised GT Wing</span>
                        <span className="text-[9px] text-text-muted">Brand: Voltex Racing</span>
                      </div>
                      <span className="text-[10px] text-accent-blue font-bold">+₹68,000</span>
                    </button>
                  </div>
                </div>

                {/* Suspension setup */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Suspension Coilovers</span>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setSuspension("normal")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        suspension === "normal" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <span className="text-xs font-semibold text-text-primary">OEM Stock Suspension</span>
                      <span className="text-[10px] text-text-muted font-bold">₹0</span>
                    </button>
                    <button 
                      onClick={() => setSuspension("lowered")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        suspension === "lowered" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-primary">Sport Lowering Springs (-30mm)</span>
                        <span className="text-[9px] text-text-muted">Brand: Eibach</span>
                      </div>
                      <span className="text-[10px] text-accent-blue font-bold">+₹42,000</span>
                    </button>
                    <button 
                      onClick={() => setSuspension("raised")}
                      className={`p-3 rounded-sm text-left border flex justify-between items-center transition-all duration-300 ${
                        suspension === "raised" ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" : "border-border bg-bg-secondary text-text-secondary hover:bg-bg-primary"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-primary">2-Inch Lift Kit Coilovers</span>
                        <span className="text-[9px] text-text-muted">Brand: Tough Dog</span>
                      </div>
                      <span className="text-[10px] text-accent-blue font-bold">+₹75,000</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {activeTab === "git" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
                  <GitBranch className="w-4 h-4 text-accent-blue" />
                  <span>Branch: <strong className="text-text-primary">main</strong></span>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Commit Message</label>
                  <input
                    type="text"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Enter commit message..."
                    className="w-full bg-bg-secondary border border-border rounded-sm p-3 text-xs text-text-primary outline-none focus:border-accent-blue/50"
                  />
                </div>

                <button
                  onClick={handleGitCommit}
                  className="w-full bg-bg-secondary hover:bg-bg-primary border border-border text-text-primary text-xs font-bold py-3 rounded-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <GitCommit className="w-4 h-4 text-accent-blue" />
                  <span>Commit Build Version</span>
                </button>

                {/* Commits List log */}
                <div className="space-y-3.5 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">Twin Git Commit History</span>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {commits.map((c, i) => (
                      <div key={i} className="p-3 bg-bg-secondary border border-border rounded-sm flex items-center justify-between text-xs transition-all">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold text-accent-blue uppercase tracking-wide bg-accent-blue/10 border border-accent-blue/20 rounded-sm px-1.5">
                              {c.hash}
                            </span>
                            <span className="text-[10px] text-text-muted">{c.date}</span>
                          </div>
                          <p className="text-text-primary font-medium">{c.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Total build footer */}
          <div className="border-t border-border pt-4 mt-4 space-y-4 bg-bg-secondary">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">Estimated Parts & Wrap Cost:</span>
              <strong className="text-lg text-accent-blue">₹{totalCost.toLocaleString("en-IN")}</strong>
            </div>

            <button 
              onClick={handleRequestBids}
              className="w-full bg-gradient-to-r from-accent-blue to-blue-800 hover:from-accent-blue-hover hover:to-blue-700 text-white text-xs font-bold py-3.5 rounded-sm flex items-center justify-center gap-2 shadow-md shadow-accent-blue/15 hover:shadow-accent-blue/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Zap className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
              <span>Get Shop Bids (Reverse Auction)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sleek Terminal overlay for Git commit process */}
      {terminalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="glass-panel w-full max-w-xl p-5 border border-border rounded-lg space-y-4 bg-bg-secondary shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5 text-accent-blue" />
                <span className="font-bold text-text-primary">RideCanvas Terminal (Git Engine)</span>
              </div>
              <span className="text-[10px] text-text-muted font-bold font-mono">v1.0.2-twin</span>
            </div>

            {/* Terminal log panel */}
            <div className="h-60 bg-bg-primary border border-border rounded-sm p-4 font-mono text-xs text-text-secondary space-y-2 overflow-y-auto leading-relaxed select-none">
              {terminalLines.map((line, i) => (
                <div key={i} className="flex gap-2">
                  {line.startsWith("$") ? (
                    <span className="text-accent-blue">&gt;</span>
                  ) : (
                    <span className="text-text-muted">#</span>
                  )}
                  <p className={line.startsWith("✔") ? "text-accent-green font-bold" : ""}>{line}</p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden border border-border">
              <div 
                className="bg-accent-blue h-full transition-all duration-500 rounded-full shadow-lg shadow-accent-blue/20"
                style={{ width: `${Math.min(terminalProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VisualizerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Loading Car Twin Design Parameters...</div>}>
      <VisualizerContent />
    </Suspense>
  );
}
