import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchPosts } from "@/lib/api";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const posts = await fetchPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return {};

  const description =
    typeof post.content === "object"
      ? post.content.value.replace(/<[^>]+>/g, "").slice(0, 160)
      : "";

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      images: post.image ? [post.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;

  const posts = await fetchPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Breadcrumbs postTitle={post.title} />

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="text-sm text-gray-600 mb-2">
        <Link
          href={`/authors/${post.authorId}`}
          className="font-medium text-blue-600 hover:underline"
        >
          {post.author}
        </Link>{" "}
        | <span>{post.createdDateFormatted}</span>
      </div>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="object-contain w-full max-h-96 mb-6"
        />
      )}

      <div className="mb-4">
        <p className="text-lg leading-relaxed whitespace-pre-line">
          {post.content?.value}
        </p>
      </div>

      {post.tags?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-black px-2 py-1 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
