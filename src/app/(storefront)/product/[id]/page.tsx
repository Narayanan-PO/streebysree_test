'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

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

  const { cart, addToCart, decreaseQuantity } = useCart();

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

if (isLoading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 animate-pulse">
            {/* Left: Image Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="aspect-[4/5] w-full bg-stone-200"></div>
              <div className="flex gap-4 overflow-hidden">
                <div className="w-20 h-24 bg-stone-200 flex-shrink-0"></div>
                <div className="w-20 h-24 bg-stone-200 flex-shrink-0"></div>
                <div className="w-20 h-24 bg-stone-200 flex-shrink-0"></div>
              </div>
            </div>
            {/* Right: Details Skeleton */}
            <div className="flex flex-col pt-2">
              <div className="h-3 bg-stone-200 w-24 mb-4"></div>
              <div className="h-8 bg-stone-200 w-3/4 mb-8"></div>
              <div className="h-6 bg-stone-200 w-1/4 mb-10"></div>
              <div className="h-14 bg-stone-200 w-full mb-3"></div>
              <div className="h-14 bg-stone-200 w-full mb-10"></div>
              <div className="h-24 bg-stone-200 w-full mb-6"></div>
              <div className="h-24 bg-stone-200 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!product) return <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-500 uppercase tracking-widest text-xs">Product not found.</div>;

  const allImages = [product.Image, ...(product.Gallery || [])].filter(Boolean);
  const originalPrice = product.Price || 0;
  const discountPrice = product.DiscountPrice || product.discountprice || product.discount_price || null;
  const activePrice = discountPrice || originalPrice;

  // --- SMART CART LOGIC ---
  const cartItem = cart.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.Name,
      price: activePrice,
      image: activeImage,
      quantity: 1
    });
  };

  // Build a perfectly encoded URL for WhatsApp
  const whatsappMessage = encodeURIComponent(
    `Hello Stree by Sree! ✦\n\nI would like to place a direct order for:\n\n✧ 1x ${product.Name} - ₹${activePrice}\n\nPlease let me know the payment details. Thank you!`
  );
  const whatsappUrl = `https://wa.me/918891027146?text=${whatsappMessage}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[4/5] w-full overflow-hidden bg-white">
              <img src={activeImage} alt={product.Name} className="w-full h-full object-cover object-center" />
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {allImages.map((imgUrl, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImage(imgUrl)}
                    className={`flex-shrink-0 w-20 h-24 overflow-hidden transition-all border ${
                      activeImage === imgUrl ? 'border-stone-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col pt-2">
            <p className="text-[10px] text-stone-500 tracking-[0.2em] uppercase mb-3">{product.Category}</p>
            <h1 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-widest uppercase mb-4">{product.Name}</h1>
            
            {/* Pricing */}
            <div className="mb-8">
              {discountPrice ? (
                <div className="flex items-center gap-4">
                  <p className="text-xl font-medium text-stone-900">₹{discountPrice}</p>
                  <p className="text-sm text-stone-400 line-through">₹{originalPrice}</p>
                  <span className="text-[10px] font-bold text-[#8B5A2B] tracking-widest uppercase border border-[#8B5A2B] px-2 py-1">Save ₹{originalPrice - discountPrice}</span>
                </div>
              ) : (
                <p className="text-xl font-medium text-stone-900">₹{originalPrice}</p>
              )}
            </div>
            
            {/* Buttons Area */}
            <div className="flex flex-col gap-3 mb-10">
              {quantityInCart > 0 ? (
                <div className="flex items-center justify-between w-full border border-stone-900 bg-white">
                  <button onClick={() => decreaseQuantity(product.id)} className="px-6 py-4 text-stone-500 hover:text-stone-900 transition-colors text-lg">−</button>
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-900">{quantityInCart} In Bag</span>
                  <button onClick={handleAddToCart} className="px-6 py-4 text-stone-500 hover:text-stone-900 transition-colors text-lg">+</button>
                </div>
              ) : (
                <button 
                  disabled={product.Stock <= 0} 
                  onClick={handleAddToCart}
                  className="w-full bg-stone-900 text-white py-4 font-medium tracking-[0.2em] text-xs uppercase hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.Stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                </button>
              )}

              {/* Direct WhatsApp Order Button */}
              {product.Stock > 0 ? (
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-stone-900 text-stone-900 bg-transparent py-4 font-medium tracking-[0.2em] text-xs uppercase hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 text-center"
                >
                  ORDER VIA WHATSAPP
                </a>
              ) : (
                <button 
                  disabled
                  className="w-full border border-stone-900 text-stone-900 bg-transparent py-4 font-medium tracking-[0.2em] text-xs uppercase opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  ORDER VIA WHATSAPP
                </button>
              )}
            </div>

            {/* Description */}
            {product.Description && (
              <div className="mb-8 border-t border-stone-200 pt-6">
                <h3 className="text-[10px] font-bold text-stone-900 uppercase tracking-[0.2em] mb-4">Description</h3>
                <p className="text-stone-500 text-sm leading-relaxed font-light">{product.Description}</p>
              </div>
            )}

            {/* Details Table */}
            <div className="mb-8 border-t border-stone-200 pt-6">
              <h3 className="text-[10px] font-bold text-stone-900 uppercase tracking-[0.2em] mb-4">Details</h3>
              <ul className="space-y-4 text-sm text-stone-500 font-light">
                {product.Material && (
                  <li className="grid grid-cols-3">
                    <span className="col-span-1 text-stone-900">Material:</span> 
                    <span className="col-span-2">{product.Material}</span>
                  </li>
                )}
                {product.Finish && (
                  <li className="grid grid-cols-3">
                    <span className="col-span-1 text-stone-900">Finish:</span> 
                    <span className="col-span-2">{product.Finish}</span>
                  </li>
                )}
                <li className="grid grid-cols-3">
                  <span className="col-span-1 text-stone-900">Availability:</span> 
                  <span className={`col-span-2 ${product.Stock > 0 ? "text-stone-500" : "text-red-500"}`}>
                    {product.Stock > 0 ? `${product.Stock} in stock` : "Out of Stock"}
                  </span>
                </li>
              </ul>
            </div>

            {/* SINGLE RETURN POLICY BLOCK AT THE BOTTOM */}
            <div className="p-4 bg-white border border-[#8B5A2B]/20 text-center">
              <span className="block mb-1 text-[10px] font-bold tracking-[0.2em] text-[#8B5A2B] uppercase">
                Return Policy
              </span>
              <p className="text-[11px] text-stone-600 leading-relaxed uppercase tracking-wider">
                Returns or exchanges are only accepted if a continuous, unedited unboxing video is shared within 24 hours of delivery.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}