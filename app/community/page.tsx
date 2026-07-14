// app/community/page.tsx
"use client";

import { useState } from "react";
import { Heart, MessageSquare, Share2, Sparkles, Image, Compass, Calendar, MapPin } from "lucide-react";

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Rohan Sharma",
      avatar: "RS",
      car: "Thar Roxx Offroad",
      date: "2 hours ago",
      text: "Just got the 2-inch lift kit and 33-inch beadlock wheels installed from Overland Garage Bengaluru. Ride feels absolutely beastly! What do you guys think of the matte olive green wrap?",
      likes: 142,
      isLiked: false,
      comments: 24,
      img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      author: "Vikram Aditya",
      avatar: "VA",
      car: "Porsche 911 GT3",
      date: "1 day ago",
      text: "Track day setup ready. Fitted a full carbon aero kit and high-flow titanium custom exhaust at Redline Mumbai. Sounds screaming at 9000 RPM.",
      likes: 389,
      isLiked: true,
      comments: 56,
      img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800"
    }
  ]);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-extrabold text-white">Community Showroom</h2>
        <p className="text-text-secondary text-xs mt-0.5">Explore customized build profiles, share visualizer renders, and join discussion threads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1.3fr] gap-8 items-start">
        {/* Left Feed List */}
        <div className="space-y-6">
          {/* Create Post Card */}
          <div className="glass-panel p-5 rounded-md space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><Sparkles className="text-accent-blue w-4 h-4" /> Share Your Build</h3>
            <textarea 
              placeholder="What did you upgrade today? Tag your shop, write feedback, link parts..."
              className="w-full bg-white/4 border border-white/10 p-3 rounded-sm text-xs text-white placeholder:text-text-muted outline-none focus:border-accent-blue h-20 resize-none"
            />
            <div className="flex justify-between items-center">
              <button className="border border-white/10 bg-white/2 hover:bg-white/5 text-white text-[11px] font-bold px-3.5 py-2 rounded-sm flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-text-muted" /> Attach Render
              </button>
              <button className="bg-accent-blue hover:bg-accent-blue-hover text-white text-[11px] font-bold px-4 py-2 rounded-sm shadow-md">
                Publish Post
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          {posts.map((post) => (
            <div key={post.id} className="glass-panel p-5 rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-blue to-accent-red flex items-center justify-center font-bold text-white text-xs">
                    {post.avatar}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{post.author}</span>
                    <span className="text-[10px] text-text-muted">Car: <strong className="text-text-secondary">{post.car}</strong></span>
                  </div>
                </div>
                <span className="text-[10px] text-text-muted">{post.date}</span>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">{post.text}</p>
              
              <div className="aspect-[1.6] rounded-md overflow-hidden border border-white/10 shadow-inner">
                <img src={post.img} alt="Modified vehicle" className="w-full h-full object-cover" />
              </div>

              <div className="flex gap-6 border-t border-white/5 pt-3 text-[11px] font-semibold text-text-secondary">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${post.isLiked ? "text-accent-red" : "hover:text-accent-blue"}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.isLiked ? "fill-currentColor" : ""}`} />
                  <span>{post.likes} Likes</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-accent-blue">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.comments} Comments</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-accent-blue">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Build</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right sidebar panel: Trending configs & local events */}
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent-blue" />
              <span>Trending Configurations</span>
            </h3>
            <ul className="space-y-3.5 text-xs text-text-secondary font-medium">
              <li className="flex justify-between">
                <span>1. Satin Obsidian Vinyl wraps</span>
                <strong className="text-white">148 builds</strong>
              </li>
              <li className="flex justify-between">
                <span>2. Stage 1 Remaps (Diesel TDI)</span>
                <strong className="text-white">94 builds</strong>
              </li>
              <li className="flex justify-between">
                <span>3. Akrapovic titanium exhaust replicates</span>
                <strong className="text-white">82 builds</strong>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-5 rounded-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-red" />
              <span>Tuner Gatherings & Events</span>
            </h3>
            <div className="p-3 bg-white/2 border border-white/5 rounded-sm space-y-1.5 text-xs">
              <span className="font-bold text-white block">Mumbai Monsoon Dyno Day</span>
              <p className="text-text-secondary text-[11px] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-text-muted" /> July 26, 2026
              </p>
              <p className="text-text-secondary text-[11px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-text-muted" /> Jio World Drive, BKC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
