// components/BeforeAfterSlider.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { MoveLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
}

export default function BeforeAfterSlider({ beforeImg, afterImg }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(position);
  };

  const handleMouseDown = () => setIsDragging(true);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[360px] w-full rounded-md overflow-hidden border border-white/10 select-none cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image Container (Full size backdrop) */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={afterImg} 
          alt="Modified Vehicle" 
          className="w-full h-full object-cover pointer-events-none"
        />
        <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-[10px] font-bold tracking-wider text-white px-2.5 py-1 rounded-sm">
          AFTER BUILD
        </span>
      </div>

      {/* Before Image Container (Sliding clipping cover) */}
      <div 
        className="absolute inset-y-0 left-0 h-full overflow-hidden border-r-2 border-white"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* We fix the width of the img to match the container clientWidth to prevent squash stretching */}
        <div className="absolute inset-0 h-full w-[100vw] min-w-[680px]">
          <img 
            src={beforeImg} 
            alt="Stock Vehicle" 
            className="h-full w-full object-cover pointer-events-none"
            style={{ width: containerRef.current?.clientWidth || 680 }}
          />
        </div>
        <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-[10px] font-bold tracking-wider text-white px-2.5 py-1 rounded-sm z-10">
          STOCK VEHICLE
        </span>
      </div>

      {/* Slider dragging button handles */}
      <div 
        className="absolute inset-y-0 -ml-[18px] w-9 z-20 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-9 h-9 rounded-full bg-white text-bg-primary shadow-2xl flex items-center justify-center border border-white/20 pointer-events-auto">
          <MoveLeftRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
