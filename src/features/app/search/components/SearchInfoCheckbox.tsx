import { SearchParams } from '../class/SearchParams';
import { useState } from "react";
import singingMaster from '../../../../data/singingMaster.json';

export default function SearchInfoCheckbox(
    { unitPrefix,idolNum,isValid,onChange }
    : { 
      unitPrefix: string,
      idolNum: string,
      isValid: boolean,
      onChange: (filterId:string, onFlg: boolean) => void;
    })
  {

    const idolId = unitPrefix + idolNum;
    const idolName: string = singingMaster.find(data=>data.singingInfoId === idolId)?.singingInfoName || "";

    return (
        <label className='flex flex-row relative cursor-pointer'>

            <input 
                type="checkbox"
                id={idolId} 
                checked={typeof isValid === "boolean" ? isValid : false}
                className='hidden peer
                '
                onChange={(e) => {
                  onChange(idolId,e.target.checked);
                }}
            />
            {/* <span className='h-6 w-6 absolute rounded-full pointer-events-none
            peer-checked:border-green-300 peer-checked:border-2
            '>
            </span> */}
            <div className={`text-left
              justify-center px-2 
              text-stone-500
              font-sans text-sm lg:text-base 
              hover:text-green-500
              drop-shadow-md peer-checked:drop-shadow-none

              transition-all duration-500 ease-out select-none 
              ${idolNum === '00'
                ?`rounded-none
                text-stone-500 peer-checked:text-white
                peer-checked:bg-green-400
                border-gray-400 border-2
                peer-checked:border-green-300 peer-checked:border-2
                peer-disabled:border-green-900`
                :`rounded-lg peer-checked:rounded-none
                bg-stone-200/20 peer-checked:bg-stone-200/0
                text-stone-500 peer-checked:text-green-500
                border-green-300/0 border-2
                peer-checked:border-green-400 peer-checked:border-2
                peer-disabled:border-green-900`
              }
            `}
            >
              {idolId === 'CFP03'?'アスラン＝BBⅡ世':idolName}
            </div>

        </label>
      );
    }