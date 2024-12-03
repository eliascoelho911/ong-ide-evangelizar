'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { deleteSession } from '@/lib/session/session'
import { redirect } from 'next/navigation';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
 
export async function logout() {
  deleteSession()
  redirect('/login')
}