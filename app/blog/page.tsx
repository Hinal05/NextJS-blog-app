import { posts } from "@/library/posts";
import BlogList from "./BlogList";

export const dynamic = "force-dynamic"; // or "force-static" if preferred

export default async function BlogListPage() {
  return <BlogList posts={posts} />;
}
