'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AddBlogPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    author: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      ...formData,
      slug: formData.title.trim().toLowerCase().replace(/\s+/g, '-'),
      createdDate: new Date().toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    console.log('New post:', newPost);

    // Redirect back to blog list
    router.push('/blog');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Breadcrumbs postTitle="Add Blog" />
      <h1 className="text-3xl font-bold mb-6">Add New Blog</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          required
          value={formData.author}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Content"
          required
          value={formData.content}
          onChange={handleChange}
          rows={5}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Blog
        </button>
      </form>
    </div>
  );
}
