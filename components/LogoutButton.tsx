'use client';
import { useRouter } from 'next/navigation';

type LogoutButtonProps = {
  onLogout: () => void;
};

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('csrf_token');
    window.dispatchEvent(new Event('authChanged'));
    onLogout();
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
