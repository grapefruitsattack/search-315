
import mainPageData from '@/data/mainPageData.json';
import mainpage_video from '@/data/mainpage/mainpage_video.json';
import {VideoBlock} from "@/features/common/components/video/VideoBlock";
import {VideoCarousel} from "@/features/common/components/video/VideoCarousel";
import StoryBlock from "@/features/common/components/story/StoryBlock";

export default function UnitPageRecommend({ unitId }: { unitId: string }) {
  const unitPrefix: string = unitId.substring(0, 3);
  const videoIdArray = mainpage_video.filter((data)=>data?.infoId===unitPrefix).map(data=>data.videoId);
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
    <div className=''>
      <VideoCarousel videoIdArray={videoIdArray} />
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
                  releaseDate={result.data.releaseDate||''}
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