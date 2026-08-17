import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand Identity */}
          <div>
            <h3 className="text-lg font-light tracking-widest text-blue-950 uppercase mb-4">
              StreebySree
            </h3>
            <p className="text-xs font-light leading-relaxed text-gray-500 max-w-xs mx-auto md:mx-0">
              Premium anti-tarnish & waterproof jewellery designed for the modern traditionalist.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold tracking-[0.2em] text-blue-950 uppercase mb-2">Shop</h4>
            <Link href="/" className="text-xs text-gray-500 hover:text-amber-700 uppercase tracking-widest">Home</Link>
            <Link href="/shop" className="text-xs text-gray-500 hover:text-amber-700 uppercase tracking-widest">Shop All</Link>
            <Link href="/about" className="text-xs text-gray-500 hover:text-amber-700 uppercase tracking-widest">Our Story</Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold tracking-[0.2em] text-blue-950 uppercase mb-2">Help & Policies</h4>
            <Link href="/shipping" className="text-xs text-gray-500 hover:text-amber-700 uppercase tracking-widest">Shipping & Returns</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-amber-700 uppercase tracking-widest">Privacy & Terms</Link>
            <a href="https://wa.me/918891027146" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-700 hover:text-emerald-800 uppercase tracking-widest font-medium">
              WhatsApp Support
            </a>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-100 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} StreebySree. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}