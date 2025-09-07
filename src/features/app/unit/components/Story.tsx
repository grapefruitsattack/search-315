
import type { StorySearchResult } from '@/data/types';
import StoryBlock from "@/features/common/components/story/StoryBlock";

export default function Music({ id, result, login }
  : { id: string; result:{type: string; storyData: StorySearchResult[];}[]; login: boolean })
{
  const recentStoryData = result.find((data)=>data.type==='recent')?.storyData||[];
  const randStoryData = result.find((data)=>data.type==='random')?.storyData||[];

  return (
  
    <>
    <section 
      className="
      text-2xl font-mono flex items-center w-full pb-1
      after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      {/* MingCute Icon */}
      <svg className="" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
      <g id="document_3_line" fill='none'>
        <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
        <path className="fill-green-700" d='M18 2a2 2 0 0 1 2 2v11.586A2 2 0 0 1 19.414 17L15 21.414a2 2 0 0 1-1.414.586H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H6v16h6v-4.5a1.5 1.5 0 0 1 1.5-1.5H18zm-.414 12H14v3.586zM10 11a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2zm5-4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z'/></g>
      </svg>
      {'新着ストーリー'}
    </section>
    <section className="grid grid-flow-row-dense items-start pb-8 gap-4 grid-cols-1 lg:grid-cols-3 w-full">
      {recentStoryData.length===0 
            ? <div>結果なし</div>
            :recentStoryData.map((data, index) => (
            <div className="flex flex-col justify-center items-start " key={index}>
              <StoryBlock 
                key={index} 
                storyId={data.story_id}
                category={data.category}
                website={data.website}
                headTitle={data.head_title}
                infoStory={data.info_id}
                media={data.media}
                storyTitle={data.story_title}
                url={data.url}
                login={login}
                userReadLater={data.user_read_later}
                displayLogin={true}
              />
            </div>))}
    </section>

    <section 
      className="
      text-2xl font-mono flex items-center w-full pb-1
      after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      {/* MingCute Icon */}
      <svg className="" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
      <g id="document_3_line" fill='none'>
        <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
        <path className="fill-green-700" d='M18 2a2 2 0 0 1 2 2v11.586A2 2 0 0 1 19.414 17L15 21.414a2 2 0 0 1-1.414.586H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H6v16h6v-4.5a1.5 1.5 0 0 1 1.5-1.5H18zm-.414 12H14v3.586zM10 11a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2zm5-4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z'/></g>
      </svg>
      {'アーカイブストーリー（ランダム表示）'}
    </section>
    <section className="grid grid-flow-row-dense items-start pb-8 gap-4 grid-cols-1 lg:grid-cols-3 w-full">
      {randStoryData.length===0 
            ? <div>結果なし</div>
            :randStoryData.map((data, index) => (
            <div className="flex flex-col justify-center items-start " key={index}>
              <StoryBlock 
                key={index} 
                storyId={data.story_id}
                category={data.category}
                website={data.website}
                headTitle={data.head_title}
                infoStory={data.info_id}
                media={data.media}
                storyTitle={data.story_title}
                url={data.url}
                login={login}
                userReadLater={data.user_read_later}
                displayLogin={true}
              />
            </div>))}
    </section>
</>)
}