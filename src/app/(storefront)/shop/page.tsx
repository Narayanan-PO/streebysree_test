import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ShopPage() {
  // 1. Fetch real data from Supabase
  const { data: products } = await supabase.from('products').select('*');

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
          The Collection
        </h1>
        <div className="mx-auto mt-4 h-[1px] w-12 bg-gray-300"></div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {/* We now use the real 'products' from the database! */}
        {products?.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group block">
            <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 transition-opacity group-hover:opacity-90">
              <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400">
                {product.name}
              </div>
            </div>
            
            <div className="mt-6 flex flex-col items-center justify-center text-center text-sm">
              <h3 className="font-medium tracking-wide text-gray-900">{product.name}</h3>
              <p className="mt-1 text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
              <p className="mt-3 font-medium text-gray-900">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}