
import type { StorySearchResult } from '@/data/types';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import { MEDIA, CATEGORY } from '@/features/common/const/StoryInfoConst';
import CategoryBadge from '@/features/common/components/story/CategoryBadge';

export default function Music({ unitId, result, login }
  : { unitId: string; result:{type: string; storyData: StorySearchResult[];}[]; login: boolean })
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

    <section 
      className="
      text-2xl font-mono flex items-center w-full pb-1
      after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      <div 
        className='rounded-lg p-1 text-sm tablet:text-xl
        border-2 border-teal-500 text-teal-700 font-bold 
        '
      >
        {MEDIA.proe.name}
      </div>
    </section>
    <section 
      className="
      grid grid-cols-1 tablet:grid-cols-2
      gap-x-4 gap-y-4
      "
    >
      <div className='flex flex-col'>
        <div 
          className="
          flex items-center w-fit
          text-lg tablet:text-xl font-mono 
          border-b-2 border-b-blue-500
          "
        >
          {/* Remix Icon */}
          <svg className="fill-blue-500" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z">
            </path>
          </svg>
          {'Connect With Music!'}
        </div>
        <div className='text-sm bg-blue-50 rounded-b-xl p-1 mb-1'>
          <p>
          {'　新曲と連動したストーリー。'}
          </p>
          <p>
            {'　現在有料会員特典,有料購入のみ。キャンペーンで無料公開されることもある。'}
          </p>
        </div>
        <div className='text-sm w-fit rounded-t-lg ml-1 px-1 bg-green-600/50 text-white'>
          <p>
          {'最新ストーリー'}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start ">
          <StoryBlock 
            storyId={'009k4alob08zwagx/'}
            media={null}
            category={null}
            website={'asb'}
            headTitle={'10thプロミ連動ストーリー'}
            infoStory={[{personFlg:1,infoId:'JUP01'}]}
            storyTitle={'愛媛、最高！'}
            url={'https://asobistory.asobistore.jp/connectwithstage/detail/6n72px6lmkpw98v/'}
            login={false}
            userReadLater={0}
            displayLogin={true}
          />
        </div>
        <div className='w-fit mt-1 text-base z-10 border-2 border-green-500 bg-white '>
          <p>
          {'ほかのストーリーを探す'}
          </p>
        </div>
      </div>
      <div className='flex flex-col'>
        <div 
          className="
          flex items-center w-fit 
          text-lg tablet:text-xl font-mono 
          border-b-2 border-b-blue-700 mb-1
          "
        >
          {/* MingCute Icon */}
          <svg className="fill-blue-700" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g id="microphone_line" fill='none'>
            <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
            <path className='fill-blue-700' d='M3.868 4.368a7 7 0 0 1 11.74 6.656l-.069.256 3.4 4.372a2.7 2.7 0 0 1 .387 2.632c.1.03.222.046.372.016l.118-.031a1 1 0 0 1 .632 1.897 2.765 2.765 0 0 1-2.546-.389 2.7 2.7 0 0 1-2.586-.22l-.164-.117-4.372-3.401a7 7 0 0 1-6.911-11.67ZM14.577 13.3a7.045 7.045 0 0 1-1.777 1.777l3.58 2.784a.7.7 0 0 0 .98-.981zM12.92 6.459l-.203.336a20.002 20.002 0 0 1-2.84 3.584 20.002 20.002 0 0 1-3.583 2.839l-.336.203a5.001 5.001 0 0 0 6.962-6.962m-1.498-1.41a5.002 5.002 0 0 0-6.874 6.874l.324-.183a18.004 18.004 0 0 0 3.592-2.775 18.003 18.003 0 0 0 2.552-3.223l.116-.19.203-.347z'/>
            </g>
          </svg>
          {'Connect With Stage!'}
        </div>
        <div className='text-sm'>
          <p>
          {'　実際に開催されるライブイベントと連動したストーリー。'}
          </p>
          <p>
            {'　無料ストーリーあり。ボイス付き長編ストーリーは有料購入が多い。キャンペーンで無料公開されることもある。'}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start ">
          <StoryBlock 
            storyId={'009k4alob08zwagx/'}
            media={null}
            category={null}
            website={'asb'}
            headTitle={'10thプロミ連動ストーリー'}
            infoStory={[{personFlg:1,infoId:'JUP01'}]}
            storyTitle={'愛媛、最高！'}
            url={'https://asobistory.asobistore.jp/connectwithstage/detail/6n72px6lmkpw98v/'}
            login={false}
            userReadLater={null}
            displayLogin={true}
          />
        </div>
      </div>
    </section>
</>)
}