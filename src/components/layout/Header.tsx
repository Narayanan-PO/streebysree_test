'use client';

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Fetch unique categories dynamically from Supabase
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('products')
        .select('Category');

      if (!error && data) {
        const unique = Array.from(
          new Set(
            data
              .map((item: { Category?: string }) => item.Category?.trim())
              .filter((cat): cat is string => Boolean(cat))
          )
        ).sort();
        setCategories(unique);
      }
    }

    fetchCategories();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-[#FAF8F5]/90 backdrop-blur-md overflow-hidden">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* --- NORMAL HEADER CONTENT --- */}
          <div className={`flex w-full items-center justify-between transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            
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
            
            <div className="flex flex-1 justify-center text-center">
              <Link href="/" className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-wide hover:text-[#8B5A2B] transition-colors">
                Stree by Sree
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end gap-5">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-stone-800 hover:text-[#8B5A2B] transition-colors p-1"
                aria-label="Open search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>

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

          {/* --- INLINE SEARCH BAR --- */}
          <div className={`absolute inset-0 flex items-center justify-center px-4 sm:px-8 transition-all duration-300 ${isSearchOpen ? 'opacity-100 z-20 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
            <form onSubmit={handleSearchSubmit} className="flex w-full max-w-2xl items-center border-b border-stone-300 pb-2 focus-within:border-stone-900 transition-colors">
              <svg className="w-5 h-5 text-stone-400 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              
              <input 
                type="text" 
                placeholder="Search for jewelry..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-stone-900 focus:outline-none placeholder:text-stone-400 tracking-wider"
                autoFocus={isSearchOpen}
              />
              
              <button 
                type="submit" 
                disabled={!searchQuery.trim()}
                className={`flex-shrink-0 px-2 transition-all duration-300 ${
                  searchQuery.trim() 
                    ? 'text-stone-800 hover:text-[#8B5A2B] opacity-100' 
                    : 'text-stone-300 opacity-0 pointer-events-none'
                }`}
                aria-label="Submit Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>

              <div className="h-4 w-[1px] bg-stone-300 mx-2"></div>

              <button 
                type="button" 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                className="flex-shrink-0 p-1 text-stone-400 hover:text-stone-900 transition-colors"
                aria-label="Close Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
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
        className={`fixed inset-y-0 left-0 z-[70] w-4/5 max-w-xs bg-[#FAF8F5] shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between overflow-hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200/80">
            <span className="text-lg font-serif tracking-wide text-stone-900">Collections & Menu</span>
            <button onClick={closeMenu} className="p-1 text-2xl font-light text-stone-400 hover:text-stone-900 leading-none">×</button>
          </div>

          {/* Main Navigation */}
          <div className="px-6 py-6 border-b border-stone-200/60">
            <nav className="flex flex-col space-y-4">
              <Link href="/" onClick={closeMenu} className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-800 hover:text-[#8B5A2B] transition-colors">
                Home
              </Link>
              <Link href="/shop" onClick={closeMenu} className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-800 hover:text-[#8B5A2B] transition-colors">
                Shop All Collections
              </Link>
            </nav>
          </div>

          {/* Dynamic Categories Section */}
          <div className="px-6 py-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-4">
              Shop By Ornament
            </h4>
            <div className="flex flex-col space-y-3.5">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/shop?category=${encodeURIComponent(cat)}`}
                    onClick={closeMenu}
                    className="text-sm font-light text-stone-700 hover:text-[#8B5A2B] transition-colors flex items-center justify-between"
                  >
                    <span>{cat}</span>
                    <span className="text-stone-300 text-xs">→</span>
                  </Link>
                ))
              ) : (
                <Link
                  href="/shop"
                  onClick={closeMenu}
                  className="text-xs text-stone-500 hover:text-[#8B5A2B] italic transition-colors"
                >
                  View All Products →
                </Link>
              )}
            </div>
          </div>

          {/* Additional Links */}
          <div className="px-6 py-4 border-t border-stone-200/60">
            <div className="flex flex-col space-y-3">
              <Link href="/about" onClick={closeMenu} className="text-xs uppercase tracking-[0.15em] text-stone-500 hover:text-stone-900 transition-colors">
                About Our Brand
              </Link>
              <Link href="/shipping" onClick={closeMenu} className="text-xs uppercase tracking-[0.15em] text-stone-500 hover:text-stone-900 transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>

        {/* WhatsApp Footer */}
        <div className="p-5 border-t border-stone-200 bg-[#F5F2EC]">
          <a 
            href="https://wa.me/918891027146" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#1E293B] text-[#EAB308] text-[11px] font-bold uppercase tracking-[0.15em] rounded-md shadow-sm hover:bg-stone-800 transition-colors text-center"
          >
            <span>Chat on WhatsApp</span>
            <span>✦</span>
          </a>
        </div>
      </div>
    </>
  );
}