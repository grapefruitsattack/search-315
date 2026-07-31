'use server'
import { headers } from "next/headers";
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import type { Story,UserReadingData,RelationStoryOther } from '@/data/types';
import m_story from '@/data/m_story.json';
import relation_story_other from '@/data/relation_story_other.json';
import StoryBlock from "@/features/common/components/story/StoryBlock";

async function getData(
  storyIds: string[]
):Promise<{
  resultStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  login:boolean
}> {
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const supabase = session?.user
      ?await createSupabaseClientWithLogin(session)
      :await createSupabaseClient()
  ;
  const login: boolean = session?.user?true:false;

  let resultStoryData: {story:Story;userReadingData: UserReadingData | null;}[]
    = storyIds.map(id=>m_story.find(data=>data.storyId===id) as Story)
      .map(data=>{return {story:data,userReadingData:null}});

  if(login){
    const targetStoryId: string[] = storyIds;
    const userId: string
      = session?.user
        ?session.user.id||''
        :'';
    const userReadingData: UserReadingData[] = (await supabase.rpc(
      'get_user_reading_from_storyid',
      {
        user_id:userId,story_id_array:targetStoryId
      }
    )).data||[];
    resultStoryData = resultStoryData.map(storyData=>{
      return {story:storyData.story,userReadingData:userReadingData.find(userReading=>userReading.story_id===storyData.story.storyId)||null}
    });
  };

  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        {
          resultStoryData:resultStoryData
          ,login:session?.user?true:false
        }
      );
    }, 500); // ある程度の時間をローディング表示
  });
}

export default async function StoryWithSong({ albumId }: { albumId: string }) {
  const storyIds = relation_story_other.filter(data=>data.albumId===albumId).map(data=>data.storyId);
  const post = await getData(storyIds);
  const login = post.login;

  return(
  <>
  {/* 関連ストーリー */}
  {post.resultStoryData===null || post.resultStoryData.length===0
    ?<></>
    :<>
      <div 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
            mt-8
        "
      >
        <svg className="fill-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
          <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
        </svg>
        {'関連ストーリー'}
      </div>
      <div className={`
          items-start gap-4 grid-cols-1 tablet:grid-cols-2 mt-2
          grid
      `}>
        {post.resultStoryData.map((result, index) => (
          <StoryBlock 
            key={index} 
            storyId={result.story.storyId} 
            media={result.story.media} 
            category={result.story.category} 
            website={result.story.website}
            headTitle={result.story.headTitle} 
            storyTitle={result.story.storyTitle} 
            releaseDate={result.story.releaseDate}
            infoStory={result.story.infoStory} 
            howtoviewStory={result.story.howtoviewStory}
            url={result.story.url} 
            pp={result.story.pp||0}
            login={login}
            userReadLater={result.userReadingData===null?null:result.userReadingData.read_later}
            displayLogin={true}
          />
        ))}
      </div>
    </>
  }
  </>);

}