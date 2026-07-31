'use server'
import { headers } from "next/headers";
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import type { SingingMaster,Story,UserReadingData } from '@/data/types';
import m_story from '@/data/m_story.json';
import { MEDIA, HOW_TO_VIEW, getCategoryByMedia } from '@/features/common/const/StoryInfoConst';
import FisherYatesShuffl from '@/features/common/utils/FisherYatesShuffl';
import UnitPageStory from "@/features/app/unit/UnitPageStory";

async function getData(
  unitId: string
):Promise<{
  freeStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  paidStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  archiveStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  freeStoryCnt: number,
  paidStoryCnt: number,
  archiveStoryCnt: number,
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
  const unitPrefix: string = unitId.substring(0,3);
  const unitStoryData: Story[] 
    = m_story.filter((data)=>
      data.infoStory.some(infoData=>infoData.infoId.substring(0,3)===unitPrefix)
    );
  const freeStoryAllData: Story[]
    = unitStoryData
    .filter((data)=>data.howtoviewStory.some((htvData)=>[HOW_TO_VIEW.asbPremium.id,HOW_TO_VIEW.asbPurchase.id,HOW_TO_VIEW.asbSerialcodeCD.id,HOW_TO_VIEW.asbSerialcode.id].includes(htvData)===false));
  let freeStoryData: {story:Story; userReadingData: UserReadingData | null;}[]
    = freeStoryAllData.slice(0,displayPageSize)
      .map(data=>{return {story:data,userReadingData:null}})
      ;
  const paidStoryAllData: Story[] 
    = unitStoryData
      .filter((data)=>data.howtoviewStory.some((htvData)=>[HOW_TO_VIEW.asbPremium.id,HOW_TO_VIEW.asbPurchase.id,HOW_TO_VIEW.asbSerialcodeCD.id,HOW_TO_VIEW.asbSerialcode.id].includes(htvData)===true));
  let paidStoryData: {story:Story; userReadingData: UserReadingData | null;}[]
    = paidStoryAllData.slice(0,displayPageSize)
      .map(data=>{return {story:data,userReadingData:null}})
      ;
  const archiveStoryAllData: Story[] = unitStoryData.filter((data)=>[1,2].includes(data.media));
  const randArray = FisherYatesShuffl(archiveStoryAllData.length)
  let randArchiveStoryData: {story:Story;userReadingData: UserReadingData | null;}[] = [];
  randArchiveStoryData.push({story:archiveStoryAllData[randArray[0]-1], userReadingData:null});
  randArchiveStoryData.push({story:archiveStoryAllData[randArray[1]-1], userReadingData:null});
  randArchiveStoryData.push({story:archiveStoryAllData[randArray[2]-1], userReadingData:null});

  if(login){
    const targetStoryId: string[] = freeStoryData.map(data=>data.story.storyId).concat(paidStoryData.map(data=>data.story.storyId)).concat(randArchiveStoryData.map(data=>data.story.storyId));
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
    randArchiveStoryData = randArchiveStoryData.map(storyData=>{
      return {story:storyData.story,userReadingData:userReadingData.find(userReading=>userReading.story_id===storyData.story.storyId)||null}
    });
  }

  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        {
          freeStoryData:freeStoryData
          ,paidStoryData:paidStoryData
          ,archiveStoryData:randArchiveStoryData
          ,freeStoryCnt:freeStoryAllData.length
          ,paidStoryCnt:paidStoryAllData.length
          ,archiveStoryCnt:archiveStoryAllData.length
          ,login:session?.user?true:false
        }
      );
    }, 500); // ある程度の時間をローディング表示
  });
}


export default async function UnitPageStoryServer(
  { unitId,unitMember }: { unitId: string; unitMember: SingingMaster[]}): Promise<JSX.Element> 
{
  const post = await getData(unitId);  
  return (
    <UnitPageStory unitId={unitId} unitMember={unitMember} post={post}/>
  )
};


// function StoryInfoBlock(
//   { unitId, categoryId, storyCnt, storyData, titleJsx, howtoviews, descriptionJsx, backgroundColor, login }
//   : { 
//     unitId: string;
//     categoryId: string;
//     storyCnt: number;
//     storyData: StorySearchResult;
//     titleJsx: JSX.Element;
//     howtoviews: string[];
//     descriptionJsx: JSX.Element;
//     backgroundColor: string;
//     login: boolean;
//   }
//   ): JSX.Element
// {

//   return(
//   <div className='flex flex-col'>
//     {titleJsx}
//     <div 
//       className={`rounded-b-lg rounded-r-lg px-1 pb-2 ${backgroundColor}`}
//     >
//       {howtoviews.length <= 0
//       ?<></>
//       :
//       <div className='flex flex-wrap text-xs mobileM:text-sm px-1 pt-1 gap-1'>
//         {howtoviews.map((str, index) => (
//         <a key={index} className="justify-center border border-red-500 text-red-600 font-bold bg-white rounded-sm px-1">
//           {str}
//         </a>
//         ))}
//       </div>
//       }
//       <div className='text-xs mobileM:text-sm p-1 mb-1'>
//         {descriptionJsx}
//       </div>
//       <div className='text-sm w-fit rounded-t-lg ml-1 px-1 bg-green-600/50 text-white'>
//         <p>
//         {'最新ストーリー'}
//         </p>
//       </div>
//       <div className="flex flex-col justify-center items-start ">
//           <StoryBlock 
//             storyId={storyData.story_id}
//             media={null}
//             category={null}
//             website={storyData.website}
//             headTitle={storyData.head_title}
//             storyTitle={storyData.story_title}
//             releaseDate={''}
//             infoStory={[{personFlg:1,infoId:'JUP01'}]} 
//             howtoviewStory={[]}
//             url={storyData.url}
//             pp={storyData.pp}
//             login={login}
//             userReadLater={storyData.user_read_later}
//             displayLogin={true}
//           />
//       </div>
//       <div className='flex justify-end mt-2 text-base font-bold'>
//         <div className=' '>
//           <Link
//             className='flex z-10 items-center w-fit border-2 border-green-700 text-green-800 bg-white
//             shadow shadow-green-500/50
//             '
//             href={{ pathname: '/search/story', query: {q: unitId, c: categoryId, order:'desc'}}}
//           >
//           <span className='ml-1'>{'ほか'}</span>
//           <span className='mx-1'>{storyCnt}</span>
//           <span className='mr-2'>{'ストーリーを見る'}</span>
//           <span className='bg-green-700 fill-white'>
//             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -950 900 950" width="24px">
//             <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
//             </svg>
//           </span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };