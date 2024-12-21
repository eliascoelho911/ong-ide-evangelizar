'use server'

import { z } from 'zod';
import { signInWithEmailAndPassword } from '@/lib/firebase/auth';
import { createSession } from '@/lib/auth/session';

export async function signIn(credentials: { email: string, password: string }) {
  try {
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6) })
      .safeParse(credentials);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      const user = (await signInWithEmailAndPassword(email, password)).user;

      await createSession(user.uid);
    } else {
      throw parsedCredentials.error;
    }
  } catch (error) {
    return { error: 'Credenciais inválidas' };
  }
}
