import { betterAuth } from "better-auth";
import { Pool } from 'pg';
import { jwt, bearer } from "better-auth/plugins"
import { SignJWT } from 'jose';
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';


export const auth = betterAuth({
  database: new Pool({
      connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: false, 
  }, 
  socialProviders: {
      google: { 
          clientId: process.env.AUTH_GOOGLE_ID as string, 
          clientSecret: process.env.AUTH_GOOGLE_SECRET as string, 
      }, 
  },
});


/**
 * Better Auth セッションから Supabase 用 JWT を生成
 * @param session Better Auth の session オブジェクト
 */
export async function createSupabaseJWT(session: any): Promise<string> {
  if (!session || !session.user) {
    throw new Error('No user session found');
  }

  const userId = session.user.id; // Better Auth のユーザーID
  const encoder = new TextEncoder();

  const jwt = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // 有効期限 1時間
    .sign(encoder.encode(process.env.SUPABASE_JWT_SECRET!));

  return jwt;
}

export async function createSupabaseClient() {

  const supabase = createClient(
    process.env.SUPABASE_URL!, 
    process.env.SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  return supabase;
}
/**
 * Supabase Client を生成（サーバーサイド用）
 * @param session Better Auth の session
 */
export async function createSupabaseClientWithLogin(session: any) {
  const token = await createSupabaseJWT(session);

  const supabase = createClient(
    process.env.SUPABASE_URL!, 
    process.env.SUPABASE_ANON_KEY!,
    {
      accessToken: async () => token,
      global: { headers: { Authorization: `Bearer ${token}` } },
    }
  );

  return supabase;
}