"use client";

import { motion } from "framer-motion";
import { 
  Flame, 
  Dumbbell, 
  Wheat, 
  Droplet, 
  Wallet,
  ArrowUpRight,
  Clock,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', calories: 2100, protein: 140 },
  { name: 'Tue', calories: 2200, protein: 150 },
  { name: 'Wed', calories: 1900, protein: 135 },
  { name: 'Thu', calories: 2400, protein: 160 },
  { name: 'Fri', calories: 2100, protein: 145 },
  { name: 'Sat', calories: 2500, protein: 165 },
  { name: 'Sun', calories: 2300, protein: 155 },
];

export default function Dashboard() {
  const stats = [
    { label: "Calories", value: "2,150", goal: "2,400", unit: "kcal", icon: <Flame className="w-5 h-5 text-orange-500" />, color: "bg-orange-500/10" },
    { label: "Protein", value: "145", goal: "160", unit: "g", icon: <Dumbbell className="w-5 h-5 text-blue-500" />, color: "bg-blue-500/10" },
    { label: "Carbs", value: "210", goal: "250", unit: "g", icon: <Wheat className="w-5 h-5 text-yellow-500" />, color: "bg-yellow-500/10" },
    { label: "Fat", value: "65", goal: "80", unit: "g", icon: <Droplet className="w-5 h-5 text-red-500" />, color: "bg-red-500/10" },
    { label: "Budget", value: "₹180", goal: "₹300", unit: "/day", icon: <Wallet className="w-5 h-5 text-green-500" />, color: "bg-green-500/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Greeting */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Good Evening, Ashlin</h1>
          <p className="text-gray-400">Here's your nutrition overview for today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass p-5 rounded-2xl"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.unit}</span>
            </div>
            <div className="mt-3 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] h-full rounded-full" 
                style={{ width: `${(parseInt(stat.value.replace(/,/g, '').replace('₹', '')) / parseInt(stat.goal.replace(/,/g, '').replace('₹', ''))) * 100}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Chart */}
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Weekly Progress</h2>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#FF6B00]/50">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Line type="monotone" dataKey="calories" stroke="#FF6B00" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="protein" stroke="#3B82F6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="glass-orange p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <Sparkles className="w-24 h-24 text-[#FF6B00]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#FF7A1A]" />
                <h2 className="text-xl font-semibold text-white">AI Copilot Insights</h2>
              </div>
              <p className="text-gray-300 mb-6 max-w-lg leading-relaxed">
                You're 15g short of your daily protein goal. I found a great grilled chicken salad from "Healthy Bites" that fits your remaining ₹120 budget perfectly.
              </p>
              <button className="bg-white text-black px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
                Order Recommendation via Swiggy
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Upcoming Meals */}
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Today's Plan</h2>
              <button className="text-[#FF6B00] text-sm font-medium hover:underline">Edit</button>
            </div>
            
            <div className="space-y-4">
              {[
                { time: "08:30 AM", type: "Breakfast", name: "Masala Dosa & Sambar", cals: 450, status: "completed" },
                { time: "01:00 PM", type: "Lunch", name: "Chicken Biryani (Half)", cals: 650, status: "completed" },
                { time: "08:00 PM", type: "Dinner", name: "Grilled Fish & Veggies", cals: 400, status: "upcoming" },
              ].map((meal, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${meal.status === 'completed' ? 'bg-[#FF6B00]' : 'bg-gray-600 border-2 border-gray-400'}`} />
                    {i !== 2 && <div className="w-[1px] h-full bg-white/10 my-1" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">{meal.time} • {meal.type}</p>
                    <p className="text-sm font-semibold text-gray-200 mb-1">{meal.name}</p>
                    <p className="text-xs text-gray-500">{meal.cals} kcal</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="glass p-6 rounded-3xl">
            <h2 className="text-xl font-semibold mb-6">Recent Deliveries</h2>
            <div className="space-y-4">
              {[
                { rest: "Paradise Biryani", items: "Chicken Biryani", date: "Yesterday, 1:30 PM", price: "₹240" },
                { rest: "Truffles", items: "Grilled Chicken Steak", date: "Mon, 8:00 PM", price: "₹310" },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-200">{order.rest}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[120px]">{order.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white mb-1">{order.price}</p>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
