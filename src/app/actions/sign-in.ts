'use server'

import { z } from 'zod';
import { signInWithEmailAndPassword } from '@/lib/firebase/auth';
import { createSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';
import { createAbsoluteUrl } from '@/utils/absolute-url';

async function signIn(credentials: { email: string, password: string }) {
    const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);

    if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = (await signInWithEmailAndPassword(email, password)).user;

        console.log('Logged in:', user.email, ', id: ', user.uid);

        await createSession(user.uid);

        return NextResponse.redirect(createAbsoluteUrl('/dashboard'));
    } else {
        throw parsedCredentials.error;
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn({
        email: formData.get('email') as string,
        password: formData.get('password') as string
      });
    } catch (error) {
      console.log('Failed to authenticate:', error);
  
      return 'Invalid credentials.';
    }
  }
  