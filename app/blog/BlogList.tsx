'use client';

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function BlogList({ posts: initialPosts }: { posts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [posts, setPosts] = useState(initialPosts);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    author: "",
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      ...formData,
      slug: formData.title.trim().toLowerCase().replace(/\s+/g, "-"),
      createdDate: new Date().toISOString(),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    // Optionally: Send to an API here
    setPosts((prev) => [newPost, ...prev]);
    setFormData({ title: "", content: "", image: "", author: "", tags: "" });
  };

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="p-8">
      <Breadcrumbs />

      <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>

      <a href="/blog/add" className="inline-block bg-green-600 text-white px-4 py-2 rounded mb-6 hover:bg-green-700">+ Add New Blog</a>

      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded"
      />

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
          {filteredPosts.map((post) => (
            <a
              key={post.slug}
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
              <p className="text-sm text-gray-600">
                {post.content.slice(0, 60)}...
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
