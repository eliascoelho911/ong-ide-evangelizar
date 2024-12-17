import 'server-only'

import { cache } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from './session'
import { absoluteUrl } from '@/utils/absolute-url'
import { getLoginRoute } from '@/app/routes'

export const verifySession = cache(async () => {
  const session = await getSession()

  if (!session?.userId) {
    redirect(absoluteUrl(getLoginRoute()))
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

export async function requireAuth(onAuth: () => Promise<Response>): Promise<Response> {
  const session = await verifySession()
  if (session?.isAuth) {
    return onAuth()
  } else {
    return Promise.resolve(new Response('Unauthorized', { status: 401 }))
  }
}