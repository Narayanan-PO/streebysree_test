import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-100 bg-white py-16 text-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Brand Name */}
        <h2 className="text-base font-light tracking-[0.3em] text-blue-950 uppercase">
          StreebySree
        </h2>
        <p className="mt-3 text-xs font-light tracking-widest text-gray-400">
          Premium Everyday Jewellery
        </p>
        
        {/* Links */}
        <div className="mx-auto mt-10 flex max-w-md justify-center space-x-10 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
          <Link href="/shipping" className="transition-colors hover:text-amber-700">
            Shipping & Returns
          </Link>
          <a 
            href="https://wa.me/918891027146" 
            target="_blank" 
            rel="noreferrer" 
            className="transition-colors hover:text-amber-700"
          >
            WhatsApp
          </a>
        </div>
        
        {/* Copyright */}
        <div className="mt-16 text-[9px] font-medium tracking-[0.2em] text-gray-400 uppercase">
          &copy; {new Date().getFullYear()} StreebySree. All rights reserved.
        </div>

      </div>
    </footer>
  );
}