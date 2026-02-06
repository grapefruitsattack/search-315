'use client'
import { useRouter } from 'next/navigation';
import type { SingingMaster } from '@/data/types';
import singingMaster from '@/data/singingMaster.json';

export default function IdolBadge({ id, useShortName, size }: { id: string, useShortName: number, size: string }) {

    const router = useRouter();
    
    if(id === '315pro'){
        return(
        <div 
            className={`
            justify-center 
            font-bold
            bg-sky-600
            text-white
            ${size==='block'
                ?` rounded-sm py-0.5 px-1 text-xs mobileS:text-sm tablet:text-base`
                :` rounded-md p-1 text-xs mobileS:text-sm tablet:text-base`}
            `}
            >
        <p className={``}>{'315プロダクション'}</p>
        </div>
        )
    };

    const data: SingingMaster | undefined = singingMaster.find(data => data.singingInfoId === id);
    const name: string 
        = useShortName===0?data?.singingInfoName||'': data?.singingInfoShortName||'';
    const personFlg: number = data?.personFlg||0;
    const unitPrefix: string = id.substring(0, 3);
    const colorInfo = badgeColors.find((data)=>data.id===unitPrefix);
    const bgColorCode = colorInfo?.bgColor||'';
    const textColorCode = colorInfo?.textColor||'';
    const borderColorCode = 
        personFlg===1
        ?colorInfo?.unitColors.find((data)=>data.id===id)?.borderColor||''
        :colorInfo?.bgColor||'';

    if(size==='block'){
        return(
            <div 
                style={{ '--bg-color': bgColorCode,'--text-color': textColorCode,'--border-color': borderColorCode, } as React.CSSProperties}
                className={`
                justify-center 
                font-bold
                rounded-sm py-0.5  text-xs mobileS:text-sm tablet:text-base
                bg-[var(--bg-color)] text-[var(--text-color)] 
                ${personFlg===1?'pl-0.5 pr-1 border-l-[6px] border-[var(--border-color)]':'px-1'}
                `}
                >
            <p className={``}>{name}</p>
            </div>
        );
    } else {
        return(
            <a 
                style={{ '--bg-color': bgColorCode,'--text-color': textColorCode,'--border-color': borderColorCode, } as React.CSSProperties}
                className={`block cursor-pointer
                justify-center 
                font-bold 
                bg-[var(--bg-color)] text-[var(--text-color)] 
                duration-100
                [box-shadow:2.5px_2.5px_rgb(100_100_100)]
                hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)]
                rounded-sm py-0.5 text-xs mobileS:text-sm tablet:text-base
                ${personFlg===1?' border-l-8 border-[var(--border-color)]':'px-2'}
                ` }
                href={personFlg===1?'/idol/'+id:'/unit/'+id}
                //onClick={(e) => router.push(personFlg===1?'/idol/'+id:'/unit/'+id)}
                >
            <span 
              className={`p-1 rounded-xs ${personFlg===1?' border-l-2 border-white/80':''}`}
              >
              {name}
            </span>
            </a>
        );
    }

  }

    const badgeColors =
    [
        {
            id:'JUP',bgColor:'#80ed6f', textColor:'#065606',
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
            id:'FRM',bgColor:'#338033', textColor:'#BAF7BA',
            unitColors:[
                {id:'FRM01',borderColor:'#3696D0'},
                {id:'FRM02',borderColor:'#EF7A30'},
                {id:'FRM03',borderColor:'#7F9D1E'},
            ]
        },
        {
            id:'SAI',bgColor:'#7E31CC', textColor:'#EBE1F5',
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
            id:'FLG',bgColor:'#3D51FF', textColor:'#E8EAFF',
            unitColors:[
                {id:'FLG01',borderColor:'#59C13B'},
                {id:'FLG02',borderColor:'#E34238'},
                {id:'FLG03',borderColor:'#D2931B'},
            ]
        },
        {
            id:'LGN',bgColor:'#6880A0', textColor:'#E6E9ED',
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