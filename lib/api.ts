// lib/api.ts
import { posts } from "@/library/posts";
import { authors } from "@/library/authors";

export type NormalizedPost = {
  slug: string;
  title: string;
  content: string;
  image: string;
  author: string;
  authorId: string;
  createdDate: string;
  createdDateFormatted: string;
  tags: string[];
};

/* ---------------- POSTS ---------------- */

export async function fetchPosts(): Promise<NormalizedPost[]> {
  return posts.map((post) => ({
    ...post,
    createdDateFormatted: new Date(post.createdDate).toLocaleDateString("en-GB"),
  }));
}

export async function fetchPostsByAuthor(authorId: string) {
  return posts
    .filter((post) => post.authorId === authorId)
    .map((post) => ({
      ...post,
      createdDateFormatted: new Date(post.createdDate).toLocaleDateString("en-GB"),
    }));
}

/* ---------------- AUTHORS ---------------- */

export async function fetchAuthorById(id: string) {
  return authors.find((author) => author.id === id) || null;
}
