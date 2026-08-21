'use client'
import { Disc3 } from 'lucide-react';
import type { LiveProduct } from '@/data/types';

export default function Products({ results }: { results: LiveProduct[] }) {


    return(
    <>
      <div 
        className="
          mobileL:text-2xl text-xl font-mono flex items-center w-full mb-1
          after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
          text-indigo-900 font-bold
        "
      >
        <Disc3 className="mr-1 text-indigo-700" />
        {'収録製品'}
      </div>
      <div className={`grid
            items-start gap-3 grid-cols-1 mobileM:mx-2 mobileS:mx-2 mx-1
      `}>
          {results.map((result, index) => (
          <div className='leading-tight'
          key={index} >
          <a
          className ="
            underline font-mono 
          text-slate-500 hover:text-sky-300
          fill-slate-500 hover:fill-sky-500 
          text-sm lg:text-base
          w-fit
          "
          href={result.releasePage}
          target="_blank"
          rel="noopener noreferrer"
          >
              <span>
              {result.productName} 
              <span className="pl-0.5">
              <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
              </span>
              </span>
          </a>
          </div>
          ))}
      </div>
    </>
    )
}