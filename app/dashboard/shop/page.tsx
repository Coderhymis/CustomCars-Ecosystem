// app/dashboard/shop/page.tsx
"use client";

import { Banknote, CheckSquare, Clock, Star, Landmark, Shield, BarChart3 } from "lucide-react";

export default function ShopDashboard() {
  const requests = [
    { name: "Aman Gupta", details: "Swift Full body wrap (Matte Black)", date: "July 18, 2026", deposit: "₹5,000 paid" },
    { name: "Rajesh Nair", details: "TDI ECU Stage 1 Remap", date: "July 20, 2026", deposit: "₹5,000 paid" }
  ];

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">Garage Studio Panel</h2>
        <p className="text-text-secondary text-xs mt-0.5">Approve incoming schedule slots, monitor corporate commission splits, and track monthly sales charts.</p>
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">July Revenue</span>
            <h3 className="text-2xl font-bold text-white">₹4.8L</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-blue"><Banknote className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Builds Finished</span>
            <h3 className="text-2xl font-bold text-white">18</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-red"><CheckSquare className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Incoming Requests</span>
            <h3 className="text-2xl font-bold text-white">6</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-green"><Clock className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Garage Rating</span>
            <h3 className="text-2xl font-bold text-white">4.9/5</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-yellow"><Star className="w-5 h-5" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.4fr] gap-8">
        {/* Left Side: SVG line revenue graph */}
        <div className="glass-panel p-5 rounded-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent-blue" />
            <span>Revenue Growth (6 Month Analysis)</span>
          </h3>

          <div className="w-full h-44 bg-black/30 rounded-sm relative p-4 flex items-end">
            <svg className="w-full h-full" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Guides */}
              <line x1="10" y1="20" x2="390" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="10" y1="60" x2="390" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="10" y1="100" x2="390" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              
              {/* Spline area */}
              <path d="M 20 100 Q 80 80 140 60 T 260 40 T 380 20 L 380 110 L 20 110 Z" fill="rgba(0, 102, 255, 0.05)" />
              <path d="M 20 100 Q 80 80 140 60 T 260 40 T 380 20" stroke="#0066ff" strokeWidth="3" strokeLinecap="round" />
              
              {/* Interactive Dots */}
              <circle cx="140" cy="60" r="4" fill="#0066ff" />
              <circle cx="260" cy="40" r="4" fill="#0066ff" />
              <circle cx="380" cy="20" r="4" fill="#ff3333" />
            </svg>
          </div>
        </div>

        {/* Right Side: Requests approval */}
        <div className="glass-panel p-5 rounded-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-red" />
            <span>Pending Appt Approvals</span>
          </h3>

          <div className="space-y-4 text-xs">
            {requests.map((req, idx) => (
              <div key={idx} className="p-3.5 bg-white/2 border border-white/5 rounded-sm flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-bold text-white">{req.name}</h4>
                  <p className="text-text-secondary text-[10px]">{req.details}</p>
                  <span className="text-[10px] text-text-muted mt-0.5 block">{req.date} | {req.deposit}</span>
                </div>
                <button className="bg-accent-blue hover:bg-accent-blue-hover text-white text-[10px] font-bold px-3 py-1.5 rounded-sm shadow-md">
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
