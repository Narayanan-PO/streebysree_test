'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function MaroonHeader() {
  const pathname = usePathname();
  
  // FIXED: Using openCart and cartCount directly from your Context
  const { cartCount, openCart } = useCart(); 

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Our Story", href: "/about" },
    { name: "Reviews", href: "/#reviews" },
  ];

  const trustSignals = [
    "Waterproof",
    "Anti-Tarnish",
    "Skin Friendly",
    "Delivered in 1-2 days" 
  ];

  return (
    <header className="w-full flex flex-col bg-[#4A1C1C] text-[#D4AF37] border-b border-[#D4AF37]/20 shadow-md">
      
      {/* TOP BAR: Main Navigation */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="text-2xl sm:text-3xl font-serif tracking-wide drop-shadow-sm">
          Stree <span className="italic font-light">by</span> Sree
        </Link>

        {/* Center Nav Links (Hidden on small screens) */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:text-white ${
                pathname === link.href ? "text-white" : "text-[#D4AF37]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions: WhatsApp & Cart */}
        <div className="flex items-center gap-6">
          <a 
            href="https://wa.me/918891027146" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:block border border-[#D4AF37] px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-[#D4AF37] hover:text-[#4A1C1C]"
          >
            Order on WhatsApp
          </a>

          {/* Cart Icon */}
          <button 
            onClick={openCart} // FIXED: Now triggers openCart()
            className="group relative flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:text-white"
          >
            <span>Bag</span>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] font-bold text-[#4A1C1C]">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* BOTTOM BAR: Trust Banner */}
      <div className="w-full bg-[#3A1515] border-t border-[#D4AF37]/10 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 sm:gap-12 flex-wrap px-4">
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-[#D4AF37] text-[10px]">✦</span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#E8E1D9] uppercase">
                {signal}
              </span>
            </div>
          ))}
        </div>
      </div>

    </header>
  );
}