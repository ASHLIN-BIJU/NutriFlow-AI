'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function AuthCallback() {
  const [error, setError] = useState('Completing sign-in...')
  useEffect(() => {
    let active = true
    const finish = async () => {
      const supabase = createClient()
      const params = new URLSearchParams(window.location.hash.slice(1))
      const code = new URLSearchParams(window.location.search).get('code')
      try {
        if (code) {
          const result = await supabase.auth.exchangeCodeForSession(code)
          if (result.error) throw result.error
        } else if (params.get('access_token') && params.get('refresh_token')) {
          const result = await supabase.auth.setSession({
            access_token: params.get('access_token')!,
            refresh_token: params.get('refresh_token')!,
          })
          if (result.error) throw result.error
        } else {
          throw new Error(params.get('error_description') || 'This sign-in link is invalid or expired.')
        }
        // Discard one-use tokens from the address bar before navigating.
        window.history.replaceState({}, '', '/auth/callback')
        window.location.replace('/dashboard/ai-planner')
      } catch (e) {
        window.history.replaceState({}, '', '/auth/callback')
        if (active) setError(e instanceof Error ? e.message : 'Sign-in failed. Request a new link.')
      }
    }
    void finish()
    return () => { active = false }
  }, [])
  return <main className="min-h-screen grid place-content-center bg-[#0a0a0a] text-white px-6 text-center">
    <h1 className="text-2xl font-semibold mb-3">NutriFlow sign-in</h1>
    <p className="text-stone-400">{error}</p>
    <Link href="/login" className="text-orange-400 mt-6 underline">Back to sign in</Link>
  </main>
}
