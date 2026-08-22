import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 60;

export default async function AboutPage() {
  const { data: settings } = await supabase.from('store_settings').select('*').eq('id', 1).single();

  const p1 = settings?.about_philosophy_p1 || "StreebySree was born out of a desire to bridge the gap between traditional elegance and modern convenience. We believe that jewelry should not just be for special occasions, locked away in a safe, but should be an effortless part of your everyday expression.";
  const p2 = settings?.about_philosophy_p2 || "Our pieces are thoughtfully curated for the modern traditionalist—individuals who appreciate the rich aesthetics of classic design but require the durability for everyday wear. Every piece is crafted to look luxurious while being resilient enough for daily life.";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Soft Neutral Editorial Header */}
      <section className="bg-[#FAF9F6] py-28 px-4 text-center border-b border-stone-200">
        <h1 className="text-3xl font-light tracking-[0.3em] text-stone-800 uppercase sm:text-5xl ml-[0.3em]">
          Our Story
        </h1>
        <div className="mt-8 mx-auto h-[1px] w-12 bg-stone-300"></div>
        <p className="mt-8 text-[10px] font-medium tracking-[0.3em] text-stone-500 uppercase">
          Everyday Elegance
        </p>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="space-y-12 text-center">
          
          {/* Brand Philosophy */}
          <div>
            <h2 className="text-xl font-light tracking-widest text-stone-800 uppercase mb-6">
              The Philosophy
            </h2>
            <p className="text-sm font-light leading-relaxed text-gray-600 whitespace-pre-wrap">
              {p1}
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-gray-600 whitespace-pre-wrap">
              {p2}
            </p>
          </div>

          {/* Quality Pillars */}
          <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-3 border-t border-stone-100">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-2xl text-amber-700">✦</span>
              <h3 className="text-xs font-bold tracking-[0.2em] text-stone-800 uppercase mb-2">Waterproof</h3>
              <p className="text-xs font-light text-gray-500">Designed to withstand your daily routine, from showers to swims.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-4 text-2xl text-amber-700">✦</span>
              <h3 className="text-xs font-bold tracking-[0.2em] text-stone-800 uppercase mb-2">Anti-Tarnish</h3>
              <p className="text-xs font-light text-gray-500">Premium materials ensure your pieces keep their golden shine over time.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-4 text-2xl text-amber-700">✦</span>
              <h3 className="text-xs font-bold tracking-[0.2em] text-stone-800 uppercase mb-2">Skin Friendly</h3>
              <p className="text-xs font-light text-gray-500">Hypoallergenic materials that are safe and comfortable for sensitive skin.</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-12">
            <Link 
              href="/shop" 
              className="inline-block border border-stone-800 bg-stone-800 px-8 py-4 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-white hover:text-stone-800"
            >
              Explore The Collection
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}