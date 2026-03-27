
import mainPageData from '@/data/mainPageData.json';
import {YoutubeModal} from "@/features/common/components/YoutubeModal";
import {YoutubeShortModal} from "@/features/common/components/YoutubeShortModal";
import StoryBlock from "@/features/common/components/story/StoryBlock";

export default function UnitPageRecommend({ unitId }: { unitId: string }) {
  const unitPrefix: string = unitId.substring(0, 3);
  const youtubeMv = mainPageData.filter((data)=>data?.infoId===unitPrefix&&['youtube','youtubeshort'].includes(data.type));
  const story = mainPageData.filter((data)=>data?.infoId===unitPrefix&&data.type==='story');

  return (
  <>
    <section className=''>
   <div 
      className="
          text-2xl font-mono flex items-center w-full fill-red-400
          after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg>
      {'オススメ動画'}
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4" >
        {/* Youtube動画 */}
        {youtubeMv.map((info, index) => (
            <div className='max-w-[310px]' key={index} >
            <div className=''>
              {info.type==='youtubeshort'
                ?<YoutubeShortModal title={info.title} embedUrl={info.data.embedUrl||''} thumbnailUrl={info.data.thumbnailUrl||''}/>
                :<YoutubeModal title={info.title} embedUrl={info.data.embedUrl||''} thumbnailUrl={info.data.thumbnailUrl||''}/>
              }
            </div>
            <p className='flex flex-wrap justify-start items-center font-sans font-black lg:text-base text-sm w-[250px]'>
                {info.title}
            </p>
            </div>
        ))}
      </div>
    </div>
    <div 
        className="pt-4
            text-2xl font-mono flex items-center w-full fill-red-400
            after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg>
        {'オススメストーリー'}
      </div>
      <div className='text-sm'></div>
      <div className="grid grid-flow-row-dense items-start pb-8 gap-4 grid-cols-1 lg:grid-cols-3 w-full">
        {story.length===0 
              ? <div>結果なし</div>
              :story.map((result, index) => (
              <div className="flex flex-col justify-center items-start " key={index}>
                <StoryBlock 
                  key={index} 
                  storyId={result.data.storyId||''}
                  category={result.data.category||''}
                  website={result.data.website||''}
                  headTitle={result.data.headTitle||''}
                  infoStory={result.data.infoStory||[]}
                  howtoviewStory={result.data.howtoviewStory||[]}
                  media={result.data.media||0}
                  storyTitle={result.data.storyTitle||''}
                  url={result.data.url||''}
                  pp={result.data.pp||0}
                  login={false}
                  userReadLater={null}
                  displayLogin={false}
                />
              </div>))}
      </div>
      
    </section>
  </>
  )
}