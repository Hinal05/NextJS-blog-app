// app/api/blog/create/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content, guestAuthorName } = await req.json();

    const apiBase = process.env.DRUPAL_API_URL;

    const res = await fetch(`${apiBase}/jsonapi/node/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Accept": "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "node--blog",
          attributes: {
            title,
            field_guest_author_name: guestAuthorName,
            body: {
              value: content,
              format: "basic_html",
            },
          },
        },
      }),
    });

    const text = await res.text();
    console.log("Drupal response:", text);

    if (!res.ok) {
      return NextResponse.json({ success: false, message: text }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
