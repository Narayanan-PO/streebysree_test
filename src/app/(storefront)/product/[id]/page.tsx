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

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Reduced grid gap and aligned items to the top for a cleaner atelier look */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        {/* Refined Image Box (Smaller, more elegant aspect ratio) */}
        <div className="aspect-[4/5] w-full max-w-md mx-auto md:max-w-none overflow-hidden border border-stone-200 bg-[#FAFAFA]">
          {imageUrl ? (
            <img src={imageUrl} alt={product.Name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs tracking-widest text-gray-400">
              NO IMAGE AVAILABLE
            </div>
          )}
        </div>

        {/* Product Details & Actions - Clean Spacing */}
        <div className="flex flex-col pt-2">
          <span className="text-[10px] font-medium tracking-[0.3em] text-amber-700 uppercase">
            {product.Category || 'Jewellery'}
          </span>
          
          <h1 className="mt-3 text-2xl font-light tracking-wider text-blue-950 uppercase sm:text-3xl">
            {product.Name}
          </h1>
          
          <p className="mt-3 text-lg font-medium text-gray-900">
            ₹{product.Price}
          </p>

          <div className="mt-6 h-[1px] w-full bg-stone-200"></div>
          
          <p className="mt-6 text-xs font-light leading-relaxed text-gray-600 tracking-wide">
            {product.Description || 'Crafted with precision from premium anti-tarnish materials, designed to be worn effortlessly every single day.'}
          </p>

          {/* Action Area */}
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          {/* Subdued Trust Badges & Shipping Note */}
          <div className="mt-10 border-t border-stone-100 pt-6 space-y-2 text-[11px] font-light tracking-wider text-gray-500 uppercase">
            <p>✦ 100% Anti-Tarnish & Waterproof</p>
            <p>✦ Shipping charges may apply where applicable *</p>
          </div>
        </div>

      </div>
    </div>
  );
}