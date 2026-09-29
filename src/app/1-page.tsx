'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ChefHat, Wallet, UtensilsCrossed, ShieldCheck } from 'lucide-react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const start = `/dashboard/ai-planner${prompt.trim() ? `?goal=${encodeURIComponent(prompt.trim())}` : ''}`
  return <main className="min-h-screen bg-[#10110f] text-[#f5f2e9] overflow-x-clip">
    <nav className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex items-center justify-between border-b border-white/10">
      <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-lg"><ChefHat className="text-[#c5e78b]"/> NutriFlow</Link>
      <div className="flex items-center gap-4 text-sm"><Link href="/login" className="text-stone-300 hover:text-white">Sign in</Link><Link href="/login?mode=signup" className="bg-[#c5e78b] text-[#182310] px-4 py-2 rounded-lg font-semibold">Get started</Link></div>
    </nav>
    <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-28 pb-20 grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
      <div><p className="uppercase tracking-[.25em] text-[#c5e78b] text-xs font-bold mb-6">Meal planning, without the spreadsheet</p>
        <h1 className="text-5xl sm:text-7xl leading-[1.05] font-semibold tracking-tight max-w-2xl">A better way to plan what you eat.</h1>
        <p className="text-stone-300 text-lg mt-6 leading-relaxed max-w-xl">Give NutriFlow a food goal and a budget. It drafts a day of meals with estimated nutrition and costs for you to review.</p>
        <div className="mt-9 max-w-xl bg-[#1c211b] border border-[#4b5743] rounded-xl p-2 flex flex-col sm:flex-row gap-2">
          <input aria-label="Food goal" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. vegetarian meals under ₹400" className="min-w-0 flex-1 px-4 py-3 bg-transparent outline-none text-white placeholder:text-stone-500"/>
          <Link href={start} className="bg-[#c5e78b] text-[#182310] px-5 py-3 rounded-lg font-bold inline-flex justify-center items-center gap-2">Plan my day <ArrowRight size={17}/></Link>
        </div><p className="text-xs text-stone-500 mt-3">Sign-in required. Plans are suggestions, not medical advice or live restaurant prices.</p>
      </div>
      <div className="rounded-3xl border border-[#4b5743] bg-[#1b211a] p-5 sm:p-8 shadow-2xl" aria-label="Example meal plan layout">
        <p className="text-[#c5e78b] text-xs uppercase tracking-widest mb-4">What a plan includes</p><h2 className="text-2xl font-semibold mb-6">One day, three meals</h2>
        {['Breakfast','Lunch','Dinner'].map((meal,i)=><div key={meal} className="flex items-start gap-4 py-4 border-t border-white/10"><span className="text-[#c5e78b] text-sm font-mono">0{i+1}</span><div><h3 className="font-medium">{meal}</h3><p className="text-sm text-stone-400">Meal ideas, estimated protein, calories and cost</p></div></div>)}
        <div className="mt-6 p-4 rounded-xl bg-[#c5e78b]/10 text-sm text-[#d5eab7]">Review every suggestion before deciding what to eat.</div>
      </div>
    </section>
    <section className="border-t border-white/10 bg-[#171916]"><div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid sm:grid-cols-3 gap-10">
      {[[UtensilsCrossed,'Speak plainly','Describe your diet and daily goal in your own words.'],[Wallet,'Keep a budget in mind','See AI-estimated costs next to each meal.'],[ShieldCheck,'Stay in control','No food is ordered, no payment is made, and plans are yours to review.']].map(([Icon,title,desc])=><div key={title as string}><Icon className="text-[#c5e78b] mb-4"/><h2 className="font-semibold text-xl mb-2">{title as string}</h2><p className="text-stone-400 leading-relaxed">{desc as string}</p></div>)}
    </div></section>
    <footer className="mx-auto max-w-6xl px-5 sm:px-8 py-8 text-sm text-stone-500">NutriFlow AI · A meal-planning prototype. Restaurant names, nutrition and prices are AI estimates, not verified listings.</footer>
  </main>
}
