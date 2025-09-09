'use server'
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { auth } from '../../../../auth';
import { revalidatePath } from 'next/cache';
import GetLocalDate  from "@/features/common/utils/GetLocalDate";

export async function UpdateReadingData(storyId: string, readingDate: string, readLater: number) {

  const localDate: string = await GetLocalDate();

  const useReadingDate 
    = readingDate===''
      ?localDate
      :readingDate;

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
          reading_date: useReadingDate,
          read_later: readLater
      }
    );
    if (error !== null) {
      console.log(error);
      throw ('更新に失敗しました');
    }
    // リロード
    revalidatePath("/");
    //toast("Event has been created.")
    // if (!data[0].id) {
    //   throw new Error('Failed to insert record');
    // }
  }