import { fetchAuthorById, fetchPostsByAuthor } from "@/lib/api";
import Link from "next/link";

type AuthorPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;

  const author = await fetchAuthorById(id);
  const posts = await fetchPostsByAuthor(id);

  if (!author) {
    return <p className="p-8">Author not found.</p>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
      <p className="text-gray-600 mb-6">{author.bio}</p>

      <h2 className="text-xl font-semibold mb-4">
        Blogs by {author.name}
      </h2>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
