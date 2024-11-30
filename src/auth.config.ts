import type { NextAuthConfig } from 'next-auth';

import * as firebase from "@/lib/firebase";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Firebase",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          try {
            const { email, password } = parsedCredentials.data;
            const user = (await firebase.signIn(email, password)).user;
            console.log("Logged in:", user.email);

            return { id: user.uid, email: user.email };
          } catch (error) {
            console.error("Login failed:", error);
            return null;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id as string;
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) {
        // if (nextUrl.pathname === '/dashboard' || !nextUrl.pathname.startsWith('/dashboard')) {
          // return Response.redirect(new URL('/dashboard/turmas', nextUrl));
        // } else {
          return true;
        // }
      } else {
        return false
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;