export type Meal = {items: string; protein: string; calories: string; cost: string; restaurant: string}
export type Plan = {breakfast: Meal; lunch: Meal; dinner: Meal; total: {calories: string; protein: string; cost: string}}
export type SavedPlan = {prompt: string; plan: Plan; savedAt: string}
const KEY = 'nutriflow:last-plan:v1'
export function savePlan(value: SavedPlan) { if (typeof window !== 'undefined') localStorage.setItem(KEY, JSON.stringify(value)) }
export function getSavedPlan(): SavedPlan | null {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(localStorage.getItem(KEY) || 'null') as SavedPlan | null } catch { return null }
}
export function clearSavedPlan() { if (typeof window !== 'undefined') localStorage.removeItem(KEY) }
export function numberFrom(text: string) { return Number(text.replace(/[^0-9.]/g, '')) || 0 }
