import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-10 mt-auto">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand Identity */}
        <div className="mb-8">
          <h3 className="text-lg font-light tracking-widest text-blue-950 uppercase mb-3">
            StreebySree
          </h3>
          <p className="text-xs font-light leading-relaxed text-gray-500 max-w-md mx-auto">
            Premium anti-tarnish & waterproof jewellery designed for the modern traditionalist.
          </p>
        </div>

        {/* Inline Navigation Links (The Pipe Layout!) */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-3 mb-8">
          <Link href="/" className="text-[10px] text-gray-500 hover:text-amber-700 uppercase tracking-widest transition-colors">Home</Link>
          <span className="text-stone-300 text-[10px]">|</span>
          
          <Link href="/shop" className="text-[10px] text-gray-500 hover:text-amber-700 uppercase tracking-widest transition-colors">Shop All</Link>
          <span className="text-stone-300 text-[10px]">|</span>
          
          <Link href="/about" className="text-[10px] text-gray-500 hover:text-amber-700 uppercase tracking-widest transition-colors">Our Story</Link>
          <span className="text-stone-300 text-[10px]">|</span>
          
          <Link href="/shipping" className="text-[10px] text-gray-500 hover:text-amber-700 uppercase tracking-widest transition-colors">Shipping & Returns</Link>
          <span className="text-stone-300 text-[10px]">|</span>
          
          <Link href="/terms" className="text-[10px] text-gray-500 hover:text-amber-700 uppercase tracking-widest transition-colors">Privacy & Terms</Link>
          <span className="text-stone-300 text-[10px]">|</span>
          
          <a href="https://wa.me/918891027146" target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-700 hover:text-emerald-800 uppercase tracking-widest font-medium transition-colors">
            WhatsApp Support
          </a>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-stone-100">
          <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} StreebySree. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}