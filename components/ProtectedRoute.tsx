// components/ProtectedRoute.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('csrf_token');
    if (!token) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="text-center mt-20">🔐 Checking login...</div>;
  }

  return <>{children}</>;
}
