import { NextRequest, NextResponse } from 'next/server';
import Cloudflare from 'cloudflare';

export const dynamic = "force-static";
export const revalidate = 86400;
export const fetchCache = "force-cache";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const client = new Cloudflare({
    apiToken: process.env.CLOUDFLARE_API_TOKEN,
  });
  const value = await client.kv.namespaces.values.get(process.env.CLOUDFLARE_KV_NAMESPACE_ID!, id, {
    account_id: process.env.CLOUDFLARE_ACCOUNT_ID!,
  });

  if (!value) {
    return NextResponse.json({
      lyric: 'not found',
    });
  }

  const content = await(await value.blob()).text();

  return NextResponse.json({
    lyric: content,
  },
  {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}