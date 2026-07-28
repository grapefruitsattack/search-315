

import type { Story,UserReadingData,RelationStoryOther } from '@/data/types';
import SongBlock from '@/features/common/components/SongBlock';
import SongList from '@/features/common/components/SongList';
import AlbumBlock from '@/features/common/components/AlbumBlock';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import LiveBlock from '@/features/common/components/LiveBlock';
import {VideoBlock} from "@/features/common/components/video/VideoBlock";
import {VideoCarousel} from "@/features/common/components/video/VideoCarousel";
import { SquarePlay } from "lucide-react"

export default async function StoryRelation(
  { relationStorysData,relationOtherData,login }
  : {
    relationStorysData:{story:Story,userReadingData:UserReadingData|null}[], 
    relationOtherData: RelationStoryOther[],
    login:boolean
  })
  : Promise<JSX.Element> 
{
  const relationMusic = relationOtherData.filter(data=>data.songId!==''||data.albumId!=='');
  const relationLive = relationOtherData.filter(data=>data.liveId!==''||data.livePerId!=='');
  const relationVideo = relationOtherData.filter(data=>data.videoId!=='');

  return(<>
  <div>
  {/* 関連ストーリー */}
  {relationStorysData===null || relationStorysData.length===0
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
    </>
  }
  {/* そのほか関連 */}
  </div>
  {relationMusic.length===0 
    ?<></>
    :<>
      <div 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
            mt-8
        "
      >
        <svg className="fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path>
        </svg>
        {'関連楽曲'}
      </div>
      <div className={`
            items-start gap-4 grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 mt-2
            lg:grid hidden
        `}>
        {relationMusic.filter(data=>data.songId!=='').map((result, index) => (
        <SongBlock 
          key={index} 
          songId={result.songId}
          diplayAlbum={true}
        />
        ))}
      </div>
      <div className={`
        max-w-[700px]
        items-start gap-0 grid-cols-1 mt-2
        lg:hidden grid 
      `}>
        {relationMusic.filter(data=>data.songId!=='').map((result, index) => (
        <SongList
          index={index}
          key={result.songId} 
          songId={result.songId}
          displayArtist={true}
          useArtistBadge={true}
          displayArtwork={true}
          displayReleaseDate={false}
        />
        ))}
      </div>
      <div className={`
            items-start gap-4 grid-cols-1 tablet:grid-cols-2 lg:grid-cols-2 mt-2
            lg:grid grid
        `}>
        {relationMusic.filter(data=>data.albumId!==''&&data.songId==='').map((result, index) => (
        <AlbumBlock 
          key={index} 
          albumId={result.albumId}
        />
        ))}
      </div>
  </>
  }
  {relationLive.length===0 
    ?<></>
    :<>
    <div className="flex items-start">
      <div
          className="mt-8
              text-2xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
              cursor-pointer lg:cursor-auto 
          "
      >
      <svg className="fill-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z"></path></svg>
      {'関連ライブ'}
            {/* 注釈　PC版 */}
          <div className="ml-2 hidden lg:flex flex-wrap fill-red-600
          text-sm font-sans text-gray-900 bg-gray-200
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
          grid-cols-2 tablet:grid-cols-4 lg:gap-4 gap-4 pt-4 
          px-4
      `}>
        {relationLive.map((result) => (
          <div className="" key={result.livePerId+result.liveId}>
            <LiveBlock livePerId={result.livePerId} liveId={result.liveId} />
          </div>
        ))}
      </div>
  </>
  }
  {relationVideo.length===0 
    ?<></>
    :<>
      <div 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
            mt-8
        "
      >

        <SquarePlay  className="text-red-400"/>
        {'関連動画'}
      </div>
      <div className={`
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
  </>
  }
  </>)
}