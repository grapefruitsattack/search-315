'use client'
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useState } from "react";
import { SearchParams } from '../class/SearchParams';
import SearchModalCheckbox from "./SearchModalCheckbox";
import SearchModalFilterCheckbox from "./SearchModalFilterCheckbox";
import SearchSong from '../../../common/utils/SearchSong';
import singingMaster from '../../../../data/singingMaster.json';
import songInfoAsc from '../../../../data/songInfoAsc.json';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure, 
  Tooltip
 } from "@chakra-ui/react";

export const SearchModal: React.VFC = () => {

    const router = useRouter();
    const currentPath: string = usePathname();
    const urlSearchParams = useSearchParams();

    //useState設定
    const [params, setParams] = useState(new URLSearchParams(urlSearchParams.toString()));
    const [values, setValues] = useState(new SearchParams(urlSearchParams));
    const [searchResultCnt, setSearchResultCnt] 
        = useState(
            SearchSong(
                params.get('q')?.split(' ')||[]
                ,[]
                ,params.get('f')?.split(' ')||[]
                ,songInfoAsc
                ,params.get('andor') || 'or'
            ).length);

    //パラメータクリア関数
    function switchAndOr(andor: string): void{
        setValues({...values, andor:andor});
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('andor',andor);
        setParams(workParam);
        setSearchResultCnt(
            SearchSong(
                params.get('q')?.split(' ')||[], [], params.get('f')?.split(' ')||[], songInfoAsc, andor
            ).length);
    };
    function clearParam(): void {
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('q','');
        workParam.set('f','');
        setParams(workParam);
        setValues({andor:values['andor'],order:'desc'});
        setSearchResultCnt(
            SearchSong(
                [], [], [], songInfoAsc, values['andor']
            ).length);
    };
    function changeSearchParamsIdolId(idolId:string, onFlg: boolean): void {
        values[idolId] = onFlg? "1": "0";
        const tmpStr: string = params.get('q')||'';
        const tmpIdolIdStrArray: string[] = tmpStr.split(' ');
        const newTmpStrArray: string[] = tmpIdolIdStrArray.filter(str => str !== idolId && str !== '');
        if(onFlg){
            newTmpStrArray.push(idolId);
        };
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('q',newTmpStrArray.length===0? '': newTmpStrArray.join(' '));
        setParams(workParam);
        setSearchResultCnt(
            SearchSong(
                newTmpStrArray, [], params.get('f')?.split(' ')||[], songInfoAsc, values['andor']
            ).length);
    };
    function changeSearchParamsFilter(filterType:string, onFlg: boolean): void {
        values[filterType] = onFlg? "1": "0";
        const tmpStr: string = params.get('f')||'';
        const tmpFilterStrArray: string[] = tmpStr.split(' ');
        const newTmpStrArray: string[] = tmpFilterStrArray.filter(str => str !== filterType && str !== '');
        if(onFlg){
            newTmpStrArray.push(filterType);
        };
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('f',newTmpStrArray.length===0? '': newTmpStrArray.join(' '));
        setParams(workParam);
        setSearchResultCnt(
            SearchSong(
                params.get('q')?.split(' ')||[], [], newTmpStrArray, songInfoAsc, values['andor']
            ).length);
    };

    //OPENボタン用設定
    const searchTextArray: string[] = [];
    const searchParam :string[] = urlSearchParams.get('q')?.split(' ') || [];
    let searchText: string = '';
    singingMaster.forEach((data)=>{
        if(searchParam.includes(data.singingInfoId)){
            searchText = searchText + '　' + data.singingInfoName;
            searchTextArray.push(data.singingInfoName);
        };
    });
    searchText = searchText === ''?'　':searchText;

    const { isOpen, onClose, onOpen } = useDisclosure();

    //エラーツールチップ表示用
    const [tooltipOn, setTooltipOn] = useState<boolean>(false);
    //エラーチェック
    function errorCheck(): boolean {
        const tmpStr: string = params.get('q')||'';
        const tmpStrArray: string[] = tmpStr.split(' ');
        if(searchResultCnt > 0){
            return true;
        } else {
            return false;
        }
    }
    
    return (
        <>
        {/* ボタン部 */}
        <div className="z-50  py-2 fixed lg:bottom-[6rem] bottom-[5.5rem] right-8 flex flex-row w-full justify-end">  
        <div className="absolute">
                <button 
                    className='rounded-full lg:p-5 p-4 bg-gradient-to-r from-indigo-200/90 to-emerald-100/90  items-center
                    text-teal-700 font-bold lg:text-xl text-lm shadow-lg shadow-emerald-600/70'
                    onClick={() => {
                        setValues(new SearchParams(urlSearchParams));
                        setParams(new URLSearchParams(urlSearchParams.toString()));
                        onOpen();
                    }}
                >  
                    <span className="">
                    {'検索条件変更'}
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="icon icon-tabler icon-tabler-search inline-block pl-1
                        w-[26px] h-[26px] lg:w-[32px] lg:h-[32px]"
                        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                    </svg>
                    </span>
                </button>

        </div>
        </div>
    <div className={`flex items-center h-max `}>
        {/* モーダル部 */}
        <Modal 
        isOpen={isOpen} onClose={onClose}
        scrollBehavior={'inside'} size={'full'}
        >
            <ModalOverlay />
            <ModalContent >
                <ModalHeader>
                    <div className="flex justify-between items center border-b border-gray-200 py-2">
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
                <ModalBody p={1}>
                    <div className="bg-white  rounded-md text-center mb-8">
                    <div className="bg-white lg:px-8 px-1 pb-2 rounded-md text-center">
                        <div className="flex justify-center text-lg lg:text-xl font-bold">
                            {'絞り込み'}
                        </div>
                        <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                                <SearchModalFilterCheckbox 
                                    filterId="org" isValid={values["org"]} labelStr="オリジナル曲のみ表示（別Ver曲を非表示）"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["org"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="sbsc" isValid={values["sbsc"]} labelStr="サブスク対応曲のみ表示"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["sbsc"]==="1"} />
                        </div>
                        <div className="flex justify-center text-lg lg:text-xl font-bold mt-4">
                            {'ユニット・アイドル'}
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center px-2'>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-JUP00'>
                            <SearchModalCheckbox 
                                unitPrefix="JUP" idolNum="00" isValid={values["JUP00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["JUP00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="JUP" idolNum="01" isValid={values["JUP01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["JUP01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="JUP" idolNum="02" isValid={values["JUP02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["JUP02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="JUP" idolNum="03" isValid={values["JUP03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["JUP03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-DRS00'>
                            <SearchModalCheckbox 
                                unitPrefix="DRS" idolNum="00" isValid={values["DRS00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["DRS00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DRS" idolNum="01" isValid={values["DRS01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["DRS01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DRS" idolNum="02" isValid={values["DRS02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["DRS02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DRS" idolNum="03" isValid={values["DRS03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["DRS03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-ALT00'>
                            <SearchModalCheckbox 
                                unitPrefix="ALT" idolNum="00" isValid={values["ALT00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["ALT00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="ALT" idolNum="01" isValid={values["ALT01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["ALT01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="ALT" idolNum="02" isValid={values["ALT02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["ALT02"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-BEI00'>
                            <SearchModalCheckbox 
                                unitPrefix="BEI" idolNum="00" isValid={values["BEI00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["BEI00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="BEI" idolNum="01" isValid={values["BEI01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["BEI01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="BEI" idolNum="02" isValid={values["BEI02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["BEI02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="BEI" idolNum="03" isValid={values["BEI03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["BEI03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-DBL00'>
                            <SearchModalCheckbox 
                                unitPrefix="DBL" idolNum="00" isValid={values["DBL00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["DBL00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DBL" idolNum="01" isValid={values["DBL01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["DBL01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DBL" idolNum="02" isValid={values["DBL02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["DBL02"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-FRM00'>
                            <SearchModalCheckbox 
                                unitPrefix="FRM" idolNum="00" isValid={values["FRM00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["FRM00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FRM" idolNum="01" isValid={values["FRM01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["FRM01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FRM" idolNum="02" isValid={values["FRM02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["FRM02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FRM" idolNum="03" isValid={values["FRM03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["FRM03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SAI00'>
                            <SearchModalCheckbox 
                                unitPrefix="SAI" idolNum="00" isValid={values["SAI00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SAI00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SAI" idolNum="01" isValid={values["SAI01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SAI01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SAI" idolNum="02" isValid={values["SAI02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SAI02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SAI" idolNum="03" isValid={values["SAI03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SAI03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SSK00'>
                            <SearchModalCheckbox 
                                unitPrefix="SSK" idolNum="00" isValid={values["SSK00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SSK00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SSK" idolNum="01" isValid={values["SSK01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SSK01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SSK" idolNum="02" isValid={values["SSK02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SSK02"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-HIJ00'>
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="00" isValid={values["HIJ00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["HIJ00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="01" isValid={values["HIJ01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["HIJ01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="02" isValid={values["HIJ02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["HIJ02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="03" isValid={values["HIJ03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["HIJ03"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="04" isValid={values["HIJ04"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["HIJ04"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="05" isValid={values["HIJ05"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["HIJ05"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-CFP00'>
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="00" isValid={values["CFP00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["CFP00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="01" isValid={values["CFP01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["CFP01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="02" isValid={values["CFP02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["CFP02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="03" isValid={values["CFP03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["CFP03"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="04" isValid={values["CFP04"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["CFP04"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="05" isValid={values["CFP05"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["CFP05"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-MFM00'>
                            <SearchModalCheckbox 
                                unitPrefix="MFM" idolNum="00" isValid={values["MFM00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["MFM00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="MFM" idolNum="01" isValid={values["MFM01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["MFM01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="MFM" idolNum="02" isValid={values["MFM02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["MFM02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="MFM" idolNum="03" isValid={values["MFM03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["MFM03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SEM00'>
                            <SearchModalCheckbox 
                                unitPrefix="SEM" idolNum="00" isValid={values["SEM00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SEM00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SEM" idolNum="01" isValid={values["SEM01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SEM01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SEM" idolNum="02" isValid={values["SEM02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SEM02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SEM" idolNum="03" isValid={values["SEM03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["SEM03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-KGD00'>
                            <SearchModalCheckbox 
                                unitPrefix="KGD" idolNum="00" isValid={values["KGD00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["KGD00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="KGD" idolNum="01" isValid={values["KGD01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["KGD01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="KGD" idolNum="02" isValid={values["KGD02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["KGD02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="KGD" idolNum="03" isValid={values["KGD03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["KGD03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-FLG00'>
                            <SearchModalCheckbox 
                                unitPrefix="FLG" idolNum="00" isValid={values["FLG00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["FLG00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FLG" idolNum="01" isValid={values["FLG01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["FLG01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FLG" idolNum="02" isValid={values["FLG02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["FLG02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FLG" idolNum="03" isValid={values["FLG03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["FLG03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-LGN00'>
                            <SearchModalCheckbox 
                                unitPrefix="LGN" idolNum="00" isValid={values["LGN00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["LGN00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="LGN" idolNum="01" isValid={values["LGN01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["LGN01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="LGN" idolNum="02" isValid={values["LGN02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["LGN02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="LGN" idolNum="03" isValid={values["LGN03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["LGN03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-CLF00'>
                            <SearchModalCheckbox 
                                unitPrefix="CLF" idolNum="00" isValid={values["CLF00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values["CLF00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CLF" idolNum="01" isValid={values["CLF01"]}
                                changeSearchParams={changeSearchParamsIdolId} 
                                onChange={() => values["CLF01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CLF" idolNum="02" isValid={values["CLF02"]}
                                changeSearchParams={changeSearchParamsIdolId} 
                                onChange={() => values["CLF02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CLF" idolNum="03" isValid={values["CLF03"]}
                                changeSearchParams={changeSearchParamsIdolId} 
                                onChange={() => values["CLF03"]==="1"} />
                            </div>
                        </div>
                        <div className="flex justify-center text-lg lg:text-xl font-bold mt-4">
                            {'その他条件'}
                        </div>
                        <div className=''>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                                <SearchModalFilterCheckbox 
                                    filterId="cover" isValid={values["cover"]} labelStr="カバー曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["cover"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="u" isValid={values["u"]} labelStr="ユニット曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["u"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="s" isValid={values["s"]} labelStr="ソロ曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["s"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="all" isValid={values["all"]} labelStr="全体曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["all"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="anniv" isValid={values["anniv"]} labelStr="アニバ曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["anniv"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="type" isValid={values["type"]} labelStr="属性曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["type"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="imas" isValid={values["imas"]} labelStr="アイマス"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["imas"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="prs" isValid={values["prs"]} labelStr="PRS"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["prs"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="psvote" isValid={values["psvote"]} labelStr="パッション投票"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["psvote"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="colle" isValid={values["colle"]} labelStr="ユニコレ・ソロコレ"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values["colle"]==="1"} />
                            </div>
                        </div>
                    </div>
                    </div>
                </ModalBody>
                <ModalHeader className='bg-sky-100/60 shadow shadow-blue-950' >
                    
                <div className={`flex mt-1 px-8 gap-2 justify-center text-sm`}>
                <div>{searchResultCnt}曲選択中</div>
                </div>
                <div className={`flex mt-1 px-8 gap-2 justify-center`}>
                <div className={`relative flex w-[600px] p-1 bg-slate-900 rounded-full`}>
                            <span className={`absolute inset-0 m-1 pointer-events-none`}>
                                <span className={`absolute inset-0 w-1/2 bg-teal-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out 
                                ${values["andor"]==="or"?'translate-x-0':'translate-x-full'}`}></span>
                            </span>
                            <button 
                                className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
                                    ${values["andor"]==="or"? 'text-white' : 'text-slate-400 '}`}
                                onClick={() => {switchAndOr('or')}}
                            >いずれかが該当
                            <span className={`${values["andor"]==="or"? 'text-indigo-200' : 'text-slate-400 '}`}></span>
                            </button>
                            <button 
                                className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
                                    ${values["andor"]==="or"? 'text-slate-400 ' : 'text-white'}`}
                                onClick={() => {switchAndOr('and')}}
                            >
                            全員が該当</button>
                        </div>
                </div>
                    <div className='flex mt-1 px-8 gap-2 justify-center'>
                        <button 
                            className='rounded-lg
                                text-white text-sm font-bold leading-tight
                                bg-gray-500
                                transition-all duration-500 ease-out
                                w-[200px] p-2'
                            onClick={onClose}
                        >
                        <div className='flex flex-wrap justify-center items-center'>
                            <div>キャンセル</div>
                        </div>
                        </button>
                        <button 
                            className='rounded-lg
                                text-white text-sm font-bold leading-tight
                                bg-blue-500
                                transition-all duration-500 ease-out
                                w-[200px] p-2'
                            onClick={clearParam}
                        >
                        <div className='flex flex-wrap justify-center items-center'>
                            <div>クリア</div>
                        </div>
                        </button>
                        <Tooltip hasArrow label='1曲以上該当するよう条件を設定してください' bg='red.600' isOpen = {tooltipOn}>
                            <button className='rounded-lg
                                text-white text-sm font-bold leading-tight
                                hover:bg-green-500/70
                                bg-green-500
                                transition-all duration-500 ease-out
                                w-[200px] p-2'
                                onClick={() => {
                                    if(errorCheck()){
                                        setTooltipOn(false);
                                        const workParam: URLSearchParams = new URLSearchParams(params.toString());
                                        workParam.delete('display');
                                        workParam.set('display','1');
                                        router.push(currentPath + '?'  + decodeURIComponent(workParam.toString()));
                                        onClose();
                                    } else {
                                        setTooltipOn(true);
                                        window.setTimeout(function(){setTooltipOn(false);}, 2000);
                                    }
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
                            </button>
                        </Tooltip>
                    </div>
                </ModalHeader>
            </ModalContent>
        </Modal>
        </div>
        </>
    );
};