'use server'
import { cookies, headers } from 'next/headers';
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import { revalidatePath } from 'next/cache';
import GetLocalDate  from "@/features/common/utils/GetLocalDate";

export async function UpdateReadingData(storyId: string, readingDate: string, readLater: number) {

  const localDate: string = await GetLocalDate();

  const useReadingDate 
    = readingDate===''
      ?localDate
      :readingDate;

  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const supabase = await createSupabaseClientWithLogin(session);

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