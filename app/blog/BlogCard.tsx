'use client';

export default function BlogCard({ post }: { post: any }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="block bg-white p-4 rounded shadow hover:scale-105 transition"
    >
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-sm text-gray-600">{post.content.slice(0, 60)}...</p>
    </a>
  );
}
