'use server'
import { cookies, headers } from 'next/headers';
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import { revalidatePath } from 'next/cache';
import GetLocalDate  from "@/features/common/utils/GetLocalDate";

export async function UpdateReadingData(storyId: string, readingDate: string, readLater: number) {
  new Date(readingDate)
  const localDate: string = await GetLocalDate();
  let useReadingDate: Date | null = new Date(readingDate);
  if(isNaN(useReadingDate.getDate())&&readLater==0) useReadingDate = new Date(localDate);
  if(isNaN(useReadingDate.getDate())&&readLater==1) useReadingDate = null;

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
    throw ('更新に失敗しました');
  }
  // リロード
  revalidatePath("/");
}