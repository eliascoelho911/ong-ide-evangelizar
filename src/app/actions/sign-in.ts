import { z } from 'zod';
import { signInWithEmailAndPassword } from '@/lib/firebase/auth';
import { createSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';
import { createAbsoluteUrl } from '@/utils/absolute-url';

export async function signIn(credentials: { email: string, password: string }) {
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