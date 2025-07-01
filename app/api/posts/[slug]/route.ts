import { NextResponse } from "next/server";
import { posts } from "@/library/posts";

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
