// app/directory/[shopId]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { 
  Star, MapPin, Briefcase, Shield, Wallet, 
  Phone, MessageCircle, Calendar, ChevronLeft, ChevronRight, CheckCircle2 
} from "lucide-react";

export default function ShopProfilePage() {
  const params = useParams();
  const router = useRouter();
  const shopId = params.shopId as string;

  // Mock Shop Profile Fetcher
  const shopData = {
    name: "Redline Autoworks",
    city: "Mumbai",
    rating: 4.9,
    reviews: 248,
    experience: 12,
    specialization: ["Performance Tuning", "Wraps & PPF", "Body Kits"],
    verified: true,
    warranty: "5 Years",
    owner: "Ranjit Patil",
    address: "Plot 42, Link Road, Andheri West, Mumbai",
    beforeImg: "https://images.unsplash.com/photo-1611245801314-e0e562b22ee7?auto=format&fit=crop&q=80&w=800",
    afterImg: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    packages: [
      { name: "Street Aero Package", desc: "Gloss 3M wrap + front carbon splitter and skirts install", price: "₹1,20,000", type: "street" },
      { name: "Track Performance Setup", desc: "Stage 2 dyno tune + high-flow custom exhaust + lowering coilovers", price: "₹2,50,000", type: "track" },
      { name: "VIP Luxury Cabin Spec", desc: "Alcantara leather interior dashboard wrap + ambient lighting upgrade", price: "₹3,20,000", type: "luxury" }
    ]
  };

  // Scheduling scheduler steps: 1 (Slots), 2 (Pay), 3 (Success)
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Profile header card */}
      <div className="glass-panel p-6 rounded-md flex flex-col md:flex-row gap-6 items-start justify-between">
        <div className="flex gap-6 items-center">
          <div className="w-24 h-24 rounded-md overflow-hidden border border-white/10 flex-shrink-0">
            <img src={shopData.afterImg} alt={shopData.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-white">{shopData.name}</h2>
              {shopData.verified && (
                <span className="bg-accent-green/12 border border-accent-green text-accent-green text-[9px] font-bold px-2 py-0.5 rounded-sm">
                  VERIFIED STUDIO
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
              <span className="text-accent-yellow font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-currentColor" />
                {shopData.rating} ({shopData.reviews} Reviews)
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-text-muted" />
                {shopData.address}
              </span>
            </div>
            <div className="flex gap-2">
              {shopData.specialization.map(spec => (
                <span key={spec} className="bg-white/4 border border-white/5 text-[9px] text-text-secondary px-2.5 py-0.5 rounded-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact buttons */}
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-white/10 bg-white/3 hover:bg-white/6 text-white text-xs font-bold px-4 py-2.5 rounded-sm flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> Call
          </button>
          <button className="flex-1 md:flex-none border border-accent-green/30 bg-accent-green/5 hover:bg-accent-green/12 text-accent-green text-xs font-bold px-4 py-2.5 rounded-sm flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
        </div>
      </div>

      {/* Main split display layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1.3fr] gap-8">
        {/* Left column: Showcase slider + Packages */}
        <div className="space-y-8">
          {/* Before After Slider */}
          <div className="glass-panel p-5 rounded-md space-y-4">
            <h3 className="text-sm font-bold text-white">Featured Project Showcase (Drag Center Line)</h3>
            <BeforeAfterSlider beforeImg={shopData.beforeImg} afterImg={shopData.afterImg} />
          </div>

          {/* Pricing packages */}
          <div className="glass-panel p-5 rounded-md space-y-4">
            <h3 className="text-sm font-bold text-white">Modification Packages</h3>
            <div className="flex flex-col gap-4">
              {shopData.packages.map(pkg => (
                <div key={pkg.name} className={`p-4 bg-white/2 border-l-4 rounded-sm flex justify-between items-center ${
                  pkg.type === "track" 
                    ? "border-accent-red" 
                    : pkg.type === "luxury" 
                      ? "border-purple-600" 
                      : "border-accent-blue"
                }`}>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{pkg.name}</h4>
                    <p className="text-text-secondary text-xs">{pkg.desc}</p>
                  </div>
                  <div className="text-right">
                    <strong className="text-base text-white">{pkg.price}</strong>
                    <span className="text-[10px] text-text-muted block mt-0.5">Incl. Taxes & Labor</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Slots scheduler checkout panels */}
        <div className="glass-panel p-5 rounded-md h-fit">
          {bookingStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white">Select Booking Appointment Slot</h3>
              
              {/* Calendar grid mock */}
              <div className="p-4 bg-bg-secondary border border-white/10 rounded-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-white">July 2026</span>
                  <div className="flex gap-2">
                    <button className="w-6 h-6 rounded-full hover:bg-white/5 flex items-center justify-center text-text-secondary"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="w-6 h-6 rounded-full hover:bg-white/5 flex items-center justify-center text-text-secondary"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-text-muted mb-2 uppercase">
                  <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map(d => {
                    const disabled = d < 15; // mock pass days
                    const active = selectedDay === d;
                    return (
                      <button
                        key={d}
                        onClick={() => !disabled && setSelectedDay(d)}
                        disabled={disabled}
                        className={`h-7 w-7 text-xs font-medium rounded-full flex items-center justify-center ${
                          disabled 
                            ? "text-text-muted opacity-20 cursor-not-allowed" 
                            : active 
                              ? "bg-accent-blue text-white" 
                              : "text-white hover:bg-white/5"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Select Time Slot</span>
                <div className="grid grid-cols-2 gap-2">
                  {["10:00 AM", "12:30 PM", "03:00 PM", "05:30 PM"].map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2.5 rounded-sm border text-xs font-semibold ${
                        selectedTime === time 
                          ? "border-accent-blue bg-accent-blue/5 text-white" 
                          : "border-white/10 bg-white/2 text-text-secondary hover:bg-white/5"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedDay && selectedTime) setBookingStep(2);
                }}
                disabled={!selectedDay || !selectedTime}
                className="w-full bg-accent-blue hover:bg-accent-blue-hover disabled:bg-white/5 disabled:text-text-muted text-white text-xs font-bold py-3.5 rounded-sm flex items-center justify-center shadow-lg"
              >
                Proceed to Advance Pay
              </button>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white">Payment Checkout Confirmation</h3>

              <div className="p-4 bg-bg-secondary border border-white/10 rounded-sm space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Studio Slot Date:</span>
                  <strong className="text-white">July {selectedDay}, 2026 at {selectedTime}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Modification Studio:</span>
                  <strong className="text-white">{shopData.name}</strong>
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between">
                  <span className="text-text-secondary">Advance Allocation Deposit:</span>
                  <strong className="text-accent-green text-sm">₹5,000</strong>
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  * Deposit allocates your slot time & parts shipment. Fully refundable up to 24 hours prior.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setBookingStep(1)}
                  className="flex-1 border border-white/10 hover:bg-white/5 text-white text-xs font-bold py-3 rounded-sm"
                >
                  Back
                </button>
                <button
                  onClick={() => setBookingStep(3)}
                  className="flex-[1.5] bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-bold py-3 rounded-sm flex items-center justify-center"
                >
                  Pay ₹5,000 Advance
                </button>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent-green/10 border-2 border-accent-green flex items-center justify-center text-accent-green mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Appointment Booked!</h3>
              <p className="text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
                Your garage slot on <strong>July {selectedDay} at {selectedTime}</strong> is secured at {shopData.name}. Invoice copies have been sent via email.
              </p>
              <button 
                onClick={() => router.push("/dashboard/user")}
                className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-3 rounded-sm border border-white/10"
              >
                Go To My Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
