import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchAuthorById, fetchPostsByAuthor } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  content: string;
  createdDateFormatted: string;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AuthorPage({ params }: Props) {
  const { id } = await params;

  const author = await fetchAuthorById(id);
  const posts: Post[] = await fetchPostsByAuthor(id);

  if (!author) return <div className="p-8">Author not found.</div>;

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-red-500">Total posts: {posts.length}</p>

        <h1 className="text-3xl font-bold mb-2">{author.displayName}</h1>
        <p className="text-gray-600 mb-2">Username: {author.username}</p>
        <p className="text-gray-600 mb-4">Email: {author.email}</p>

        <h2 className="text-2xl font-semibold mb-4">
          Blogs by {author.displayName}
        </h2>

        {posts.length === 0 ? (
          <p>No posts found for this author.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug} className="border p-4 rounded">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xl text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500">
                  {post.createdDateFormatted}
                </p>
                <p className="text-gray-600 text-sm">
                  {post.content.slice(0, 80)}...
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
