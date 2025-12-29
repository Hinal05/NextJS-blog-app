import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchPosts } from "@/lib/api";
import type { NormalizedPost } from "@/lib/api";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetail({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;

  const posts: NormalizedPost[] = await fetchPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="p-8 max-w-3xl mx-auto">
      <Breadcrumbs postTitle={post.title} />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-gray-600 mb-6">
        By{" "}
        <a
          href={`/authors/${post.authorId}`}
          className="text-blue-600 hover:underline"
        >
          {post.author}
        </a>
      </p>

      <img
        src={post.image}
        alt={post.title}
        className="w-full max-h-[400px] object-contain mb-6"
      />

      <div className="prose max-w-none">
        {post.content}
      </div>
    </article>
  );
}
