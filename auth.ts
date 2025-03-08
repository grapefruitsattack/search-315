import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter"
import jwt from "jsonwebtoken"

const authConfig: NextAuthConfig = {
    providers: [
      Google,
    ],
    adapter: SupabaseAdapter({
      url: process.env.SUPABASE_URL||'',
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY||'',
    }),
   callbacks: {
    //  async jwt({ token, user, account }) {
    //    if (user && account?.id_token) {
    //      token.idToken = account?.id_token;
    //    }
    //    return token;
    //  },
     async session({ session, user }) {
       const signingSecret = process.env.SUPABASE_JWT_SECRET
       if (signingSecret) {
         const payload = {
           aud: "authenticated",
           exp: Math.floor(new Date(session.expires).getTime() / 1000),
           sub: user.id,
           email: user.email,
           role: "authenticated",
         }
         session.supabaseAccessToken = jwt.sign(payload, signingSecret)
       }
       return session
     },
   },
  };

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);