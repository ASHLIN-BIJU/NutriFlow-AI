/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Calendar, ShoppingBag, PieChart, Settings, ChefHat, LogOut, MapPin } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Meal Plans", href: "/dashboard/meal-plans", icon: <Calendar className="w-5 h-5" /> },
    { name: "Orders", href: "/dashboard/orders", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Nutrition", href: "/dashboard/nutrition", icon: <PieChart className="w-5 h-5" /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0A0A0A] flex flex-col hidden md:flex">
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
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0A0A]/50 backdrop-blur-xl">
          <div>
            <div className="text-xl font-semibold text-white">
              NutriFlow Workspace
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Hostel Block A, Room 304, Campus</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/ai-planner">
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] text-white font-medium text-sm hover:scale-105 transition-transform flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                AI Planner
              </button>
            </Link>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden cursor-pointer">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ashlin" alt="Ashlin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto bg-[#0A0A0A] p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
