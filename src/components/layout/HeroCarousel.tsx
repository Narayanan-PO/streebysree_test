'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// You can swap these Unsplash URLs with your own banner images later!
// Updated with reliable placeholder URLs
const bannerImages = [
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2940&auto=format&fit=crop", // Replaced broken image
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2940&auto=format&fit=crop"
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically switch images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] w-full bg-blue-950 overflow-hidden">
      {/* Background Images fading in and out */}
      {bannerImages.map((src, index) => (
        <img 
          key={src}
          src={src} 
          alt="Premium Jewelry Collection" 
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-70' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      {/* Text Content overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 text-xs font-medium tracking-[0.3em] text-amber-500 uppercase drop-shadow-md">
          New Collection
        </span>
        <h1 className="mb-6 text-4xl font-light tracking-widest text-white uppercase sm:text-6xl drop-shadow-lg">
          Everyday Elegance
        </h1>
        <p className="mb-8 max-w-md text-sm font-light leading-relaxed text-white drop-shadow-md">
          Premium anti-tarnish & waterproof jewellery designed for the modern traditionalist.
        </p>
        <Link 
          href="/shop" 
          className="border border-amber-500 bg-blue-950/40 px-8 py-4 text-xs font-medium tracking-[0.2em] text-amber-500 uppercase backdrop-blur-sm transition-colors hover:bg-amber-600 hover:text-white"
        >
          Shop The Collection
        </Link>
      </div>
    </section>
  );
}