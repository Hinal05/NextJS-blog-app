'use client';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('csrf_token');
    window.dispatchEvent(new Event('authChanged')); // ✅ notify layout to update
    router.push('/login');
  };

  return (
    <button
      className="ml-4 text-sm text-red-600 hover:underline"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
