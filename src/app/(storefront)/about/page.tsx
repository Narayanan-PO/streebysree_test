import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Header Section */}
      <section className="bg-blue-950 py-20 px-4 text-center">
        <h1 className="text-3xl font-light tracking-widest text-white uppercase sm:text-5xl drop-shadow-sm">
          Our Story
        </h1>
        <div className="mt-6 mx-auto h-[1px] w-16 bg-amber-500"></div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="space-y-12 text-center">
          
          {/* Brand Philosophy */}
          <div>
            <h2 className="text-xl font-light tracking-widest text-blue-950 uppercase mb-6">
              The StreebySree Philosophy
            </h2>
            <p className="text-sm font-light leading-relaxed text-gray-600">
              StreebySree was born out of a desire to bridge the gap between traditional elegance and modern convenience. We believe that jewelry should not just be for special occasions, locked away in a safe, but should be an effortless part of your everyday expression.
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-gray-600">
              Our pieces are thoughtfully curated for the modern traditionalist—individuals who appreciate the rich aesthetics of classic design but require the durability for everyday wear. Every piece is crafted to look luxurious while being resilient enough for daily life.
            </p>
          </div>

          {/* Quality Pillars */}
          <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-3 border-t border-stone-100">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-2xl text-amber-700">✦</span>
              <h3 className="text-xs font-bold tracking-[0.2em] text-blue-950 uppercase mb-2">Waterproof</h3>
              <p className="text-xs font-light text-gray-500">Designed to withstand your daily routine, from showers to swims.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-4 text-2xl text-amber-700">✦</span>
              <h3 className="text-xs font-bold tracking-[0.2em] text-blue-950 uppercase mb-2">Anti-Tarnish</h3>
              <p className="text-xs font-light text-gray-500">Premium materials ensure your pieces keep their golden shine over time.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-4 text-2xl text-amber-700">✦</span>
              <h3 className="text-xs font-bold tracking-[0.2em] text-blue-950 uppercase mb-2">Skin Friendly</h3>
              <p className="text-xs font-light text-gray-500">Hypoallergenic materials that are safe and comfortable for sensitive skin.</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-12">
            <Link 
              href="/shop" 
              className="inline-block border border-blue-950 bg-blue-950 px-8 py-4 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-white hover:text-blue-950"
            >
              Explore The Collection
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}