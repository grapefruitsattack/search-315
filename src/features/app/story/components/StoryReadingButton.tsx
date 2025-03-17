
import { auth } from "../../../../../auth";
import { createClient } from '@supabase/supabase-js'
export default async function StoryReadingButton({ storyId }: { storyId: String }) {
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
    const { data, error } = await supabase.from("user_reading").select("*").eq('storyId',storyId).eq('deleteFlg',0)||[];
    console.log(data)
    const a:number = data?.length||0;

    return(<>
        {session?.user
            ?a === 0
                ?<><form
                action={async () => {
                    "use server"
                    await createOrder(storyId)}}>
                    <button type="submit">登録</button>
                    </form></>
                :<>登録完了</>
            :<></>}</>)
}

async function createOrder(storyId: String) {
    // 親テーブルへの挿入
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

    const { data, error } = await supabase
        .from('user_reading')
        .insert({ id:session?.user?.id,storyId:storyId,readingDate:'2025-03-17',deleteFlg:0  })
        .select();
    console.log(error)
    if (error) {
      throw error;
    }
    if (!data[0].id) {
      throw new Error('Failed to insert record');
    }
  }