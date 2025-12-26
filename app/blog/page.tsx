import BlogList from "./BlogList";
import { fetchPosts } from "@/lib/api";

export const revalidate = 60; // ISR

export default async function BlogListPage() {
  const posts = await fetchPosts();
  return <BlogList posts={posts} />;
}
