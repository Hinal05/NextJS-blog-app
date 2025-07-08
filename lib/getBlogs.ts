export async function fetchBlogs() {
  const res = await fetch(
    "https://drupal-decoupled.ddev.site:33001/jsonapi/node/blog?include=uid,field_image,field_tags",
    { cache: "no-store" } // or use revalidation
  );

  if (!res.ok) throw new Error("Failed to fetch blogs");

  const data = await res.json();

  const included = data.included || [];

  const authorsMap = {};
  included
    .filter((item: any) => item.type === "user--user")
    .forEach((user: any) => {
      authorsMap[user.id] = {
        id: user.id,
        name: user.attributes.name,
        bio: user.attributes.field_bio || "No bio available",
        image: user.attributes.field_profile_picture?.uri?.url || "https://placehold.co/150x150",
      };
    });

  const blogs = data.data.map((post: any) => {
    const authorId = post.relationships.uid.data.id;
    const author = authorsMap[authorId];

    return {
      slug: post.attributes.title.toLowerCase().replace(/\s+/g, "-"),
      title: post.attributes.title,
      content: post.attributes.body?.value || "",
      image: post.relationships.field_image?.data?.meta?.alt || "https://placehold.co/800x400",
      createdDate: post.attributes.created,
      authorId: author.id,
      author: author.name,
      tags: included
        .filter((item: any) =>
          post.relationships.field_tags?.data?.some((tagRef: any) => tagRef.id === item.id)
        )
        .map((tag: any) => tag.attributes.name),
    };
  });

  const authors = Object.values(authorsMap);

  return { blogs, authors };
}
