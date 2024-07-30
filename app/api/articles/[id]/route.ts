import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
  }

  const headers = new Headers({
    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!,
    'Content-Type': 'application/json',
  });

  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/blogs/107443388742/articles/${id}.json`,
    { headers }
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data.article);
}
