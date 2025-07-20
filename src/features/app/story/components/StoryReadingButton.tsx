
import { UserReading } from "@/data/types";
import { auth } from "../../../../../auth";
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache";

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
    const userId: string
      = session?.user
        ?session.user.id||''
        :'';
    const { data, error } 
      = await supabase.from("user_reading")
        .select("id,storyId,readingDate,deleteFlg")
        .eq('storyId',storyId).eq('deleteFlg',0).eq('id',userId).single()
        ||[];
    const isRead: boolean = data?.id;
    const userReading: UserReading|null = data;

    return(<>
      {session?.user
          ?isRead
            ?<>
            登録完了
            </>
            :<>
              <form
              action={async () => {
                  "use server"
                  await createOrder(storyId)}}>
                  <button
                      className='rounded-lg border-2 border-red-500 w-full h-full
                      text-red-500 font-sans leading-tight
                      hover:bg-red-500 hover:text-red-100 
                      transition-all duration-500 ease-out
                      fill-red-500 hover:fill-red-50 
                      text-sm mobileL:text-base lg:text-lg
                      '
                      type="submit"
                  >
                    登録
                  </button>
              </form>
            </>
          :<></>}
    </>)
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
    console.log(error);
    revalidatePath("/");
    // if (!data[0].id) {
    //   throw new Error('Failed to insert record');
    // }
  }