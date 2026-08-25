import { supabase } from "@/lib/supabase";
import Link from "next/link";
import TestimonialsCarousel from "@/components/TestimonialsCarousel"; // 1. ADDED IMPORT

export const revalidate = 60;

export default async function HomePage() {
  // 1. Fetch Store Settings
  const { data: settings } = await supabase.from('store_settings').select('*').eq('id', 1).single();
  
  // 2. Fetch Categories
  const { data: categoriesData } = await supabase.from('categories').select('*').order('name');
  const categories = categoriesData || [];

  // 3. Fetch Featured Products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })
    .limit(4);
  const products = featuredProducts || [];

  // 4. Fetch ALL active Testimonials (no limit - carousel paginates them)
  const { data: testimonialData } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false }); // 2. REMOVED .limit(3)
  const testimonials = testimonialData || [];

  // Fallbacks just in case the database is empty
  const heroImage = settings?.hero_image || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2940&auto=format&fit=crop";
  const heroTagline = settings?.hero_tagline || "Adorning Every Stree";
  const heroTitle = settings?.hero_title || "Stree by Sree";
  const heroDesc = settings?.hero_description || "Traditional, lightweight, and anti-tarnish jewellery designed for everyday elegance.";

  const storyTitle = settings?.story_title || "Our Story";
  const storyText = settings?.story_text || "Stree by Sree began with a simple idea: traditional jewellery shouldn't mean choosing between beauty and everyday wearability. Every piece is designed to be lightweight, anti-tarnish, and true to the elegance of Indian craftsmanship.";
  const storyImage = settings?.story_image || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1600&auto=format&fit=crop";

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      
      {/* 0. PROMO BANNER (Only shows if active in Admin) */}
      {settings?.promo_banner_active && settings?.promo_banner_text && (
        <div className="w-full bg-[#8B5A2B] px-4 py-2 text-center transition-all">
          <p className="text-xs font-medium tracking-[0.2em] text-white uppercase">
            {settings.promo_banner_text}
          </p>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative h-[75vh] w-full bg-[#3A2D23]">
        <img 
          src={heroImage} 
          alt={heroTitle} 
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2015]/80 to-transparent"></div>
        
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <span className="mb-4 text-xs font-medium tracking-[0.3em] text-[#D4AF37] uppercase drop-shadow-md">
            {heroTagline}
          </span>
          <h1 className="mb-6 text-5xl font-serif text-[#FDFBF7] sm:text-7xl drop-shadow-lg">
            {heroTitle}
          </h1>
          <p className="mb-10 max-w-md text-sm font-light leading-relaxed text-[#E8E1D9]">
            {heroDesc}
          </p>
          <Link 
            href="/shop" 
            className="border border-[#D4AF37] bg-[#2A2015]/40 px-10 py-4 text-xs font-medium tracking-[0.2em] text-[#D4AF37] uppercase backdrop-blur-sm transition-all hover:bg-[#D4AF37] hover:text-[#2A2015]"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-14 text-xl font-light tracking-[0.2em] text-stone-900 uppercase">Shop by Category</h2>
          
          {categories.length === 0 ? (
            <p className="text-sm text-stone-400 tracking-widest uppercase">No categories added yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12 max-w-5xl mx-auto">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.name.toLowerCase()}`} className="group flex flex-col items-center">
                  <div className="mb-5 aspect-square w-full max-w-[140px] overflow-hidden rounded-full bg-stone-100 p-1 border border-stone-300 transition-all duration-500 group-hover:border-[#8B5A2B] group-hover:shadow-lg">
                    <div className="h-full w-full rounded-full overflow-hidden bg-stone-200 flex items-center justify-center">
                      {category.image_url ? (
                        <img 
                          src={category.image_url} 
                          alt={category.name} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      ) : (
                        <span className="text-2xl font-light text-stone-500 uppercase tracking-widest">
                          {category.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-medium tracking-[0.2em] text-stone-700 uppercase transition-colors group-hover:text-[#8B5A2B]">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="bg-white py-20 sm:py-28 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center justify-between sm:flex-row">
            <h2 className="mb-4 text-xl font-light tracking-[0.2em] text-stone-900 uppercase sm:mb-0">
              Trending Now
            </h2>
            <Link href="/shop" className="border-b border-[#8B5A2B] pb-1 text-xs font-medium tracking-[0.2em] text-[#8B5A2B] uppercase transition-colors hover:text-stone-900 hover:border-stone-900">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-16">
            {products.map((product) => {
              const imageUrl = product.Image || (product.Gallery && product.Gallery.length > 0 ? product.Gallery[0] : null);
              const productName = product.Name || 'Product';
              const originalPrice = product.Price || 0;
              const discountPrice = product.DiscountPrice || product.discountprice || product.discount_price || null; 

              return (
                <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col">
                  <div className="mb-5 aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5] border border-stone-200 relative">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={productName} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] tracking-widest text-stone-400">
                        NO IMAGE
                      </div>
                    )}
                    {discountPrice && (
                      <span className="absolute top-2 left-2 bg-[#8B5A2B] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1">
                        Sale
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-medium tracking-wider text-stone-800 uppercase line-clamp-1 mb-2">
                    {productName}
                  </h3>
                  
                  {discountPrice ? (
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-stone-900 font-bold">₹{discountPrice}</p>
                      <p className="text-xs text-stone-400 line-through">₹{originalPrice}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-stone-900 font-medium">₹{originalPrice}</p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OUR STORY TEASER */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img 
              src={storyImage} 
              alt="Our Story" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <span className="mb-3 block text-xs font-medium tracking-[0.3em] text-[#8B5A2B] uppercase">
              Our Heritage
            </span>
            <h2 className="mb-6 text-3xl font-serif text-stone-900">{storyTitle}</h2>
            <p className="mb-8 text-sm font-light leading-relaxed text-stone-600">
              {storyText}
            </p>
            <Link 
              href="/about" 
              className="inline-block border-b border-[#8B5A2B] pb-1 text-xs font-medium tracking-[0.2em] text-[#8B5A2B] uppercase transition-colors hover:text-stone-900 hover:border-stone-900"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TRUST SIGNALS */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { title: "Waterproof", desc: "Wear it everyday, everywhere." },
              { title: "Anti-Tarnish", desc: "Premium materials that last." },
              { title: "Fast Shipping", desc: "Will be delivered within 1 week." },
              { title: "Support", desc: "Direct ordering via WhatsApp." },
            ].map((item) => (
              <div 
                key={item.title} 
                className="flex flex-col items-center text-center border border-stone-200 rounded-sm px-4 py-8 transition-colors hover:border-[#8B5A2B]"
              >
                <span className="mb-3 text-2xl text-[#8B5A2B]">✧</span>
                <h4 className="mb-2 text-xs font-bold tracking-[0.2em] text-stone-800 uppercase">{item.title}</h4>
                <p className="text-xs font-light text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      {/* 3. SWAPPED OUT THE STATIC HTML FOR YOUR NEW COMPONENT */}
      <TestimonialsCarousel testimonials={testimonials} />
      
    </div>
  );
}