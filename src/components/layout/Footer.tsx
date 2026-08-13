import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-lg font-light tracking-widest text-gray-900">STREEBYSREE</h2>
        <p className="mt-4 text-sm text-gray-500">Premium Everyday Jewellery</p>
        
        <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-500">
          <Link href="/policies" className="hover:text-gray-900">Shipping & Returns</Link>
          <span>|</span>
          <a href="https://wa.me/918891027146" target="_blank" rel="noreferrer" className="hover:text-gray-900">
            WhatsApp: 8891027146
          </a>
        </div>
        
        <p className="mt-12 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} StreebySree. All rights reserved.
        </p>
      </div>
    </footer>
  );
}