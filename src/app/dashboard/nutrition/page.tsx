"use client";

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Target, TrendingUp, Activity } from 'lucide-react';

const macroData = [
  { name: 'Protein', value: 0, color: '#3B82F6' },
  { name: 'Carbs', value: 0, color: '#EAB308' },
  { name: 'Fat', value: 0, color: '#EF4444' },
];

export default function NutritionPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Nutrition Analytics</h1>
        <p className="text-gray-400">Deep dive into your macronutrients and caloric intake.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="glass p-6 rounded-3xl h-80 flex flex-col items-center justify-center relative">
            <h3 className="absolute top-6 left-6 font-semibold text-white">Daily Macro Split</h3>
            <div className="w-full h-full pt-10">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute flex gap-4 bottom-6">
              {macroData.map(m => (
                <div key={m.name} className="flex items-center gap-1.5 text-xs font-medium">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-gray-300">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-orange p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-[#FF6B00]" />
              <h3 className="font-semibold text-white">Weekly Trend</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              No data available for this week. Connect your Swiggy orders to start analyzing trends.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-xl font-bold text-white">Detailed Breakdown (Today)</h2>
            </div>
            
            <div className="space-y-8">
              {macroData.map(macro => (
                <div key={macro.name}>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{macro.name}</h4>
                      <p className="text-xs text-gray-500">Goal: 0g</p>
                    </div>
                    <span className="font-bold text-lg" style={{ color: macro.color }}>{macro.value}g</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-3">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `0%`, backgroundColor: macro.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                <Activity className="w-4 h-4 text-purple-400" />
                Micronutrients Focus
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">-</h3>
              <p className="text-xs text-gray-500">No data available.</p>
            </div>
            <div className="glass p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                <Activity className="w-4 h-4 text-green-400" />
                Hydration
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">0 L</h3>
              <p className="text-xs text-gray-500">Target: - L daily.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
