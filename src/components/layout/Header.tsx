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
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        {/* Increased height slightly to h-20 for a more premium feel */}
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* LEFT: Hamburger Toggle & Logo */}
          <div className="flex w-1/2 md:w-1/3 items-center justify-start gap-3 sm:gap-4">
            {/* Hamburger Button (Mobile Only) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex flex-col justify-center items-center h-8 w-6 space-y-1.5 focus:outline-none"
              aria-label="Open mobile menu"
            >
              <span className="block h-[1px] w-full bg-blue-950"></span>
              <span className="block h-[1px] w-full bg-blue-950"></span>
              <span className="block h-[1px] w-full bg-blue-950"></span>
            </button>

            {/* Logo */}
            <Link href="/" className="text-lg sm:text-xl font-light tracking-widest text-blue-950 uppercase">
              StreebySree
            </Link>
          </div>
          
          {/* CENTER: Navigation (Locked in the absolute center, Desktop Only) */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 space-x-10 md:flex">
            <Link href="/" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-amber-700">Home</Link>
            <Link href="/shop" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-amber-700">Shop</Link>
            <Link href="/about" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-amber-700">About</Link>
          </nav>

          {/* RIGHT: Cart */}
          <div className="flex w-1/2 md:w-1/3 justify-end">
            <button 
              onClick={openCart}
              className="text-xs font-medium uppercase tracking-[0.2em] text-blue-950 transition-colors hover:text-amber-700"
            >
              Cart ({cartCount})
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE SLIDE-OUT MENU --- */}
      
      {/* 1. Dark Background Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* 2. The Menu Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-[70] w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-stone-100">
          <span className="text-xl font-light tracking-widest text-blue-950 uppercase">
            Menu
          </span>
          <button 
            onClick={closeMenu} 
            className="p-2 text-2xl font-light text-gray-400 hover:text-gray-900"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Drawer Main Links */}
        <nav className="flex flex-col space-y-6 px-6 pt-8">
          <Link href="/" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-gray-900 transition-colors hover:text-amber-700">
            Home
          </Link>
          <Link href="/shop" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-gray-900 transition-colors hover:text-amber-700">
            Shop All
          </Link>
          <Link href="/about" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-gray-900 transition-colors hover:text-amber-700">
            About Us
          </Link>
        </nav>

        {/* Drawer WhatsApp Support */}
        <div className="mt-8 mx-6 border-t border-stone-100 pt-8">
          <a 
            href="https://wa.me/918891027146" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 transition-colors hover:text-emerald-800"
          >
            Chat with Support ✦
          </a>
        </div>

        {/* Drawer Footer / Legal Links */}
        <div className="mt-auto px-6 pb-8 flex flex-col space-y-4">
          <Link href="/shipping" onClick={closeMenu} className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-gray-900">
            Shipping & Returns
          </Link>
          <Link href="/terms" onClick={closeMenu} className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-gray-900">
            Privacy & Terms
          </Link>
        </div>
      </div>
    </>
  );
}