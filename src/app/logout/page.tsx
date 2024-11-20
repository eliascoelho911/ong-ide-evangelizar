'use client';

import { signOut } from "@/auth";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut();
      router.push('/login');
    };

    handleSignOut();
  }, [router]);

  return null;
}
