'use server'

import { createClient } from '@supabase/supabase-js';
import { useSession } from "@/auth-client";
import { revalidatePath } from 'next/cache';

export async function DeleteReadingData(storyId: string, readLater: number) {
  const session = useSession().data;
  const supabaseAccessToken = session?.session.token;

  const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || '',
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  );

  const { data,error } = await supabase
    .from('user_reading')
    .delete()
    .eq('id', session?.user?.id)
    .eq('story_id', storyId)
    .eq('read_later', readLater).select();

    console.log(data);
  if (error||data===null||data.length===0) {
    console.error('Delete error:', error);
    throw ('削除に失敗しました');
  }
  revalidatePath("/");
  // revalidatePath などもここで使える
}
