import { NextResponse } from "next/server";
import { posts } from "@/library/posts";

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const newPost = await req.json();
  posts.unshift(newPost); // temp - no DB, just in memory
  return NextResponse.json(newPost, { status: 201 });
}