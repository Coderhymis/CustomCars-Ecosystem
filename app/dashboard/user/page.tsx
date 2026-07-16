// app/dashboard/user/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Calendar, Wallet, Aperture, CreditCard, ChevronRight, 
  Clock, FileText, Settings, ShieldCheck, Car, Trash2, GitCommit, ArrowLeftRight
} from "lucide-react";

interface Booking {
  brand: string;
  model: string;
  variant: string;
  color: string;
  colorName: string;
  studioName: string;
  totalCost: number;
  partsCount: number;
  slot: string;
  warranty: string;
}

interface CommitLog {
  hash: string;
  message: string;
  date: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [gitCommits, setGitCommits] = useState<CommitLog[]>([]);

  // Load bookings and commits from localStorage
  useEffect(() => {
    // 1. Load active bookings
    const savedBookings = localStorage.getItem("activeBookings");
    if (savedBookings) {
      setActiveBookings(JSON.parse(savedBookings));
    } else {
      const defaultBooking: Booking = {
        brand: "Hyundai",
        model: "Creta (2024)",
        variant: "SX(O) DCT",
        color: "#0c0d12",
        colorName: "Abyss Black",
        studioName: "Redline Autoworks",
        totalCost: 227000,
        partsCount: 3,
        slot: "Tomorrow, 10:00 AM",
        warranty: "5 Years warranty"
      };
      setActiveBookings([defaultBooking]);
      localStorage.setItem("activeBookings", JSON.stringify([defaultBooking]));
    }

    // 2. Load git commits
    const savedCommits = localStorage.getItem("twinCommits");
    if (savedCommits) {
      setGitCommits(JSON.parse(savedCommits));
    } else {
      const defaultCommits: CommitLog[] = [
        { hash: "7df1a3b", message: "chore: initialized digital twin base setup", date: "4 days ago" },
        { hash: "4c8d9e2", message: "style(paint): set default factory paint to Abyss Black", date: "3 days ago" }
      ];
      setGitCommits(defaultCommits);
      localStorage.setItem("twinCommits", JSON.stringify(defaultCommits));
    }
  }, []);

  const handleCancelBooking = (index: number) => {
    const updated = activeBookings.filter((_, i) => i !== index);
    setActiveBookings(updated);
    localStorage.setItem("activeBookings", JSON.stringify(updated));
  };

  const handleRollbackCommit = (hash: string) => {
    alert(`Rollback initialized: Reverting 3D Digital Twin configuration state to version [${hash}]...`);
  };

  const totalAdvancePaid = activeBookings.length * 5000;

  const defaultTwins = [
    { name: "Porsche 911 GT3 (992)", spec: "Electric Blue wrap + BBS Alloys + GT Wing", date: "2 days ago", type: "coupe", color: "#0066ff" },
    { name: "Mahindra Thar Roxx", spec: "Matte Obsidian + 2-Inch Lift Kit + Mud Beadlocks", date: "1 week ago", type: "suv", color: "#111827" }
  ];

  const serviceHistory = [
    { title: "Low Sport coilovers suspension install", shop: "Redline Autoworks", cost: "₹42,000", date: "May 10, 2026", warranty: "3 Years" },
    { title: "Akrapovic Catback Exhaust fitment", shop: "Speedcraft Customs", cost: "₹2,40,000", date: "April 02, 2026", warranty: "Lifetime" }
  ];

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-extrabold text-text-primary">Client Portal Dashboard</h2>
          <p className="text-text-secondary text-xs mt-0.5 font-medium">Manage digital twin garage parameters, audit customization warranties, and monitor incoming booking slots.</p>
        </div>

        <button 
          onClick={() => router.push("/")}
          className="bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-bold px-4 py-2 rounded-sm transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-accent-blue/15"
        >
          Initialize New Build
        </button>
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 rounded-lg flex items-center justify-between border border-border">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Active Bookings</span>
            <h3 className="text-2xl font-bold text-text-primary">{activeBookings.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-bg-secondary border border-border flex items-center justify-center text-accent-blue"><Calendar className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-lg flex items-center justify-between border border-border">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Advance Paid</span>
            <h3 className="text-2xl font-bold text-text-primary">₹{totalAdvancePaid.toLocaleString("en-IN")}</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-bg-secondary border border-border flex items-center justify-center text-accent-green"><Wallet className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-lg flex items-center justify-between border border-border">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Digital Garage twins</span>
            <h3 className="text-2xl font-bold text-text-primary">{defaultTwins.length + activeBookings.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-bg-secondary border border-border flex items-center justify-center text-accent-red"><Aperture className="w-5 h-5" /></div>
        </div>

        <div className="glass-panel p-5 rounded-lg flex items-center justify-between border border-border">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase">Available Line of Credit</span>
            <h3 className="text-2xl font-bold text-text-primary">₹2,50,000</h3>
          </div>
          <div className="w-10 h-10 rounded-sm bg-bg-secondary border border-border flex items-center justify-center text-accent-yellow"><CreditCard className="w-5 h-5" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.4fr] gap-8">
        
        {/* Left Column: Active Bookings & Warranties */}
        <div className="space-y-6">
          
          {/* Active Appointments */}
          <div className="glass-panel p-5 rounded-lg border border-border space-y-4">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-blue" />
              <span>Pending Slot Schedule</span>
            </h3>
            
            {activeBookings.length === 0 ? (
              <p className="text-xs text-text-secondary py-4 text-center">No active bookings scheduled. Build a vehicle twin and request shop bids to start.</p>
            ) : (
              <div className="space-y-4">
                {activeBookings.map((booking, idx) => (
                  <div key={idx} className="p-4 bg-bg-secondary border border-border rounded-md flex flex-col md:flex-row justify-between gap-4 transition-all duration-300">
                    <div className="space-y-1.5 text-xs text-text-secondary">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-text-primary">{booking.studioName}</strong>
                        <span className="bg-accent-green/12 text-accent-green text-[9px] font-bold px-1.5 py-0.5 rounded-sm">CONFIRMED</span>
                      </div>
                      <p>Vehicle: <strong className="text-text-primary">{booking.brand} {booking.model} ({booking.variant})</strong></p>
                      <p>Appt Slot: <strong>{booking.slot}</strong></p>
                      <p className="text-text-muted text-[11px] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent-green" />
                        {booking.warranty}
                      </p>
                    </div>

                    <div className="flex flex-col justify-between items-end text-right">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider">Total Bid Cost</span>
                        <strong className="text-sm text-text-primary">₹{booking.totalCost.toLocaleString("en-IN")}</strong>
                        <span className="text-[10px] text-accent-green block font-semibold">₹5,000 Deposit Paid</span>
                      </div>

                      <button 
                        onClick={() => handleCancelBooking(idx)}
                        className="text-[10px] text-accent-red hover:underline mt-4 flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Cancel Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Service History Timeline / Active Warranties */}
          <div className="glass-panel p-5 rounded-lg border border-border space-y-4">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-red" />
              <span>Modification Service History & Active Warranties</span>
            </h3>

            <div className="relative border-l border-border pl-4 ml-2 space-y-6 text-xs text-text-secondary">
              {serviceHistory.map((log, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-[21px] top-[2px] w-2 h-2 bg-accent-blue rounded-full"></span>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-text-primary">{log.title}</h4>
                      <span className="text-[10px] text-text-muted mt-0.5 block">{log.shop} | {log.date}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-accent-green mt-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Active Warranty: {log.warranty}
                      </span>
                    </div>
                    <strong className="text-text-primary">{log.cost}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Digital Garage Twins & Git commits log */}
        <div className="space-y-6">
          {/* Digital Garage Twins */}
          <div className="glass-panel p-5 rounded-lg border border-border space-y-4 h-fit">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Car className="w-4 h-4 text-accent-yellow" />
              <span>My Digital Twin Garage</span>
            </h3>

            <div className="space-y-4">
              {/* List active booking twins first */}
              {activeBookings.map((booking, idx) => (
                <div key={`booking-${idx}`} className="p-3.5 bg-accent-blue/5 border border-accent-blue rounded-md flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-text-primary">{booking.brand} {booking.model}</h4>
                      <span className="text-[9px] bg-accent-blue/15 text-accent-blue font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">ACTIVE BUILD</span>
                    </div>
                    <p className="text-text-secondary text-[10px]">{booking.colorName} wrap + {booking.partsCount} modifications retrofitted</p>
                    <p className="text-[9px] text-text-muted font-medium">Assigned to: {booking.studioName}</p>
                  </div>

                  <div 
                    className="w-4.5 h-4.5 rounded-full border border-border shadow-md"
                    style={{ backgroundColor: booking.color }}
                  />
                </div>
              ))}

              {/* List default twin presets */}
              {defaultTwins.map((build, idx) => (
                <div key={idx} className="p-3.5 bg-bg-secondary border border-border hover:bg-bg-primary rounded-md flex items-center justify-between text-xs transition-colors duration-300">
                  <div className="space-y-1">
                    <h4 className="font-bold text-text-primary">{build.name}</h4>
                    <p className="text-text-secondary text-[10px]">{build.spec}</p>
                    <span className="text-[10px] text-text-muted block mt-1">Saved: {build.date}</span>
                  </div>

                  <div 
                    className="w-4.5 h-4.5 rounded-full border border-border shadow-md"
                    style={{ backgroundColor: build.color }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Digital Twin Version Control Log */}
          <div className="glass-panel p-5 rounded-lg border border-border space-y-4 h-fit">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-accent-blue" />
              <span>Digital Twin Git Revision History</span>
            </h3>

            <div className="space-y-3">
              {gitCommits.map((commit, idx) => (
                <div key={idx} className="p-3 bg-bg-secondary border border-border rounded-md flex justify-between items-center text-xs transition-colors">
                  <div className="space-y-1 flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold text-accent-blue uppercase bg-accent-blue/10 border border-accent-blue/20 rounded-sm px-1.5 py-0.5">
                        {commit.hash}
                      </span>
                      <span className="text-[9px] text-text-muted font-semibold">{commit.date}</span>
                    </div>
                    <p className="text-text-primary font-medium">{commit.message}</p>
                  </div>

                  <button
                    onClick={() => handleRollbackCommit(commit.hash)}
                    className="text-[9px] bg-bg-primary hover:bg-accent-blue/10 text-text-secondary hover:text-accent-blue border border-border hover:border-accent-blue/30 px-2.5 py-1.5 rounded-sm transition-all duration-300 flex items-center gap-1 font-semibold ml-3"
                    title="Rollback vehicle specs to this commit version"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Rollback</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
