import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-light tracking-widest text-gray-900">
          STREEBYSREE
        </Link>
        
        <nav className="hidden space-x-8 md:flex">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/shop" className="text-sm text-gray-600 hover:text-gray-900">Shop</Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Cart placeholder */}
          <button className="text-sm text-gray-600 hover:text-gray-900">
            Cart (0)
          </button>
        </div>
      </div>
    </header>
  );
}