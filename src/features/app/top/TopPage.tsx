
import { Suspense } from "react";
import TopPageAlbum from './TopPageAlbum';
import TopPageSong from './TopPageSong';
import TopPageStoryServer from './TopPageStoryServer';
import TopPageUnit from './TopPageUnit';
import TopPageVideo from './TopPageVideo';

export default function TopPage({ }: { }) {


    return (
    
    <section 
      className="min-h-screen flex-col items-center justify-between 
      pb-72 px-0 mobileM:px-1 mobileL:px-2 tablet:px-4 tablet:px-8 lg:px-8"
    >
      <div className="flex flex-col gap-8">
        <div>
          <TopPageVideo/>
        </div>
        <div>
          <TopPageAlbum/>
        </div>
        <div>
          <TopPageSong/>
        </div>
        <div>
          <Suspense fallback={<>story loading</>}>
            <TopPageStoryServer/>
          </Suspense>
        </div>
        <div>
          <TopPageUnit />
        </div>
      </div>
    </section>
        
      )
}