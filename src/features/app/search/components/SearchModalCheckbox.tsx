import { SearchParams } from '../class/SearchParams';
import { useState } from "react";
import singingMaster from '../../../../data/singingMaster.json';

export default function SearchModalCheckbox(
    { unitPrefix,idolNum,isValid,changeSearchParams,onChange }
    : { unitPrefix: string, idolNum: string, isValid: string
      , changeSearchParams: (idolId:string, onFlg: boolean) => void
      , onChange: (filterId:string, onFlg: boolean) => void; })
  {

    const idolId = unitPrefix + idolNum;
    const idolName: string = singingMaster.find(data=>data.singingInfoId === idolId)?.singingInfoName || "";


    return (
        <label className='flex flex-row relative cursor-pointer'>

            <input 
                type="checkbox" id={idolId} checked={isValid==="1"}
                className='hidden peer
                '
                onChange={(e) => {
                  onChange(idolId,e.target.checked);
                  changeSearchParams(idolId,e.target.checked);
                }}
            />
            {/* <span className='h-6 w-6 absolute rounded-full pointer-events-none
            peer-checked:border-green-300 peer-checked:border-2
            '>
            </span> */}
            <div className={`text-left
                    justify-center px-2 
                    text-stone-500
                    peer-checked:text-green-400
                    font-sans text-sm lg:text-base 
                    bg-stone-200/20 peer-checked:bg-stone-200/0
                    hover:bg-green-200/20
                    hover:text-green-400
                    border-green-300/0 border-2
                    peer-checked:border-green-300 peer-checked:border-2
                    rounded-lg peer-checked:rounded-none
                    drop-shadow-md peer-checked:drop-shadow-none
                    transition-all duration-500 ease-out
                    select-none ${idolNum === '00'?` font-bold`:``}`
                  }>
                {idolName}
            </div>

            <p className={`
  underline decoration-JUP00 hover:bg-JUP00/50 text-JUP00
  underline decoration-DRS00 hover:bg-DRS00/50 text-DRS00
  underline decoration-ALT00 hover:bg-ALT00/50 text-ALT00
  underline decoration-BEI00 hover:bg-BEI00/50 text-BEI00
  underline decoration-DBL00 hover:bg-DBL00/50 text-DBL00
  underline decoration-FRM00 hover:bg-FRM00/50 text-FRM00
  underline decoration-SAI00 hover:bg-SAI00/50 text-SAI00
  underline decoration-HIJ00 hover:bg-HIJ00/50 text-HIJ00
  underline decoration-SSK00 hover:bg-SSK00/50 text-SSK00
  underline decoration-CFP00 hover:bg-CFP00/50 text-CFP00
  underline decoration-MFM00 hover:bg-MFM00/50 text-MFM00
  underline decoration-SEM00 hover:bg-SEM00/50 text-SEM00
  underline decoration-KGD00 hover:bg-KGD00/50 text-KGD00
  underline decoration-FLG00 hover:bg-FLG00/50 text-FLG00
  underline decoration-LGN00 hover:bg-LGN00/50 text-LGN00
  underline decoration-CLF00 hover:bg-CLF00/50 text-CLF00
  underline decoration-JUP01 text-JUP01
  underline decoration-JUP02 text-JUP02
  underline decoration-JUP03 text-JUP03
  underline decoration-DRS01 text-DRS01
  underline decoration-DRS02 text-DRS02
  underline decoration-DRS03 text-DRS03
  underline decoration-ALT01 text-ALT01
  underline decoration-ALT02 text-ALT02
  underline decoration-BEI01 text-BEI01
  border-BEI02 text-BEI02
  border-BEI03 text-BEI03
  border-DBL01 text-DBL01
  border-DBL02 text-DBL02
  border-FRM01 text-FRM01
  border-FRM02 text-FRM02
  border-FRM03 text-FRM03
  border-SAI01 text-SAI01
  border-SAI02 text-SAI02
  border-SAI03 text-SAI03
  border-HIJ01 text-HIJ01
  border-HIJ02 text-HIJ02
  border-HIJ03 text-HIJ03
  border-HIJ04 text-HIJ04
  border-HIJ05 text-HIJ05
  border-SSK01 text-SSK01
  border-SSK02 text-SSK02
  border-CFP01 text-CFP01
  border-CFP02 text-CFP02
  border-CFP03 text-CFP03
  border-CFP04 text-CFP04
  border-CFP05 text-CFP05
  border-MFM01 text-MFM01
  border-MFM02 text-MFM02
  border-MFM03 text-MFM03
  border-SEM01 text-SEM01
  border-SEM02 text-SEM02
  border-SEM03 text-SEM03
  border-KGD01 text-KGD01
  border-KGD02 text-KGD02
  border-KGD03 text-KGD03
  border-FLG01 text-FLG01
  border-FLG02 text-FLG02
  border-FLG03 text-FLG03
  border-LGN01 text-LGN01
  border-LGN02 text-LGN02
  border-LGN03 text-LGN03
  border-CLF01 text-CLF01
  border-CLF02 text-CLF02
  border-CLF03 text-CLF03
  
  `}>
</p>
        </label>
      );
    }