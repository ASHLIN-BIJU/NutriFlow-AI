"use client";

import { ShoppingBag, ChevronRight, CheckCircle2, Clock, MapPin, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "processing" | "success">("idle");

  const handleOrder = () => {
    setIsOrdering(true);
    setOrderStatus("processing");
    setTimeout(() => {
      setIsOrdering(false);
      setOrderStatus("success");
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Cart & Checkout</h1>
      <p className="text-gray-400 mb-8">Review your scheduled meals before confirming with Swiggy.</p>

      {orderStatus === "success" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-orange rounded-3xl p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-8">
            Your meals for today have been successfully routed to Swiggy. Deliveries are scheduled according to your meal times.
          </p>
          <button 
            onClick={() => setOrderStatus("idle")}
            className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Back to Dashboard
          </button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="glass p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-6">Today's Scheduled Deliveries</h2>
              
              <div className="space-y-4">
                <div className="p-4 text-center text-sm text-gray-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                  No scheduled deliveries for today.
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Delivery Location</p>
                  <p className="text-sm text-gray-400">Hostel Block A, Room 304, Campus</p>
                </div>
              </div>
              <button className="text-[#FF6B00] font-medium text-sm">Change</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-6">Payment Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Item Total</span>
                  <span className="text-white">₹520</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Platform Fee</span>
                  <span className="text-white">₹15</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>GST & Charges</span>
                  <span className="text-white">₹25</span>
                </div>
                
                <div className="h-[1px] w-full bg-white/10 my-4" />
                
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-white">To Pay</span>
                  <span className="text-[#FF6B00]">₹560</span>
                </div>
              </div>

              <div className="bg-[#121212] p-4 rounded-xl border border-white/5 mb-6 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-white">Swiggy Money Wallet</p>
                  <p className="text-xs text-green-400">Sufficient Balance (₹1,200)</p>
                </div>
              </div>

              <button 
                onClick={handleOrder}
                disabled={isOrdering}
                className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,107,0,0.3)]"
              >
                {isOrdering ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing via MCP...
                  </>
                ) : (
                  <>
                    Pay ₹560 & Schedule
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            
            <div className="glass p-6 rounded-3xl text-center">
              <h3 className="font-semibold text-white mb-2">Macro Impact</h3>
              <p className="text-sm text-gray-400 mb-4">No order selected.</p>
              <div className="flex justify-center gap-4 text-sm font-medium">
                <div className="flex flex-col items-center">
                  <span className="text-[#FF6B00]">0</span>
                  <span className="text-gray-500 text-xs">kcal</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div className="flex flex-col items-center">
                  <span className="text-blue-400">0g</span>
                  <span className="text-gray-500 text-xs">Protein</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
