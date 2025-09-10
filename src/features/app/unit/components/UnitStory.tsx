
import type { StorySearchResult } from '@/data/types';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import { MEDIA, CATEGORY } from '@/features/common/const/StoryInfoConst';
import CategoryBadge from '@/features/common/components/story/CategoryBadge';
import Link from 'next/link';

export default function UnitStory({ unitId, result, login }
  : { unitId: string; result:{type: string; storyData: StorySearchResult[];}[]; login: boolean })
{
  const recentStoryData = result.find((data)=>data.type==='recent')?.storyData||[];
  const randStoryData = result.find((data)=>data.type==='random')?.storyData||[];

  return (
  
    <>
    <section className="flex items-center ">
      <div 
        className="flex flex-col tablet:flex-row justify-start w-fit
        text-2xl font-mono pb-1
        "
      >
        <div className='flex items-center justify-start'>
          {/* MingCute Icon */}
          <svg className="" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <g id="document_3_line" fill='none'>
            <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
            <path className="fill-green-700" d='M18 2a2 2 0 0 1 2 2v11.586A2 2 0 0 1 19.414 17L15 21.414a2 2 0 0 1-1.414.586H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H6v16h6v-4.5a1.5 1.5 0 0 1 1.5-1.5H18zm-.414 12H14v3.586zM10 11a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2zm5-4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z'/></g>
          </svg>
          {'新着ストーリー'}
        </div>
        <div className=' ml-4 tablet:ml-2 ml-4'>
            <Link
              className='flex z-10 items-center w-fit gap-1
              border-2 border-green-700 text-green-800 bg-white
              text-sm tablet:text-base font-bold
              '
              href={{ pathname: '/search/story', query: {q: unitId, order:'desc'}}}
            >
              <span className='ml-1'>{'全'}</span>
              <span className=''>{'100'}</span>
              <span className='mr-1'>{'ストーリーを見る'}</span>
              <span className='bg-green-700 fill-white'>
                <svg className='w-[22px] h-[22px] tablet:w-[24px] tablet:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -950 900 950">
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                </svg>
            </span>
            </Link>
        </div>
      </div>
      <div className='h-[0.5px] grow bg-slate-900/50 ml-[1rem] '>
      {''}
      </div>
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
      {/* Remix Icon */}
      <svg className="fill-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM11 14H13V16H11V14ZM8.56731 8.81346C8.88637 7.20919 10.302 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13H11V11H12C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8C11.2723 8 10.6656 8.51823 10.5288 9.20577L8.56731 8.81346Z"></path>
      </svg>
      {''}
    </section>

    {/* アイマスポータル */}
    <section 
      className="
      text-2xl font-mono flex items-center w-full pb-4
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
      grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3
      gap-x-4 gap-y-4
      "
    >
      {/* Connect With Music! */}
      <StoryInfoBlock
        unitId={unitId}
        categoryId={CATEGORY.connectWithMusic.id}
        storyCnt={4}
        storyData={{
          story_id: '009k4alob08zwagx',website: 'asb',
          head_title: '10thプロミ連動ストーリー',story_title: '愛媛、最高！',
          url:'https://asobistory.asobistore.jp/connectwithstage/detail/6n72px6lmkpw98v/',
          info_id: [{personFlg:1,infoId:'JUP01'}],
          user_read_later: null,
          media: 0,category: '',release_date: new Date(),voice_at_release: 0,voice: 0,still: 0,is_valid: 1
        }}
        titleJsx={
          <div 
            className="flex items-center w-fit rounded-t-lg px-1
              text-base mobileS:text-lg tablet:text-xl font-mono text-white bg-blue-500"
          >
            {/* Remix Icon */}
            <svg className="fill-blue-100 mr-1" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z">
              </path>
            </svg>
            {'Connect With Music!'}
          </div>
        }
        howtoviews={['有償のみ','期間限定無料公開あり']}
        descriptionJsx={
          <>
            <p>{'　新曲と連動したストーリー。'}</p>
          </>
        }
        backgroundColor='bg-blue-50'
        login={login}
      />

      {/* Connect With Stage! */}
      <StoryInfoBlock
        unitId={unitId}
        categoryId={CATEGORY.connectWithStage.id}
        storyCnt={8}
        storyData={{
          story_id: '009k4alob08zwagx',website: 'asb',
          head_title: '10thプロミ連動ストーリー',story_title: '愛媛、最高！',
          url:'https://asobistory.asobistore.jp/connectwithstage/detail/6n72px6lmkpw98v/',
          info_id: [{personFlg:1,infoId:'JUP01'}],
          user_read_later: null,
          media: 0,category: '',release_date: new Date(),voice_at_release: 0,voice: 0,still: 0,is_valid: 1
        }}
        titleJsx={
          <div 
          className="flex items-center w-fit rounded-t-lg px-1
          text-base mobileS:text-lg tablet:text-xl font-mono text-white bg-blue-700"
        >
          {/* MingCute Icon */}
          <svg className="fill-blue-200 mr-1" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g id="microphone_line" fill='none'>
            <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
            <path className='fill-blue-200' d='M3.868 4.368a7 7 0 0 1 11.74 6.656l-.069.256 3.4 4.372a2.7 2.7 0 0 1 .387 2.632c.1.03.222.046.372.016l.118-.031a1 1 0 0 1 .632 1.897 2.765 2.765 0 0 1-2.546-.389 2.7 2.7 0 0 1-2.586-.22l-.164-.117-4.372-3.401a7 7 0 0 1-6.911-11.67ZM14.577 13.3a7.045 7.045 0 0 1-1.777 1.777l3.58 2.784a.7.7 0 0 0 .98-.981zM12.92 6.459l-.203.336a20.002 20.002 0 0 1-2.84 3.584 20.002 20.002 0 0 1-3.583 2.839l-.336.203a5.001 5.001 0 0 0 6.962-6.962m-1.498-1.41a5.002 5.002 0 0 0-6.874 6.874l.324-.183a18.004 18.004 0 0 0 3.592-2.775 18.003 18.003 0 0 0 2.552-3.223l.116-.19.203-.347z'/>
            </g>
          </svg>
          {'Connect With Stage!'}
        </div>
        }
        howtoviews={['無料あり','一部有償','期間限定無料公開あり']}
        descriptionJsx={
          <>
            <p>{'　リアルライブ・リアルイベントと連動したストーリー。'}</p>
          </>
        }
        backgroundColor='bg-blue-100'
        login={login}
      />

      {/* アイドルたちの1コマ */}
      <StoryInfoBlock
        unitId={unitId}
        categoryId={CATEGORY.idolOneFrame.id}
        storyCnt={8}
        storyData={{
          story_id: '009k4alob08zwagx',website: 'asb',
          head_title: '10thプロミ連動ストーリー',story_title: '愛媛、最高！',
          url:'https://asobistory.asobistore.jp/connectwithstage/detail/6n72px6lmkpw98v/',
          info_id: [{personFlg:1,infoId:'JUP01'}],
          user_read_later: null,
          media: 0,category: '',release_date: new Date(),voice_at_release: 0,voice: 0,still: 0,is_valid: 1
        }}
        titleJsx={
          <div 
            className="flex items-center w-fit rounded-t-lg pl-1 pr-2
            text-base mobileS:text-lg tablet:text-xl font-mono text-white bg-orange-600"
          >
            {/* Google Fonts Icons  */}
            <svg className="fill-orange-200 mr-1" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='50 -910 880 860'>
              <path d="M560-280h200v-200h-80v120H560v80ZM200-480h80v-120h120v-80H200v200Zm-40 320q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/>
            </svg>
            {'アイドルたちの1コマ'}
          </div>
        }
        howtoviews={['無料']}
        descriptionJsx={
          <>
            <p>{'　毎週土日更新。配信番組等でも更新あり。現在すべて無料で閲覧可能。'}</p>
          </>
        }
        backgroundColor='bg-orange-100'
        login={login}
      />

      {/* CONNECT WITH OTHERS！ */}
      <StoryInfoBlock
        unitId={unitId}
        categoryId={CATEGORY.connectWithOthers.id}
        storyCnt={3}
        storyData={{
          story_id: '009k4alob08zwagx',website: 'asb',
          head_title: '10thプロミ連動ストーリー',story_title: '愛媛、最高！',
          url:'https://asobistory.asobistore.jp/connectwithstage/detail/6n72px6lmkpw98v/',
          info_id: [{personFlg:1,infoId:'JUP01'}],
          user_read_later: null,
          media: 0,category: '',release_date: new Date(),voice_at_release: 0,voice: 0,still: 0,is_valid: 1
        }}
        titleJsx={
          <div 
          className="flex items-center w-fit rounded-t-lg px-1
            text-base mobileS:text-lg tablet:text-xl font-mono text-white bg-sky-400 "
        >
          {/* MingCute Icon  */}
          <svg className="fill-blue-200 mr-1" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='1 1 22 22'>
            <g id="link_fill" fill='none'>
              <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
              <path className='fill-sky-100' d='m17.303 9.524 3.182 3.182a5.5 5.5 0 1 1-7.778 7.778l-1.06-1.06a1.5 1.5 0 1 1 2.12-2.122l1.062 1.061a2.5 2.5 0 0 0 3.535-3.536l-3.182-3.182a2.5 2.5 0 0 0-2.681-.56c-.162.064-.312.13-.454.196l-.464.217c-.62.28-1.097.4-1.704-.206-.872-.872-.646-1.677.417-2.41a5.502 5.502 0 0 1 7.007.642m-6.01-6.01 1.06 1.06a1.5 1.5 0 0 1-2.12 2.122l-1.061-1.06A2.5 2.5 0 1 0 5.636 9.17l3.182 3.182a2.5 2.5 0 0 0 2.681.56c.162-.064.312-.13.454-.196l.464-.217c.62-.28 1.098-.4 1.704.206.872.872.646 1.677-.417 2.41a5.502 5.502 0 0 1-7.007-.642l-3.182-3.182a5.5 5.5 0 1 1 7.778-7.778Z'/>
            </g>
          </svg>
          {'CONNECT WITH OTHERS！'}
        </div>
        }
        howtoviews={['無料']}
        descriptionJsx={
          <>
            <p>{'　楽曲ライブ以外の連動ストーリー。現在すべて無料で閲覧可能。'}</p>
          </>
        }
        backgroundColor='bg-sky-100'
        login={login}
      />
    </section>

    {/* モバエム */}
    <section 
      className="
      text-2xl font-mono flex items-center w-full pb-4
      after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      <div 
        className='rounded-lg p-1 text-sm tablet:text-xl
        border-2 border-teal-500 text-teal-700 font-bold 
        '
      >
        {MEDIA.moba.name}
      </div>
    </section>
    <section 
      className="
      grid grid-cols-1 tablet:grid-cols-2
      gap-x-4 gap-y-4
      "
    ></section>

</>)
};


function StoryInfoBlock(
  { unitId, categoryId, storyCnt, storyData, titleJsx, howtoviews, descriptionJsx, backgroundColor, login }
  : { 
    unitId: string;
    categoryId: string;
    storyCnt: number;
    storyData: StorySearchResult;
    titleJsx: JSX.Element;
    howtoviews: string[];
    descriptionJsx: JSX.Element;
    backgroundColor: string;
    login: boolean;
  }
  ): JSX.Element
{

  return(
  <div className='flex flex-col'>
    {titleJsx}
    <div 
      className={`rounded-b-lg rounded-r-lg px-1 pb-2 ${backgroundColor}`}
    >
      {howtoviews.length <= 0
      ?<></>
      :
      <div className='flex flex-wrap text-xs mobileM:text-sm px-1 pt-1 gap-1'>
        {howtoviews.map((str, index) => (
        <a key={index} className="justify-center border border-red-500 text-red-600 font-bold bg-white rounded-sm px-1">
          {str}
        </a>
        ))}
      </div>
      }
      <div className='text-xs mobileM:text-sm p-1 mb-1'>
        {descriptionJsx}
      </div>
      <div className='text-sm w-fit rounded-t-lg ml-1 px-1 bg-green-600/50 text-white'>
        <p>
        {'最新ストーリー'}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start ">
          <StoryBlock 
            storyId={storyData.story_id}
            media={null}
            category={null}
            website={storyData.website}
            headTitle={storyData.head_title}
            storyTitle={storyData.story_title}
            infoStory={[{personFlg:1,infoId:'JUP01'}]} 
            url={storyData.url}
            login={login}
            userReadLater={storyData.user_read_later}
            displayLogin={true}
          />
      </div>
      <div className='flex justify-end mt-2 text-base font-bold'>
        <div className=' '>
          <Link
            className='flex z-10 items-center w-fit border-2 border-green-700 text-green-800 bg-white
            shadow shadow-green-500/50
            '
            href={{ pathname: '/search/story', query: {q: unitId, c: categoryId, order:'desc'}}}
          >
          <span className='ml-1'>{'ほか'}</span>
          <span className='mx-1'>{storyCnt}</span>
          <span className='mr-2'>{'ストーリーを見る'}</span>
          <span className='bg-green-700 fill-white'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -950 900 950" width="24px">
            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
            </svg>
          </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};