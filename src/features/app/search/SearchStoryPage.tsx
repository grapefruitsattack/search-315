
import SearchStoryResult from "./components/SearchStoryResult";
import SearchStoryController from "./components/SearchStoryController";
import { Toaster } from 'sonner';
import { LoaderIcon } from "lucide-react"

export default function SearchStoryPage(
  { searchParam }: {
     searchParam:{infoIdArray: string[]; categoryArray: string[]; voiceType: number; howtoviewType: number; ppType: number; andor: string; SortedAsc: number; page: number; readLaterType: string;} }
  )
 {

  //const { loading, setLoading }= UseSearchLoading();



  return (
    <>
      <Toaster position="top-center"/>

      <div className="w-full h-full min-w-0 overflow-x-hidden">
        <div className="h-fit mx-2 pc:mx-0 mb-2 bg-gradient-to-r from-gray-500 from-50% rounded">
          <div 
            className="
              flex items-center w-full ml-2
              text-sm tablet:text-xl font-mono
              text-white py-[1px] tablet:py-0
              gap-1"
          >
            {/* Google Fonts Icons */}
            <svg className="fill-gray-500 bg-white rounded px-[0.5px] w-[20px] h-[18px] tablet:w-[24px] tablet:h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="10 -960 960 960">
              <path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
            </svg>
            <p className="pr-2">{'ストーリーを検索'}</p>
          </div>
        </div>
        
        <div className="tablet:h-[calc(100vh-140px)] pc:h-[calc(100vh-64px)] overflow-hidden w-full">
          
          {/* タイトル */}

          <div className="grid min-w-0 grid-cols-1 tablet:grid-cols-[3fr_2fr] tablet:h-full">

            <div
              id="storyScrollArea"
              className="
                min-w-0
                tablet:order-1 order-2
                flex flex-col
                tablet:max-w-[700px]
                tablet:h-full
                tablet:overflow-y-scroll
                overflow-x-hidden
              "
            >
              <SearchStoryResult searchParam={searchParam} />
            </div>

            <div
              className="
                min-w-0
                tablet:order-2 order-1
                flex flex-col
                w-full
                max-w-full
                tablet:max-w-[480px]
                px-2
                ml-0 mr-0
                tablet:ml-2
                mx-auto
              "
            >
              <SearchStoryController firstIsOpen={false} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}