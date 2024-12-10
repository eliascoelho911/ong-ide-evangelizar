import 'server-only'

import { cache } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from './session'

export const verifySession = cache(async () => {
  const session = await getSession()

  if (!session?.userId) {
    redirect('/login')
  } else {
    return { isAuth: true, userId: session.userId }
  }
})

export const getLoggedUserId = cache(async () => {
  const session = await verifySession()
  if (session?.userId) {
    return session.userId as string
  } else {
    return undefined
  }
})
