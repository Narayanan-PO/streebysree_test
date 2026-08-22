'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, outOfStock: 0, categories: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      const { data, error } = await supabase.from('products').select('*');
      
      if (error) {
        console.error("Error fetching metrics:", error);
      } else if (data) {
        // Calculate real-time metrics!
        const total = data.length;
        const outOfStock = data.filter(p => p.Stock <= 0).length;
        
        // Count unique categories
        const uniqueCategories = new Set(data.map(p => p.Category).filter(Boolean)).size;

        setStats({ total, outOfStock, categories: uniqueCategories });
      }
      setIsLoading(false);
    }
    
    fetchMetrics();
  }, []);

  if (isLoading) {
    return <div className="h-full flex items-center justify-center text-slate-400 uppercase tracking-widest text-xs animate-pulse">Loading Metrics...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-[#1E293B]">Welcome Back</h1>
        <p className="text-sm text-slate-500 mt-1">Here is the current status of your inventory.</p>
      </div>

      {/* --- METRICS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Metric 1: Total Products */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Total Products</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
            </div>
          </div>
          <p className="text-4xl font-light text-[#1E293B]">{stats.total}</p>
        </div>

        {/* Metric 2: Out of Stock */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Out of Stock Alerts</h3>
            <div className={`p-2 rounded-md ${stats.outOfStock > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>
          <div>
            <p className="text-4xl font-light text-[#1E293B]">{stats.outOfStock}</p>
            {stats.outOfStock > 0 && (
              <p className="text-[10px] text-red-500 font-medium uppercase tracking-wider mt-2">Requires Attention</p>
            )}
          </div>
        </div>

        {/* Metric 3: Active Categories */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Active Categories</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 6h.008v.008H6V6z" /></svg>
            </div>
          </div>
          <p className="text-4xl font-light text-[#1E293B]">{stats.categories}</p>
        </div>

      </div>

      {/* --- QUICK ACTIONS --- */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <Link href="/admin/products" className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#1E293B]">Manage Inventory</span>
              <span className="text-xs text-slate-500 mt-1">Add, edit, or remove products and update stock levels.</span>
            </div>
            <span className="text-[#EAB308] transform group-hover:translate-x-1 transition-transform">⟶</span>
          </Link>
          <Link href="/admin/settings" className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#1E293B]">Update Storefront</span>
              <span className="text-xs text-slate-500 mt-1">Change banners, promotional text, and homepage content.</span>
            </div>
            <span className="text-[#EAB308] transform group-hover:translate-x-1 transition-transform">⟶</span>
          </Link>
        </div>
      </div>
    </div>
  );
}