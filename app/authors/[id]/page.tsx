import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authors } from "@/library/authors";
import { posts } from "@/library/posts";

export async function generateStaticParams() {
  return authors.map((author) => ({ id: author.id }));
}

export default async function AuthorPage({ params }: { params: { id: string } }) {
  const author = authors.find((a) => a.id === params.id);
  if (!author) return notFound();

  const authorPosts = posts.filter((post) => post.authorId === author.id);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={author.image}
          alt={author.name}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{author.name}</h1>
          <p className="text-gray-600">{author.bio}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Articles by {author.name}:</h2>

      {authorPosts.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="space-y-4">
          {authorPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">
                {new Date(post.createdDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
