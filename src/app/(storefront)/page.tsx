import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative flex h-[80vh] items-center justify-center bg-[#FAFAFA] text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 block text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">
            New Arrival
          </span>
          <h1 className="text-5xl font-light tracking-widest text-blue-950 sm:text-6xl md:text-7xl uppercase">
            Everyday Elegance
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light tracking-wide text-gray-500">
            Discover our premium collection of minimal, anti-tarnish jewellery designed for the modern woman.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center border border-blue-950 bg-transparent px-10 py-4 text-xs font-medium tracking-[0.2em] text-blue-950 uppercase transition-all duration-500 hover:bg-blue-950 hover:text-white"
            >
              SHOP COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-light tracking-widest text-blue-950 uppercase">Shop by Category</h2>
            <div className="mx-auto mt-6 h-[2px] w-16 bg-amber-600/80"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Category 1 */}
            <Link href="/category/necklaces" className="group block">
              <div className="aspect-[4/5] w-full overflow-hidden border border-stone-100 bg-[#FAFAFA]">
                <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400 transition-transform duration-700 ease-in-out group-hover:scale-105">
                  NECKLACES IMAGE
                </div>
              </div>
              <h3 className="mt-6 text-center text-sm font-medium tracking-widest text-blue-950 uppercase transition-colors group-hover:text-amber-700">
                Necklaces
              </h3>
            </Link>

            {/* Category 2 */}
            <Link href="/category/earrings" className="group block">
              <div className="aspect-[4/5] w-full overflow-hidden border border-stone-100 bg-[#FAFAFA]">
                <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400 transition-transform duration-700 ease-in-out group-hover:scale-105">
                  EARRINGS IMAGE
                </div>
              </div>
              <h3 className="mt-6 text-center text-sm font-medium tracking-widest text-blue-950 uppercase transition-colors group-hover:text-amber-700">
                Earrings
              </h3>
            </Link>

            {/* Category 3 */}
            <Link href="/category/rings" className="group block sm:hidden lg:block">
              <div className="aspect-[4/5] w-full overflow-hidden border border-stone-100 bg-[#FAFAFA]">
                <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400 transition-transform duration-700 ease-in-out group-hover:scale-105">
                  RINGS IMAGE
                </div>
              </div>
              <h3 className="mt-6 text-center text-sm font-medium tracking-widest text-blue-950 uppercase transition-colors group-hover:text-amber-700">
                Rings
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BRAND STORY / WHY US */}
      <section className="bg-[#FAFAFA] py-24 border-t border-stone-100">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light tracking-widest text-blue-950 uppercase">The Promise</h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-amber-600/80"></div>
          <p className="mt-10 text-lg font-light leading-loose text-gray-500">
            We believe that beautiful jewellery shouldn't be reserved for special occasions. 
            Our pieces are thoughtfully curated to be your everyday companions—crafted from high-quality, 
            anti-tarnish materials that withstand the test of time, without compromising on elegance.
          </p>
        </div>
      </section>
    </div>
  );
}