import { posts } from "@/library/posts";
import BlogList from "./BlogList";
import { fetchPosts } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';

export const dynamic = "force-dynamic"; // or "force-static" if preferred

export default async function BlogListPage() {
  const posts = await fetchPosts();
  return (
    <ProtectedRoute>
      <BlogList posts={posts} />
    </ProtectedRoute>
  );
}
