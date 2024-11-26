import type { NextAuthConfig } from 'next-auth';

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