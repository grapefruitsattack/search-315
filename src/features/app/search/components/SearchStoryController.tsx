'use client'
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchStoryParams } from '../class/SearchStoryParams';
import SearchInfoCheckbox from "./SearchInfoCheckbox";
import SearchStoryFilterCheckbox from "./SearchStoryFilterCheckbox";
import SearchModalRadioButton from "./SearchModalRadioButton";
import SearchSong from '../../../common/utils/SearchSong';
import {CATEGORY,MEDIA,getCategoryByMedia,getMediaByCategory} from '../../../common/const/StoryInfoConst';
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
    function createUrlSearchParm(searchStoryParams:SearchStoryParams):URLSearchParams{
        const workParam: URLSearchParams = new URLSearchParams();
        const infoKeys = Object.keys(searchStoryParams.info).filter(str => searchStoryParams.info[str]);
        const categoryKeys = Object.keys(searchStoryParams.category).filter(str => searchStoryParams.category[str]);
        if(infoKeys.length>0) workParam.set('q',infoKeys.join(' '));
        if(categoryKeys.length>0) workParam.set('c',categoryKeys.join(' '));
        if(searchStoryParams.order!=='') workParam.set('order',searchStoryParams.order);
        if(searchStoryParams.andor!=='') workParam.set('andor',searchStoryParams.andor);
        if(searchStoryParams.voice!=='') workParam.set('v',searchStoryParams.voice);
        if(searchStoryParams.howToView!=='') workParam.set('htv',searchStoryParams.howToView);
        return workParam;
    }
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
    function changeSearchParamsMedia(mediaId:number, onFlg: boolean): void {

        let valuesMedia = values.media;
        let valuesCategory = values.category;
        valuesMedia = {...valuesMedia,[mediaId]:onFlg};
        getCategoryByMedia(mediaId).forEach((item)=>{
            valuesCategory = {...valuesCategory,[item.categoryId]:onFlg};
        });
        setValues({...values,media:valuesMedia,category:valuesCategory});

        console.log(values)
    };
    function changeSearchParamsCategory(categoryId:string, onFlg: boolean): void {
        let workValue: SearchStoryParams = values;
        workValue = {...workValue,category:{...workValue.category,[categoryId]:onFlg}};
        const targetMediaId: number = getMediaByCategory(categoryId);
        if(onFlg){
            // カテゴリーがONになるとき
            //  →対象メディアをON
            workValue = {...workValue,media:{...workValue.media,[targetMediaId]:true}};
        } else {
            // カテゴリーがOFFになるとき
            //  →対象メディアのカテゴリがすべてOFFの場合、対象メディアもOFF
            let mediaValid: boolean = false;
            for(const data of getCategoryByMedia(targetMediaId)){
              if(workValue.category[data.categoryId]){
                mediaValid = true;
                break;
              };
            };
            workValue = {...workValue,media:{...workValue.media,[targetMediaId]:mediaValid}};
        }

        setValues(workValue);
    };
    function changeSearchParamsFilter(filterType:string, onFlg: boolean): void {
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
                            onChange={(id) => setValues({ ...values, howToView: id })}
                            changeSearchParams={(id) =>switchHowToView(id)}
                            />
                        </div>
                        <div className="flex justify-center text-lg lg:text-xl font-bold mt-4">
                            {'ユニット・アイドル'}
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center px-2'>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-JUP00'>
                            <SearchInfoCheckbox 
                                unitPrefix="JUP" idolNum="00" isValid={values.info["JUP00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="JUP" idolNum="01" isValid={values.info["JUP01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="JUP" idolNum="02" isValid={values.info["JUP02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="JUP" idolNum="03" isValid={values.info["JUP03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-DRS00'>
                            <SearchInfoCheckbox 
                                unitPrefix="DRS" idolNum="00" isValid={values.info["DRS00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="DRS" idolNum="01" isValid={values.info["DRS01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="DRS" idolNum="02" isValid={values.info["DRS02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="DRS" idolNum="03" isValid={values.info["DRS03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-ALT00'>
                            <SearchInfoCheckbox 
                                unitPrefix="ALT" idolNum="00" isValid={values.info["ALT00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="ALT" idolNum="01" isValid={values.info["ALT01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="ALT" idolNum="02" isValid={values.info["ALT02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-BEI00'>
                            <SearchInfoCheckbox 
                                unitPrefix="BEI" idolNum="00" isValid={values.info["BEI00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="BEI" idolNum="01" isValid={values.info["BEI01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="BEI" idolNum="02" isValid={values.info["BEI02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="BEI" idolNum="03" isValid={values.info["BEI03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-DBL00'>
                            <SearchInfoCheckbox 
                                unitPrefix="DBL" idolNum="00" isValid={values.info["DBL00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="DBL" idolNum="01" isValid={values.info["DBL01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="DBL" idolNum="02" isValid={values.info["DBL02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-FRM00'>
                            <SearchInfoCheckbox 
                                unitPrefix="FRM" idolNum="00" isValid={values.info["FRM00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="FRM" idolNum="01" isValid={values.info["FRM01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="FRM" idolNum="02" isValid={values.info["FRM02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="FRM" idolNum="03" isValid={values.info["FRM03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SAI00'>
                            <SearchInfoCheckbox 
                                unitPrefix="SAI" idolNum="00" isValid={values.info["SAI00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="SAI" idolNum="01" isValid={values.info["SAI01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="SAI" idolNum="02" isValid={values.info["SAI02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="SAI" idolNum="03" isValid={values.info["SAI03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SSK00'>
                            <SearchInfoCheckbox 
                                unitPrefix="SSK" idolNum="00" isValid={values.info["SSK00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="SSK" idolNum="01" isValid={values.info["SSK01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="SSK" idolNum="02" isValid={values.info["SSK02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-HIJ00'>
                            <SearchInfoCheckbox 
                                unitPrefix="HIJ" idolNum="00" isValid={values.info["HIJ00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="HIJ" idolNum="01" isValid={values.info["HIJ01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="HIJ" idolNum="02" isValid={values.info["HIJ02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="HIJ" idolNum="03" isValid={values.info["HIJ03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="HIJ" idolNum="04" isValid={values.info["HIJ04"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="HIJ" idolNum="05" isValid={values.info["HIJ05"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-CFP00'>
                            <SearchInfoCheckbox 
                                unitPrefix="CFP" idolNum="00" isValid={values.info["CFP00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="CFP" idolNum="01" isValid={values.info["CFP01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="CFP" idolNum="02" isValid={values.info["CFP02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="CFP" idolNum="03" isValid={values.info["CFP03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="CFP" idolNum="04" isValid={values.info["CFP04"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="CFP" idolNum="05" isValid={values.info["CFP05"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-MFM00'>
                            <SearchInfoCheckbox 
                                unitPrefix="MFM" idolNum="00" isValid={values.info["MFM00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="MFM" idolNum="01" isValid={values.info["MFM01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="MFM" idolNum="02" isValid={values.info["MFM02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="MFM" idolNum="03" isValid={values.info["MFM03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SEM00'>
                            <SearchInfoCheckbox 
                                unitPrefix="SEM" idolNum="00" isValid={values.info["SEM00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="SEM" idolNum="01" isValid={values.info["SEM01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="SEM" idolNum="02" isValid={values.info["SEM02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="SEM" idolNum="03" isValid={values.info["SEM03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-KGD00'>
                            <SearchInfoCheckbox 
                                unitPrefix="KGD" idolNum="00" isValid={values.info["KGD00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="KGD" idolNum="01" isValid={values.info["KGD01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="KGD" idolNum="02" isValid={values.info["KGD02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="KGD" idolNum="03" isValid={values.info["KGD03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-FLG00'>
                            <SearchInfoCheckbox 
                                unitPrefix="FLG" idolNum="00" isValid={values.info["FLG00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="FLG" idolNum="01" isValid={values.info["FLG01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="FLG" idolNum="02" isValid={values.info["FLG02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="FLG" idolNum="03" isValid={values.info["FLG03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-LGN00'>
                            <SearchInfoCheckbox 
                                unitPrefix="LGN" idolNum="00" isValid={values.info["LGN00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="LGN" idolNum="01" isValid={values.info["LGN01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="LGN" idolNum="02" isValid={values.info["LGN02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="LGN" idolNum="03" isValid={values.info["LGN03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-CLF00'>
                            <SearchInfoCheckbox 
                                unitPrefix="CLF" idolNum="00" isValid={values.info["CLF00"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="CLF" idolNum="01" isValid={values.info["CLF01"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="CLF" idolNum="02" isValid={values.info["CLF02"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            <SearchInfoCheckbox 
                                unitPrefix="CLF" idolNum="03" isValid={values.info["CLF03"]}
                                onChange={(id,isValid) => {setValues({...values,info:{...values.info,[id]:isValid}})}}
                            />
                            </div>
                        </div>
                        <div className="flex justify-center text-lg lg:text-xl font-bold mt-4">
                            {'その他条件'}
                        </div>
                        <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                            <SearchStoryFilterCheckbox 
                                filterId={MEDIA.proe.id.toString()}
                                isValid={values.media[MEDIA.proe.id]}
                                labelStr={MEDIA.proe.name}
                                onChange={(id,isValid) => changeSearchParamsMedia(MEDIA.proe.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.connectWithMusic.id}
                                isValid={values.category[CATEGORY.connectWithMusic.id]}
                                labelStr={CATEGORY.connectWithMusic.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.connectWithMusic.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.connectWithStage.id}
                                isValid={values.category[CATEGORY.connectWithStage.id]}
                                labelStr={CATEGORY.connectWithStage.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.connectWithStage.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.connectWithOthers.id}
                                isValid={values.category[CATEGORY.connectWithOthers.id]}
                                labelStr={CATEGORY.connectWithOthers.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.connectWithOthers.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.idolOneFrame.id}
                                isValid={values.category[CATEGORY.idolOneFrame.id]}
                                labelStr={CATEGORY.idolOneFrame.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.idolOneFrame.id,isValid)} />
                        </div>
                        <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                            <SearchStoryFilterCheckbox 
                                filterId={MEDIA.gs.id.toString()}
                                isValid={values.media[MEDIA.gs.id]}
                                labelStr={MEDIA.gs.name}
                                onChange={(id,isValid) => changeSearchParamsMedia(MEDIA.gs.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.main.id}
                                isValid={values.category[CATEGORY.main.id]}
                                labelStr={CATEGORY.main.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.main.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.gsEvent.id}
                                isValid={values.category[CATEGORY.gsEvent.id]}
                                labelStr={CATEGORY.gsEvent.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.gsEvent.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.episodeZero.id}
                                isValid={values.category[CATEGORY.episodeZero.id]}
                                labelStr={CATEGORY.episodeZero.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.episodeZero.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.idolEpisode.id}
                                isValid={values.category[CATEGORY.idolEpisode.id]}
                                labelStr={CATEGORY.idolEpisode.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.idolEpisode.id,isValid)} />
                        </div>
                        <div className='flex flex-wrap p-1 gap-3 justify-center items-center'>
                            <SearchStoryFilterCheckbox 
                                filterId={MEDIA.moba.id.toString()}
                                isValid={values.media[MEDIA.moba.id]}
                                labelStr={MEDIA.moba.name}
                                onChange={(id,isValid) => changeSearchParamsMedia(MEDIA.moba.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.SideMemories.id}
                                isValid={values.category[CATEGORY.SideMemories.id]}
                                labelStr={CATEGORY.SideMemories.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.SideMemories.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.comicNomral.id}
                                isValid={values.category[CATEGORY.comicNomral.id]}
                                labelStr={CATEGORY.comicNomral.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.comicNomral.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.comicSpecial.id}
                                isValid={values.category[CATEGORY.comicSpecial.id]}
                                labelStr={CATEGORY.comicSpecial.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.comicSpecial.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.mobaEvent.id}
                                isValid={values.category[CATEGORY.mobaEvent.id]}
                                labelStr={CATEGORY.mobaEvent.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.mobaEvent.id,isValid)} />
                            <SearchStoryFilterCheckbox 
                                filterId={CATEGORY.dailyOneFrame.id}
                                isValid={values.category[CATEGORY.dailyOneFrame.id]}
                                labelStr={CATEGORY.dailyOneFrame.name}
                                onChange={(id,isValid) => changeSearchParamsCategory(CATEGORY.dailyOneFrame.id,isValid)} />
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
                                        const workParam: URLSearchParams = createUrlSearchParm(values);
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