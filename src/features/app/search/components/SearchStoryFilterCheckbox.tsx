import { SearchParams } from '../class/SearchParams';
import { Dispatch, SetStateAction, useState } from "react";
import singingMaster from '../../../../data/singingMaster.json';

export default function SearchStoryFilterCheckbox(
    { filterId,isValid,labelStr,isMain,onChange }
    : { 
        filterId: string,
        isValid: boolean,
        labelStr: string,
        isMain?:boolean,
        onChange: (filterId:string, onFlg: boolean) => void;
      })
{
  const inputIsMain = isMain===undefined?false:isMain;

    return (
        <label className='flex flex-row relative cursor-pointer'>
            <input 
                type="checkbox"
                id={filterId}
                checked={typeof isValid === "boolean" ? isValid : false}
                className='hidden peer
                '
                onChange={(e) => {
                  onChange(filterId,e.target.checked);
                }}
            />
            {/* <span className='h-6 w-6 absolute rounded-full pointer-events-none
            peer-checked:border-green-300 peer-checked:border-2
            '>
            </span> */}
            <div className={`text-left
                    justify-center px-2 py-0 lg:py-1
                    font-sans text-sm lg:text-base 
                    hover:bg-green-200/20
                    hover:text-green-400
                    drop-shadow-md peer-checked:drop-shadow-none
                    transition-all duration-500 ease-out
                    select-none 
                    ${inputIsMain
                      ?`rounded-none
                      text-stone-500 peer-checked:text-white
                      peer-checked:bg-green-400
                      border-gray-400 border-2
                      peer-checked:border-green-300 peer-checked:border-2
                      peer-disabled:border-green-900`
                      :`rounded-lg peer-checked:rounded-none
                      bg-stone-200/20 peer-checked:bg-stone-200/0
                      text-stone-500 peer-checked:text-green-400
                      border-green-300/0 border-2
                      peer-checked:border-green-300 peer-checked:border-2
                      peer-disabled:border-green-900`
                    }
                    `
                  }>
                {labelStr}
            </div>
        </label>
      );
    }