// app/page.tsx
import Link from "next/link";
import { Sparkles, Eye, ShieldCheck, DollarSign, Percent, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden py-16 md:py-24 px-6 md:px-12 flex flex-col items-center text-center bg-gradient-to-b from-accent-blue/10 via-transparent to-transparent border border-white/5">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-accent-blue mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent-red animate-pulse" />
          <span>Venture-Scale Customization Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6">
          Design Your Dream Car <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-white to-accent-blue bg-clip-text text-transparent">Before Spending a Rupee.</span>
        </h1>

        <p className="text-text-secondary text-sm md:text-base max-w-2xl leading-relaxed mb-10">
          Discover vetted customization studios, audit real-time itemized pricing catalogs, design models in interactive 3D WebGL configurators, and finance your build directly through EMI plans.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 z-10">
          <Link
            href="/visualizer"
            className="bg-accent-blue hover:bg-accent-blue-hover text-white font-bold text-sm px-8 py-4 rounded-sm shadow-xl shadow-accent-blue/20 hover:shadow-accent-blue/45 transition-all duration-150 flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span>Customize Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/directory"
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-sm px-8 py-4 rounded-sm transition-all duration-150"
          >
            Explore Shops
          </Link>
        </div>

        {/* Hero Specs summary */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 bg-white/2 backdrop-blur-md border border-white/10 rounded-full px-8 md:px-16 py-4">
          <div className="flex flex-col items-center">
            <span className="text-lg md:text-2xl font-bold text-white">48+</span>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Verified Shops</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg md:text-2xl font-bold text-white">1200+</span>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Builds Saved</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg md:text-2xl font-bold text-white">₹0</span>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Commission</span>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Solving Modification Pain Points</h2>
          <p className="text-text-secondary text-sm mt-2 max-w-xl mx-auto">We provide transparency, safety, and modern WebGL visualizers for India's modification marketplace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel glass-panel-interactive p-6 rounded-md">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-accent-blue mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Visualizations</h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Finetune wraps, suspension height adjustments, aero packages, and titanium exhaust systems live in a WebGL configurator before making payments.
            </p>
          </div>

          <div className="glass-panel glass-panel-interactive p-6 rounded-md">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-accent-blue mb-5">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Hidden Markup Fees</h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Verify calculations across average tiers, luxury boutique studios, and economy options, detailing installation labor and 18% GST invoice components.
            </p>
          </div>

          <div className="glass-panel glass-panel-interactive p-6 rounded-md">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-accent-blue mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Unverified Garages</h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Every shop is audit-vetted for verified GST registrations, corporate liability insurance, qualified technician teams, and real warranty programs.
            </p>
          </div>

          <div className="glass-panel glass-panel-interactive p-6 rounded-md">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-accent-blue mb-5">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Financing</h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              Convert modification estimates into customizable zero-cost EMIs with instant bank loan pre-approvals directly in your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Banner Callout */}
      <section className="glass-panel rounded-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-white leading-tight">Compare local customization quotes instantly.</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Scan through hundreds of verified shop listings with active portfolios, draggable before/after sliders, customer reviews, and direct communication widgets.
          </p>
          <div className="flex gap-8 border-l-2 border-accent-red pl-6">
            <div>
              <span className="text-xl md:text-2xl font-bold text-white">500+</span>
              <p className="text-[10px] text-text-muted font-semibold uppercase">Build Portfolios</p>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold text-white">₹2.4Cr+</span>
              <p className="text-[10px] text-text-muted font-semibold uppercase">Total Financing Authorized</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 rounded-md overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" 
            alt="Custom car" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-semibold text-white">Featured Build: AMG Coupe Metallic Satin Green PPF wrap</span>
          </div>
        </div>
      </section>
    </div>
  );
}
