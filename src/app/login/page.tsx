'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Mail, Lock, User as UserIcon, ArrowRight, AlertCircle } from 'lucide-react';
import { login, signup } from './actions';
import { useSearchParams } from 'next/navigation';

function AuthContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const errorMessage = searchParams.get('error');
  
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF6B00] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF7A1A] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF7A1A] flex items-center justify-center shadow-[0_0_30px_rgba(255,107,0,0.3)]">
            <ChefHat className="text-white w-8 h-8" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[2rem] border border-white/10 relative overflow-hidden"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Enter your details to access your dashboard' : 'Join NutriFlow AI today'}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          <form action={isLogin ? login : signup} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Full Name"
                      required={!isLogin}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#FF6B00]/50 transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-[#121212] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#FF6B00]/50 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full bg-[#121212] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#FF6B00]/50 transition-colors"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-[#FF6B00] hover:text-[#FF7A1A] font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF7A1A] text-white font-bold py-3.5 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-6"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#FF6B00] hover:text-[#FF7A1A] font-medium transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-[#FF6B00]/20 border-t-[#FF6B00] animate-spin" /></div>}>
      <AuthContent />
    </Suspense>
  );
}
