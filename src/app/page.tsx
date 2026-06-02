/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Target, ShoppingBag, Activity, Utensils, Zap, PlayCircle, Sparkles, ChefHat } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  const examplePrompts = [
    "Gain muscle with ₹300/day",
    "100g protein under ₹250",
    "Weight loss meal plan",
    "Hostel student food planner",
    "Family dinner planner"
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] overflow-hidden">
      {/* Background gradients & particles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF6B00] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-[-200px] w-[500px] h-[500px] bg-[#FF7A1A] opacity-10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-200px] w-[600px] h-[600px] bg-[#FF6B00] opacity-15 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF7A1A] flex items-center justify-center">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <span className="font-mono font-bold text-2xl tracking-tighter">NutriFlow AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-white transition-colors">Log in</Link>
          <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 text-sm font-medium text-[#FF7A1A]">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Swiggy AI Integrations</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 font-sans">
            Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9B44]">Nutrition</span> Agent
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Tell us your goals. We'll plan, optimize, and order your meals automatically using the best restaurants near you.
          </p>

          <div className="max-w-2xl mx-auto mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-[#121212] rounded-2xl border border-white/10 p-2 pl-6">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="I need 100g protein daily under ₹250..." 
                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-gray-500 h-14"
              />
              <Link href="/dashboard">
                <button className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
                  Generate
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {examplePrompts.map((p, i) => (
              <button 
                key={i}
                onClick={() => setPrompt(p)}
                className="px-4 py-2 rounded-full text-sm bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-gray-300"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6">
            <Link href="/dashboard">
              <button className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                Start Planning Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button className="px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-[#FF6B00]" />
              Watch Demo
            </button>
          </div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Intelligent Nutrition Infrastructure</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to hit your fitness goals without thinking about meal prep, groceries, or macros.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Bot />, title: "AI Nutrition Planning", desc: "Our agent understands natural language and creates personalized multi-day meal plans instantly." },
            { icon: <Target />, title: "Budget Optimization", desc: "Maximize your protein and macro goals while strictly staying within your daily budget constraints." },
            { icon: <ShoppingBag />, title: "Swiggy Ordering", desc: "One-click cart creation and checkout through Swiggy's vast restaurant network." },
            { icon: <Activity />, title: "Macro Tracking", desc: "Automatic tracking of calories, protein, carbs, and fats for every scheduled meal." },
            { icon: <Utensils />, title: "Dietary Personalization", desc: "Support for Vegan, Keto, South Indian, high-protein, and hyper-specific dietary needs." },
            { icon: <Zap />, title: "Smart Scheduling", desc: "Coordinate deliveries automatically so your food arrives exactly when you need to eat." },
          ].map((feature, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="glass p-8 rounded-3xl hover:border-[#FF6B00]/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 py-24 mb-20">
        <div className="glass-orange rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-16">From Prompt to Plate</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent -translate-y-1/2" />
            
            {[
              { step: "01", title: "Describe Goal", desc: "Tell the AI your budget, macros, and cravings." },
              { step: "02", title: "AI Plans", desc: "Agent finds optimal meals from local restaurants." },
              { step: "03", title: "Review", desc: "Verify nutrition totals and daily schedule." },
              { step: "04", title: "Order", desc: "Checkout through Swiggy in one tap." },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#FF6B00]/30 flex items-center justify-center text-2xl font-bold font-mono text-[#FF6B00] mb-6 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
