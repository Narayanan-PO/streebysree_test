import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col shadow-xl z-10 hidden md:flex">
        <div className="p-6 border-b border-blue-900/50">
          <h2 className="text-sm font-bold tracking-widest uppercase text-amber-500">
            StreebySree
          </h2>
          <p className="text-[10px] text-blue-300 tracking-wider uppercase mt-1">Admin Workspace</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="block px-4 py-3 text-sm font-medium rounded-md hover:bg-blue-900 transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block px-4 py-3 text-sm font-medium rounded-md hover:bg-blue-900 transition-colors">
            Products
          </Link>
          <Link href="/admin/settings" className="block px-4 py-3 text-sm font-medium rounded-md hover:bg-blue-900 transition-colors">
            Store Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-900/50">
          <Link href="/" target="_blank" className="flex items-center justify-center w-full px-4 py-2 text-xs font-medium tracking-wider uppercase bg-blue-900 rounded hover:bg-blue-800 transition-colors">
            View Live Store ↗
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header (Shows only on small screens) */}
        <header className="md:hidden bg-blue-950 text-white p-4 flex justify-between items-center shadow-md">
          <h2 className="text-xs font-bold tracking-widest uppercase text-amber-500">Admin</h2>
          <span className="text-xs">Menu is desktop only</span>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </main>
      
    </div>
  );
}