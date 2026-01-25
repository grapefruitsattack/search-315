'use client'
import { useState } from "react";
import {PlacementWithLogical, Tooltip} from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function CopyButton (
    { copyText, buttonText, tootipText, placement }
    : { copyText: string ,buttonText: string, tootipText:string, placement: string }
) {

    let ple: PlacementWithLogical 
    switch (placement) {
        case 'top' :
            ple = 'top';
            break;
        case 'bottom' :
            ple = 'bottom';
            break;
        default:
            ple = 'bottom';
            break;
    }

    const [tooltipOn, setTooltipOn] = useState<boolean>(false);

    function copyTextToClipboard(text: string) {
        navigator.clipboard.writeText(text)
        .then(function() {
          setTooltipOn(true);
          window.setTimeout(function(){setTooltipOn(false);}, 1500);
        }, function(err) {
        });
      }
    
    return (
        <Tooltip className = '' placement={ple} label={tootipText} isOpen = {tooltipOn}>
        <motion.button className='rounded-lg border-2 border-green-500 
            text-green-500 text-sm font-sans leading-tight
            hover:bg-green-500 hover:text-green-100 
            transition-all duration-500 ease-out 
            fill-green-500 hover:fill-green-100 
            h-full w-full
            '
            onClick={() => copyTextToClipboard(copyText)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.05 }}
        >
            <div
            className='flex flex-wrap justify-center items-center 
            text-xs mobileM:text-base lg:text-lg'>
            <svg 
            className="flex icon icon-tabler icon-tabler-copy justify-center items-center" 
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
            <div className="">{buttonText}</div> 
            </div>
        </motion.button>
        </Tooltip>    

    )
}