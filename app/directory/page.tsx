// app/directory/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Map, Wrench, ArrowUpDown, Shield, Star, MapPin } from "lucide-react";

export default function DirectoryPage() {
  const [cityFilter, setCityFilter] = useState("all");
  const [specFilter, setSpecFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Shops Database Model
  const shops = [
    {
      id: "redline",
      name: "Redline Autoworks",
      city: "mumbai",
      rating: 4.9,
      reviews: 248,
      experience: 12,
      specialization: ["Performance Tuning", "Wraps & PPF", "Body Kits"],
      verified: true,
      priceTier: "premium",
      distance: "4.2 km",
      warranty: "5 Years",
      address: "Plot 42, Link Road, Andheri West, Mumbai",
      lat: "40%", lng: "30%",
      afterImg: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "speedcraft",
      name: "Speedcraft Customs",
      city: "delhi",
      rating: 4.8,
      reviews: 196,
      experience: 8,
      specialization: ["Custom Paint", "Body Kits", "Alloy Upgrades"],
      verified: true,
      priceTier: "mid",
      distance: "8.5 km",
      warranty: "3 Years",
      address: "Sector 15, Gurgaon, Delhi NCR",
      lat: "65%", lng: "45%",
      afterImg: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "overland",
      name: "Overland Offroad Garage",
      city: "bengaluru",
      rating: 4.7,
      reviews: 132,
      experience: 6,
      specialization: ["Suspension Lifts", "Offroad Gear", "Wheels & Tires"],
      verified: true,
      priceTier: "mid",
      distance: "12.0 km",
      warranty: "2 Years",
      address: "Kanakapura Main Road, JP Nagar, Bengaluru",
      lat: "25%", lng: "70%",
      afterImg: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "carcraft",
      name: "CarCraft Studio",
      city: "hyderabad",
      rating: 4.6,
      reviews: 87,
      experience: 10,
      specialization: ["Premium Interior", "Detailing & PPF", "Custom Paint"],
      verified: false,
      priceTier: "economy",
      distance: "15.4 km",
      warranty: "1 Year",
      address: "Madhapur Metro Pillar 24, Hyderabad",
      lat: "50%", lng: "80%",
      afterImg: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400"
    }
  ];

  // Filtering implementation
  const filteredShops = shops.filter(shop => {
    if (cityFilter !== "all" && shop.city !== cityFilter) return false;
    if (specFilter !== "all" && !shop.specialization.includes(specFilter)) return false;
    return true;
  });

  // Sorting implementation
  filteredShops.sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "experience") return b.experience - a.experience;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    return 0;
  });

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-110px)] overflow-hidden">
      {/* Title */}
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">Verified Customization Studios</h2>
        <p className="text-text-secondary text-xs mt-0.5">Filter specialized studios, audit Google rating metrics, and inspect geolocation proximity maps.</p>
      </div>

      {/* Horizontal filter options */}
      <div className="flex flex-wrap gap-4 bg-bg-secondary border border-white/10 p-3 rounded-md items-center">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-text-secondary">
          <Map className="w-3.5 h-3.5 text-text-muted" />
          <select 
            className="bg-transparent border-none outline-none text-white cursor-pointer"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="all" className="bg-bg-secondary">All Cities</option>
            <option value="mumbai" className="bg-bg-secondary">Mumbai</option>
            <option value="delhi" className="bg-bg-secondary">Delhi NCR</option>
            <option value="bengaluru" className="bg-bg-secondary">Bengaluru</option>
            <option value="hyderabad" className="bg-bg-secondary">Hyderabad</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-text-secondary">
          <Wrench className="w-3.5 h-3.5 text-text-muted" />
          <select 
            className="bg-transparent border-none outline-none text-white cursor-pointer"
            value={specFilter}
            onChange={(e) => setSpecFilter(e.target.value)}
          >
            <option value="all" className="bg-bg-secondary">Specialization</option>
            <option value="Performance Tuning" className="bg-bg-secondary">Performance Tuning</option>
            <option value="Wraps & PPF" className="bg-bg-secondary">Wraps & PPF</option>
            <option value="Body Kits" className="bg-bg-secondary">Body Kits</option>
            <option value="Suspension Lifts" className="bg-bg-secondary">Suspension Lifts</option>
            <option value="Premium Interior" className="bg-bg-secondary">Premium Interior</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-text-secondary">
          <ArrowUpDown className="w-3.5 h-3.5 text-text-muted" />
          <select 
            className="bg-transparent border-none outline-none text-white cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating" className="bg-bg-secondary">Top Rated</option>
            <option value="experience" className="bg-bg-secondary">Most Experienced</option>
            <option value="reviews" className="bg-bg-secondary">Popularity (Reviews)</option>
          </select>
        </div>
      </div>

      {/* Main split dashboard mapping list layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 flex-grow overflow-hidden min-h-0">
        {/* Left List Pane */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          {filteredShops.length === 0 ? (
            <div className="glass-panel p-16 rounded-md text-center">
              <Search className="w-10 h-10 text-text-muted mx-auto mb-3" />
              <h3 className="text-white text-base font-bold">No Custom Studios Found</h3>
              <p className="text-text-secondary text-xs mt-1">Try resetting your category filters.</p>
            </div>
          ) : (
            filteredShops.map((shop) => (
              <Link 
                href={`/directory/${shop.id}`}
                key={shop.id}
                className="glass-panel glass-panel-interactive p-4 rounded-md flex gap-5 text-left"
              >
                <div className="w-40 h-28 rounded-sm overflow-hidden border border-white/5 flex-shrink-0">
                  <img 
                    src={shop.afterImg} 
                    alt={shop.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{shop.name}</span>
                        {shop.verified && (
                          <span className="bg-accent-green/12 border border-accent-green text-accent-green text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                            VERIFIED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 bg-accent-yellow/10 text-accent-yellow text-xs font-bold px-2 py-0.5 rounded-sm">
                        <Star className="w-3 h-3 fill-currentColor" />
                        <span>{shop.rating}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-text-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{shop.address}</span>
                    </div>
                  </div>

                  {/* Specialization list */}
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {shop.specialization.map((spec) => (
                      <span key={spec} className="bg-white/4 border border-white/5 text-[10px] text-text-secondary px-2.5 py-0.5 rounded-sm">
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and parameters summary footer */}
                  <div className="border-t border-white/5 pt-2.5 flex justify-between text-[11px] text-text-muted">
                    <div>Exp: <strong className="text-white">{shop.experience} Yrs</strong></div>
                    <div>Warranty: <strong className="text-white">{shop.warranty}</strong></div>
                    <div>Distance: <strong className="text-white">{shop.distance}</strong></div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Right geolocations map pane mockup */}
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#111116] h-full min-h-[300px]">
          <div className="absolute inset-0 bg-gradient-radial from-accent-blue/8 to-transparent opacity-85 pointer-events-none"></div>
          {/* Mock Roads */}
          <div className="absolute top-[35%] left-0 right-0 h-4 bg-white/4 rounded-md"></div>
          <div className="absolute top-0 bottom-0 left-[48%] w-4 bg-white/4 rounded-md"></div>
          <div className="absolute top-[65%] left-0 right-0 h-4 bg-white/4 rounded-md"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

          {/* Interactive Pins */}
          {filteredShops.map((shop) => (
            <div 
              key={shop.id}
              className="absolute group cursor-pointer -translate-x-1/2 -translate-y-1/2"
              style={{ top: shop.lat, left: shop.lng }}
            >
              <div className="w-10 h-10 rounded-full bg-bg-secondary border-2 border-accent-blue text-accent-blue shadow-lg flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white group-hover:border-white transition-all duration-150">
                <Star className="w-4 h-4 fill-currentColor" />
              </div>
              <div className="absolute top-[-38px] left-1/2 -translate-x-1/2 bg-bg-secondary border border-white/10 px-2.5 py-1 rounded-sm text-[10px] font-bold text-white shadow-xl pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {shop.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
