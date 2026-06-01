"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [12, 13, 14, 15, 16, 17, 18];

const mealPlan = {
  breakfast: { name: "Oatmeal & Protein Shake", cals: 450, pro: 35, cost: "₹120", ordered: true },
  lunch: { name: "Chicken Quinoa Bowl", cals: 650, pro: 55, cost: "₹250", ordered: true },
  dinner: { name: "Grilled Salmon Salad", cals: 500, pro: 45, cost: "₹300", ordered: false },
};

export default function MealPlansPage() {
  const [activeDay, setActiveDay] = useState(2); // Wednesday (index 2)

  return (
    <div className="max-w-6xl mx-auto space-y-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Weekly Planner</h1>
          <p className="text-gray-400">Manage your nutrition schedule and upcoming deliveries.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div className="flex items-center gap-2 px-4">
            <CalendarIcon className="w-4 h-4 text-[#FF6B00]" />
            <span className="font-semibold text-white">Aug 12 - Aug 18</span>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Strip */}
      <div className="glass p-4 rounded-3xl flex items-center justify-between">
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all ${
              activeDay === i 
                ? "bg-gradient-to-br from-[#FF6B00] to-[#FF7A1A] text-white shadow-[0_0_20px_rgba(255,107,0,0.3)]" 
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <span className="text-xs font-medium mb-1">{day}</span>
            <span className={`text-xl font-bold ${activeDay === i ? "text-white" : "text-gray-200"}`}>
              {dates[i]}
            </span>
            {i < activeDay && (
              <div className="w-1 h-1 bg-green-400 rounded-full mt-2" />
            )}
          </button>
        ))}
      </div>

      {/* Day Content */}
      <div className="grid md:grid-cols-3 gap-8 flex-1">
        {/* Meals Column */}
        <div className="md:col-span-2 space-y-6">
          {Object.entries(mealPlan).map(([mealType, details], i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={mealType} 
              className="glass p-6 rounded-3xl group hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold capitalize text-white">{mealType}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400">Status:</span>
                  {details.ordered ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Ordered
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-full">
                      <Circle className="w-4 h-4" /> Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-[#121212] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg text-gray-200 mb-1">{details.name}</h4>
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                    <span>{details.cals} kcal</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span className="text-blue-400">{details.pro}g Protein</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#FF6B00] block mb-2">{details.cost}</span>
                  {!details.ordered && (
                    <button className="text-sm bg-white text-black px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      Order Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Summary Column */}
        <div className="space-y-6">
          <div className="glass-orange p-6 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6">Daily Summary</h3>
            
            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-300">Calories</span>
                  <span className="text-white">1,600 / 2,000 kcal</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2">
                  <div className="bg-[#FF6B00] h-full rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-300">Protein</span>
                  <span className="text-white">135g / 150g</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-300">Daily Budget</span>
                  <span className="text-white">₹670 / ₹800</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '83%' }} />
                </div>
              </div>
            </div>

            <button className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Approve & Schedule All
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              One-click order via Swiggy MCP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
