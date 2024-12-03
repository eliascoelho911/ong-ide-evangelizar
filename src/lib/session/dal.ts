import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session/session_crypt'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { getAuthenticatedAppForUser } from '../firebase/serverApp'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

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
    const { currentUser } = await getAuthenticatedAppForUser()

    console.log('dal: User fetched, currentUser:', currentUser)
    return currentUser
  } catch {
    console.log('Failed to fetch user')
    return null
  }
})