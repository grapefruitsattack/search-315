'use client'
import CommonPage from "../../common/components/CommonPage";
import creditMaster from '../../../data/creditMaster.json';
import songCredit from '../../../data/songCredit.json';
import songMaster from '../../../data/songMaster.json';
import type { CreditMaster,SongCredit } from '../../../data/types';
import {GetCreditJsx} from '../../common/utils/CreditUtils';
import Link from 'next/link';

export default function CreditPage({ creditId }: { creditId: string }) {

    const name : string
      = creditMaster.find(data => data.creditId === creditId)?.name || '';
    
    const songCreditResults : SongCredit[]
      = songCredit.filter(data=>data.creditId === creditId);

    const distinctSongIds :string[] 
    = Array.from(new Set(songCreditResults.map(data => {
      return data.songId;
    })));
    const resultSongs
      = songMaster.filter(data=>distinctSongIds.includes(data.songId));

    return (
      <article className=" pb-96 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      {name} 
        {resultSongs.map((result, index) => {
          return(
            <div key={index}>
            <div>
            <Link 
              className={`tablet:text-xl text-base font-sans
              underline hover:text-sky-300`}
              href={{ pathname: '/song/'+result.songId }}
            >
              <span>{result.songTitle}</span>
            </Link>
            </div>
            <div>
            <span key={index} className="pl-4 tablet:text-xl text-base font-sans text-green-800/80 ">
                <GetCreditJsx songId={result.songId} targetCreditId={creditId}></GetCreditJsx>
            </span>
            </div>
            </div>
          );
        })}
      </article>
    );
}