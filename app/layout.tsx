import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <nav className="max-w-6xl mx-auto flex gap-4 p-4">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/search">Search</Link>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto p-4">
          {children} {/* This renders all page content */}
        </main>

        <footer className="border-t p-4 text-center text-sm text-gray-500">
          © 2025 Blog App
        </footer>
      </body>
    </html>
  );
}
