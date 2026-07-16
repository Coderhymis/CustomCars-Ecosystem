// app/bids/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Zap, Star, MapPin, Calendar, Clock, ShieldCheck, 
  ArrowUpDown, CheckCircle2, ChevronRight, MessageSquare, Phone
} from "lucide-react";

// Mock database of local studios
const studiosBase = [
  {
    id: "redline",
    name: "Redline Autoworks",
    city: "Mumbai",
    rating: 4.9,
    reviews: 248,
    experience: 12,
    warranty: "5 Years warranty",
    nextSlot: "Tomorrow, 10:00 AM",
    baseBidMultiplier: 1.15
  },
  {
    id: "speedcraft",
    name: "Speedcraft Customs",
    city: "Delhi NCR",
    rating: 4.8,
    reviews: 196,
    experience: 8,
    warranty: "3 Years warranty",
    nextSlot: "July 18, 02:00 PM",
    baseBidMultiplier: 1.10
  },
  {
    id: "overland",
    name: "Overland Offroad Garage",
    city: "Bengaluru",
    rating: 4.7,
    reviews: 132,
    experience: 6,
    warranty: "2 Years warranty",
    nextSlot: "July 19, 11:30 AM",
    baseBidMultiplier: 1.08
  },
  {
    id: "carcraft",
    name: "CarCraft Studio",
    city: "Hyderabad",
    rating: 4.6,
    reviews: 87,
    experience: 10,
    warranty: "3 Years warranty",
    nextSlot: "July 20, 09:00 AM",
    baseBidMultiplier: 1.05
  }
];

function BidsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract vehicle parameters
  const brand = searchParams.get("brand") || "Hyundai";
  const model = searchParams.get("model") || "Creta (2024)";
  const variant = searchParams.get("variant") || "SX(O) DCT";
  const partsCost = parseInt(searchParams.get("totalCost") || "185000");
  const partsCount = parseInt(searchParams.get("partsCount") || "3");
  const color = searchParams.get("color") || "#0c0d12";
  const colorName = searchParams.get("colorName") || "Abyss Black";

  // Reverse Auction States
  const [bids, setBids] = useState<Array<{
    studioId: string;
    studioName: string;
    rating: number;
    reviews: number;
    warranty: string;
    nextSlot: string;
    currentBid: number;
    laborFee: number;
    gst: number;
    total: number;
    status: "active" | "lowest" | "outbid";
    history: number[];
  }>>([]);

  const [auctionActive, setAuctionActive] = useState(true);
  const [auctionLogs, setAuctionLogs] = useState<string[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>(null);

  // Initialize bids and start reverse auction simulation
  useEffect(() => {
    // Set initial bids (Parts Cost + Labor + GST)
    const initialBids = studiosBase.map((studio) => {
      const partsAndLabor = Math.round(partsCost * studio.baseBidMultiplier);
      const laborFee = Math.round(partsCost * (studio.baseBidMultiplier - 1.0));
      const gst = Math.round(partsAndLabor * 0.18);
      const total = partsAndLabor + gst;
      
      return {
        studioId: studio.id,
        studioName: studio.name,
        rating: studio.rating,
        reviews: studio.reviews,
        warranty: studio.warranty,
        nextSlot: studio.nextSlot,
        currentBid: partsAndLabor,
        laborFee,
        gst,
        total,
        status: "active" as const,
        history: [total]
      };
    });

    setBids(initialBids);
    setAuctionLogs(["System initialized: Broadcasted digital twin blueprint to 4 local customization studios."]);

    // Bidding Rounds Simulation
    let round = 1;
    const interval = setInterval(() => {
      if (round > 4) {
        setAuctionActive(false);
        setAuctionLogs((prev) => [...prev, "Reverse auction concluded. Best competitive rates locked."]);
        clearInterval(interval);
        return;
      }

      setBids((currentBids) => {
        // Find current lowest bid total
        const lowestTotal = Math.min(...currentBids.map(b => b.total));
        
        // Randomly pick a studio to place a lower bid
        const eligibleStudios = currentBids.filter(b => b.total >= lowestTotal);
        const targetStudio = eligibleStudios[Math.floor(Math.random() * eligibleStudios.length)];
        
        // Undercut by 3% to 6%
        const undercutPercent = 0.03 + Math.random() * 0.03;
        const newTotal = Math.round(lowestTotal * (1 - undercutPercent));
        
        // Back-calculate parts+labor, labor, and GST
        const partsAndLabor = Math.round(newTotal / 1.18);
        const gst = newTotal - partsAndLabor;
        const laborFee = partsAndLabor - partsCost;

        const updatedBids = currentBids.map((b) => {
          if (b.studioId === targetStudio.studioId) {
            return {
              ...b,
              currentBid: partsAndLabor,
              laborFee,
              gst,
              total: newTotal,
              status: "lowest" as const,
              history: [...b.history, newTotal]
            };
          }
          return {
            ...b,
            status: b.total === lowestTotal ? "active" as const : "outbid" as const
          };
        });

        // Re-assess who has the absolute lowest now
        const absoluteLowest = Math.min(...updatedBids.map(b => b.total));
        const finalBids = updatedBids.map(b => ({
          ...b,
          status: b.total === absoluteLowest ? "lowest" as const : b.status === "lowest" ? "active" as const : b.status
        }));

        setAuctionLogs((prev) => [
          ...prev,
          `Round ${round}: ${targetStudio.studioName} placed a bid of ₹${newTotal.toLocaleString("en-IN")} undercutting the competition.`
        ]);

        return finalBids;
      });

      round++;
    }, 2800);

    return () => clearInterval(interval);
  }, [partsCost]);

  const handleBookSlot = (bid: any) => {
    setSelectedBid(bid);
    setBookingSuccess(true);
  };

  const handleFinalizeBooking = () => {
    // Redirect to dashboard with booking info saved in localStorage mock
    const newBooking = {
      brand,
      model,
      variant,
      color,
      colorName,
      studioName: selectedBid.studioName,
      totalCost: selectedBid.total,
      partsCount,
      slot: selectedBid.nextSlot,
      warranty: selectedBid.warranty
    };
    
    // Save to mock storage for user dashboard
    const saved = localStorage.getItem("activeBookings") || "[]";
    const parsed = JSON.parse(saved);
    parsed.push(newBooking);
    localStorage.setItem("activeBookings", JSON.stringify(parsed));

    router.push("/dashboard/user");
  };

  return (
    <div className="flex flex-col gap-6 pb-16 h-[calc(100vh-110px)] overflow-hidden">
      {/* Title & Stats */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent-yellow fill-accent-yellow animate-pulse" />
            <span>Reverse Auction Bidding Lobby</span>
          </h2>
          <p className="text-text-secondary text-xs mt-0.5 font-medium">
            Blueprint: <strong className="text-text-primary">{brand} {model}</strong> ({partsCount} mods configured)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-bg-secondary border border-border px-3.5 py-1.5 rounded-sm">
          <span className="relative flex h-2 w-2">
            {auctionActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${auctionActive ? "bg-accent-green" : "bg-text-muted"}`}></span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-text-secondary">
            {auctionActive ? "Auction Live: Studios bidding..." : "Bids Concluded"}
          </span>
        </div>
      </div>

      {/* Split views */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 flex-grow overflow-hidden min-h-0">
        
        {/* Left Column: Bids Comparison Cards */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          {bids.map((bid) => {
            const isLowest = bid.status === "lowest";
            return (
              <div 
                key={bid.studioId} 
                className={`glass-panel p-5 rounded-lg border flex flex-col md:flex-row justify-between gap-5 transition-all duration-300 ${
                  isLowest ? "border-accent-blue bg-accent-blue/5 shadow-md scale-102" : "border-border"
                }`}
              >
                {/* Shop Metadata */}
                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-text-primary">{bid.studioName}</h4>
                      {isLowest && (
                        <span className="bg-accent-blue/15 text-accent-blue border border-accent-blue/20 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                          Best Offer
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-text-secondary font-medium">
                      <span className="text-accent-yellow font-semibold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-currentColor" />
                        {bid.rating} ({bid.reviews} reviews)
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-text-muted" />
                        Local Studio
                      </span>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-text-secondary">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent-green" />
                      <span>{bid.warranty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent-blue" />
                      <span>Next slot: {bid.nextSlot}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking CTA */}
                <div className="flex flex-col justify-between items-end text-right gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">All-Inclusive Bid</div>
                    <div className="text-2xl font-extrabold text-text-primary">₹{bid.total.toLocaleString("en-IN")}</div>
                    <div className="text-[10px] text-text-muted font-medium">
                      Parts + Labor (₹{bid.laborFee.toLocaleString("en-IN")}) + GST 18% (₹{bid.gst.toLocaleString("en-IN")})
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookSlot(bid)}
                    className="bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-bold px-5 py-2.5 rounded-sm shadow-md flex items-center gap-1.5 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Accept Bid & Book</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Auction Feed logs */}
        <div className="glass-panel p-5 rounded-lg flex flex-col h-full overflow-hidden border border-border bg-bg-secondary">
          <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-blue" />
            <span>Auction Log Broadcast</span>
          </h3>
          
          <div className="flex-grow overflow-y-auto space-y-3.5 pr-1 text-xs font-mono text-text-secondary leading-relaxed">
            {auctionLogs.map((log, i) => (
              <div key={i} className="flex gap-2 border-l border-border pl-3.5">
                <span className="text-accent-blue select-none font-bold">&gt;</span>
                <p>{log}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 mt-4 space-y-1.5 text-xs text-text-muted font-medium">
            <p>* Local garages calculate bids based on logistics availability and technician labor load.</p>
            <p>* Bids automatically expire when you exit this lobby.</p>
          </div>
        </div>

      </div>

      {/* Booking Checkout Dialog modal overlay */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="glass-panel w-full max-w-md p-6 border border-border rounded-lg space-y-5 text-center relative shadow-2xl bg-bg-secondary">
            <div className="w-12 h-12 rounded-full bg-accent-green/10 border-2 border-accent-green flex items-center justify-center text-accent-green mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-text-primary">Secure Appointment Booking</h3>
            
            <div className="p-4 bg-bg-primary border border-border rounded-sm text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-text-secondary">Garage Partner:</span>
                <strong className="text-text-primary">{selectedBid.studioName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Selected Slot:</span>
                <strong className="text-text-primary">{selectedBid.nextSlot}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Vehicle Twin:</span>
                <strong className="text-text-primary">{brand} {model}</strong>
              </div>
              <div className="border-t border-border pt-2.5 flex justify-between text-sm">
                <span className="font-bold text-text-primary">Winning Bid Rate:</span>
                <strong className="text-accent-blue font-extrabold text-base">₹{selectedBid.total.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <p className="text-[10px] text-text-muted leading-relaxed font-medium">
              * A fully refundable ₹5,000 security deposit is set up for parts shipment. The remaining balance is paid directly at the workshop on delivery.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setBookingSuccess(false)}
                className="flex-1 border border-border bg-bg-secondary hover:bg-bg-primary text-text-primary text-xs font-bold py-3 rounded-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalizeBooking}
                className="flex-[1.5] bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-bold py-3 rounded-sm flex items-center justify-center shadow-md transition-all hover:-translate-y-0.5"
              >
                Pay Security Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BidsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Loading Live Bidding Room...</div>}>
      <BidsContent />
    </Suspense>
  );
}
