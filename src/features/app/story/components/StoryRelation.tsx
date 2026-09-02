

import type { Story,UserReadingData,RelationStoryOther } from '@/data/types';
import SongList from '@/features/common/components/SongList';
import AlbumBlock from '@/features/common/components/AlbumBlock';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import LiveBlock from '@/features/common/components/LiveBlock';
import {VideoBlock} from "@/features/common/components/video/VideoBlock";
import {VideoCarousel} from "@/features/common/components/video/VideoCarousel";
import { SquarePlay, BookOpen, Music, MicVocal } from "lucide-react";

export default async function StoryRelation(
  { relationStorysData,relationOtherData,login }
  : {
    relationStorysData:{story:Story,userReadingData:UserReadingData|null}[], 
    relationOtherData: RelationStoryOther[],
    login:boolean
  })
  : Promise<JSX.Element> 
{
  const relationMusic = relationOtherData.filter(data=>data.songId!==''||data.albumId!=='').toReversed();
  const relationLive = relationOtherData.filter(data=>data.liveId!==''||data.livePerId!=='').toReversed();
  const relationVideo = relationOtherData.filter(data=>data.videoId!=='').toReversed();
  const relationAlbum = relationMusic.filter(data=>data.albumId!==''&&data.songId==='');

  return(<>
  <div className='flex flex-col gap-8 mt-12'>
  {/* 関連ストーリー */}
  {relationStorysData===null || relationStorysData.length===0
    ?<></>
    :<div>
      <div 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
            text-indigo-900 font-bold
        "
      >
        
        <BookOpen  className="mr-1 text-indigo-700"/>
        {'関連ストーリー'}
      </div>
      <div 
        className={`hidden tablet:flex h-fit w-full rounded-md  overflow-x-auto overflow-y-hidden`}
      >
        <div 
          className="flex flex-row flex-nowrap
          gap-3 lg:px-3 px-2 pt-4 pb-4
          "
        >
          {relationStorysData.map((result, index) => (
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
      <div className={`grid tablet:hidden
          items-start gap-4 grid-cols-1 tablet:grid-cols-2 mt-2
      `}>
        {relationStorysData.map((result, index) => (
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
    </div>
  }
  {/* そのほか関連 */}
  {relationMusic.length===0 
    ?<></>
    :<div>
      <div 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
            text-indigo-900 font-bold
        "
      >
        <Music className="mr-1 text-indigo-700"/>
        {'関連楽曲'}
      </div>
      <div className={`
        max-w-[700px]
        items-start gap-0 grid-cols-1 mt-2
        grid 
      `}>
        {relationMusic.filter(data=>data.songId!=='').map((result, index) => (
        <SongList
          index={index}
          key={result.songId} 
          songId={result.songId}
          displayArtist={true}
          useArtistBadge={1}
          displayArtwork={true}
          displayReleaseDate={false}
        />
        ))}
      </div>
      <div 
        className={` h-fit w-full rounded-md overflow-x-auto overflow-y-hidden
          ${relationAlbum.length<=0&&'hidden'}
          `}
      >
        <div className={`
        flex flex-row flex-nowrap
        gap-4 lg:px-4 px-2 pt-2 pb-6
        `}
        >
          {relationAlbum.map((result, index) => (
            <div className='tablet:min-w-[270px] mobileL:min-w-[230px] min-w-[190px]' key={index}>
              <AlbumBlock 
                key={index} 
                albumId={result.albumId}
              />
            </div>
          ))}
        </div>
      </div>
  </div>
  }
  {relationLive.length===0 
    ?<></>
    :<div>
    <div className="flex items-start">
      <div
          className="
              text-2xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
              cursor-pointer lg:cursor-auto text-indigo-900 font-bold
          "
      >
      <MicVocal className="mr-1 text-indigo-700" />
      {'関連ライブ'}
            {/* 注釈　PC版 */}
          <div className="ml-2 hidden lg:flex flex-wrap fill-red-600
          text-sm font-sans text-gray-900 bg-gray-200 font-normal
          ">
          <span className="pr-1 text-red-500">
          <span className="">
          <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="18" height="18"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
          </span>
          </span>
              <p className="w-fit">
                  {'映像商品化されたライブイベントのみ掲載'}
              </p>
          </div>
      </div>
    </div>
      <div className={`grid
          grid-cols-2 tablet:grid-cols-4 lg:gap-4 gap-4 pt-2
          px-4
      `}>
        {relationLive.map((result) => (
          <div className="" key={result.livePerId+result.liveId}>
            <LiveBlock livePerId={result.livePerId} liveId={result.liveId} />
          </div>
        ))}
      </div>
  </div>
  }
  {relationVideo.length===0 
    ?<></>
    :<div>
      <div 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
            text-indigo-900 font-bold
        "
      >
        <SquarePlay  className="mr-1 text-red-500"/>
        {'関連動画'}
      </div>
      <div className={`mt-1
      `}>
        {relationVideo.length<=1
        ?(
          <div className={`max-w-[400px]
          `}>
            <VideoBlock videoId={relationVideo[0].videoId}/>
          </div>
        )
        :(
          <VideoCarousel videoIdArray={relationVideo.map(data=>data.videoId)}/>
        )
        }
        {relationLive.map((result) => (
          <div className="" key={result.livePerId+result.liveId}>
            <LiveBlock livePerId={result.livePerId} liveId={result.liveId} />
          </div>
        ))}
      </div>
  </div>
  }
  </div>
  </>)
}