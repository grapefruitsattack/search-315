import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter"

const authConfig: NextAuthConfig = {
    providers: [
      Google,
    ],
    adapter: SupabaseAdapter({
      url: process.env.SUPABASE_URL||'',
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY||'',
    }),
   callbacks: {
     async jwt({ token, user, account }) {
       if (user && account?.id_token) {
         token.idToken = account?.id_token;
       }
       return token;
     },
     async session({ token, session }) {
       session.idToken = token.idToken;
       return session;
     },
   },
  };

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);