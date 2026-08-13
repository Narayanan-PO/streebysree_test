import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative flex h-[80vh] items-center justify-center bg-stone-50 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 block text-xs font-semibold tracking-widest text-gray-500 uppercase">
            New Arrival
          </span>
          <h1 className="text-5xl font-light tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            Everyday Elegance
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
            Discover our premium collection of minimal, anti-tarnish jewellery designed for the modern woman.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/shop"
              className="bg-gray-900 px-10 py-4 text-sm font-medium tracking-widest text-white transition-colors hover:bg-gray-800"
            >
              SHOP COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-light tracking-wide text-gray-900">Shop by Category</h2>
            <div className="mx-auto mt-4 h-[1px] w-12 bg-gray-300"></div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Category 1 */}
            <Link href="/category/necklaces" className="group block">
              <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 transition-opacity group-hover:opacity-90">
                {/* Image Placeholder */}
                <div className="flex h-full w-full items-center justify-center text-sm tracking-widest text-gray-400">
                  NECKLACES IMAGE
                </div>
              </div>
              <h3 className="mt-6 text-center text-sm font-medium tracking-widest text-gray-900 uppercase">
                Necklaces
              </h3>
            </Link>

            {/* Category 2 */}
            <Link href="/category/earrings" className="group block">
              <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 transition-opacity group-hover:opacity-90">
                {/* Image Placeholder */}
                <div className="flex h-full w-full items-center justify-center text-sm tracking-widest text-gray-400">
                  EARRINGS IMAGE
                </div>
              </div>
              <h3 className="mt-6 text-center text-sm font-medium tracking-widest text-gray-900 uppercase">
                Earrings
              </h3>
            </Link>

            {/* Category 3 */}
            <Link href="/category/rings" className="group block sm:hidden lg:block">
              <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 transition-opacity group-hover:opacity-90">
                {/* Image Placeholder */}
                <div className="flex h-full w-full items-center justify-center text-sm tracking-widest text-gray-400">
                  RINGS IMAGE
                </div>
              </div>
              <h3 className="mt-6 text-center text-sm font-medium tracking-widest text-gray-900 uppercase">
                Rings
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BRAND STORY / WHY US */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light tracking-wide text-gray-900">The StreebySree Promise</h2>
          <p className="mt-8 text-lg leading-relaxed text-gray-600">
            We believe that beautiful jewellery shouldn't be reserved for special occasions. 
            Our pieces are thoughtfully curated to be your everyday companions—crafted from high-quality, 
            anti-tarnish materials that withstand the test of time, without compromising on elegance.
          </p>
        </div>
      </section>
    </div>
  );
}