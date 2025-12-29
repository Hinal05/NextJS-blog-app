import { fetchPosts } from "@/lib/api";
import type { NormalizedPost } from "@/lib/api";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const query = q?.toLowerCase() ?? "";
  const posts: NormalizedPost[] = await fetchPosts();

  const results = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Search results for “{query}”
      </h1>

      {results.length === 0 && (
        <p className="text-gray-600">No posts found.</p>
      )}

      <ul className="space-y-4">
        {results.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <a
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {post.title}
            </a>
            <p className="text-sm text-gray-600">
              By {post.author}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
