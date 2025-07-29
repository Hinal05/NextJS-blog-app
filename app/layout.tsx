'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import './globals.css';
import { LogoutButton } from '@/components/LogoutButton';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('csrf_token'));
    };

    checkAuth(); // Initial check

    // const handleStorage = () => {
    //   setIsLoggedIn(!!localStorage.getItem('csrf_token'));
    // };

    // handleStorage(); // initial check

    // window.addEventListener('storage', handleStorage);
    // return () => window.removeEventListener('storage', handleStorage);

    window.addEventListener('authChanged', checkAuth);
    return () => window.removeEventListener('authChanged', checkAuth);
  }, []);

  return (
    <html lang="en">
      <body>
        <header>
          <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
              {isLoggedIn ? (
                <>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><LogoutButton onLogout={() => setIsLoggedIn(false)} /></li>
                </>
              ) : (
                <>
                  <li><Link href="/login">Login</Link></li>
                  <li><Link href="/register">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <main style={{ padding: '1rem' }}>{children}</main>

        <footer style={{ padding: '1rem', borderTop: '1px solid #ccc' }}>
          <p>© 2025 My Blog</p>
        </footer>
      </body>
    </html>
  );
}
