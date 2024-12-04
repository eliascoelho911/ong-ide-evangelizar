'use server';

import { signIn } from '@/app/actions/sign-in';

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
