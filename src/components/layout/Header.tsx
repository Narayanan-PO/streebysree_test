'use client';

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-[#FAF8F5]/90 backdrop-blur-md">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* LEFT: Hamburger Toggle (Mobile) & Navigation (Desktop) */}
          <div className="flex flex-1 items-center justify-start gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex flex-col justify-center items-center h-8 w-6 space-y-1.5 focus:outline-none group"
              aria-label="Open mobile menu"
            >
              <span className="block h-[1px] w-full bg-stone-800 group-hover:bg-[#8B5A2B] transition-colors"></span>
              <span className="block h-[1px] w-full bg-stone-800 group-hover:bg-[#8B5A2B] transition-colors"></span>
              <span className="block h-[1px] w-full bg-stone-800 group-hover:bg-[#8B5A2B] transition-colors"></span>
            </button>

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
            {/* Interactive Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-stone-800 hover:text-[#8B5A2B] transition-colors p-1"
              aria-label="Open search"
            >
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
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8B5A2B] text-[9px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- SEARCH OVERLAY MODAL --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-start pt-24 px-4 transition-opacity">
          <div className="bg-[#FAF8F5] w-full max-w-2xl p-6 sm:p-8 rounded-sm shadow-2xl relative border border-stone-200">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 text-2xl font-light"
            >
              ×
            </button>
            
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-stone-900 mb-4 text-center">Search Our Collection</h3>
            
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type a jewelry name (e.g., necklace, huggies)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-white border border-stone-300 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-[#8B5A2B]"
              />
              <button 
                type="submit" 
                className="bg-stone-900 text-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#8B5A2B] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setIsSearchOpen(false)} />
        </div>
      )}

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
          <span className="text-xl font-serif tracking-wide text-stone-900">Menu</span>
          <button onClick={closeMenu} className="p-2 text-2xl font-light text-stone-400 hover:text-stone-900">×</button>
        </div>

        <nav className="flex flex-col space-y-6 px-6 pt-8">
          <Link href="/" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-[#8B5A2B]">Home</Link>
          <Link href="/shop" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-[#8B5A2B]">Shop All</Link>
          <Link href="/about" onClick={closeMenu} className="text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-[#8B5A2B]">About Us</Link>
        </nav>

        <div className="mt-8 mx-6 border-t border-stone-200 pt-8">
          <a href="https://wa.me/918891027146" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-[#8B5A2B]">
            Chat with Support ✦
          </a>
        </div>
      </div>
    </>
  );
}