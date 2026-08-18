'use client';

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-[#FAF8F5]/90 backdrop-blur-md">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* LEFT: Hamburger Toggle (Mobile) & Navigation (Desktop) */}
          <div className="flex flex-1 items-center justify-start gap-4">
            {/* Hamburger Button (Mobile Only) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex flex-col justify-center items-center h-8 w-6 space-y-1.5 focus:outline-none group"
              aria-label="Open mobile menu"
            >
              <span className="block h-[1px] w-full bg-stone-800 group-hover:bg-[#8B5A2B] transition-colors"></span>
              <span className="block h-[1px] w-full bg-stone-800 group-hover:bg-[#8B5A2B] transition-colors"></span>
              <span className="block h-[1px] w-full bg-stone-800 group-hover:bg-[#8B5A2B] transition-colors"></span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-[#8B5A2B]">Home</Link>
              <Link href="/shop" className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-[#8B5A2B]">Shop</Link>
              <Link href="/about" className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-[#8B5A2B]">About</Link>
            </nav>
          </div>
          
          {/* CENTER: Traditional Serif Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <Link href="/" className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-wide">
              Stree by Sree
            </Link>
          </div>

          {/* RIGHT: Search & Cart Icon */}
          <div className="flex flex-1 items-center justify-end gap-6">
            {/* Search Icon */}
            <button className="hidden md:block text-stone-800 hover:text-[#8B5A2B] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>

            {/* Cart Icon with Notification Badge */}
            <button 
              onClick={openCart}
              className="relative text-stone-800 hover:text-[#8B5A2B] transition-colors p-1"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {/* The little number badge that appears when items are added */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8B5A2B] text-[9px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE SLIDE-OUT MENU --- */}
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-[70] w-4/5 max-w-sm bg-[#FAF8F5] shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-stone-200">
          <span className="text-xl font-serif tracking-wide text-stone-900">
            Menu
          </span>
          <button 
            onClick={closeMenu} 
            className="p-2 text-2xl font-light text-stone-400 hover:text-stone-900"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col space-y-6 px-6 pt-8">
          <Link href="/" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-[#8B5A2B]">
            Home
          </Link>
          <Link href="/shop" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-[#8B5A2B]">
            Shop All
          </Link>
          <Link href="/about" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-[#8B5A2B]">
            About Us
          </Link>
        </nav>

        <div className="mt-8 mx-6 border-t border-stone-200 pt-8">
          <a 
            href="https://wa.me/918891027146" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-[#8B5A2B]"
          >
            Chat with Support ✦
          </a>
        </div>

        <div className="mt-auto px-6 pb-8 flex flex-col space-y-4">
          <Link href="/shipping" onClick={closeMenu} className="text-[10px] uppercase tracking-wider text-stone-500 hover:text-stone-900">
            Shipping & Returns
          </Link>
          <Link href="/terms" onClick={closeMenu} className="text-[10px] uppercase tracking-wider text-stone-500 hover:text-stone-900">
            Privacy & Terms
          </Link>
        </div>
      </div>
    </>
  );
}