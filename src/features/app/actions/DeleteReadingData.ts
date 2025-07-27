'use server'

import { createClient } from '@supabase/supabase-js';
import { auth } from '../../../../auth';
import { revalidatePath } from 'next/cache';

export async function DeleteReadingData(storyId: string) {
  const session = await auth();
  const supabaseAccessToken = session?.supabaseAccessToken;

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

  const { error } = await supabase
    .from('user_reading')
    .delete()
    .eq('id', session?.user?.id)
    .eq('storyId', storyId);

  if (error) {
    console.error('Delete error:', error);
    throw new Error('削除に失敗しました');
  }
  revalidatePath("/");
  // revalidatePath などもここで使える
}
