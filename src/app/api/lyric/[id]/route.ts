import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Cloudflare from 'cloudflare';
import {
  auth,
  createSupabaseClient,
  createSupabaseClientWithLogin,
} from '@/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const client = new Cloudflare({
    apiToken: process.env.CLOUDFLARE_API_TOKEN,
  });
  const value = await client.kv.namespaces.values.get(process.env.CLOUDFLARE_KV_NAMESPACE_ID!, id, {
    account_id: process.env.CLOUDFLARE_ACCOUNT_ID!,
  });
  const content = await(await value.blob()).text();

  return NextResponse.json({
    lyric: content,
  });
}