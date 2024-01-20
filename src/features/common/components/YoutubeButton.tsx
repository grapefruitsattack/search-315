'use client'
import { motion } from "framer-motion";

export default function YoutubeButton(
    { youtubeId, trialYoutubeId }: { youtubeId: string, trialYoutubeId: string }
  ) {

    return(
      
            <a className="w-full h-full"
                    href={`https://youtu.be/${youtubeId===''?trialYoutubeId:youtubeId}`}
                    target="_blank" rel="noopener noreferrer">
                <motion.button
                    className='rounded-lg border-2 border-red-500 w-full h-full
                    text-red-500 font-sans leading-tight
                    hover:bg-red-500 hover:text-red-100 
                    transition-all duration-500 ease-out
                    fill-red-500 hover:fill-red-100 
                    text-sm mobileM:text-base lg:text-base
                    '
                    type="button"
                    aria-controls="contents"
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.05 }}
                >
                    <div className='
                        flex flex-wrap justify-center items-center font-sans font-black 
                        mobileM:my-1 my-2 mx-4
                    '>
                    {youtubeId===''?'試聴動画':'YouTube'}
                        <span className="">
                        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                        </span>
                    </div>
                </motion.button>
            </a>
    )
  }