/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, ChefHat, Sparkles, ShoppingBag, RotateCcw, Edit2, Save, ArrowRight } from "lucide-react";

type MealPlan = {
  breakfast: { items: string; protein: string; calories: string; cost: string; restaurant: string; };
  lunch: { items: string; protein: string; calories: string; cost: string; restaurant: string; };
  dinner: { items: string; protein: string; calories: string; cost: string; restaurant: string; };
  total: { calories: string; protein: string; cost: string; };
} | null;

type Message = {
  role: string;
  content: string;
  plan: MealPlan;
};

export default function AIPlannerPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const examplePrompts = [
    "150g protein under ₹400",
    "Vegetarian fat loss plan",
    "Keto diet for a week",
    "Budget hostel meal plan"
  ];

  const handleSend = async () => {
    if (!prompt.trim()) return;
    
    // Add user message
    const userMsg = { role: "user", content: prompt, plan: null };
    setMessages(prev => [...prev, userMsg]);
    setPrompt("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate plan");
      }

      setMessages(prev => [...prev, {
        role: "ai",
        content: data.message,
        plan: data.plan
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: "ai",
        content: "I&apos;m sorry, I couldn&apos;t generate a plan right now. Please ensure your Gemini API key is configured. Error: " + (error.message || ""),
        plan: null
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto text-center relative">
        {/* Background gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF6B00] opacity-10 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 text-sm font-medium text-[#FF7A1A]">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Swiggy AI Integrations</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-sans text-white">
            Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9B44]">Nutrition</span> Agent
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Tell us your goals. We'll plan, optimize, and order your meals automatically using the best restaurants near you.
          </p>

          <div className="max-w-2xl mx-auto mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-[#121212] rounded-2xl border border-white/10 p-2 pl-6">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="I need 100g protein daily under ₹250..." 
                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-gray-500 h-14"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <>Generate <ArrowRight className="w-5 h-5" /></>}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto bg-[#0A0A0A]">
      {/* Header */}
      <div className="pb-6 mb-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">AI Nutrition Planner</h1>
          <p className="text-gray-400 text-sm">Design your perfect meal plan via Swiggy</p>
        </div>
        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF6B00]" />
          <span className="text-sm font-medium">GPT-4o Powered</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-6 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
              msg.role === 'user' ? 'bg-white/10' : 'bg-gradient-to-br from-[#FF6B00] to-[#FF7A1A]'
            }`}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            
            <div className={`flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : ''}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-[#FF6B00] text-white rounded-tr-sm' : 'glass rounded-tl-sm text-gray-200'
              }`}>
                {msg.content}
              </div>

              {msg.plan && (
                <div className="glass-orange p-6 rounded-2xl w-full md:min-w-[500px]">
                  <div className="flex items-center gap-2 mb-6 text-[#FF6B00]">
                    <ChefHat className="w-5 h-5" />
                    <h3 className="font-semibold">Recommended Meal Plan</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    {['breakfast', 'lunch', 'dinner'].map((mealTime) => (
                      <div key={mealTime} className="bg-[#121212] p-4 rounded-xl border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-white capitalize">{mealTime}</h4>
                          <span className="text-[#FF6B00] font-bold text-sm">{(msg.plan as any)[mealTime].cost}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{(msg.plan as any)[mealTime].items}</p>
                        <div className="flex gap-4 text-xs font-mono text-gray-500">
                          <span className="bg-white/5 px-2 py-1 rounded">{(msg.plan as any)[mealTime].calories} kcal</span>
                          <span className="bg-white/5 px-2 py-1 rounded">{(msg.plan as any)[mealTime].protein} protein</span>
                          <span className="bg-white/5 px-2 py-1 rounded">via {(msg.plan as any)[mealTime].restaurant}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center p-4 bg-[#0A0A0A] rounded-xl border border-white/10 mb-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Total Calories</p>
                      <p className="font-bold text-white">{msg.plan.total.calories}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Total Protein</p>
                      <p className="font-bold text-blue-400">{msg.plan.total.protein}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Daily Budget</p>
                      <p className="font-bold text-green-400">{msg.plan.total.cost}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button className="flex-1 bg-white text-black font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                      Order via Swiggy
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors tooltip tooltip-top" data-tip="Save Plan">
                      <Save className="w-4 h-4 text-gray-300" />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors tooltip tooltip-top" data-tip="Edit">
                      <Edit2 className="w-4 h-4 text-gray-300" />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors tooltip tooltip-top" data-tip="Regenerate">
                      <RotateCcw className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF7A1A] flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="glass p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-auto">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {examplePrompts.map((p, i) => (
            <button 
              key={i}
              onClick={() => setPrompt(p)}
              className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-gray-400 hover:text-white"
            >
              {p}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00]/20 to-[#FF7A1A]/20 rounded-2xl blur-lg pointer-events-none" />
          <div className="relative flex items-center bg-[#121212] rounded-2xl border border-white/10 p-2 pl-4">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your food goals..." 
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 h-12 text-sm"
            />
            <button 
              onClick={handleSend}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                prompt.trim() 
                  ? "bg-[#FF6B00] text-white hover:bg-[#FF7A1A]" 
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
