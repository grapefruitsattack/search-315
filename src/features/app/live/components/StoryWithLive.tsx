'use server'
import { headers } from "next/headers";
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import type { Story,UserReadingData,RelationStoryOther } from '@/data/types';
import m_story from '@/data/m_story.json';
import relation_story_other from '@/data/relation_story_other.json';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import StoryCarousel from "@/features/common/components/StoryCarousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Toaster } from 'sonner';
import { BookOpen } from "lucide-react";

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

export default async function StoryWithLive({ livePerId,liveId }: { livePerId: string; liveId: string; }) {
  const storyIds = relation_story_other.filter(data=>data.livePerId===livePerId||data.liveId===liveId).map(data=>data.storyId);
  const post = await getData(storyIds);
  const login = post.login;

  return(
  <>
  {/* 関連ストーリー */}
  {post.resultStoryData===null || post.resultStoryData.length===0
    ?<></>
    :<>
      <Toaster position="top-center"/>
      <div 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
            text-indigo-900 font-bold
        "
      >
        <BookOpen className="mr-1 text-indigo-700" />
        {'関連ストーリー'}
      </div>
      <div className={`grid tablet:hidden
        items-start gap-4 grid-cols-1 tablet:grid-cols-2 mt-2
        mobileM:mx-1 mobileS:mx-2 mx-1
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
      <div 
        className={`hidden tablet:flex w-full rounded-md overflow-x-scroll overflow-y-hidden `}
      >
        <div 
          className="flex flex-row flex-nowrap w-max
          gap-3 lg:px-3 px-2 pt-4 pb-4
          "
        >
        {post.resultStoryData.map((result, index) => (
          <div key={index} className="pc:min-w-[290px] min-w-[260px]">
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
          </div>
        ))}
        </div>
      </div>

    </>
  }
  </>);

}