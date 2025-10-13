'use server'

import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import { useSession } from "@/auth-client";
import { revalidatePath } from 'next/cache';

export async function DeleteReadingData(storyId: string, readLater: number) {
  const session = useSession().data;
  const supabase = await createSupabaseClientWithLogin(session);

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
