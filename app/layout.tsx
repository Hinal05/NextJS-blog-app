import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
            <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main style={{ padding: "1rem" }}>{children}</main>

        <footer style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
          <p>© 2025 My Blog</p>
        </footer>
      </body>
    </html>
  );
}
