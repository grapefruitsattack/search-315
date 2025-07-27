'use server'

import { createClient } from '@supabase/supabase-js';
import { auth } from '../../../../auth';

export async function UpdateReadingData(storyId: string, localDate: string, readLater: number) {
  const session = await auth();
    const supabaseAccessToken = session?.supabaseAccessToken;
    const supabase = createClient(
      process.env.SUPABASE_URL||'',
      process.env.SUPABASE_ANON_KEY||'',
      {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      }
    );

    //データ更新
    const { error } = await supabase.rpc(
      'update_user_reading',
      {
        user_id: session?.user?.id,
          story_id: storyId,
          reading_date: localDate,
          read_later: readLater
      }
    );
    console.log(error);
    // リロード
    //revalidatePath("/");
    //toast("Event has been created.")
    // if (!data[0].id) {
    //   throw new Error('Failed to insert record');
    // }
  }