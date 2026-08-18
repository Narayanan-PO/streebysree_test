'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Product = {
  id: string;
  Name: string;
  Price: number;
  Category: string;
  Image: string;
  Gallery?: string[];
  DiscountPrice?: number;
  discountprice?: number;
  discount_price?: number;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true }); // Stops items from jumping!
      
      if (error) console.error("Error loading products:", error);
      else if (data) setProducts(data);
      
      setIsLoading(false);
    }
    
    fetchLiveProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAF8F5] min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-2xl font-light tracking-widest text-stone-900 uppercase mb-4">Our Collection</h1>
        <div className="w-12 h-[1px] bg-[#8B5A2B] mx-auto mb-4"></div>
        <p className="text-stone-500 max-w-2xl mx-auto text-xs font-light tracking-wider uppercase">
          Browse our complete range of handcrafted jewelry.
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-stone-400 font-medium tracking-[0.2em] uppercase text-xs animate-pulse">
            Loading beautiful pieces...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-sm border border-stone-100">
          <p className="text-stone-500 text-sm tracking-wider uppercase">No products found. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => {
            const imageUrl = product.Image || (product.Gallery && product.Gallery.length > 0 ? product.Gallery[0] : "https://via.placeholder.com/400x500");
            const originalPrice = product.Price || 0;
            const discountPrice = product.DiscountPrice || product.discountprice || product.discount_price || null;

            return (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col cursor-pointer">
                <div className="aspect-[4/5] w-full overflow-hidden bg-white mb-4 relative border border-stone-200">
                  <img 
                    src={imageUrl} 
                    alt={product.Name} 
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Optional: Add a subtle SALE badge if discounted */}
                  {discountPrice && (
                    <span className="absolute top-2 left-2 bg-[#8B5A2B] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1">
                      Sale
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col text-center">
                  <h3 className="text-xs font-medium tracking-[0.1em] text-stone-800 uppercase group-hover:text-[#8B5A2B] transition-colors mb-2 line-clamp-1">
                    {product.Name}
                  </h3>
                  
                  {/* Updated Pricing Logic */}
                  {discountPrice ? (
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-sm text-stone-900 font-bold">₹{discountPrice}</p>
                      <p className="text-xs text-stone-400 line-through">₹{originalPrice}</p>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-stone-900">₹{originalPrice}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}