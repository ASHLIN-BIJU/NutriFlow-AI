"use client";

import { useState } from "react";
import { Search, Star, Clock, MapPin, Filter, Flame, Leaf, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

const restaurants = [
  {
    id: 1,
    name: "Fit Bowl Co.",
    rating: 4.8,
    time: "25-30 min",
    protein: "High",
    budget: "₹₹",
    tags: ["Healthy", "Salads", "Keto"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    isVegetarian: false
  },
  {
    id: 2,
    name: "Green Leaf Pure Veg",
    rating: 4.5,
    time: "20-25 min",
    protein: "Medium",
    budget: "₹",
    tags: ["South Indian", "Vegetarian"],
    image: "https://images.unsplash.com/photo-1626779836376-7e3e786b8344?w=500&q=80",
    isVegetarian: true
  },
  {
    id: 3,
    name: "Protein Hub",
    rating: 4.9,
    time: "30-40 min",
    protein: "Very High",
    budget: "₹₹₹",
    tags: ["Continental", "Grilled", "Gym Diet"],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80",
    isVegetarian: false
  },
  {
    id: 4,
    name: "Bowl O' Rama",
    rating: 4.3,
    time: "15-20 min",
    protein: "Medium",
    budget: "₹₹",
    tags: ["Pan-Asian", "Rice Bowls"],
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80",
    isVegetarian: true
  }
];

export default function RestaurantsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "High Protein", "Budget Friendly", "Vegetarian", "South Indian", "Fast Delivery"];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Discover Swiggy Partners</h1>
          <p className="text-gray-400">Find the best macro-friendly restaurants near you.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search restaurants, dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#FF6B00]/50 transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filters</span>
        </div>
        <div className="w-[1px] h-6 bg-white/10 shrink-0 mx-2" />
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeFilter === filter 
                ? "bg-[#FF6B00] text-white" 
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurants.map((rest, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={rest.id} 
            className="glass rounded-3xl overflow-hidden group hover:border-[#FF6B00]/30 transition-all cursor-pointer"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img 
                src={rest.image} 
                alt={rest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-white">{rest.rating}</span>
              </div>
              {rest.isVegetarian && (
                <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md w-6 h-6 rounded-full flex items-center justify-center border border-white/20">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-1">{rest.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{rest.tags.join(" • ")}</p>
              
              <div className="flex items-center gap-4 text-xs font-medium text-gray-300 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {rest.time}
                </div>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-4 h-4 text-gray-500" />
                  {rest.budget}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-sm font-semibold text-[#FF6B00]">{rest.protein} Protein</span>
                </div>
                <button className="text-sm font-medium text-white hover:text-[#FF6B00] transition-colors">
                  View Menu
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
