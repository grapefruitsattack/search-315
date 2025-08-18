'use server'
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { auth } from '../../../../auth';
import { revalidatePath } from 'next/cache';

export async function UpdateReadingData(storyId: string, readingDate: string, readLater: number) {

  const dt = new Date();
  const serverDate = [
    dt.getFullYear().toString(),
    ('0' + (dt.getMonth() + 1)).slice(-2),
    ('0' + dt.getDate()).slice(-2),
  ].join('-');

  const cookieStore = cookies();
  const localDate = (await cookieStore).get('localDate')?.value||'';

  const useReadingDate 
    = readingDate===''
      ?localDate===''?serverDate:localDate
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
    console.log(error);
    // リロード
    revalidatePath("/");
    //toast("Event has been created.")
    // if (!data[0].id) {
    //   throw new Error('Failed to insert record');
    // }
  }