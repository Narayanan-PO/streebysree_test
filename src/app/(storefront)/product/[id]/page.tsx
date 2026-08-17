import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/layout/AddToCartButton";

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const numericId = parseInt(productId, 10);

  if (isNaN(numericId)) {
    notFound();
  }

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', numericId)
    .maybeSingle();

  if (error || !product) {
    notFound();
  }

  const imageUrl = product.Image || product.image || product.image_url;
  const productName = product.Name || product.name || 'Product';
  const productPrice = product.Price || product.price || 0;

  // Direct WhatsApp instant buy pre-filled message using owner's number 8891027146
  const whatsappMessage = encodeURIComponent(
    `Hi! I would like to order this item immediately:\n\n*${productName}* (₹${productPrice})\nProduct ID: ${numericId}`
  );
  const whatsappUrl = `https://wa.me/918891027146?text=${whatsappMessage}`;

  const isOutOfStock = product.Stock === 0 || product.stock === 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      {/* Tighter gap and refined mobile layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
        
        {/* Scaled-down Image Box for Mobile Elegance */}
        <div className="aspect-[4/5] w-full max-w-xs mx-auto md:max-w-none overflow-hidden border border-stone-200 bg-[#FAFAFA]">
          {imageUrl ? (
            <img src={imageUrl} alt={productName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400">
              NO IMAGE AVAILABLE
            </div>
          )}
        </div>

        {/* Product Details & Actions - Compact & Refined */}
        <div className="flex flex-col pt-1">
          <span className="text-[9px] font-medium tracking-[0.3em] text-amber-700 uppercase">
            {product.Category || 'Jewellery'}
          </span>
          
          <h1 className="mt-2 text-xl font-light tracking-wider text-blue-950 uppercase sm:text-3xl">
            {productName}
          </h1>
          
          <p className="mt-2 text-base font-medium text-gray-900 sm:text-lg">
            ₹{productPrice}
          </p>

          <div className="mt-4 h-[1px] w-full bg-stone-200"></div>
          
          <p className="mt-4 text-xs font-light leading-relaxed text-gray-600 tracking-wide">
            {product.Description || 'Crafted with precision from premium anti-tarnish materials, designed to be worn effortlessly every single day.'}
          </p>

          {/* Action Area: Dual Buttons (Add to Cart & Instant Order Now) */}
          <div className="mt-6 flex flex-col space-y-3 w-full max-w-[300px]">
            {/* Existing Add to Cart / Quantity Manager */}
            <AddToCartButton product={product} />

            {/* Instant WhatsApp Order Now Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                height: '48px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isOutOfStock ? '#d1d5db' : '#047857', // Emerald green for WhatsApp action
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: 'none',
                textDecoration: 'none',
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              {isOutOfStock ? "Out of Stock" : "Order Now (WhatsApp)"}
            </a>
          </div>

          {/* Trust Badges & Flexible Shipping Note */}
          <div className="mt-8 border-t border-stone-100 pt-5 space-y-1.5 text-[10px] font-light tracking-wider text-gray-500 uppercase">
            <p>✦ 100% Anti-Tarnish & Waterproof</p>
            <p>✦ Shipping charges may apply where applicable *</p>
          </div>
        </div>

      </div>
    </div>
  );
}