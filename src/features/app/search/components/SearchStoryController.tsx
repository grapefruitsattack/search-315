'use client'
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchStoryParams } from '../class/SearchStoryParams';
import SearchModalCheckbox from "./SearchModalCheckbox";
import SearchModalFilterCheckbox from "./SearchModalFilterCheckbox";
import SearchModalRadioButton from "./SearchModalRadioButton";
import SearchSong from '../../../common/utils/SearchSong';
import {CATEGORY,MEDIA,WEBSITE} from '../../../common/const/StoryInfoConst';
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


export default function SearchStoryController({ firstIsOpen }: { firstIsOpen: boolean;}) {

    const router = useRouter();
    const currentPath: string = usePathname();
    const urlSearchParams = useSearchParams();
    const [isOpen, setISopen] = useState(firstIsOpen);

    //useState設定
    const [params, setParams] = useState(new URLSearchParams(urlSearchParams.toString()));
    const [values, setValues] = useState(new SearchStoryParams(urlSearchParams));


    //パラメータクリア関数
    function clearParam(): void {
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('q','');
        workParam.set('f','');
        setParams(workParam);
        setValues({andor:values['andor'],order:'desc',voice:'0',howToView:'0',media:{},category:{},info:{}});
    };

    function switchHowToView(howToView: string): void{
        setValues({...values, howToView:howToView});
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        if(howToView==='null'){
            workParam.set('htv','');
        }else{
            workParam.set('htv',howToView);
        }
        setParams(workParam);
    };
    function switchVoice(voice: string): void{
        setValues({...values, voice:voice});
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        if(voice==='null'){
            workParam.set('v','');
        }else{
            workParam.set('v',voice);
        }
        setParams(workParam);
    };
    function switchAndOr(andor: string): void{
        setValues({...values, andor:andor});
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('andor',andor);
        setParams(workParam);
    };
    function changeSearchParamsIdolId(idolId:string, onFlg: boolean): void {
        values.info[idolId] = onFlg? "1": "0";
        const tmpStr: string = params.get('q')||'';
        const tmpIdolIdStrArray: string[] = tmpStr.split(' ');
        const newTmpStrArray: string[] = tmpIdolIdStrArray.filter(str => str !== idolId && str !== '');
        if(onFlg){
            newTmpStrArray.push(idolId);
        };
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('q',newTmpStrArray.length===0? '': newTmpStrArray.join(' '));
        setParams(workParam);
    };
    function changeSearchParamsMedia(mediaId:string, onFlg: boolean): void {
        values.media[mediaId] = onFlg? "1": "0";
        const tmpStr: string = params.get('m')||'';
        const tmpIdolIdStrArray: string[] = tmpStr.split(' ');
        const newTmpStrArray: string[] = tmpIdolIdStrArray.filter(str => str !== mediaId && str !== '');
        if(onFlg){
            newTmpStrArray.push(mediaId);
        };
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('m',newTmpStrArray.length===0? '': newTmpStrArray.join(' '));
        setParams(workParam);
    };
    function changeSearchParamsCategory(categoryId:string, onFlg: boolean): void {
        values.category[categoryId] = onFlg? "1": "0";
        const tmpStr: string = params.get('c')||'';
        const tmpIdolIdStrArray: string[] = tmpStr.split(' ');
        const newTmpStrArray: string[] = tmpIdolIdStrArray.filter(str => str !== categoryId && str !== '');
        if(onFlg){
            newTmpStrArray.push(categoryId);
        };
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('c',newTmpStrArray.length===0? '': newTmpStrArray.join(' '));
        setParams(workParam);
    };
    function changeSearchParamsFilter(filterType:string, onFlg: boolean): void {
        values.info[filterType] = onFlg? "1": "0";
        const tmpStr: string = params.get('f')||'';
        const tmpFilterStrArray: string[] = tmpStr.split(' ');
        const newTmpStrArray: string[] = tmpFilterStrArray.filter(str => str !== filterType && str !== '');
        if(onFlg){
            newTmpStrArray.push(filterType);
        };
        const workParam: URLSearchParams = new URLSearchParams(params.toString());
        workParam.set('f',newTmpStrArray.length===0? '': newTmpStrArray.join(' '));
        setParams(workParam);
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

    //エラーツールチップ表示用
    const [tooltipOn, setTooltipOn] = useState<boolean>(false);
    //エラーチェック
    function errorCheck(): boolean {
        return true;
    }
    
    return (
        <>
        {/* 下部固定ボタン */}
        <div className="z-50  py-2 fixed lg:bottom-[6rem] bottom-[5.5rem] right-8 flex flex-row w-full justify-end">  
        <div className={`absolute ${isOpen?'hidden':' '}`}>
                <button 
                    className='rounded-full lg:p-5 p-4 bg-gradient-to-r from-indigo-200/90 to-emerald-100/90  items-center
                    text-teal-700 font-bold lg:text-xl text-lm shadow-lg shadow-emerald-600/70'
                    onClick={() => {
                        setValues(new SearchStoryParams(urlSearchParams));
                        setParams(new URLSearchParams(urlSearchParams.toString()));
                        setISopen(!isOpen)
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
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
        {/* 上部ボタン */}
        <div className="flex justify-center m-auto">  
        
                <a 
                    className='justify-center
                    flex p-0.5 bg-gradient-to-r from-indigo-300 to-emerald-300 items-center 
                    hover:drop-shadow-xl cursor-pointer select-none
                    transition-all duration-500 ease-out
                    '
                    onClick={() => {
                        setValues(new SearchStoryParams(urlSearchParams));
                        setParams(new URLSearchParams(urlSearchParams.toString()));
                        setISopen(!isOpen)
                    }}
                >  
                <div
                    className='flex flex-row
                        bg-gradient-to-r from-indigo-50 to-emerald-50 
                        border-2 border-white
                        text-teal-700
                        font-sans tablet:text-xl text-base
                        font-bold
                        p-1 items-center  justify-center w-[60vw]' 
                >
                    <div className=''>
                    <span>
                    {'検索条件変更'}
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="icon icon-tabler icon-tabler-search inline-block pl-1
                        w-[26px] h-[26px] lg:w-[32px] lg:h-[32px]"
                        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                    </svg>
                    <svg className="icon-tabler-search inline-block fill-indigo-500 shrink-0 ml-8" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="16" height="2" rx="1" className={`ttransform origin-center transition duration-200 ease-out ${isOpen && '!rotate-180'}`} />
                        <rect y="7" width="16" height="2" rx="1" className={`transform origin-center rotate-90 transition duration-200 ease-out ${isOpen && '!rotate-180'}`} />
                    </svg>   
                    </span>    
                    </div>
                </div>
                </a>

        </div>
    {/* 条件選択部 */}
    <div className={`flex h-max pt-4 flex-col justify-center  w-full`}>
            <section className={`
                  grid pb-4 overflow-hidden transition-all
                  duration-300 ease-in-out
                ${isOpen
                    ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}  
            `}>
            <div className=" shadow-lg rounded-md border overflow-hidden py-2">
                    <div className="  rounded-md text-center mb-8">
                    <div className=" lg:px-8 px-1 pb-2 rounded-md text-center">
                        <div className="flex justify-center text-lg lg:text-xl font-bold">
                            {'絞り込み'}
                        </div>
                        <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                                <SearchModalFilterCheckbox 
                                    filterId="org" isValid={values.info["org"]} labelStr="オリジナル曲のみ表示（別Ver曲を非表示）"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["org"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="sbsc" isValid={values.info["sbsc"]} labelStr="サブスク対応曲のみ表示"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["sbsc"]==="1"} />
                        </div>
                        <div className="flex justify-center text-lg lg:text-xl font-bold">
                            {'閲覧方法'}
                        </div>
                        <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                            <SearchModalRadioButton
                            radioName="radio-howtoview"
                            data={[
                                { filterId: "null", labelStr: "すべて" },
                                { filterId: "1", labelStr: "無料で読める" },
                                { filterId: "2", labelStr: "プレミアム会員読み放題対象" },
                            ]}
                            selectedId={values.howToView}
                            onChange={(id) => {
                                console.log(id)
                                console.log(values.howToView)
                                setValues({ ...values, howToView: id })
                            }}
                            changeSearchParams={(id) =>switchHowToView(id)}
                            />
                        </div>
                        <div className="flex justify-center text-lg lg:text-xl font-bold mt-4">
                            {'ユニット・アイドル'}
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center px-2'>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-JUP00'>
                            <SearchModalCheckbox 
                                unitPrefix="JUP" idolNum="00" isValid={values.info["JUP00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["JUP00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="JUP" idolNum="01" isValid={values.info["JUP01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["JUP01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="JUP" idolNum="02" isValid={values.info["JUP02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["JUP02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="JUP" idolNum="03" isValid={values.info["JUP03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["JUP03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-DRS00'>
                            <SearchModalCheckbox 
                                unitPrefix="DRS" idolNum="00" isValid={values.info["DRS00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["DRS00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DRS" idolNum="01" isValid={values.info["DRS01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["DRS01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DRS" idolNum="02" isValid={values.info["DRS02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["DRS02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DRS" idolNum="03" isValid={values.info["DRS03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["DRS03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-ALT00'>
                            <SearchModalCheckbox 
                                unitPrefix="ALT" idolNum="00" isValid={values.info["ALT00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["ALT00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="ALT" idolNum="01" isValid={values.info["ALT01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["ALT01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="ALT" idolNum="02" isValid={values.info["ALT02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["ALT02"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-BEI00'>
                            <SearchModalCheckbox 
                                unitPrefix="BEI" idolNum="00" isValid={values.info["BEI00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["BEI00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="BEI" idolNum="01" isValid={values.info["BEI01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["BEI01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="BEI" idolNum="02" isValid={values.info["BEI02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["BEI02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="BEI" idolNum="03" isValid={values.info["BEI03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["BEI03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-DBL00'>
                            <SearchModalCheckbox 
                                unitPrefix="DBL" idolNum="00" isValid={values.info["DBL00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["DBL00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DBL" idolNum="01" isValid={values.info["DBL01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["DBL01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="DBL" idolNum="02" isValid={values.info["DBL02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["DBL02"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-FRM00'>
                            <SearchModalCheckbox 
                                unitPrefix="FRM" idolNum="00" isValid={values.info["FRM00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["FRM00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FRM" idolNum="01" isValid={values.info["FRM01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["FRM01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FRM" idolNum="02" isValid={values.info["FRM02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["FRM02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FRM" idolNum="03" isValid={values.info["FRM03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["FRM03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SAI00'>
                            <SearchModalCheckbox 
                                unitPrefix="SAI" idolNum="00" isValid={values.info["SAI00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SAI00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SAI" idolNum="01" isValid={values.info["SAI01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SAI01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SAI" idolNum="02" isValid={values.info["SAI02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SAI02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SAI" idolNum="03" isValid={values.info["SAI03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SAI03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SSK00'>
                            <SearchModalCheckbox 
                                unitPrefix="SSK" idolNum="00" isValid={values.info["SSK00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SSK00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SSK" idolNum="01" isValid={values.info["SSK01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SSK01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SSK" idolNum="02" isValid={values.info["SSK02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SSK02"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-HIJ00'>
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="00" isValid={values.info["HIJ00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["HIJ00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="01" isValid={values.info["HIJ01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["HIJ01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="02" isValid={values.info["HIJ02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["HIJ02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="03" isValid={values.info["HIJ03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["HIJ03"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="04" isValid={values.info["HIJ04"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["HIJ04"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="HIJ" idolNum="05" isValid={values.info["HIJ05"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["HIJ05"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-CFP00'>
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="00" isValid={values.info["CFP00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["CFP00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="01" isValid={values.info["CFP01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["CFP01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="02" isValid={values.info["CFP02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["CFP02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="03" isValid={values.info["CFP03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["CFP03"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="04" isValid={values.info["CFP04"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["CFP04"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CFP" idolNum="05" isValid={values.info["CFP05"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["CFP05"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-MFM00'>
                            <SearchModalCheckbox 
                                unitPrefix="MFM" idolNum="00" isValid={values.info["MFM00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["MFM00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="MFM" idolNum="01" isValid={values.info["MFM01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["MFM01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="MFM" idolNum="02" isValid={values.info["MFM02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["MFM02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="MFM" idolNum="03" isValid={values.info["MFM03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["MFM03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SEM00'>
                            <SearchModalCheckbox 
                                unitPrefix="SEM" idolNum="00" isValid={values.info["SEM00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SEM00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SEM" idolNum="01" isValid={values.info["SEM01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SEM01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SEM" idolNum="02" isValid={values.info["SEM02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SEM02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="SEM" idolNum="03" isValid={values.info["SEM03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["SEM03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-KGD00'>
                            <SearchModalCheckbox 
                                unitPrefix="KGD" idolNum="00" isValid={values.info["KGD00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["KGD00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="KGD" idolNum="01" isValid={values.info["KGD01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["KGD01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="KGD" idolNum="02" isValid={values.info["KGD02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["KGD02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="KGD" idolNum="03" isValid={values.info["KGD03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["KGD03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-FLG00'>
                            <SearchModalCheckbox 
                                unitPrefix="FLG" idolNum="00" isValid={values.info["FLG00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["FLG00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FLG" idolNum="01" isValid={values.info["FLG01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["FLG01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FLG" idolNum="02" isValid={values.info["FLG02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["FLG02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="FLG" idolNum="03" isValid={values.info["FLG03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["FLG03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-LGN00'>
                            <SearchModalCheckbox 
                                unitPrefix="LGN" idolNum="00" isValid={values.info["LGN00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["LGN00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="LGN" idolNum="01" isValid={values.info["LGN01"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["LGN01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="LGN" idolNum="02" isValid={values.info["LGN02"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["LGN02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="LGN" idolNum="03" isValid={values.info["LGN03"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["LGN03"]==="1"} />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-CLF00'>
                            <SearchModalCheckbox 
                                unitPrefix="CLF" idolNum="00" isValid={values.info["CLF00"]}
                                changeSearchParams={changeSearchParamsIdolId}
                                onChange={() => values.info["CLF00"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CLF" idolNum="01" isValid={values.info["CLF01"]}
                                changeSearchParams={changeSearchParamsIdolId} 
                                onChange={() => values.info["CLF01"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CLF" idolNum="02" isValid={values.info["CLF02"]}
                                changeSearchParams={changeSearchParamsIdolId} 
                                onChange={() => values.info["CLF02"]==="1"} />
                            <SearchModalCheckbox 
                                unitPrefix="CLF" idolNum="03" isValid={values.info["CLF03"]}
                                changeSearchParams={changeSearchParamsIdolId} 
                                onChange={() => values.info["CLF03"]==="1"} />
                            </div>
                        </div>
                        <div className="flex justify-center text-lg lg:text-xl font-bold mt-4">
                            {'その他条件'}
                        </div>
                        <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                            <SearchModalFilterCheckbox 
                                filterId={MEDIA.proe.id.toString()} isValid={values.media[MEDIA.proe.id.toString()]} labelStr={MEDIA.proe.name}
                                changeSearchParams={(id,isValid) =>changeSearchParamsMedia(id,isValid)}
                                onChange={() => values.media[MEDIA.proe.id.toString()]==="1"} />
                            <SearchModalFilterCheckbox 
                                filterId={MEDIA.gs.id.toString()} isValid={values.media[MEDIA.gs.id.toString()]} labelStr={MEDIA.gs.name}
                                changeSearchParams={(id,isValid) =>changeSearchParamsMedia(id,isValid)}
                                onChange={() => values.media[MEDIA.gs.id.toString()]==="1"} />
                            <SearchModalFilterCheckbox 
                                filterId={MEDIA.moba.id.toString()} isValid={values.media[MEDIA.moba.id.toString()]} labelStr={MEDIA.moba.name}
                                changeSearchParams={(id,isValid) =>changeSearchParamsMedia(id,isValid)}
                                onChange={() => values.media[MEDIA.moba.id.toString()]==="1"} />
                        </div>
                        <div className="flex justify-center text-lg lg:text-xl font-bold mt-4">
                            {'その他条件'}
                        </div>
                        <div className=''>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                                <SearchModalFilterCheckbox 
                                    filterId="cover" isValid={values.info["cover"]} labelStr="カバー曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["cover"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="u" isValid={values.info["u"]} labelStr="ユニット曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["u"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="s" isValid={values.info["s"]} labelStr="ソロ曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["s"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="all" isValid={values.info["all"]} labelStr="全体曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["all"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="anniv" isValid={values.info["anniv"]} labelStr="アニバ曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["anniv"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="type" isValid={values.info["type"]} labelStr="属性曲"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["type"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="imas" isValid={values.info["imas"]} labelStr="アイマス"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["imas"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="prs" isValid={values.info["prs"]} labelStr="PRS"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["prs"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="psvote" isValid={values.info["psvote"]} labelStr="パッション投票"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["psvote"]==="1"} />
                                <SearchModalFilterCheckbox 
                                    filterId="colle" isValid={values.info["colle"]} labelStr="ユニコレ・ソロコレ"
                                    changeSearchParams={changeSearchParamsFilter} 
                                    onChange={() => values.info["colle"]==="1"} />
                            </div>
                        </div>
                    </div>
                    </div>
                    
                <div className={`flex mt-1 px-8 gap-2 justify-center text-sm`}>
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
                                onClick={() => {
                                    setISopen(false)
                                }}
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
                                        setISopen(false)
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
        </div>
        </section>
        </div>
        </>
    );
};