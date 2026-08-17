'use server'
import { headers } from "next/headers";
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import type { SingingMaster,Story,UserReadingData } from '@/data/types';
import m_story from '@/data/m_story.json';
import { MEDIA, HOW_TO_VIEW, getCategoryByMedia } from '@/features/common/const/StoryInfoConst';
import TopPageStory from "@/features/app/top/TopPageStory";

async function getData(
):Promise<{
  freeStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  paidStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  freeStoryCnt: number,
  paidStoryCnt: number,
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

  //ストーリー情報取得
  const displayPageSize: number = 6;

  const freeStoryAllData: Story[]
    = m_story
      .filter((data)=>data.howtoviewStory.some((htvData)=>[HOW_TO_VIEW.asbPremium.id,HOW_TO_VIEW.asbPurchase.id,HOW_TO_VIEW.asbSerialcodeCD.id,HOW_TO_VIEW.asbSerialcode.id].includes(htvData)===false));
  let freeStoryData: {story:Story; userReadingData: UserReadingData | null;}[]
    = freeStoryAllData.slice(0,displayPageSize)
      .map(data=>{return {story:data,userReadingData:null}})
      ;
  const paidStoryAllData: Story[] 
    = m_story
      .filter((data)=>data.howtoviewStory.some((htvData)=>[HOW_TO_VIEW.asbPremium.id,HOW_TO_VIEW.asbPurchase.id,HOW_TO_VIEW.asbSerialcodeCD.id,HOW_TO_VIEW.asbSerialcode.id].includes(htvData)===true));
  let paidStoryData: {story:Story; userReadingData: UserReadingData | null;}[]
    = paidStoryAllData.slice(0,displayPageSize)
      .map(data=>{return {story:data,userReadingData:null}})
      ;

  if(login){
    const targetStoryId: string[] = freeStoryData.map(data=>data.story.storyId).concat(paidStoryData.map(data=>data.story.storyId));
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
    freeStoryData = freeStoryData.map(storyData=>{
      return {story:storyData.story,userReadingData:userReadingData.find(userReading=>userReading.story_id===storyData.story.storyId)||null}
    });
    paidStoryData = paidStoryData.map(storyData=>{
      return {story:storyData.story,userReadingData:userReadingData.find(userReading=>userReading.story_id===storyData.story.storyId)||null}
    });
  }

  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        {
          freeStoryData:freeStoryData
          ,paidStoryData:paidStoryData
          ,freeStoryCnt:freeStoryAllData.length
          ,paidStoryCnt:paidStoryAllData.length
          ,login:session?.user?true:false
        }
      );
    }, 500); // ある程度の時間をローディング表示
  });
}


export default async function TopPageStoryServer(
  { }: { }): Promise<JSX.Element> 
{
  const post = await getData();  
  return (
   <TopPageStory post={post}/>
  )
};

