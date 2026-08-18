'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Product = {
  id: string;
  Name: string;
  Price: number;
  Category: string;
  Description?: string;
  Material?: string;
  Finish?: string;
  Stock: number;
  Image: string;
  Gallery?: string[];
  DiscountPrice?: number;
  discountprice?: number;
  discount_price?: number;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase.from('products').select('*').eq('id', productId).single();
      
      if (error) console.error("Error fetching product:", error);
      else if (data) {
        setProduct(data);
        setActiveImage(data.Image || (data.Gallery?.[0] || "https://via.placeholder.com/600x800"));
      }
      setIsLoading(false);
    }
    if (productId) fetchProduct();
  }, [productId]);

  if (isLoading) return <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-500 uppercase tracking-[0.2em] text-xs animate-pulse">Loading details...</div>;
  if (!product) return <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-500 uppercase tracking-widest text-xs">Product not found.</div>;

  const allImages = [product.Image, ...(product.Gallery || [])].filter(Boolean);
  const originalPrice = product.Price || 0;
  const discountPrice = product.DiscountPrice || product.discountprice || product.discount_price || null;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[4/5] w-full overflow-hidden bg-white border border-stone-200">
              <img src={activeImage} alt={product.Name} className="w-full h-full object-cover object-center" />
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {allImages.map((imgUrl, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImage(imgUrl)}
                    className={`flex-shrink-0 w-20 h-24 overflow-hidden border transition-all ${
                      activeImage === imgUrl ? 'border-[#8B5A2B] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col pt-4">
            <p className="text-[10px] text-stone-500 tracking-[0.2em] uppercase mb-3">{product.Category}</p>
            <h1 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-widest uppercase mb-6">{product.Name}</h1>
            
            {/* Pricing Details */}
            <div className="mb-8">
              {discountPrice ? (
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-bold text-stone-900">₹{discountPrice}</p>
                  <p className="text-lg text-stone-400 line-through">₹{originalPrice}</p>
                  <span className="text-[10px] font-bold text-[#8B5A2B] tracking-widest uppercase border border-[#8B5A2B] px-2 py-1">Save ₹{originalPrice - discountPrice}</span>
                </div>
              ) : (
                <p className="text-2xl font-medium text-stone-900">₹{originalPrice}</p>
              )}
            </div>
            
            <button disabled={product.Stock <= 0} className="w-full bg-stone-900 text-white py-4 font-medium tracking-[0.2em] text-xs uppercase hover:bg-[#8B5A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-10">
              {product.Stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
            </button>

            {product.Description && (
              <div className="mb-8">
                <h3 className="text-[11px] font-semibold text-stone-900 uppercase tracking-[0.2em] mb-4">Description</h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light">{product.Description}</p>
              </div>
            )}

            <div className="border-t border-stone-200 pt-8">
              <h3 className="text-[11px] font-semibold text-stone-900 uppercase tracking-[0.2em] mb-4">Details</h3>
              <ul className="space-y-3 text-sm text-stone-600 font-light">
                {product.Material && <li className="flex"><span className="w-32 tracking-wider">Material:</span> <span>{product.Material}</span></li>}
                {product.Finish && <li className="flex"><span className="w-32 tracking-wider">Finish:</span> <span>{product.Finish}</span></li>}
                <li className="flex"><span className="w-32 tracking-wider">Availability:</span> 
                  <span className={product.Stock > 0 ? "text-stone-900 font-medium" : "text-red-500"}>{product.Stock > 0 ? `${product.Stock} in stock` : "Out of Stock"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}