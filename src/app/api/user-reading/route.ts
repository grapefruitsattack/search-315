import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  auth,
  createSupabaseClient,
  createSupabaseClientWithLogin,
} from '@/auth';

export async function GET() {

  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const supabase = session?.user
    ?await createSupabaseClientWithLogin(session)
    :await createSupabaseClient()
  ;
  const login: boolean = session?.user?true:false;
  const userId: string | null
    = session?.user
      ?session.user.id||null
      :null;
  let userReadingData: {story_id: any; read_later: any;}[] | null = null;

  if(login){
    const {data, error} = (
      await supabase.from('user_reading').select(`
        story_id,
        read_later
      `).eq('id',userId) 
    );
    
    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }
    userReadingData = data;
  }

  return NextResponse.json({
    login: session?.user?true:false,
    userReadingData: userReadingData,
  });
}