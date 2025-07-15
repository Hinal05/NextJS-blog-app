import { posts } from "@/library/posts";
import BlogList from "./BlogList";
import { fetchPosts } from '@/lib/api';

export const dynamic = "force-dynamic"; // or "force-static" if preferred

export default async function BlogListPage() {
  const posts = await fetchPosts();
  return <BlogList posts={posts} />;
}
