'use client'
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useState } from "react";
import { SearchParams } from '../class/SearchParams';
import SearchModalCheckbox from "./SearchModalCheckbox";
import singingMaster from '../../../../data/singingMaster.json';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure, 
 } from "@chakra-ui/react";

export const SearchModal: React.VFC = () => {

    const router = useRouter();
    const currentPath: string = usePathname();
    const urlSearchParams = useSearchParams();
    const params = new URLSearchParams(urlSearchParams.toString());


    //useState設定
    const [values, setValues] = useState(new SearchParams(urlSearchParams));
    function changeSearchParamsIdolId(idolId:string, onFlg: boolean): void {
        values[idolId] = onFlg? "1": "0";
        const tmpStr: string = params.get('search')||'';
        const tmpStrArray: string[] = tmpStr.split(' ');
        const newTmpStrArray: string[] = tmpStrArray.filter(str => str !== idolId);
        if(onFlg){
            newTmpStrArray.push(idolId);
        };
        params.set('search',newTmpStrArray.join(' '));
        console.log(params.get("search"));
    };

    

    //OPENボタン用設定
    let searchText: string = '';
    const searchTextArray: string[] = [];
    const searchParam :string[] = urlSearchParams.get('search')?.split(' ') || [];
    singingMaster.forEach((data)=>{
        if(searchParam.includes(data.singingInfoId)){
            searchText = searchText + '　' + data.singingInfoName;
            searchTextArray.push(data.singingInfoName);
        };
    });

    
    const { isOpen, onClose, onOpen } = useDisclosure();
   
    
    return (
        <>
        <label className={`flex items-center cursor-pointer select-none h-max 
            hover:drop-shadow-xl 
            transition-all duration-500 ease-out`}>
        <div className="flex w-[85vw] justify-center m-auto">
            <div 
                className='
                flex p-0.5 bg-gradient-to-r from-indigo-300 to-emerald-300 items-center
                '
            >
                <div
                    className='flex flex-row
                        bg-gradient-to-r from-indigo-50 to-emerald-50 
                        border-2 border-white
                        text-teal-700
                        font-sans lg:text-base text-sm
                        p-1 items-center 
                    '
                >
                    <div
                        className='
                             
                            w-[70vw] truncate
                        '
                    >
                    {searchText}
                    </div>
                </div>
                
                <button 
                    className='
                        flex justify-center px-2 text-white
                    '
                    onClick={() => {
                        setValues(new SearchParams(urlSearchParams));
                        onOpen();
                    }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" 
                        className="icon icon-tabler icon-tabler-search" 
                        width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                    </svg>
                </button>
            </div>
        </div>
     <Modal 
      isOpen={isOpen} onClose={onClose}
      scrollBehavior={'inside'}
     >
       <ModalOverlay />
       <ModalContent maxW="80vw" maxH="80vh">
       <ModalHeader>
       <div
          className="flex justify-between items center border-b border-gray-200 py-2"
        >
        <div>検索</div>
        <button
            className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
            onClick={onClose}
          >
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>
          </button>
          </div>
        </ModalHeader>
      <ModalBody pb=''>


        <div className="bg-white  rounded-md text-center ">

        <div className="bg-white lg:px-8 px-8 pb-2 rounded-md text-center">

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center '>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-JUP00'>
        <SearchModalCheckbox 
            unitPrefix="JUP" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="JUP" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="JUP" idolNum="03" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-DRS00'>
        <SearchModalCheckbox 
            unitPrefix="DRS" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="DRS" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="DRS" idolNum="03" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-ALT00'>
        <SearchModalCheckbox 
            unitPrefix="ALT" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="ALT" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-BEI00'>
        <SearchModalCheckbox 
            unitPrefix="BEI" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="BEI" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="BEI" idolNum="03" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-DBL00'>
        <SearchModalCheckbox 
            unitPrefix="DBL" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="DBL" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-FRM00'>
        <SearchModalCheckbox 
            unitPrefix="FRM" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="FRM" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="FRM" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-SAI00'>
        <SearchModalCheckbox 
            unitPrefix="SAI" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="SAI" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="SAI" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-SSK00'>
        <SearchModalCheckbox 
            unitPrefix="SSK" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="SSK" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-HIJ00'>
        <SearchModalCheckbox 
            unitPrefix="HIJ" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="HIJ" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="HIJ" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="HIJ" idolNum="04"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="HIJ" idolNum="05"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-CFP00'>
        <SearchModalCheckbox 
            unitPrefix="CFP" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="CFP" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="CFP" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="CFP" idolNum="04"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="CFP" idolNum="05"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-MFM00'>
        <SearchModalCheckbox 
            unitPrefix="MFM" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="MFM" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="MFM" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-SEM00'>
        <SearchModalCheckbox 
            unitPrefix="SEM" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="SEM" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="SEM" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-KGD00'>
        <SearchModalCheckbox 
            unitPrefix="KGD" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="KGD" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="KGD" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-FLG00'>
        <SearchModalCheckbox 
            unitPrefix="FLG" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="FLG" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="FLG" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-LGN00'>
        <SearchModalCheckbox 
            unitPrefix="LGN" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="LGN" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="LGN" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-2 border-CLF00'>
        <SearchModalCheckbox 
            unitPrefix="CLF" idolNum="01" searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="CLF" idolNum="02"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        <SearchModalCheckbox 
            unitPrefix="CLF" idolNum="03"  searchParams={values}
            changeSearchParams={changeSearchParamsIdolId} />
        </div>
        </div>

            

            </div>
            </div>
            
      </ModalBody>
       <ModalHeader>
       <div className='flex mt-1 px-10 gap-2 justify-end'>


            
            <motion.button className='rounded-lg
                text-white text-sm font-bold leading-tight
                hover:bg-green-500/70
                bg-green-500
                transition-all duration-500 ease-out
                w-[200px] p-2'
                onClick={() => {
                    params.delete('page');
                    params.set('page','1');
                router.push(currentPath + '?'  + decodeURIComponent(params.toString()));
                onClose();
                }}
            //    whileTap={{ scale: 0.8 }}
            //    transition={{ duration: 0.05 }}
            >
            <div className='flex flex-wrap justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" 
                        className="icon icon-tabler icon-tabler-search" 
                        width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                    </svg>
                <div>検索</div>
                </div>
            </motion.button>

            </div>
            
       </ModalHeader>
       </ModalContent>
     </Modal>
        </label>
        </>
    );
};