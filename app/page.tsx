// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Eye, ShieldCheck, DollarSign, Percent, ArrowRight, Car, Sliders, Check } from "lucide-react";

// Car database containing top brands, models, and variants in India
const brandDatabase = [
  { id: "hyundai", name: "Hyundai", logo: "H", models: [
      { id: "creta", name: "Creta (2024)", type: "suv", variants: ["SX(O) DCT", "SX Tech", "S(O) IVT"], colors: [
        { name: "Abyss Black", hex: "#0c0d12" },
        { name: "Atlas White", hex: "#f3f4f6" },
        { name: "Ranger Khaki", hex: "#5b5f54" }
      ]},
      { id: "i20", name: "i20 N Line", type: "hatchback", variants: ["N8 DCT", "N6 MT"], colors: [
        { name: "Thunder Blue", hex: "#1e3a8a" },
        { name: "Fiery Red", hex: "#b91c1c" },
        { name: "Shadow Grey", hex: "#4b5563" }
      ]}
    ]
  },
  { id: "mahindra", name: "Mahindra", logo: "M", models: [
      { id: "thar", name: "Thar Roxx (5-Door)", type: "suv", variants: ["AX7L Diesel 4WD", "MX5 Petrol", "MX3 Automatic"], colors: [
        { name: "Stealth Black", hex: "#111827" },
        { name: "Everest White", hex: "#f9fafb" },
        { name: "Deep Forest Green", hex: "#14532d" }
      ]},
      { id: "xuv700", name: "XUV700", type: "suv", variants: ["AX7 Luxury AWD", "AX5 Diesel", "MX"], colors: [
        { name: "Midnight Black", hex: "#030712" },
        { name: "Electric Blue", hex: "#2563eb" },
        { name: "Dazzling Silver", hex: "#d1d5db" }
      ]}
    ]
  },
  { id: "porsche", name: "Porsche", logo: "P", models: [
      { id: "911", name: "911 GT3 (992)", type: "coupe", variants: ["GT3 RS", "GT3 Touring", "Standard"], colors: [
        { name: "Shark Blue", hex: "#0066ff" },
        { name: "Guards Red", hex: "#dc2626" },
        { name: "GT Silver Metallic", hex: "#9ca3af" }
      ]}
    ]
  },
  { id: "maruti", name: "Maruti Suzuki", logo: "S", models: [
      { id: "swift", name: "Swift Sport", type: "hatchback", variants: ["ZXI+ AMT", "ZXI MT", "VXI"], colors: [
        { name: "Sizzling Red", hex: "#e11d48" },
        { name: "Splendid Silver", hex: "#6b7280" },
        { name: "Pearl Arctic White", hex: "#f8fafc" }
      ]}
    ]
  },
  { id: "tata", name: "Tata Motors", logo: "T", models: [
      { id: "nexon", name: "Nexon EV (2024)", type: "suv", variants: ["Empowered + LR", "Fearless + MR", "Creative +"], colors: [
        { name: "Empowered Oxide", hex: "#e2e8f0" },
        { name: "Intense Teal", hex: "#0f766e" },
        { name: "Flame Red", hex: "#be123c" }
      ]}
    ]
  }
];

export default function Home() {
  const router = useRouter();
  
  // Selection Wizard States
  const [selectedBrand, setSelectedBrand] = useState(brandDatabase[0]);
  const [selectedModel, setSelectedModel] = useState(brandDatabase[0].models[0]);
  const [selectedVariant, setSelectedVariant] = useState(brandDatabase[0].models[0].variants[0]);
  const [selectedColor, setSelectedColor] = useState(brandDatabase[0].models[0].colors[0]);

  const handleBrandChange = (brand: typeof brandDatabase[0]) => {
    setSelectedBrand(brand);
    setSelectedModel(brand.models[0]);
    setSelectedVariant(brand.models[0].variants[0]);
    setSelectedColor(brand.models[0].colors[0]);
  };

  const handleModelChange = (model: typeof brandDatabase[0]["models"][0]) => {
    setSelectedModel(model);
    setSelectedVariant(model.variants[0]);
    setSelectedColor(model.colors[0]);
  };

  const handleLaunch = () => {
    const query = new URLSearchParams({
      brand: selectedBrand.name,
      model: selectedModel.name,
      variant: selectedVariant,
      color: selectedColor.hex,
      colorName: selectedColor.name,
      type: selectedModel.type
    }).toString();
    
    router.push(`/visualizer?${query}`);
  };

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Interactive Hero Configurator Init Wizard */}
      <section className="relative rounded-md overflow-hidden py-12 md:py-16 px-6 md:px-12 flex flex-col items-center bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent border border-border">
        <div className="inline-flex items-center gap-2 bg-bg-secondary border border-border px-4 py-1.5 rounded-full text-xs font-bold text-accent-blue mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent-red animate-pulse" />
          <span>Vehicle Digital Twin Creator</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-primary max-w-4xl text-center leading-tight mb-4">
          Create Your Car's <span className="bg-gradient-to-r from-text-primary to-accent-blue bg-clip-text text-transparent">Digital Twin.</span>
        </h1>

        <p className="text-text-secondary text-xs md:text-sm max-w-2xl text-center leading-relaxed mb-8">
          Select your manufacturer, exact model generation, and variant to build your vehicle's 3D twin. Design retrofitted body kits, coilovers, and wraps before requesting custom bids.
        </p>

        {/* Apple-style Wizard Panel */}
        <div className="w-full max-w-4xl glass-panel p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Brand Select */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">1. Brand</label>
              <div className="grid grid-cols-2 gap-2 h-44 overflow-y-auto pr-1">
                {brandDatabase.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandChange(brand)}
                    className={`p-3 rounded-sm border text-left flex flex-col gap-0.5 transition-all duration-300 ${
                      selectedBrand.id === brand.id 
                        ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" 
                        : "border-border bg-bg-secondary hover:bg-bg-primary text-text-secondary"
                    }`}
                  >
                    <span className="text-xs">{brand.name}</span>
                    <span className="text-[9px] text-text-muted">{brand.models.length} Models</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Model Select */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">2. Model & Segment</label>
              <div className="grid grid-cols-1 gap-2 h-44 overflow-y-auto pr-1">
                {selectedBrand.models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(model)}
                    className={`p-3 rounded-sm border text-left flex justify-between items-center transition-all duration-300 ${
                      selectedModel.id === model.id 
                        ? "border-accent-blue bg-accent-blue/5 text-text-primary font-bold shadow-sm" 
                        : "border-border bg-bg-secondary hover:bg-bg-primary text-text-secondary"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs">{model.name}</span>
                      <span className="text-[9px] text-text-muted uppercase font-bold tracking-wider">{model.type}</span>
                    </div>
                    <Car className="w-4 h-4 text-text-muted" />
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Variant & Base Paint */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">3. Variant Trim</label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full bg-bg-secondary border border-border rounded-sm p-2.5 text-xs text-text-primary outline-none focus:border-accent-blue/50"
                >
                  {selectedModel.variants.map((v) => (
                    <option key={v} value={v} className="bg-bg-secondary text-text-primary">{v}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">4. Stock Paint</label>
                <div className="flex gap-2.5 flex-wrap">
                  {selectedModel.colors.map((c) => {
                    const isActive = selectedColor.hex === c.hex;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-full border-2 relative flex items-center justify-center transition-all duration-300 ${
                          isActive ? "border-text-primary scale-110 shadow-lg" : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {isActive && <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />}
                      </button>
                    );
                  })}
                </div>
                <span className="text-[10px] text-text-muted block mt-1">Color: {selectedColor.name}</span>
              </div>
            </div>

          </div>

          <div className="border-t border-border pt-5 mt-2 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Sliders className="w-4 h-4 text-accent-blue" />
              <span>Initialized Twin: <strong>{selectedBrand.name} {selectedModel.name} {selectedVariant}</strong></span>
            </div>

            <button
              onClick={handleLaunch}
              className="w-full md:w-auto bg-accent-blue hover:bg-accent-blue-hover text-white font-bold text-xs px-8 py-3.5 rounded-sm shadow-md shadow-accent-blue/10 hover:shadow-accent-blue/20 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>Initialize 3D Twin Configurator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary">How RideCanvas Works</h2>
          <p className="text-text-secondary text-sm mt-2 max-w-xl mx-auto">We shift modifications control back to the driver. Create design blueprints, generate bids, and secure work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel glass-panel-interactive p-6 rounded-md">
            <div className="w-11 h-11 bg-bg-secondary border border-border rounded-sm flex items-center justify-center text-accent-blue mb-5">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Digital Twin Configurator</h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Design suspension stance, wheel sets, carbon wings, and satin wraps procedurally in standard WebGL before placing a single order.
            </p>
          </div>

          <div className="glass-panel glass-panel-interactive p-6 rounded-md">
            <div className="w-11 h-11 bg-bg-secondary border border-border rounded-sm flex items-center justify-center text-accent-blue mb-5">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Reverse Bidding</h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Instead of requesting quotes individually, verified local custom shops compete for your exact blueprint build in real-time auctions.
            </p>
          </div>

          <div className="glass-panel glass-panel-interactive p-6 rounded-md">
            <div className="w-11 h-11 bg-bg-secondary border border-border rounded-sm flex items-center justify-center text-accent-blue mb-5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">Warranty Guard</h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Every installer on RideCanvas is audited for certified liability insurance and provides direct, transparent warranty contracts.
            </p>
          </div>

          <div className="glass-panel glass-panel-interactive p-6 rounded-md">
            <div className="w-11 h-11 bg-bg-secondary border border-border rounded-sm flex items-center justify-center text-accent-blue mb-5">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2">EMI Co-Financing</h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Convert the final winning bid into flexible zero-cost EMI plans with instant approvals directly integrated into your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Banner Callout */}
      <section className="glass-panel rounded-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-border">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-text-primary leading-tight">Vetted Customization Studios compete for your build.</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            See actual bids roll in with estimated installation timelines, parts warranty, and direct technician booking logs. Compare profiles and choose your fit.
          </p>
          <div className="flex gap-8 border-l-2 border-accent-blue pl-6">
            <div>
              <span className="text-xl md:text-2xl font-bold text-text-primary">48+</span>
              <p className="text-[10px] text-text-muted font-bold uppercase">Verified Garages</p>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold text-text-primary">₹2.4Cr+</span>
              <p className="text-[10px] text-text-muted font-bold uppercase">Bids Completed</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 rounded-md overflow-hidden border border-border shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" 
            alt="Custom car" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-semibold text-white">Featured Project: AMG Coupe Metallic Satin Green Wrap & BBS Rims</span>
          </div>
        </div>
      </section>
    </div>
  );
}
