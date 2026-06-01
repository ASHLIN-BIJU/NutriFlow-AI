"use client";

import { useState } from "react";
import { Save, User, Target, UtensilsCrossed, Wallet } from "lucide-react";

export default function SettingsPage() {
  const [goal, setGoal] = useState("fat-loss");
  const [diet, setDiet] = useState("vegetarian");
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile & Preferences</h1>
          <p className="text-gray-400">Manage your nutrition goals, dietary restrictions, and budget.</p>
        </div>
        <button className="bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] text-white px-6 py-2.5 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="glass p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <User className="w-5 h-5 text-[#FF6B00]" />
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Age</label>
              <input type="number" defaultValue="25" className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF6B00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Weight (kg)</label>
              <input type="number" defaultValue="72" className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF6B00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Height (cm)</label>
              <input type="number" defaultValue="175" className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF6B00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Activity Level</label>
              <select className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF6B00]/50">
                <option>Sedentary</option>
                <option>Lightly Active</option>
                <option selected>Moderately Active</option>
                <option>Very Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="glass p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Target className="w-5 h-5 text-[#FF6B00]" />
            <h2 className="text-xl font-semibold text-white">Primary Goal</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: 'fat-loss', title: 'Fat Loss', desc: 'Caloric deficit' },
              { id: 'maintenance', title: 'Maintenance', desc: 'Maintain current weight' },
              { id: 'muscle-gain', title: 'Muscle Gain', desc: 'Caloric surplus' }
            ].map(g => (
              <button 
                key={g.id}
                onClick={() => setGoal(g.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  goal === g.id 
                    ? 'border-[#FF6B00] bg-[#FF6B00]/10' 
                    : 'border-white/10 bg-[#121212] hover:border-white/30'
                }`}
              >
                <div className="font-semibold text-white mb-1">{g.title}</div>
                <div className="text-sm text-gray-500">{g.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="glass p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <UtensilsCrossed className="w-5 h-5 text-[#FF6B00]" />
            <h2 className="text-xl font-semibold text-white">Diet & Cuisines</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">Diet Preference</h3>
              <div className="flex flex-wrap gap-3">
                {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian', 'Pescatarian'].map(d => (
                  <button 
                    key={d}
                    onClick={() => setDiet(d.toLowerCase())}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      diet === d.toLowerCase()
                        ? 'bg-white text-black'
                        : 'bg-[#121212] text-gray-400 border border-white/10 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">Favorite Cuisines (Select multiple)</h3>
              <div className="flex flex-wrap gap-3">
                {['South Indian', 'North Indian', 'Chinese', 'Western', 'Healthy/Salads', 'Keto', 'Middle Eastern'].map((c, i) => (
                  <label key={c} className="flex items-center gap-3 p-3 rounded-xl bg-[#121212] border border-white/10 cursor-pointer hover:border-white/30 transition-colors">
                    <input type="checkbox" defaultChecked={i === 0 || i === 4} className="w-4 h-4 accent-[#FF6B00]" />
                    <span className="text-sm font-medium text-gray-300">{c}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Settings */}
        <div className="glass p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Wallet className="w-5 h-5 text-[#FF6B00]" />
            <h2 className="text-xl font-semibold text-white">Budget & Ordering</h2>
          </div>
          
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium text-gray-400">Daily Food Budget</label>
                <span className="text-lg font-bold text-green-400">₹300</span>
              </div>
              <input type="range" min="150" max="1000" defaultValue="300" className="w-full accent-[#FF6B00]" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>₹150</span>
                <span>₹1000+</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-semibold text-white mb-1">Auto-Schedule Orders</div>
                  <div className="text-sm text-gray-500">Allow AI to automatically schedule Swiggy deliveries once you approve a plan.</div>
                </div>
                <div className="relative inline-block w-12 h-6 bg-[#FF6B00] rounded-full">
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full translate-x-6 transition-transform" />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
