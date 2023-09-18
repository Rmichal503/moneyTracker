import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const {data} = await supabase.auth.getSession()
  if(req.nextUrl.pathname.startsWith('/spends')){
    if(data.session===null){
      return NextResponse.redirect(new URL('/login',req.url))
    } 
  }

  return res
}
