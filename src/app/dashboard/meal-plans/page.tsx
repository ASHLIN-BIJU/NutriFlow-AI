'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSavedPlan, clearSavedPlan, type SavedPlan } from '@/lib/plan'
export default function MealPlansPage() {
  const [saved,setSaved]=useState<SavedPlan|null>(null)
  useEffect(()=>{queueMicrotask(()=>setSaved(getSavedPlan()))},[])
  return <main className="max-w-5xl mx-auto space-y-8"><header><h1 className="text-3xl font-semibold">Saved meal plan</h1><p className="text-stone-400 mt-2">Your last saved AI-generated day of meals. Estimates need checking.</p></header>
  {!saved ? <div className="rounded-2xl border border-white/10 p-8"><p>No saved plan yet.</p><Link href="/dashboard/ai-planner" className="text-[#c5e78b] underline mt-4 inline-block">Create a plan</Link></div> : <><div className="rounded-2xl border border-white/10 p-5"><p className="text-sm text-stone-400">Goal</p><h2 className="text-xl mt-2">{saved.prompt}</h2><p className="text-sm text-stone-400 mt-2">Saved {new Date(saved.savedAt).toLocaleString()}</p></div><div className="grid sm:grid-cols-3 gap-4">{(['breakfast','lunch','dinner'] as const).map(k=><article key={k} className="rounded-2xl border border-white/10 bg-[#171916] p-5"><h3 className="capitalize font-semibold text-[#c5e78b]">{k}</h3><p className="mt-3">{saved.plan[k].items}</p><p className="text-sm text-stone-400 mt-3">{saved.plan[k].protein} protein · {saved.plan[k].calories} · {saved.plan[k].cost}</p><p className="text-xs text-stone-500 mt-2">Suggested restaurant: {saved.plan[k].restaurant}</p></article>)}</div><p className="text-sm">Total estimate: {saved.plan.total.calories} · {saved.plan.total.protein} protein · {saved.plan.total.cost}</p><button className="text-stone-300 underline" onClick={()=>{clearSavedPlan();setSaved(null)}}>Remove saved plan</button></>}
  <p className="text-xs text-stone-500">Saved only in this browser. Not synced to an account. No order is placed.</p></main>
}
