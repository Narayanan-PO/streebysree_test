'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // New state for mobile menu
  
  // --- SECURITY STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // 🔒 THE MASTER PASSWORD
  const MASTER_PASSWORD = "StreeBySree@2001"; 

  useEffect(() => {
    const unlocked = sessionStorage.getItem("stree_admin_unlocked");
    if (unlocked === "true") {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  // Close the mobile menu automatically if you click a link
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === MASTER_PASSWORD) {
      sessionStorage.setItem("stree_admin_unlocked", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPasswordInput("");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      )
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    },
    {
      name: "Store Settings",
      href: "/admin/settings",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.34 15.84c-.688-.06-1.386-.06-2.074 0l-.13.012c-.22.02-.435.086-.633.193-.2.107-.376.252-.516.425a3.918 3.918 0 01-2.915 1.34c-1.139-.022-2.18-.544-2.883-1.442-.693-.896-.948-2.062-.705-3.18l.067-.323c.092-.44.275-.853.535-1.21.26-.358.59-.652.966-.86.602-.34.982-.958 1.01-1.656.027-.698-.3-1.353-.873-1.74a3.864 3.864 0 01-1.527-2.793c-.053-1.144.385-2.25 1.214-3.064.83-.814 1.954-1.22 3.102-1.122l.327.027c.447.038.882.164 1.282.373.4.21.75.498 1.03.85.45.552 1.15.86 1.88.825.73-.035 1.4-.412 1.8-1.014a3.91 3.91 0 012.753-1.727c1.138-.13 2.274.225 3.125.975.85.75 1.32 1.838 1.293 2.986l-.01.326c-.025.45.068.898.27 1.3.203.402.5.748.87.994.577.382.932 1.03 1.006 1.726.074.697-.14 1.393-.6 1.953a3.862 3.862 0 01-2.617 1.455c-1.137.15-2.26-.17-3.104-.88-.844-.71-1.34-1.776-1.372-2.922l-.004-.327a2.535 2.535 0 00-.315-1.246 2.5 2.5 0 00-.817-.98 2.553 2.553 0 00-1.227-.39c-.437-.042-.876.046-1.264.254a2.52 2.52 0 00-.97 1.246z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  if (isChecking) return <div className="h-screen bg-[#F3F4F6]"></div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-sm border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif text-[#1E293B] mb-2">Stree by Sree</h1>
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-bold">Admin Workspace</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <input 
                type="password"
                placeholder="Enter Master Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full px-4 py-3 bg-slate-50 border ${error ? 'border-red-500' : 'border-slate-200'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#EAB308] text-sm text-center tracking-widest text-slate-900 transition-colors`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-[10px] uppercase tracking-wider text-center mt-2 font-medium animate-pulse">
                  Incorrect Password
                </p>
              )}
            </div>
            <button type="submit" className="w-full bg-[#1E293B] hover:bg-slate-800 text-[#EAB308] font-bold tracking-[0.2em] uppercase text-[10px] py-4 rounded-md transition-colors">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden">
      
      {/* Mobile Dark Overlay (closes sidebar when tapped) */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 transform 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 
        ${isCollapsed ? 'md:w-20' : 'md:w-64'} w-64 
        bg-[#1E293B] text-white transition-all duration-300 flex flex-col
      `}>
        <div className={`h-20 flex items-center border-b border-slate-700 ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
          <div className="overflow-hidden whitespace-nowrap">
            {isCollapsed ? (
              <span className="text-xl font-bold text-[#EAB308]">S</span>
            ) : (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider text-[#EAB308] uppercase">StreebySree</span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase">Admin Workspace</span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-4 px-3 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? item.name : ""}>
                {item.icon}
                {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-2 flex flex-col gap-1">
           {/* Fixed: Removed the duplicate View Store button */}
           <Link href="/" target="_blank" className={`flex items-center gap-4 px-3 py-3 rounded-md transition-colors text-slate-300 hover:bg-slate-800 hover:text-white ${isCollapsed ? 'justify-center' : ''}`} title="View Live Store">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">View Store</span>}
           </Link>
           
           <button 
             onClick={() => {
               sessionStorage.removeItem("stree_admin_unlocked");
               setIsAuthenticated(false);
             }}
             className={`w-full flex items-center gap-4 px-3 py-3 rounded-md transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-500 ${isCollapsed ? 'justify-center' : ''}`}
             title="Logout"
           >
             <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
             </svg>
             {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
           </button>
        </div>

        {/* Desktop-only collapse button */}
        <div className="hidden md:flex p-4 border-t border-slate-700 justify-center">
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors w-full flex justify-center" title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            <svg className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* Mobile Header with Hamburger Icon */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-30">
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-[#1E293B] uppercase">StreebySree</span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase">Admin</span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(true)} 
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* The actual page content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}