import BlogList from "./BlogList";
import { notFound } from "next/navigation";

// 👇 SSG: Next will cache this at build time
// export const dynamic = "force-static"; // optional: ensures it's static
export const dynamic = "force-dynamic"; // SSR

export default async function BlogListPage() {
  const res = await fetch("http://localhost:3000/api/posts", {
    // cache: "force-cache", // enable SSG
    cache: "no-store", // disables caching
  });

  if (!res.ok) return notFound();

  const posts = await res.json();

  return <BlogList posts={posts} />;
}
