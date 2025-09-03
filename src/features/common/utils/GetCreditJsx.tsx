import { JSX } from 'react';
import creditMaster from '../../../data/creditMaster.json';
import songCredit from '../../../data/songCredit.json';
import type { CreditMaster,SongCredit } from '../../../data/types';
import Link from 'next/link';

export default function GetCreditJsx({ songId, targetCreditId }: { songId: string, targetCreditId: string }): JSX.Element{

  const lylicsResults : SongCredit[]
    = songCredit.filter(data=>data.songId === songId && data.creditType === 'lylics');
  const musicResults : SongCredit[]
    = songCredit.filter(data=>data.songId === songId && data.creditType === 'music');
  const arrangementResults : SongCredit[]
    = songCredit.filter(data=>data.songId === songId && data.creditType === 'arrangement');

  if(lylicsResults.length<=0&&musicResults.length<=0&&arrangementResults.length<=0) return <></>
  
  var linkInfoArray: { displayStr: string, creditId: string, isLink: boolean }[][] = [];
  const lylicsStr = lylicsResults.map(data=> data.displayName).join('、');
  const musicStr = musicResults.map(data=> data.displayName).join('、');
  const arrangementStr = arrangementResults.map(data=> data.displayName).join('、');

  if(lylicsStr === musicStr && lylicsStr === arrangementStr){
    //作詞作曲編曲が同一
    linkInfoArray = [[]];
    linkInfoArray[0].push({displayStr:'作詞・作曲・編曲：', creditId:'', isLink:false});
    lylicsResults.forEach((data,i)=>{
      if(i > 0){
        linkInfoArray[0].push({displayStr:'、', creditId:'', isLink:false});
      };
      linkInfoArray[0].push({displayStr:data.displayName, creditId:data.creditId, isLink:true});
    });
  } else if(lylicsStr === musicStr){
    //作詞作曲が同一
    linkInfoArray = [[],[]];
    linkInfoArray[0].push({displayStr:'作詞・作曲：', creditId:'', isLink:false});
    lylicsResults.forEach((data,i)=>{
      if(i > 0){
        linkInfoArray[0].push({displayStr:'、', creditId:'', isLink:false});
      };
      linkInfoArray[0].push({displayStr:data.displayName, creditId:data.creditId, isLink:true});
    });
    linkInfoArray[1].push({displayStr:'編曲：', creditId:'', isLink:false});
    arrangementResults.forEach((data,i)=>{
      if(i > 0){
        linkInfoArray[1].push({displayStr:'、', creditId:'', isLink:false});
      };
      linkInfoArray[1].push({displayStr:data.displayName, creditId:data.creditId, isLink:true});
    });
  } else if(musicStr === arrangementStr){
    //作曲編曲が同一
    linkInfoArray = [[],[]];
    linkInfoArray[0].push({displayStr:'作詞：', creditId:'', isLink:false});
    lylicsResults.forEach((data,i)=>{
      if(i > 0){
        linkInfoArray[0].push({displayStr:'、', creditId:'', isLink:false});
      };
      linkInfoArray[0].push({displayStr:data.displayName, creditId:data.creditId, isLink:true});
    });
    linkInfoArray[1].push({displayStr:'作曲・編曲：', creditId:'', isLink:false});
    musicResults.forEach((data,i)=>{
      if(i > 0){
        linkInfoArray[1].push({displayStr:'、', creditId:'', isLink:false});
      };
      linkInfoArray[1].push({displayStr:data.displayName, creditId:data.creditId, isLink:true});
    });
  } else {
    //作詞作曲編曲がすべて別々
    linkInfoArray = [[],[],[]];
    linkInfoArray[0].push({displayStr:'作詞：', creditId:'', isLink:false});
    lylicsResults.forEach((data,i)=>{
      if(i > 0){
        linkInfoArray[0].push({displayStr:'、', creditId:'', isLink:false});
      };
      linkInfoArray[0].push({displayStr:data.displayName, creditId:data.creditId, isLink:true});
    });
    linkInfoArray[1].push({displayStr:'作曲：', creditId:'', isLink:false});
    musicResults.forEach((data,i)=>{
      if(i > 0){
        linkInfoArray[1].push({displayStr:'、', creditId:'', isLink:false});
      };
      linkInfoArray[1].push({displayStr:data.displayName, creditId:data.creditId, isLink:true});
    });
    linkInfoArray[2].push({displayStr:'編曲：', creditId:'', isLink:false});
    arrangementResults.forEach((data,i)=>{
      if(i > 0){
        linkInfoArray[2].push({displayStr:'、', creditId:'', isLink:false});
      };
      linkInfoArray[2].push({displayStr:data.displayName, creditId:data.creditId, isLink:true});
    });
  };

  return(
    <div className='flex tablet:flex-row flex-col flex-wrap gap-x-5'>
      {linkInfoArray.map((resultArray, arrayIndex) => {
        return(<div key={arrayIndex}>
          {resultArray.map((result, index)=>{
            if(result.isLink){
              const hrefTxt: string = '/credit/'+result.creditId;
              return(
              <Link 
                className={`
                underline hover:text-sky-300
                ${result.creditId === targetCreditId?' font-bold':''}` }
                href={{ pathname: hrefTxt }}
                key={index}
              >
                <span>{result.displayStr}</span>
              </Link>
              );
            } else {
              return(
                <span key={index}>{result.displayStr}</span>
              );
            };
          })}
        </div>)
      })}
    </div>
    )
}