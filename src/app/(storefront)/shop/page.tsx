import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const { data: products } = await supabase.from('products').select('*');

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-light tracking-widest text-blue-950 sm:text-5xl uppercase">
          The Collection
        </h1>
        <div className="mx-auto mt-6 h-[2px] w-16 bg-amber-600/80"></div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
        {products?.map((product: any) => {
          // This will print the product data in your VS Code terminal!
          console.log("Checking product:", product.Name, product);
          
          // Let's grab the image no matter how it's capitalized in the database
          const imageUrl = product.Image || product.image || product.image_url;

          return (
            <Link key={product.id} href={`/product/${product.id}`} className="group block">
              <div className="aspect-[4/5] w-full overflow-hidden border border-stone-100 bg-[#FAFAFA]">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={product.Name} 
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400 transition-transform duration-700 ease-in-out group-hover:scale-105">
                    {product.Name} IMAGE
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex flex-col items-center justify-center text-center">
                <h3 className="text-sm font-medium tracking-wider text-blue-950 transition-colors group-hover:text-amber-700">
                  {product.Name}
                </h3>
                <p className="mt-2 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                  {product.Category}
                </p>
                <p className="mt-3 text-sm font-medium text-gray-900">
                  ₹{product.Price}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}