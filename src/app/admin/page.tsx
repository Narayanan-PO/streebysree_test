'use client';

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome to your Stree by Sree admin workspace.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Inventory Management</h3>
            <p className="text-sm text-slate-500 mb-6">Add new jewelry, update stock quantities, and manage discount pricing.</p>
          </div>
          <Link href="/admin/products" className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800">
            Manage Products ⟶
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Storefront Appearance</h3>
            <p className="text-sm text-slate-500 mb-6">Update your promotional banner, categories, hero image, and story text.</p>
          </div>
          <Link href="/admin/settings" className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800">
            Edit Store Settings ⟶
          </Link>
        </div>
      </div>
    </div>
  );
}