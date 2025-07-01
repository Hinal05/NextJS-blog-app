import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "force-cache", // allow static generation
  });

  const posts = await res.json();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`http://localhost:3000/api/posts/${params.slug}`, {
    cache: "force-cache", // enables SSG
  });

  if (!res.ok) notFound();

  const post = await res.json();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Breadcrumbs postTitle={post.title} />
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-gray-600 mb-2">
        By <span className="font-medium">{post.author}</span> |{" "}
        <span>{new Date(post.createdDate).toLocaleDateString()}</span>
      </div>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        loading="lazy"
        className="object-contain w-full max-h-96 mb-6"
      />
      <div className="mb-4">
        <p className="text-lg leading-relaxed">{post.content}</p>
      </div>
      {post.tags?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="bg-gray-200 text-black px-2 py-1 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
