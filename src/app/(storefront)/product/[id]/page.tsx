import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. We must 'await' the params before we can use the ID
  const resolvedParams = await params;
  
  // 2. Fetch the specific product from Supabase
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm">
        <Link href="/shop" className="text-gray-500 hover:text-gray-900">
          Shop
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.Name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-12">
        <div className="aspect-[4/5] w-full bg-stone-100">
          <div className="flex h-full w-full items-center justify-center text-sm tracking-widest text-gray-400">
            {product.Name} IMAGE
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
            {product.Name}
          </h1>
          <p className="mt-4 text-xl font-medium text-gray-900">₹{product.Price}</p>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium tracking-widest text-gray-900 uppercase">Description</h3>
            <p className="mt-2 text-base text-gray-600 leading-relaxed">{product.Description}</p>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-medium tracking-widest text-gray-900 uppercase">Details</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><span className="font-medium text-gray-900">Material:</span> {product.Material}</li>
              <li><span className="font-medium text-gray-900">Finish:</span> {product.Finish || product.finish || "Standard"}</li>
              <li><span className="font-medium text-gray-900">Category:</span> {product.Category}</li>
            </ul>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-medium tracking-widest text-gray-900 uppercase">Care Instructions</h3>
            <p className="mt-2 text-sm text-gray-600">{product.careInstructions || "Keep away from moisture and perfumes."}</p>
          </div>

          <div className="mt-10 flex gap-4">
            <button 
              disabled={product.Stock === 0 || product.stock === 0}
              className="flex-1 bg-gray-900 py-4 text-sm font-medium tracking-widest text-white transition-colors hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {(product.Stock === 0 || product.stock === 0) ? "OUT OF STOCK" : "ADD TO CART"}
            </button>
            
            <a 
              href={`https://wa.me/918891027146?text=Hi StreebySree, I am interested in buying the ${product.Name} (₹${product.Price}).`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 border border-gray-900 bg-white py-4 text-center text-sm font-medium tracking-widest text-gray-900 transition-colors hover:bg-stone-50"
            >
              ORDER VIA WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}