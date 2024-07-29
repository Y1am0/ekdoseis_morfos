import { NextResponse } from 'next/server';

export async function GET() {
  const headers = new Headers({
    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!,
    'Content-Type': 'application/json',
  });

  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/blogs.json`,
    { headers }
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data.blogs);
}
