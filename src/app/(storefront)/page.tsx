import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // 1. Fetch top premium items for the Signature Edit
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .order('Price', { ascending: false })
    .limit(4);

  // 2. Fetch all products to dynamically extract categories
  const { data: allProducts } = await supabase.from('products').select('*');

  const uniqueCategories: { name: string; image: string }[] = [];
  
  if (allProducts) {
    const categoryNames = Array.from(new Set(allProducts.map(p => p.Category).filter(Boolean)));
    
    categoryNames.forEach(name => {
      const coverProduct = allProducts.find(p => p.Category === name);
      const imageUrl = coverProduct?.Image || coverProduct?.image || coverProduct?.image_url;
      
      uniqueCategories.push({
        name: name as string,
        image: imageUrl as string
      });
    });
  }

  return (
    <div className="flex flex-col bg-white">
      
      {/* 1. THE IMMERSIVE HERO WITH FLOATING HEADER COMPATIBILITY */}
      {/* h-screen makes it take up the full viewport height like Apple */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center bg-blue-950 px-4 text-center sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Full-screen background lifestyle image with dark cinematic gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/atelier-lifestyle.jpg" 
            alt="StreebySree Immersive Hero" 
            className="h-full w-full object-cover opacity-50 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-blue-950/50"></div>
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 opacity-0 animate-fade-in-up flex flex-col items-center mt-16">
          <span className="mb-4 block text-[10px] font-semibold tracking-[0.3em] text-amber-400 uppercase">
            The New Standard
          </span>
          <h1 className="mt-2 text-5xl font-light tracking-widest text-white sm:text-6xl md:text-7xl uppercase drop-shadow-md">
            Everyday Elegance
          </h1>
        </div>

        <div className="relative z-10 opacity-0 animate-fade-in-up-delayed flex flex-col items-center">
          <p className="mx-auto mt-6 max-w-xl text-base font-light tracking-wide text-stone-200 leading-relaxed">
            Discover our premium collection of minimal, anti-tarnish jewellery designed for the modern woman.
          </p>
          <div className="mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border border-white bg-white px-12 py-4 text-xs font-medium tracking-[0.2em] text-blue-950 uppercase transition-all duration-500 hover:bg-transparent hover:text-white"
            >
              Enter The Boutique
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE SIGNATURE EDIT */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center justify-center md:flex-row md:justify-between md:items-end">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-light tracking-widest text-blue-950 uppercase">The Signature Edit</h2>
              <div className="mt-4 h-[1px] w-12 bg-amber-600/80 mx-auto md:mx-0"></div>
            </div>
            <Link href="/shop" className="mt-6 md:mt-0 text-xs font-medium tracking-[0.2em] text-gray-400 hover:text-amber-700 uppercase transition-colors">
              Discover Signatures &rarr;
            </Link>
          </div>
          
          <div className="flex w-full gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide">
            {featuredProducts?.map((product: any) => {
              const imageUrl = product.Image || product.image || product.image_url;

              return (
                <Link key={product.id} href={`/product/${product.id}`} className="group relative flex-none w-[85%] sm:w-[45%] md:w-[30%] snap-center md:snap-start block">
                  <div className="aspect-[4/5] w-full overflow-hidden border border-stone-100 bg-[#FAFAFA]">
                    {imageUrl ? (
                      <img src={imageUrl} alt={product.Name} className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400">IMAGE</div>
                    )}
                  </div>
                  <div className="mt-6 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xs font-medium tracking-widest text-blue-950 uppercase transition-colors group-hover:text-amber-700">
                      {product.Name}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-gray-500">₹{product.Price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. THE CRAFT / ANTI-TARNISH PROMISE */}
      <section className="border-t border-stone-100 bg-[#FAFAFA] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="aspect-[4/3] w-full overflow-hidden border border-stone-200 bg-white">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXBCY71vJjEknDeRHwH9h5sEN8EcHRUVp5mTPQpvxXw&s=10" alt="StreebySree Craft" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center lg:pl-6">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-amber-700 uppercase">
                Uncompromising Quality
              </span>
              <h2 className="mt-3 text-3xl font-light tracking-widest text-blue-950 uppercase sm:text-4xl">
                Designed For Daily Life
              </h2>
              <div className="mt-4 h-[1px] w-12 bg-amber-600/80"></div>
              <p className="mt-6 text-base font-light leading-relaxed text-gray-600">
                True luxury shouldn't require delicate handling. Our pieces are crafted with advanced anti-tarnish plating, making them fully resistant to water, sweat, and perfumes. 
              </p>
              <ul className="mt-8 space-y-4 text-xs font-medium tracking-widest text-blue-950 uppercase">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span> 100% Waterproof & Sweatproof
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span> Hypoallergenic & Skin-Friendly
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span> Long-Lasting Gold Finish
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC CATEGORIES GRID */}
      {uniqueCategories.length > 0 && (
        <section className="py-24 bg-white border-t border-stone-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-light tracking-widest text-blue-950 uppercase">Shop By Category</h2>
              <div className="mt-4 h-[1px] w-12 bg-amber-600/80 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
              {uniqueCategories.map((category) => (
                <Link 
                  key={category.name} 
                  href={`/shop?category=${encodeURIComponent(category.name)}`} 
                  className="group relative block overflow-hidden border border-stone-100 bg-[#FAFAFA]"
                >
                  <div className="aspect-square w-full">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs tracking-widest text-gray-400">NO IMAGE</div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6">
                    <h3 className="text-sm font-medium tracking-widest text-white uppercase group-hover:text-amber-400 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. THE PROMISE */}
      <section className="bg-[#FAFAFA] py-20 border-t border-stone-100">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light tracking-widest text-blue-950 uppercase">The Promise</h2>
          <div className="mx-auto mt-6 h-[1px] w-12 bg-amber-600/80"></div>
          <p className="mt-8 text-base font-light leading-loose text-gray-500">
            We believe that beautiful jewellery shouldn't be reserved for special occasions. 
            Our pieces are thoughtfully curated to be your everyday companions—crafted from high-quality, 
            anti-tarnish materials that withstand the test of time, without compromising on elegance.
          </p>
        </div>
      </section>
    </div>
  );
}