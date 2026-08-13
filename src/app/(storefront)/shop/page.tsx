import Link from "next/link";
import { products } from "@/lib/data";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
          The Collection
        </h1>
        <div className="mx-auto mt-4 h-[1px] w-12 bg-gray-300"></div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        
        {/* We use .map() to loop through our data file and create a card for every single product automatically! */}
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group block">
            
            {/* Image Placeholder */}
            <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 transition-opacity group-hover:opacity-90">
              <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400">
                PRODUCT IMAGE
              </div>
            </div>
            
            {/* Product Details */}
            <div className="mt-6 flex flex-col items-center justify-center text-center text-sm">
              <h3 className="font-medium tracking-wide text-gray-900">{product.name}</h3>
              <p className="mt-1 text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
              <p className="mt-3 font-medium text-gray-900">₹{product.price}</p>
              
              {/* Dynamic Out of Stock text - it only shows up if the stock is exactly 0 */}
              {product.stock === 0 && (
                <p className="mt-2 text-xs font-medium text-red-500 uppercase tracking-widest">
                  Out of Stock
                </p>
              )}
            </div>

          </Link>
        ))}
        
      </div>
    </div>
  );
}