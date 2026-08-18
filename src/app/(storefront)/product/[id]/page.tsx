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

  // Bring in our Cart Context!
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

  if (isLoading) return <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-500 uppercase tracking-[0.2em] text-xs animate-pulse">Loading details...</div>;
  if (!product) return <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-500 uppercase tracking-widest text-xs">Product not found.</div>;

  const allImages = [product.Image, ...(product.Gallery || [])].filter(Boolean);
  const originalPrice = product.Price || 0;
  const discountPrice = product.DiscountPrice || product.discountprice || product.discount_price || null;

  // --- SMART CART LOGIC ---
  const cartItem = cart.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.Name,
      price: discountPrice || originalPrice,
      image: activeImage,
      quantity: 1
    });
  };

  const handleDirectOrder = () => {
    const price = discountPrice || originalPrice;
    const message = `Hello Stree by Sree! ✦%0A%0AI would like to place a direct order for:%0A%0A✧ 1x ${product.Name} - ₹${price}%0A%0APlease let me know the payment details. Thank you!`;
    window.open(`https://wa.me/918891027146?text=${message}`, "_blank");
  };

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

          {/* RIGHT: Product Details (Styled exactly like the screenshot) */}
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
                // The Inline - 1 + Selector
                <div className="flex items-center justify-between w-full border border-stone-900 bg-white">
                  <button onClick={() => decreaseQuantity(product.id)} className="px-6 py-4 text-stone-500 hover:text-stone-900 transition-colors text-lg">−</button>
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-900">{quantityInCart} In Bag</span>
                  <button onClick={handleAddToCart} className="px-6 py-4 text-stone-500 hover:text-stone-900 transition-colors text-lg">+</button>
                </div>
              ) : (
                // The Standard Add To Cart Button
                <button 
                  disabled={product.Stock <= 0} 
                  onClick={handleAddToCart}
                  className="w-full bg-stone-900 text-white py-4 font-medium tracking-[0.2em] text-xs uppercase hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.Stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                </button>
              )}

              {/* Direct WhatsApp Order Button */}
              <button 
                disabled={product.Stock <= 0}
                onClick={handleDirectOrder}
                className="w-full border border-stone-900 text-stone-900 bg-transparent py-4 font-medium tracking-[0.2em] text-xs uppercase hover:bg-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                ORDER VIA WHATSAPP
              </button>
            </div>

            {/* Description (With clean dividers matching screenshot) */}
            {product.Description && (
              <div className="mb-8 border-t border-stone-200 pt-6">
                <h3 className="text-[10px] font-bold text-stone-900 uppercase tracking-[0.2em] mb-4">Description</h3>
                <p className="text-stone-500 text-sm leading-relaxed font-light">{product.Description}</p>
              </div>
            )}

            {/* Details Table */}
            <div className="border-t border-stone-200 pt-6">
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

          </div>
        </div>
      </div>
    </div>
  );
}