// app/dashboard/user/page.tsx
"use client";

import { Calendar, Wallet, Aperture, CreditCard, ChevronRight, Clock, FileText, Settings } from "lucide-react";

export default function UserDashboard() {
  const savedBuilds = [
    { name: "Porsche 911 GT3 (992)", spec: "Electric Blue wrap + BBS Alloys + GT Wing", date: "2 days ago" },
    { name: "Mahindra Thar Roxx", spec: "Matte Obsidian + 2-Inch Lift Kit + Mud Beadlocks", date: "1 week ago" }
  ];

  const serviceHistory = [
    { title: "Low Sport coilovers suspension install", shop: "Redline Autoworks", cost: "₹42,000", date: "May 10, 2026" },
    { title: "Akrapovic Catback Exhaust fitment", shop: "Speedcraft Customs", cost: "₹2,40,000", date: "April 02, 2026" }
  ];

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">Client Portal Dashboard</h2>
        <p className="text-text-secondary text-xs mt-0.5">Manage digital garage parameters, audit active customization warranties, and monitor incoming booking slots.</p>
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Active Bookings</span>
            <h3 className="text-2xl font-bold text-white">1</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-blue"><Calendar className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Advance Paid</span>
            <h3 className="text-2xl font-bold text-white">₹5,000</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-green"><Wallet className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Saved Garages</span>
            <h3 className="text-2xl font-bold text-white">4</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-red"><Aperture className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Approved Credit</span>
            <h3 className="text-2xl font-bold text-white">₹1.5L</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/4 flex items-center justify-center text-accent-yellow"><CreditCard className="w-5 h-5" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.4fr] gap-8">
        {/* Left Side: Active Appointments & History */}
        <div className="space-y-6">
          {/* Active Booking */}
          <div className="glass-panel p-5 rounded-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-blue" />
              <span>Pending Slot Schedule</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-text-muted border-b border-white/5 uppercase text-[10px] font-bold">
                    <th className="pb-3">Garage Shop</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Deposit</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-white/5">
                    <td className="py-3.5"><strong className="text-white">Redline Autoworks</strong></td>
                    <td className="py-3.5">July 18, 2026</td>
                    <td className="py-3.5">12:30 PM</td>
                    <td className="py-3.5">₹5,000 (UPI)</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-green/10 text-accent-green">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Service History Timeline */}
          <div className="glass-panel p-5 rounded-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-red" />
              <span>Modification Service History</span>
            </h3>

            <div className="relative border-l-2 border-white/5 pl-4 ml-2 space-y-6 text-xs text-text-secondary">
              {serviceHistory.map((log, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-[21px] top-[2px] w-2 h-2 bg-accent-blue rounded-full"></span>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white">{log.title}</h4>
                      <span className="text-[10px] text-text-muted mt-0.5 block">{log.shop} | {log.date}</span>
                    </div>
                    <strong className="text-white">{log.cost}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Saved builds */}
        <div className="glass-panel p-5 rounded-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-accent-yellow" />
            <span>Saved Car Layouts</span>
          </h3>

          <div className="space-y-3">
            {savedBuilds.map((build, idx) => (
              <div key={idx} className="p-3 bg-white/2 border border-white/5 hover:bg-white/4 rounded-sm flex items-center justify-between text-xs transition-colors">
                <div className="space-y-1">
                  <h4 className="font-bold text-white">{build.name}</h4>
                  <p className="text-text-secondary text-[10px]">{build.spec}</p>
                </div>
                <span className="text-[10px] text-text-muted whitespace-nowrap">{build.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
