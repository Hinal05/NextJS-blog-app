import BlogList from "./BlogList";
import { fetchPosts } from "@/lib/api";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await fetchPosts();
  return <BlogList posts={posts} />;
}
