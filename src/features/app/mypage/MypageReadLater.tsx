'use server'
import { auth } from "@/auth";
import { createClient } from '@supabase/supabase-js';
import { notFound } from "next/navigation";

async function getData():Promise<string[]> {
  const session = await auth();
  const supabaseAccessToken = session?.supabaseAccessToken;
  const supabase = session?.user
    ?
      createClient(
        process.env.SUPABASE_URL||'',
        process.env.SUPABASE_ANON_KEY||'',
        {
          global: {
            headers: {
              Authorization: `Bearer ${supabaseAccessToken}`,
            },
          },
        }
      )
    :
      createClient(
        process.env.SUPABASE_URL||'',
        process.env.SUPABASE_ANON_KEY||'',
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      )
  ;
  const userId: string | null
    = session?.user
      ?session.user.id||null
      :null;

  //ストーリー情報取得
  const displayPageSize: number = 3;
  
    const {data, error} = (
      await supabase.from('user_reading').select(`
        story_id,
        updated_at,
        m_story_json_data(
          json_data
        )
      `).eq('user_id',userId).eq('read_later',0).range(1,2)
    );
    if (!data) notFound()
  
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        ['']
      );
    }, 500); // ある程度の時間をローディング表示
  });
}


export default async function UnitPageStory(
  { unitId }: { unitId: string;}): Promise<JSX.Element> 
{
    const post = await getData();

    return(<></>)

}