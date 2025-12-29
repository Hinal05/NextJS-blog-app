"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { NormalizedPost } from "@/lib/api";

type BlogListProps = {
  posts: NormalizedPost[];
};

export default function BlogList({ posts }: BlogListProps) {
  const [query, setQuery] = useState("");

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8">
      <Breadcrumbs />

      <input
        className="border p-2 w-full mb-6"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {filtered.map((post) => (
          <div
            key={post.slug}
            className="bg-white p-4 rounded shadow hover:scale-105 transition"
          >
            <Link href={`/blog/${post.slug}`}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-contain mb-4"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold">{post.title}</h3>
            </Link>

            <p className="text-sm text-gray-600 mt-1">
              By{" "}
              <Link
                href={`/authors/${post.authorId}`}
                className="text-blue-600 hover:underline"
              >
                {post.author}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
