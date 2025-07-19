'use client'
import type { SingingMaster } from '../../../data/types';
import singingMaster from '../../../data/singingMaster.json';
import borderHover from '../css/border-hover.module.css';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";


interface ItemCSS extends React.CSSProperties{
    'textShadow':string
  }
export default function IdolBadge({ id, useShortName, size }: { id: string, useShortName: number, size: string }) {

    if(id === '315pro'){
        return(
        <div 
            className={`
            justify-center 
            font-bold
            bg-sky-600
            text-white
            ${size==='block'
                ?` rounded-sm p-0.5 text-xs mobileS:text-xs tablet:text-sm`
                :` rounded-md p-1 text-xs mobileS:text-sm tablet:text-base`}
            `}
        >
        <p className={``}>{'315プロダクション'}</p>
        </div>
        )
    };

    const data: SingingMaster | undefined  = singingMaster.find(data => data.singingInfoId === id);
    const name: string 
        = useShortName===0?data?.singingInfoName||'': data?.singingInfoShortName||'';
    const unitPrefix: string = id.substring(0, 3);
    const unitBadgeBg: string = 'bg-' + unitPrefix + '_BADGE_BG ';
    const unitBadgeTx: string = 'text-' + unitPrefix + '_BADGE_TX ';

    return(
        <div 
            className={`
            justify-center 
            font-bold
            ${size==='block'
                ?` rounded-sm p-0.5 text-xs mobileS:text-xs tablet:text-sm`
                :` rounded-md p-1 text-xs mobileS:text-sm tablet:text-base`}
            ` + unitBadgeBg + unitBadgeTx}
        >
        <p className={``}>{name}</p>
        <p className={`
        bg-JUP_BADGE_BG text-JUP_BADGE_TX
        bg-DRS_BADGE_BG text-DRS_BADGE_TX
        bg-ALT_BADGE_BG text-ALT_BADGE_TX
        bg-BEI_BADGE_BG text-BEI_BADGE_TX
        bg-DBL_BADGE_BG text-DBL_BADGE_TX
        bg-FRM_BADGE_BG text-FRM_BADGE_TX
        bg-SAI_BADGE_BG text-SAI_BADGE_TX
        bg-HIJ_BADGE_BG text-HIJ_BADGE_TX
        bg-SSK_BADGE_BG text-SSK_BADGE_TX
        bg-CFP_BADGE_BG text-CFP_BADGE_TX
        bg-MFM_BADGE_BG text-MFM_BADGE_TX
        bg-SEM_BADGE_BG text-SEM_BADGE_TX
        bg-KGD_BADGE_BG text-KGD_BADGE_TX
        bg-FLG_BADGE_BG text-FLG_BADGE_TX
        bg-LGN_BADGE_BG text-LGN_BADGE_TX
        bg-CLF_BADGE_BG text-CLF_BADGE_TX
        `}>
        </p>
        </div>
    );
  }
