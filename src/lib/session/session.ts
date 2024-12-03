import { cookies } from 'next/headers'
import { encrypt } from '@/lib/session/session_crypt'
 
export async function createSession(userId: string) {
  const session = await encrypt({ userId })

  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}