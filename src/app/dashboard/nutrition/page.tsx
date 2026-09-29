'use client'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import { getSavedPlan, type SavedPlan } from '@/lib/plan'
export default function NutritionPage(){const [saved,setSaved]=useState<SavedPlan|null>(null);useEffect(()=>{queueMicrotask(()=>setSaved(getSavedPlan()))},[]);return <main className="max-w-3xl mx-auto space-y-6"><h1 className="text-3xl font-semibold">Nutrition estimates</h1><p className="text-stone-400">These figures come from an AI meal suggestion, not a food log or verified nutrition source.</p>{saved?<div className="rounded-2xl bg-[#171916] border border-white/10 p-6"><p className="text-[#c5e78b]">Last saved plan</p><p className="mt-3 text-lg">{saved.plan.total.calories} · {saved.plan.total.protein} protein · {saved.plan.total.cost} estimated cost</p></div>:<p>No saved plan yet. <Link href="/dashboard/ai-planner" className="text-[#c5e78b] underline">Create one</Link>.</p>}</main>}
