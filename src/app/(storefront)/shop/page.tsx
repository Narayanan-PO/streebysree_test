'use client';

import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  is_bestseller?: boolean; 
};

function ShopGrid() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || "";
  const categoryQuery = searchParams.get('category') ? decodeURIComponent(searchParams.get('category') as string) : "";
  const bestsellerQuery = searchParams.get('bestseller') === 'true';
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch ALL products ONCE when the page loads
  useEffect(() => {
    async function fetchLiveProducts() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error("Error loading products:", error);
      } else if (data) {
        setAllProducts(data);
        setDisplayedProducts(data); 
      }
      setIsLoading(false);
    }
    fetchLiveProducts();
  }, []); 

  // FORCE the screen to update whenever URLs or products change
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = allProducts;

    // 1. APPLY BESTSELLER FILTER
    if (bestsellerQuery) {
      filtered = filtered.filter((product) => product.is_bestseller === true);
    }

    // 2. APPLY CATEGORY FILTER (Ultra-Bulletproof Match)
    if (categoryQuery) {
      const cleanQuery = categoryQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      filtered = filtered.filter((product) => {
        const cleanProdCategory = String(product.Category || "").toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!cleanQuery || !cleanProdCategory) return false;
        return cleanProdCategory.includes(cleanQuery) || cleanQuery.includes(cleanProdCategory);
      });
    }

    // 3. APPLY SEARCH FILTER
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        const name = (product.Name || "").toLowerCase();
        const category = (product.Category || "").toLowerCase();

        if (q === "ring" || q === "rings") {
          const ringRegex = /\bring(s)?\b/i;
          return ringRegex.test(name) || ringRegex.test(category);
        }

        return name.includes(q) || category.includes(q);
      });
    }

    setDisplayedProducts(filtered);
    
  }, [searchQuery, categoryQuery, bestsellerQuery, allProducts]); 

  // DYNAMIC HEADER LOGIC
  let headerTitle = "Our Collection";
  let headerSubtitle = "Browse our complete range of handcrafted jewelry.";
  
  if (searchQuery) {
    headerTitle = `Results for "${searchQuery}"`;
    headerSubtitle = "Discover pieces matching your search.";
  } else if (categoryQuery) {
    headerTitle = `${categoryQuery}`;
    headerSubtitle = `Explore our curated selection of ${categoryQuery.toLowerCase()}.`;
  } else if (bestsellerQuery) {
    headerTitle = "Most Loved";
    headerSubtitle = "Shop our highest-rated and bestselling pieces.";
  }

  // --- NEW X-RAY DEBUGGING LOGIC ---
  // This grabs every single category currently attached to your products
  const actualDatabaseCategories = Array.from(
    new Set(allProducts.map(p => p.Category ? `"${p.Category}"` : "EMPTY_OR_NULL"))
  ).join(", ");

  return (
    <>
      <div className="text-center mb-16">
        <h1 className="text-2xl font-light tracking-widest text-stone-900 uppercase mb-4">
          {headerTitle}
        </h1>
        <div className="w-12 h-[1px] bg-[#8B5A2B] mx-auto mb-4"></div>
        <p className="text-stone-500 max-w-2xl mx-auto text-xs font-light tracking-wider uppercase">
          {headerSubtitle}
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-stone-400 font-medium tracking-[0.2em] uppercase text-xs animate-pulse">
            Loading beautiful pieces...
          </p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-sm border border-stone-100 flex flex-col items-center">
          <p className="text-stone-500 text-sm tracking-wider uppercase mb-4">
            {searchQuery 
              ? `No products found for "${searchQuery}".` 
              : `No products currently available.`}
          </p>

          {/* THE X-RAY BOX: Only shows up when things are broken! */}
          {categoryQuery && (
            <div className="mt-4 p-6 bg-red-50 border border-red-200 text-red-900 text-xs text-left max-w-2xl mx-auto rounded-sm">
              <strong className="text-sm tracking-widest uppercase mb-2 block">Database Mismatch Detected</strong>
              <p className="mb-2">The website is looking for products tagged with: <strong>"{categoryQuery}"</strong></p>
              <p>But the actual tags on the products in your Supabase database are:</p>
              <p className="mt-2 font-mono bg-white p-3 border border-red-100">{actualDatabaseCategories}</p>
            </div>
          )}

          <Link href="/shop" className="mt-8 text-xs font-bold tracking-[0.2em] text-[#8B5A2B] hover:text-stone-900 uppercase transition-colors">
            View All Collections ⟶
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {displayedProducts.map((product) => {
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
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAF8F5] min-h-screen">
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
           <p className="text-stone-400 font-medium tracking-[0.2em] uppercase text-xs animate-pulse">
            Loading collection...
          </p>
        </div>
      }>
        <ShopGrid />
      </Suspense>
    </div>
  );
}