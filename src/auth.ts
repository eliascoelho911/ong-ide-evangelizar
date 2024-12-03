import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { z } from 'zod';
import { signInWithEmailAndPassword } from '@/lib/firebase/auth';
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db } from "@/lib/firebase/firestore";
import { createSession } from './lib/session/session';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'Firebase',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    try {
                        const { email, password } = parsedCredentials.data;
                        const user = (await signInWithEmailAndPassword(email, password)).user;

                        console.log('Logged in:', user.email, ', id: ', user.uid);

                        await createSession(user.uid);

                        return { id: user.uid, email: user.email };
                    } catch (error) {
                        console.error('Login failed:', error);
                        return null;
                    }
                }

                return null;
            },
        })
    ],
    adapter: FirestoreAdapter(db),
    // callbacks: {
    //     async session({ session, token }) {
    //         session.user.id = token.id as string;
    //         return session;
    //     },
    //     async jwt({ token, user }) {
    //         if (user) {
    //             token.id = user.id;
    //         }
    //         return token;
    //     },
    // },
});