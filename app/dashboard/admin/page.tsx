// app/dashboard/admin/page.tsx
"use client";

import { Store, CreditCard, Percent, AlertTriangle, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const registrations = [
    { name: "Elite Customs Hyderabad", city: "Hyderabad", experience: "8 Years", status: "Verified GSTIN" },
    { name: "Overdrive Garage Kochi", city: "Kochi", experience: "4 Years", status: "Pending Audit Files" }
  ];

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">Platform Administrator Portal</h2>
        <p className="text-text-secondary text-xs mt-0.5">Moderate content, audit shop listings registrations, and oversee platform commissions.</p>
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Active Studios</span>
            <h3 className="text-2xl font-bold text-white">42</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-blue"><Store className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Month Bookings</span>
            <h3 className="text-2xl font-bold text-white">124</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-red"><CreditCard className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Platform Earnings (5%)</span>
            <h3 className="text-2xl font-bold text-white">₹31,000</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-green"><Percent className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Pending Approvals</span>
            <h3 className="text-2xl font-bold text-white">4</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-yellow"><AlertTriangle className="w-5 h-5" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.4fr] gap-8">
        {/* Left Side: Shop registration applications */}
        <div className="glass-panel p-5 rounded-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent-blue" />
            <span>Studio Registrations Audit</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-text-muted border-b border-white/5 uppercase text-[10px] font-bold">
                  <th className="pb-3">Studio Name</th>
                  <th className="pb-3">City</th>
                  <th className="pb-3">Experience</th>
                  <th className="pb-3">Status Files</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {registrations.map((shop, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3.5"><strong className="text-white">{shop.name}</strong></td>
                    <td className="py-3.5">{shop.city}</td>
                    <td className="py-3.5">{shop.experience}</td>
                    <td className="py-3.5">{shop.status}</td>
                    <td className="py-3.5">
                      <button className="bg-accent-blue hover:bg-accent-blue-hover text-white text-[9px] font-bold px-2.5 py-1 rounded-sm shadow-md">
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Global CMS banner manager */}
        <div className="glass-panel p-5 rounded-md space-y-4">
          <h3 className="text-sm font-bold text-white">Global CMS Configurations</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Home Page Promo Banner Headline</label>
              <input 
                type="text" 
                defaultValue="Design Your Dream Car Before Spending a Rupee." 
                className="bg-white/4 border border-white/10 p-3 rounded-sm text-xs text-white placeholder:text-text-muted outline-none focus:border-accent-blue w-full"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Platform Commission Split Rate %</label>
              <input 
                type="number" 
                defaultValue="5" 
                className="bg-white/4 border border-white/10 p-3 rounded-sm text-xs text-white placeholder:text-text-muted outline-none focus:border-accent-blue w-full"
              />
            </div>

            <button className="w-full bg-accent-blue hover:bg-accent-blue-hover text-white font-bold py-3 rounded-sm shadow-md">
              Update Platform Configs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
