import { cookies } from 'next/headers'
import { encrypt, decrypt } from '@/lib/session/session_crypt'
import { JWTPayload } from 'jose'
 
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

export async function getSession() : Promise<JWTPayload | undefined> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  return decrypt(session)
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}