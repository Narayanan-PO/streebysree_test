import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ name: string }> | { name: string } 
}) {
  const resolvedParams = await params;
  const rawCategoryName = resolvedParams.name;
  
  // Capitalize the first letter for display (e.g., "rings" -> "Rings")
  const displayCategory = rawCategoryName.charAt(0).toUpperCase() + rawCategoryName.slice(1);

  // Fetch products that match this category (case-insensitive)
  // Fetch products that match this category exactly (case-insensitive)
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('Category', rawCategoryName);

  const categoryProducts = products || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[60vh]">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-light tracking-widest text-blue-950 uppercase">
          {displayCategory}
        </h1>
        <div className="mt-4 mx-auto h-[1px] w-16 bg-amber-700"></div>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="text-center text-gray-500 uppercase tracking-widest text-sm mt-20">
          No items found in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-12">
          {categoryProducts.map((product) => {
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
      )}
    </div>
  );
}