/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Calendar, PieChart, Settings, ChefHat, LogOut, Menu, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "AI Planner", href: "/dashboard/ai-planner", icon: <ChefHat className="w-5 h-5" /> },
    { name: "Meal Plans", href: "/dashboard/meal-plans", icon: <Calendar className="w-5 h-5" /> },
    { name: "Nutrition", href: "/dashboard/nutrition", icon: <PieChart className="w-5 h-5" /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0A0A0A] flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#FF7A1A] flex items-center justify-center">
              <ChefHat className="text-white w-5 h-5" />
            </div>
            <span className="font-mono font-bold text-lg">NutriFlow AI</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#FF6B00]/10 text-[#FF7A1A] font-medium border border-[#FF6B00]/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-400 hover:text-white hover:bg-white/5 transition-all text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen md:h-screen overflow-hidden">
        <header className="min-h-16 md:h-20 border-b border-white/5 flex items-center justify-between px-4 sm:px-8 bg-[#0A0A0A]/50 backdrop-blur-xl">
          <div>
            <div className="text-base sm:text-xl font-semibold text-white">
              NutriFlow Workspace
            </div>
            <div className="text-xs text-gray-400 mt-0.5">Plan your next meal</div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="md:hidden text-white" aria-label="Toggle menu" onClick={() => setMobileMenu(v => !v)}>{mobileMenu ? <X/> : <Menu/>}</button>
            <Link href="/dashboard/ai-planner" className="hidden sm:flex px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] text-white font-medium text-sm hover:scale-105 transition-transform items-center gap-2">
              <ChefHat className="w-4 h-4" />AI Planner
            </Link>

          </div>
        </header>
        
        {mobileMenu && <nav className="md:hidden bg-[#161a14] border-b border-white/10 p-3 grid grid-cols-2 gap-2">{navItems.map(item => <Link onClick={()=>setMobileMenu(false)} key={item.href} href={item.href} className="p-3 rounded-lg bg-white/5 text-sm">{item.name}</Link>)}</nav>}
        <div className="flex-1 overflow-auto bg-[#0A0A0A] p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
