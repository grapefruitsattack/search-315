
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
        .select("id,storyId,readingDate,readLater")
        .eq('storyId',storyId).eq('readLater',0).eq('id',userId).single()
        ||[];
    const isRead: boolean = data?.id;
    const userReading: UserReading|null = data;

    return(<>
      {session?.user
          ?isRead
            ?<>
            <div className="grid grid-cols-[2fr_4fr]  w-full h-full">
            <button
                className='rounded-l-lg border-2 border-red-500 w-full h-full
                text-red-500 font-sans font-black leading-tight
                bg-red-500 text-white
                transition-all duration-500 ease-out
                fill-red-500 hover:fill-red-50 
                text-sm mobileL:text-base lg:text-lg
                '
            >
              <div className='
                flex flex-wrap justify-center items-center font-sans font-black 
                mobileM:my-0.5 my-1 
              '>
               既読
              </div>
            </button>
            <button
              className='rounded-r-lg border-2 border-red-500 w-full h-full
              text-red-500 font-sans font-black leading-tight
              hover:bg-red-500 hover:text-red-100 
              transition-all duration-500 ease-out
              fill-red-500 hover:fill-red-50 
              text-sm mobileL:text-base lg:text-lg
              '
            >
              <div className='
                flex flex-wrap justify-center items-center font-sans font-black 
                mobileM:my-0.5 my-1 
              '>
              既読情報を編集する
              </div>
            </button>
            </div>
            </>
            :<>
              <form
                className='w-full h-full'
                action={async () => {
                    "use server"
                    await createOrder(storyId)}}
                >
                  <button
                      className='rounded-lg border-2 border-red-500 w-full h-full
                      text-red-500 font-sans font-black leading-tight
                      hover:bg-red-500 hover:text-red-100 
                      transition-all duration-500 ease-out
                      fill-red-500 hover:fill-red-50 
                      text-sm mobileL:text-base lg:text-lg
                      '
                      type="submit"
                  >
                    <div className='
                      flex flex-wrap justify-center items-center font-sans font-black 
                      mobileM:my-0.5 my-1 
                    '>
                    既読にする
                    </div>
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

    //データ更新
    const { error } = await supabase.rpc(
      'update_user_reading',
      {
        	user_id: session?.user?.id,
          story_id: storyId,
          reading_date: '2025-03-17',
          read_later: 0
      }
    );
    console.log(error);
    // リロード
    revalidatePath("/");
    // if (!data[0].id) {
    //   throw new Error('Failed to insert record');
    // }
  }