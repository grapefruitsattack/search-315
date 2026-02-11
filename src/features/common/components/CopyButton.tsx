'use client'
import { useState } from "react";
import { PlacementWithLogical, Tooltip } from "@chakra-ui/react";

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
  };
    
  return (
    <Tooltip className = '' placement={ple} label={tootipText} isOpen = {tooltipOn}>
      <button 
        className='
          flex py-2 px-2 gap-1 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
          font-mono text-xs mobileL:text-sm tablet:text-base 
          transition-all duration-300
          hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
          active:scale-90
        ' 
        onClick={() => copyTextToClipboard(copyText)}
      >
        {/* Google Fonts Icons */}
        <svg className="fill-zinc-600 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
        </svg>
        {buttonText}
      </button>
    </Tooltip>
  )
}