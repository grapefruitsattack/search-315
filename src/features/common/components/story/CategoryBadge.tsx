'use client'
import {CATEGORY} from '../../../common/const/StoryInfoConst';
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName,GetVoiceStateName,GetStoryHowtoviewName } from '../../../common/utils/Story/GetStoryInfomation';
import borderHover from '../css/border-hover.module.css';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";


interface ItemCSS extends React.CSSProperties{
    'textShadow':string
  }
export default function CategoryBadge({ id, size }: { id: string, size: string }) {
    
    const categoryName: string = GetStoryCategoryName(id);
    let bgColor: string = 'bg-teal-500';
    let symbolFillColor: string = 'fill-teal-500';
    let symbolStrokeColor: string = '';
    let symbol: JSX.Element = (
        <></>
    );
    let symbolViewBoxStr: string = '';
    
    switch (id) { 
        case CATEGORY.comicNomral.id:
        case CATEGORY.comicSpecial.id:
            bgColor = 'bg-red-500';
            symbolFillColor = 'fill-red-500';
            symbol = (
                <path d="m440-803-83 83H240v117l-83 83 83 83v117h117l83 83 100-100 168 85-86-167 101-101-83-83v-117H523l-83-83Zm0-113 116 116h164v164l116 116-116 116 115 226q7 13 4 25.5T828-132q-8 8-20.5 11t-25.5-4L556-240 440-124 324-240H160v-164L44-520l116-116v-164h164l116-116Zm0 396Z"/>
            );
            symbolViewBoxStr = '50 -910 860 860';
            break;
        case CATEGORY.episodeZero.id:
            bgColor = 'bg-red-500';
            symbolFillColor = 'fill-red-500';
            symbol = (
                <path d="M480-200q-100 0-160-79.5T260-480q0-121 60-200.5T480-760q100 0 160 79.5T700-480q0 121-60 200.5T480-200Zm0-82q66 0 99-60t33-138q0-78-33-138t-99-60q-66 0-99 60t-33 138q0 78 33 138t99 60Z"/>
            );
            symbolViewBoxStr = '130 -830 700 700';
            break;
        case CATEGORY.idolEpisode.id:
            bgColor = 'bg-red-500';
            symbolFillColor = 'fill-red-500';
            symbol = (
                <path d="M360-80v-529q-91-24-145.5-100.5T160-880h80q0 83 53.5 141.5T430-680h100q30 0 56 11t47 32l181 181-56 56-158-158v478h-80v-240h-80v240h-80Zm120-640q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z"/>
            );
            symbolViewBoxStr = '50 -910 860 860';
            break;
        case CATEGORY.SideMemories.id:
            bgColor = 'bg-red-500';
            symbolFillColor = 'fill-red-500';
            symbol = (<path d="M120-120v-720h162l198 522 196-522h164v720H720v-490L531-120H429L240-607v487H120Z"/>);
            symbolViewBoxStr = '0 -960 960 960';
            break;
        case CATEGORY.connectWithMusic.id:
            bgColor = 'bg-red-500';
            symbolFillColor = 'fill-red-500';
            symbol = (
                <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z">
                </path>
            );
            symbolViewBoxStr = '0.5 1 21.5 21';
            break;
        case CATEGORY.connectWithStage.id:
            bgColor = 'bg-red-500';
            symbolFillColor = 'fill-none';
            symbolStrokeColor = 'stroke-red-500';
            symbol = (
                <g id="microphone_line" fill='none'>
                <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
                <path className='fill-red-500' d='M3.868 4.368a7 7 0 0 1 11.74 6.656l-.069.256 3.4 4.372a2.7 2.7 0 0 1 .387 2.632c.1.03.222.046.372.016l.118-.031a1 1 0 0 1 .632 1.897 2.765 2.765 0 0 1-2.546-.389 2.7 2.7 0 0 1-2.586-.22l-.164-.117-4.372-3.401a7 7 0 0 1-6.911-11.67ZM14.577 13.3a7.045 7.045 0 0 1-1.777 1.777l3.58 2.784a.7.7 0 0 0 .98-.981zM12.92 6.459l-.203.336a20.002 20.002 0 0 1-2.84 3.584 20.002 20.002 0 0 1-3.583 2.839l-.336.203a5.001 5.001 0 0 0 6.962-6.962m-1.498-1.41a5.002 5.002 0 0 0-6.874 6.874l.324-.183a18.004 18.004 0 0 0 3.592-2.775 18.003 18.003 0 0 0 2.552-3.223l.116-.19.203-.347z'/>
                </g>
            );
            symbolViewBoxStr = '1 1 21 21';
            break;
        case CATEGORY.connectWithOthers.id:
            bgColor = 'bg-red-500';
            symbolFillColor = 'fill-none';
            symbolStrokeColor = 'stroke-red-500';
            symbol = (
                <g id="link_fill" fill='none'>
                <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
                <path className='fill-red-500' d='m17.303 9.524 3.182 3.182a5.5 5.5 0 1 1-7.778 7.778l-1.06-1.06a1.5 1.5 0 1 1 2.12-2.122l1.062 1.061a2.5 2.5 0 0 0 3.535-3.536l-3.182-3.182a2.5 2.5 0 0 0-2.681-.56c-.162.064-.312.13-.454.196l-.464.217c-.62.28-1.097.4-1.704-.206-.872-.872-.646-1.677.417-2.41a5.502 5.502 0 0 1 7.007.642m-6.01-6.01 1.06 1.06a1.5 1.5 0 0 1-2.12 2.122l-1.061-1.06A2.5 2.5 0 1 0 5.636 9.17l3.182 3.182a2.5 2.5 0 0 0 2.681.56c.162-.064.312-.13.454-.196l.464-.217c.62-.28 1.098-.4 1.704.206.872.872.646 1.677-.417 2.41a5.502 5.502 0 0 1-7.007-.642l-3.182-3.182a5.5 5.5 0 1 1 7.778-7.778Z'/>
                </g>
            );
            symbolViewBoxStr = '1 1 22 22';
            break;
        default:
            //return(<></>);
            break;
    }
    return(
    <div 
        className={`
            flex w-fit 
            rounded-lg 
            font-mono font-bold 
            text-white 
            ${bgColor} 
            ${size==='block'
                ?` rounded-md text-xs mobileS:text-sm px-1 py-0.5 gap-1`
                :` rounded-lg p-1 text-sm tablet:text-xl gap-1 tablet:gap-2 `}
        `}
    >
        
        <div className='flex items-center'>
        <svg
        className={`
        bg-white rounded rounded-sm border border-white border-1 
        ${symbolFillColor} 
        ${size==='block'
            ?` w-[16px] h-[16px] mobileS:w-[18px] mobileS:h-[18px] `
            :` w-[20px] h-[20px] tablet:w-[26px] tablet:h-[26px] `}
        `}
        viewBox={symbolViewBoxStr} xmlns="http://www.w3.org/2000/svg" >
            {symbol}
        </svg></div>
        <p className={``}>{categoryName}</p>
    </div>
    );
  }
