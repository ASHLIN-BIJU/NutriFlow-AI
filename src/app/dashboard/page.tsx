'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSavedPlan, type SavedPlan } from '@/lib/plan'

export default function Dashboard() {
  const [saved, setSaved] = useState<SavedPlan|null>(null)
  useEffect(() => { queueMicrotask(() => setSaved(getSavedPlan())) }, [])
  return <div className="max-w-5xl mx-auto space-y-8">
    <header><p className="text-[#c5e78b] text-xs tracking-widest uppercase mb-3">Your workspace</p><h1 className="text-3xl sm:text-4xl font-semibold">Meal planning, your way.</h1><p className="text-stone-400 mt-3">Build a plan around your goal and review the estimates before you decide.</p></header>
    {saved ? <section className="rounded-2xl bg-[#1b211a] border border-[#4b5743] p-5 sm:p-8"><p className="text-[#c5e78b] text-xs uppercase tracking-wider">Last saved plan</p><h2 className="text-xl mt-3 font-medium">{saved.prompt}</h2><p className="text-sm text-stone-400 mt-3">{saved.plan.total.calories} · {saved.plan.total.protein} protein · estimated {saved.plan.total.cost}</p><Link href="/dashboard/meal-plans" className="inline-block mt-6 text-[#c5e78b] underline">View meals</Link></section> : <section className="rounded-2xl bg-[#1b211a] border border-[#4b5743] p-5 sm:p-8"><h2 className="text-xl font-medium">No plan saved yet</h2><p className="text-stone-400 mt-2">Generate a plan, then save it to see it here.</p></section>}
    <Link href="/dashboard/ai-planner" className="inline-flex bg-[#c5e78b] text-[#182310] px-5 py-3 rounded-lg font-bold">Open AI Planner</Link>
    <p className="text-xs text-stone-500">Plans are AI suggestions. Nutrition, restaurant names and prices are estimates, not live listings.</p>
  </div>
}
