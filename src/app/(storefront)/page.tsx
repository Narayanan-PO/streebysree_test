import { supabase } from "@/lib/supabase";
import Link from "next/link";
import HeroCarousel from "@/components/layout/HeroCarousel"; // Adjust path if needed!

export const dynamic = 'force-dynamic';

// Elegant placeholder images for the categories
// Elegant placeholder images for the categories - Updated broken links
const categories = [
  { name: 'Necklaces', image: 'https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmVja2xhY2V8ZW58MHx8MHx8fDA%3D' }, // Replaced broken image
  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop' },
  { name: 'Rings', image: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpbmdzfGVufDB8fDB8fHww' }, // Replaced broken image
  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop' }
];

export default async function HomePage() {
  // Fetch 4 featured products from your Supabase database
  const { data: featuredProducts, error } = await supabase
    .from('products')
    .select('*')
    .limit(4);

  const products = featuredProducts || [];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION (Now using the animated carousel) */}
      <HeroCarousel />

      {/* 2. SHOP BY CATEGORY (Now with elegant images) */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-12 text-lg font-light tracking-widest text-blue-950 uppercase">Shop by Category</h2>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="group flex flex-col items-center">
                <div className="mb-4 aspect-square w-full max-w-[120px] overflow-hidden rounded-full bg-[#FAFAFA] p-1 border border-stone-200 transition-colors group-hover:border-amber-700">
                  <div className="h-full w-full overflow-hidden rounded-full bg-stone-100">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                </div>
                <span className="text-xs font-medium tracking-[0.2em] text-gray-900 uppercase transition-colors group-hover:text-amber-700">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="bg-[#FAFAFA] py-16 sm:py-24 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center justify-between sm:flex-row">
            <h2 className="mb-4 text-lg font-light tracking-widest text-blue-950 uppercase sm:mb-0">
              Trending Now
            </h2>
            <Link href="/shop" className="border-b border-amber-700 pb-1 text-xs font-medium tracking-[0.2em] text-amber-700 uppercase transition-colors hover:text-blue-950 hover:border-blue-950">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-12">
            {products.map((product) => {
              const imageUrl = product.Image || product.image || product.image_url;
              const productName = product.Name || product.name || 'Product';
              const productPrice = product.Price || product.price || 0;

              return (
                <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col">
                  <div className="mb-4 aspect-[4/5] w-full overflow-hidden bg-white border border-stone-200">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={productName} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] tracking-widest text-gray-400">
                        NO IMAGE
                      </div>
                    )}
                  </div>
                  <h3 className="text-xs font-medium tracking-wider text-blue-950 uppercase line-clamp-1">
                    {productName}
                  </h3>
                  <p className="mt-2 text-sm text-gray-900 font-medium">
                    ₹{productPrice}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TRUST SIGNALS */}
      <section className="py-16 text-center text-blue-950 bg-white">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 px-4">
          <div className="flex flex-col items-center">
            <span className="mb-3 text-2xl text-amber-700">✦</span>
            <h4 className="mb-2 text-xs font-bold tracking-[0.2em] uppercase">Waterproof</h4>
            <p className="text-xs font-light text-gray-600">Wear it everyday, everywhere.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-3 text-2xl text-amber-700">✦</span>
            <h4 className="mb-2 text-xs font-bold tracking-[0.2em] uppercase">Anti-Tarnish</h4>
            <p className="text-xs font-light text-gray-600">Premium materials that last.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-3 text-2xl text-amber-700">✦</span>
            <h4 className="mb-2 text-xs font-bold tracking-[0.2em] uppercase">Fast Support</h4>
            <p className="text-xs font-light text-gray-600">Direct ordering via WhatsApp.</p>
          </div>
        </div>
      </section>
      
    </div>
  );
}