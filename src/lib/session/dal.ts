import 'server-only'

import { cache } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from './session'

export const verifySession = cache(async () => {
  const session = await getSession()

  if (!session?.userId) {
    console.log('dal: No session found, redirecting to login')
    redirect('/login')
  } else {
    console.log('dal: Session found')
    return { isAuth: true, userId: session.userId }
  }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  try {
    return { userId: session.userId as string }
  } catch {
    console.log('Failed to fetch user')
    return null
  }
})