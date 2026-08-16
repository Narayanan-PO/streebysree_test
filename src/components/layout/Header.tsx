'use client';
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Header() {
  const { cartCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      {/* Increased height slightly to h-20 for a more premium feel */}
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LEFT: Logo */}
        <div className="flex w-1/3 justify-start">
          <Link href="/" className="text-xl font-light tracking-widest text-blue-950 uppercase">
            StreebySree
          </Link>
        </div>
        
        {/* CENTER: Navigation (Locked in the absolute center) */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 space-x-10 md:flex">
          <Link href="/" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-amber-700">Home</Link>
          <Link href="/shop" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-amber-700">Shop</Link>
          <Link href="/about" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-amber-700">About</Link>
        </nav>

        {/* RIGHT: Cart */}
        <div className="flex w-1/3 justify-end">
          <button 
            onClick={openCart}
            className="text-xs font-medium uppercase tracking-[0.2em] text-blue-950 transition-colors hover:text-amber-700"
          >
            Cart ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
}