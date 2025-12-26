import { fetchPosts } from "@/lib/api";

export default async function SearchPage({ searchParams }) {
  const q = searchParams.q?.toLowerCase() || "";
  const posts = await fetchPosts();

  const results = posts.filter(
    p =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
  );

  return (
    <section className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">
        Search results for "{q}"
      </h1>

      {results.length === 0 && <p>No results found.</p>}

      <ul className="space-y-4">
        {results.map(post => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className="text-blue-600">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
