
import singingMaster from '@/data/singingMaster.json';
import Link from 'next/link';
import { motion } from "framer-motion";
import borderHover from '../css/border-hover.module.css';

interface ItemCSS extends React.CSSProperties{
  '--c':string
}

export default function UnitBlock({ id }: { id: string }) {
  const color = singingMaster.find(data => data.singingInfoId === id)?.color;
  const colorStr:string = color ===undefined ?'' : color;
  const style: ItemCSS = {
    "--c": '#'+colorStr
  };
  const unitPrefix: string = id.substring(0, 3);
  const colorInfo = blockColors.find((data)=>data.id===unitPrefix);
  const bgColorCode = colorInfo?.bgColor||'';
  const textColorCode = colorInfo?.textColor||'';
  const borderColorCode = colorInfo?.bgColor||'';

  const qStr: string = singingMaster.filter(
    data=>
      id.substring(0,3) === data.singingInfoId.substring(0,3)
      && data.personFlg === 1
    ).map(data=>data.singingInfoId).join(' ');

    return (
          <Link
            href={{ pathname: '/unit/'+id }}
              className={`block cursor-pointer
              justify-center 
              font-bold 
              bg-[var(--bg-color)] text-[var(--text-color)] 
              duration-100
              [box-shadow:2.5px_2.5px_rgb(100_100_100)]
              hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)]
              rounded-sm py-0.5 text-xs mobileS:text-base mobileL:text-sm tablet:text-xl
              min-h-[38px] mobileS:min-h-[45px] mobileL:min-h-[46px] tablet:min-h-[62px]
              px-2
              `}
            style={{ '--bg-color': bgColorCode,'--text-color': textColorCode,'--border-color': borderColorCode, } as React.CSSProperties}
          >
          <button
            className='w-full h-full'
            >
          <div className={`inline-block justify-items-center items-center transition-transform  motion-reduce:transform-none`}>
          <span>
            <h2 className={` `}>
                {''}{singingMaster.find(data => data.singingInfoId === id)?.singingInfoName}
            </h2>
          </span>
          </div>
          </button>
          </Link>
    )}

const blockColors =
  [
      {
          id:'JUP',bgColor:'#80ed6f', textColor:'#043204',
          unitColors:[
              {id:'JUP01',borderColor:'#F14A4A'},
              {id:'JUP02',borderColor:'#87C010'},
              {id:'JUP03',borderColor:'#4757C9'},
          ]
      },
      {
          id:'DRS',bgColor:'#FFA90A', textColor:'#342305',
          unitColors:[
              {id:'DRS01',borderColor:'#CC313B'},
              {id:'DRS02',borderColor:'#1767D9'},
              {id:'DRS03',borderColor:'#24AA2C'},
          ]
      },
      {
          id:'ALT',bgColor:'#F6F45E', textColor:'#52511F',
          unitColors:[
              {id:'ALT01',borderColor:'#A584E5'},
              {id:'ALT02',borderColor:'#225B9D'},
          ]
      },
      {
          id:'BEI',bgColor:'#66ddfa', textColor:'#0b414f',
          unitColors:[
              {id:'BEI01',borderColor:'#309AC1'},
              {id:'BEI02',borderColor:'#54BC26'},
              {id:'BEI03',borderColor:'#E86D85'},
          ]
      },
      {
          id:'DBL',bgColor:'#F7D828', textColor:'#4F450D',
          unitColors:[
              {id:'DBL01',borderColor:'#F4BA07'},
              {id:'DBL02',borderColor:'#3BA12E'},
          ]
      },
      {
          id:'FRM',bgColor:'#338033', textColor:'#e5ffe5',
          unitColors:[
              {id:'FRM01',borderColor:'#3696D0'},
              {id:'FRM02',borderColor:'#EF7A30'},
              {id:'FRM03',borderColor:'#7F9D1E'},
          ]
      },
      {
          id:'SAI',bgColor:'#7E31CC', textColor:'#f5ebff',
          unitColors:[
              {id:'SAI01',borderColor:'#E7B12C'},
              {id:'SAI02',borderColor:'#834DBD'},
              {id:'SAI03',borderColor:'#4C8DD0'},
          ]
      },
      {
          id:'HIJ',bgColor:'#FF0000', textColor:'#ffffff',
          unitColors:[
              {id:'HIJ01',borderColor:'#EC7B23'},
              {id:'HIJ02',borderColor:'#1B66CF'},
              {id:'HIJ03',borderColor:'#25B1BC'},
              {id:'HIJ04',borderColor:'#58C038'},
              {id:'HIJ05',borderColor:'#BF48A7'},
          ]
      },
      {
          id:'SSK',bgColor:'#D3DAE0', textColor:'#474A4D',
          unitColors:[
              {id:'SSK01',borderColor:'#E13E33'},
              {id:'SSK02',borderColor:'#334ABA'},
          ]
      },
      {
          id:'CFP',bgColor:'#CC66CC', textColor:'#FFFFFF',
          unitColors:[
              {id:'CFP01',borderColor:'#D1594C'},
              {id:'CFP02',borderColor:'#12967F'},
              {id:'CFP03',borderColor:'#6664C6'},
              {id:'CFP04',borderColor:'#CD9D2F'},
              {id:'CFP05',borderColor:'#EB64A0'},
          ]
      },
      {
          id:'MFM',bgColor:'#f5abd7', textColor:'#4d3442',
          unitColors:[
              {id:'MFM01',borderColor:'#484393'},
              {id:'MFM02',borderColor:'#E44635'},
              {id:'MFM03',borderColor:'#F28198'},
          ]
      },
      {
          id:'SEM',bgColor:'#ff08ce', textColor:'#ffffff',
          unitColors:[
              {id:'SEM01',borderColor:'#3B6FBC'},
              {id:'SEM02',borderColor:'#E1B21F'},
              {id:'SEM03',borderColor:'#EE8D2B'},
          ]
      },
      {
          id:'KGD',bgColor:'#4A4A4A', textColor:'#EBEBEB',
          unitColors:[
              {id:'KGD01',borderColor:'#344DCB'},
              {id:'KGD02',borderColor:'#EE972F'},
              {id:'KGD03',borderColor:'#CB3546'},
          ]
      },
      {
          id:'FLG',bgColor:'#3D51FF', textColor:'#FFFFFF',
          unitColors:[
              {id:'FLG01',borderColor:'#59C13B'},
              {id:'FLG02',borderColor:'#E34238'},
              {id:'FLG03',borderColor:'#D2931B'},
          ]
      },
      {
          id:'LGN',bgColor:'#6880A0', textColor:'#f2f6fa',
          unitColors:[
              {id:'LGN01',borderColor:'#192F5D'},
              {id:'LGN02',borderColor:'#3A782E'},
              {id:'LGN03',borderColor:'#21A1B4'},
          ]
      },
      {
          id:'CLF',bgColor:'rgb(2, 224, 206)', textColor:'#000000',
          unitColors:[
              {id:'CLF01',borderColor:'#2A92CF'},
              {id:'CLF02',borderColor:'#91BE1C'},
              {id:'CLF03',borderColor:'#D03743'},
          ]
      },
  ];