'use client'
import { useEffect, useState } from "react";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure, 
  Tooltip,
  Checkbox
 } from "@chakra-ui/react";
 import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { SearchStoryParams,getCategoryStr } from '@/features/app/search/class/SearchStoryParams';
import SearchInfoCheckbox from "./SearchInfoCheckbox";
import SearchStoryFilterCheckbox from "./SearchStoryFilterCheckbox";
import SearchModalRadioButton from "./SearchModalRadioButton";
import { UseSearchLoading } from "@/features/app/search/provider/SearchLoadingProvider";
import {CATEGORY,MEDIA,getCategoryByMedia,getMediaByCategory} from '@/features/common/const/StoryInfoConst';
import singingMaster from '@/data/singingMaster.json';
import songInfoAsc from '@/data/songInfoAsc.json';
import type { UserChartData, DisplayUserChartData, SingingMaster } from '@/data/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown } from "lucide-react"


export default function SearchStoryController({ isMobile,firstIsOpen }: { isMobile:boolean,firstIsOpen: boolean;}) {
  
  const { setLoading }= UseSearchLoading();
  const router = useRouter();
  const currentPath: string = usePathname();
  const urlSearchParams = useSearchParams();
  const [isOpen, setISopen] = useState(firstIsOpen);
  useEffect(() => {
    setISopen(firstIsOpen);
  }, [firstIsOpen]);
  
  const idols: SingingMaster[] = singingMaster.filter(data=>data.personFlg===1);
  const units: SingingMaster[] = singingMaster.filter(data=>data.personFlg===0);

  //useState設定
  const [params, setParams] = useState(new URLSearchParams(urlSearchParams.toString()));
  const [values, setValues] = useState(new SearchStoryParams(urlSearchParams));
  const [selectedUnit, setSelectedUnit] = useState(units.some((data)=>data.singingInfoId===values.selectorInfo)?values.selectorInfo:'');
  const [selectedIdol, setSelectedIdol] = useState(idols.some((data)=>data.singingInfoId===values.selectorInfo)?values.selectorInfo:'');

  //検索実行
  function search(value: SearchStoryParams){
    const workParam: URLSearchParams = createUrlSearchParm(value);
    workParam.delete('page');
    workParam.set('page','1');
    setLoading(true);
    router.push(currentPath + '?'  + decodeURIComponent(workParam.toString()));
  };
  //パラメータクリア関数
  function clearParam(): void {
    const newValue: SearchStoryParams = {andor:values['andor'],order:'desc',voice:0,howToView:0,pp:0,media:{},category:{},info:{},selectorInfo:'',categoryStr:''}
    setValues(newValue);
    if(!isMobile) search(newValue);
  };
  function createUrlSearchParm(searchStoryParams:SearchStoryParams):URLSearchParams{
    const workParam: URLSearchParams = new URLSearchParams();
    const infoKeys = Object.keys(searchStoryParams.info).filter(str => searchStoryParams.info[str]);
    const categoryKeys = Object.keys(searchStoryParams.category).filter(str => searchStoryParams.category[str]);
    if(infoKeys.length>0) workParam.set('q',infoKeys.join(' '));
    if(categoryKeys.length>0) workParam.set('c',categoryKeys.join(' '));
    if(searchStoryParams.order!=='') workParam.set('order',searchStoryParams.order);
    if(searchStoryParams.andor!=='') workParam.set('andor',searchStoryParams.andor);
    if(searchStoryParams.voice!==0) workParam.set('v',searchStoryParams.voice.toString());
    if(searchStoryParams.howToView!==0) workParam.set('htv',searchStoryParams.howToView.toString());
    if(searchStoryParams.pp!==0) workParam.set('pp',searchStoryParams.pp.toString());
    return workParam;
  }
  function switchHowToView(howToView: number): void{
    setValues({...values, howToView:howToView});
  };
  function switchPP(pp: number): void{
    setValues({...values, pp:pp});
  };
  function switchVoice(voice: number): void{
    setValues({...values, voice:voice});
  };
  function switchAndOr(andor: string): void{
    const newValue: SearchStoryParams = { ...values, andor:andor };
    setValues(newValue);
    if(!isMobile) search(newValue);
  };
  function changeSearchParamsInfo(infoId:string, onFlg: boolean): void {
    const newValue: SearchStoryParams = {...values,info:{...values.info,[infoId]:onFlg},selectorInfo:undefined};
    setSelectedUnit('');
    setSelectedIdol('');
    setValues(newValue);
    if(!isMobile) search(newValue);
  };
  function changeSearchParamsMedia(mediaId:number, onFlg: boolean): void {
    let valuesMedia = values.media;
    let valuesCategory = values.category;
    valuesMedia = {...valuesMedia,[mediaId]:onFlg};
    getCategoryByMedia(mediaId).forEach((item)=>{
        valuesCategory = {...valuesCategory,[item.categoryId]:onFlg};
    });
    const newValue: SearchStoryParams = {...values,media:valuesMedia,category:valuesCategory,categoryStr:getCategoryStr(valuesMedia,valuesCategory)};
    setValues(newValue);
    if(!isMobile) search(newValue);
  };
  function changeSearchParamsCategory(categoryId:string, onFlg: boolean): void {
    let valuesMedia = values.media;
    let valuesCategory = values.category;
    valuesCategory = {...values.category,[categoryId]:onFlg}
    const targetMediaId: number = getMediaByCategory(categoryId);
    if(onFlg){
      // カテゴリーがONになるとき
      //  →対象メディアをON
      valuesMedia = {...values.media,[targetMediaId]:true}
    } else {
      // カテゴリーがOFFになるとき
      //  →対象メディアのカテゴリがすべてOFFの場合、対象メディアもOFF
      let mediaValid: boolean = false;
      for(const data of getCategoryByMedia(targetMediaId)){
        if(valuesCategory[data.categoryId]){
          mediaValid = true;
          break;
        };
      };
      valuesMedia = {...values.media,[targetMediaId]:mediaValid};
    }
    const newValue: SearchStoryParams = {...values,media:valuesMedia,category:valuesCategory,categoryStr:getCategoryStr(valuesMedia,valuesCategory)};
    setValues(newValue);
    if(!isMobile) search(newValue);
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

  function controllerMain(){
    return(
    <>
      {/* 上部ボタン */}
      <div className="flex flex-col pc:flex-col pb-2 gap-4">
        <div id='infoSelector' className={`flex flex-col`}>
          <div className="flex gap-3 pb-1">
            <div className="text-sm">ユニット・アイドル</div>
            <button
              className="text-sm bg-green-500 px-1 pt-[1px] rounded-sm"
              onClick={()=>{
                const scrollAreaElement = document.getElementById('controllerScrollArea');
                const scrollTargetelement = document.getElementById('infoCheckBox');
                if(scrollAreaElement!==null&&scrollTargetelement!==null){
                  const targetDOMRect = scrollTargetelement.getBoundingClientRect();
                  const targetTop = targetDOMRect.top - 115;
                  scrollAreaElement.scrollTo({top:targetTop,behavior:"smooth"})
                };
              }}
            >
              <div className="flex gap-[2px] text-sm text-white">
                {'カスタム検索'}
                <ArrowDown size={18} color="#ffffff" className="" />
              </div>
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-y-1 gap-x-2">
            <Select 
              name="select-unit" value={selectedUnit}
              onValueChange={(value)=>{
                setSelectedUnit(value);
                setSelectedIdol('');
                const newValue: SearchStoryParams = {...values,info:{[value==='sidem'?'':value]:true},selectorInfo:value==='sidem'?'':value};
                setValues(newValue);
                if(!isMobile) search(newValue);
              }}
              >
              <SelectTrigger className="w-[145px] mobileM:w-[150px] mobileL:w-[170px] h-[35px]">
                <SelectValue placeholder={'ユニット'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={0} value={'sidem'}>{'全ユニット'}</SelectItem>
                {units.map((data, index) => (
                  <SelectItem key={index+1} value={data.singingInfoId}>{data.singingInfoName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select name="select-idol"  value={selectedIdol}
              onValueChange={(value)=>{
                setSelectedIdol(value);
                setSelectedUnit('');
                const newValue: SearchStoryParams = {...values,info:{[value==='sidem'?'':value]:true},selectorInfo:value==='sidem'?'':value};
                setValues(newValue);
                if(!isMobile) search(newValue);
              }}
              >
              <SelectTrigger className="w-[145px] mobileM:w-[150px] mobileL:w-[170px] h-[35px]">
                <SelectValue placeholder={'アイドル'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={0} value={'sidem'}>{'全アイドル'}</SelectItem>
                {idols.map((data, index) => (
                  <SelectItem key={index+1} value={data.singingInfoId}>{data.singingInfoName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className={`${values.selectorInfo===undefined?'flex gap-3 py-1 text-sm text-red-700':'hidden'}`}>
            {'※カスタム検索適用中'}
          </div>
          

        </div>
        <div className="flex flex-col ">
          <div className="text-sm">閲覧方法</div>
          <div className='flex flex-wrap w-full p-1 gap-3 items-center'>
            <SearchModalRadioButton
              radioName="radio-howtoview"
              data={[
                { filterId: "0", labelStr: "すべて" },
                { filterId: "1", labelStr: "無料" },
                { filterId: "2", labelStr: "プレ会員読み放題" },
                { filterId: "3", labelStr: "有償購入" },
              ]}
              selectedId={values.howToView.toString()}
              onChange={(id) => {
                const newValue: SearchStoryParams = { ...values, howToView: Number(id)||0 };
                setValues(newValue);
                if(!isMobile) search(newValue);
              }}
              changeSearchParams={(id) =>switchHowToView(Number(id)||0)}
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm">プロデュースポイント（PP）</div>
          <div className='flex flex-wrap w-full p-1 gap-3 items-center'>
              <SearchModalRadioButton
              radioName="radio-pp"
              data={[
                  { filterId: "0", labelStr: "すべて" },
                  { filterId: "1", labelStr: "PP獲得対象" },
              ]}
              selectedId={values.pp.toString()}
              onChange={(id) => {
                const newValue: SearchStoryParams = { ...values, pp: Number(id)||0 };
                setValues(newValue);
                if(!isMobile) search(newValue);
              }}
              changeSearchParams={(id) =>switchPP(Number(id)||0)}
              />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm">ボイス</div>
          <div className='flex flex-wrap w-full p-1 gap-3 items-center'>
              <SearchModalRadioButton
              radioName="radio-voice"
              data={[
                  { filterId: "0", labelStr: "すべて" },
                  { filterId: "1", labelStr: "ボイスあり" },
                  { filterId: "2", labelStr: "過去ボイス実装あり" },
              ]}
              selectedId={values.voice.toString()}
              onChange={(id) => {
                const newValue: SearchStoryParams = { ...values, voice: Number(id)||0 };
                setValues(newValue);
                if(!isMobile) search(newValue);
              }}
              changeSearchParams={(id) =>switchVoice(Number(id)||0)}
              />
          </div>
        </div>
        
        <div id='CategoryCheckBox' className={`flex flex-col gap-1`}>
          <div className="text-sm">ストーリー種別</div>
          <div className='
              flex flex-wrap justify-center items-center 
              gap-x-3 gap-y-1 w-fit
              '>
              {/* アイマスポータル */}
              <SearchStoryFilterCheckbox 
                  filterId={MEDIA.proe.id.toString()}
                  isValid={values.media[MEDIA.proe.id]}
                  labelStr={MEDIA.proe.name}
                  isMain={true}
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
          <Separator />
          <div className='
              flex flex-wrap justify-center items-center 
              gap-x-3 gap-y-1 w-fit
              '>
              {/* サイスタ */}
              <SearchStoryFilterCheckbox 
                  filterId={MEDIA.gs.id.toString()}
                  isValid={values.media[MEDIA.gs.id]}
                  labelStr={MEDIA.gs.name}
                  isMain={true}
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
          <Separator />
          <div className='
              flex flex-wrap justify-center items-center 
              gap-x-3 gap-y-1 w-fit
              '>
              {/* モバエム */}
              <SearchStoryFilterCheckbox 
                  filterId={MEDIA.moba.id.toString()}
                  isValid={values.media[MEDIA.moba.id]}
                  labelStr={MEDIA.moba.name}
                  isMain={true}
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

        <div id='infoCheckBox' className={`grid grid-cols-1 gap-2 justify-center pt-2`}>
          <div className="flex gap-3">
            <div className="text-sm">ユニット・アイドル（カスタム）</div>
          </div>
          <SearchModalRadioButton
            radioName="radio-andor"
            data={[
              { filterId: "or", labelStr: "誰かが該当" },
              { filterId: "and", labelStr: "全員が該当" },
            ]}
            selectedId={values.andor}
            onChange={(id) => {switchAndOr(id||'or')}}
            changeSearchParams={(id) =>switchAndOr(id||'or')}
          />
            <div className='flex flex-wrap p-1 gap-2 justify-center items-center border-t-2 border-l-4 border-JUP00'>
            <SearchInfoCheckbox 
                unitPrefix="JUP" idolNum="00" isValid={values.info["JUP00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="JUP" idolNum="01" isValid={values.info["JUP01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="JUP" idolNum="02" isValid={values.info["JUP02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="JUP" idolNum="03" isValid={values.info["JUP03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-DRS00'>
            <SearchInfoCheckbox 
                unitPrefix="DRS" idolNum="00" isValid={values.info["DRS00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="DRS" idolNum="01" isValid={values.info["DRS01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="DRS" idolNum="02" isValid={values.info["DRS02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="DRS" idolNum="03" isValid={values.info["DRS03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-ALT00'>
            <SearchInfoCheckbox 
                unitPrefix="ALT" idolNum="00" isValid={values.info["ALT00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="ALT" idolNum="01" isValid={values.info["ALT01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="ALT" idolNum="02" isValid={values.info["ALT02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-BEI00'>
            <SearchInfoCheckbox 
                unitPrefix="BEI" idolNum="00" isValid={values.info["BEI00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="BEI" idolNum="01" isValid={values.info["BEI01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="BEI" idolNum="02" isValid={values.info["BEI02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="BEI" idolNum="03" isValid={values.info["BEI03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-DBL00'>
            <SearchInfoCheckbox 
                unitPrefix="DBL" idolNum="00" isValid={values.info["DBL00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="DBL" idolNum="01" isValid={values.info["DBL01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="DBL" idolNum="02" isValid={values.info["DBL02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-FRM00'>
            <SearchInfoCheckbox 
                unitPrefix="FRM" idolNum="00" isValid={values.info["FRM00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="FRM" idolNum="01" isValid={values.info["FRM01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="FRM" idolNum="02" isValid={values.info["FRM02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="FRM" idolNum="03" isValid={values.info["FRM03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SAI00'>
            <SearchInfoCheckbox 
                unitPrefix="SAI" idolNum="00" isValid={values.info["SAI00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="SAI" idolNum="01" isValid={values.info["SAI01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="SAI" idolNum="02" isValid={values.info["SAI02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="SAI" idolNum="03" isValid={values.info["SAI03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SSK00'>
            <SearchInfoCheckbox 
                unitPrefix="SSK" idolNum="00" isValid={values.info["SSK00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="SSK" idolNum="01" isValid={values.info["SSK01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="SSK" idolNum="02" isValid={values.info["SSK02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-HIJ00'>
            <SearchInfoCheckbox 
                unitPrefix="HIJ" idolNum="00" isValid={values.info["HIJ00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="HIJ" idolNum="01" isValid={values.info["HIJ01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="HIJ" idolNum="02" isValid={values.info["HIJ02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="HIJ" idolNum="03" isValid={values.info["HIJ03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="HIJ" idolNum="04" isValid={values.info["HIJ04"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="HIJ" idolNum="05" isValid={values.info["HIJ05"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-CFP00'>
            <SearchInfoCheckbox 
                unitPrefix="CFP" idolNum="00" isValid={values.info["CFP00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="CFP" idolNum="01" isValid={values.info["CFP01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="CFP" idolNum="02" isValid={values.info["CFP02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="CFP" idolNum="03" isValid={values.info["CFP03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="CFP" idolNum="04" isValid={values.info["CFP04"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="CFP" idolNum="05" isValid={values.info["CFP05"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-MFM00'>
            <SearchInfoCheckbox 
                unitPrefix="MFM" idolNum="00" isValid={values.info["MFM00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="MFM" idolNum="01" isValid={values.info["MFM01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="MFM" idolNum="02" isValid={values.info["MFM02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="MFM" idolNum="03" isValid={values.info["MFM03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-SEM00'>
            <SearchInfoCheckbox 
                unitPrefix="SEM" idolNum="00" isValid={values.info["SEM00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="SEM" idolNum="01" isValid={values.info["SEM01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="SEM" idolNum="02" isValid={values.info["SEM02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="SEM" idolNum="03" isValid={values.info["SEM03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-KGD00'>
            <SearchInfoCheckbox 
                unitPrefix="KGD" idolNum="00" isValid={values.info["KGD00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="KGD" idolNum="01" isValid={values.info["KGD01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="KGD" idolNum="02" isValid={values.info["KGD02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="KGD" idolNum="03" isValid={values.info["KGD03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-FLG00'>
            <SearchInfoCheckbox 
                unitPrefix="FLG" idolNum="00" isValid={values.info["FLG00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="FLG" idolNum="01" isValid={values.info["FLG01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="FLG" idolNum="02" isValid={values.info["FLG02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="FLG" idolNum="03" isValid={values.info["FLG03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-LGN00'>
            <SearchInfoCheckbox 
                unitPrefix="LGN" idolNum="00" isValid={values.info["LGN00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="LGN" idolNum="01" isValid={values.info["LGN01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="LGN" idolNum="02" isValid={values.info["LGN02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="LGN" idolNum="03" isValid={values.info["LGN03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
            <div className='flex flex-wrap p-1 gap-3 justify-center items-center border-t-2 border-l-4 border-CLF00'>
            <SearchInfoCheckbox 
                unitPrefix="CLF" idolNum="00" isValid={values.info["CLF00"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="CLF" idolNum="01" isValid={values.info["CLF01"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="CLF" idolNum="02" isValid={values.info["CLF02"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            <SearchInfoCheckbox 
                unitPrefix="CLF" idolNum="03" isValid={values.info["CLF03"]}
                onChange={(id,isValid) => {changeSearchParamsInfo(id,isValid)}}
            />
            </div>
        </div>

      </div>

    </>
    )
  }
    
  return isMobile
  ?(
    <>
      <div className='flex flex-row h-fit p-2 gap-4 rounded-t-xl border-2 border-zinc-400 bg-zinc-500 text-base text-white'>
        検索フィルター
      </div>
      <div id='' className='p-2 rounded-b-xl border-b-2 border-x-2 border-zinc-400'>
      <div className="flex flex-col pc:flex-col pb-2 gap-4">
        <div id='infoSelector' className={`flex flex-col`}>
          <div className="flex gap-3 pb-1">
            <div className="text-sm">ユニット・アイドル</div>
          </div>
          <div className="flex flex-row flex-wrap gap-y-1 gap-x-2">
            <Select 
              name="mobile-select-unit" value={selectedUnit}
              onValueChange={(value)=>{
                setSelectedUnit(value);
                setSelectedIdol('');
                const newValue: SearchStoryParams = {...values,info:{[value==='sidem'?'':value]:true},selectorInfo:value==='sidem'?'':value};
                setValues(newValue);
                search(newValue);
              }}
              >
              <SelectTrigger className="w-[145px] mobileM:w-[150px] mobileL:w-[170px] h-[35px]">
                <SelectValue placeholder={'ユニット'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={0} value={'sidem'}>{'全ユニット'}</SelectItem>
                {units.map((data, index) => (
                  <SelectItem key={index+1} value={data.singingInfoId}>{data.singingInfoName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select name="mobile-select-idol"  value={selectedIdol}
              onValueChange={(value)=>{
                setSelectedIdol(value);
                setSelectedUnit('');
                const newValue: SearchStoryParams = {...values,info:{[value==='sidem'?'':value]:true},selectorInfo:value==='sidem'?'':value};
                setValues(newValue);
                search(newValue);
              }}
              >
              <SelectTrigger className="w-[145px] mobileM:w-[150px] mobileL:w-[170px] h-[35px]">
                <SelectValue placeholder={'アイドル'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={0} value={'sidem'}>{'全アイドル'}</SelectItem>
                {idols.map((data, index) => (
                  <SelectItem key={index+1} value={data.singingInfoId}>{data.singingInfoName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className={`${values.selectorInfo===undefined?'flex gap-3 py-1 text-sm text-red-700':'hidden'}`}>
            {'※カスタム検索適用中'}
          </div>
          

        </div>
        <div className="flex flex-col ">
          <div className="text-sm">閲覧方法</div>
          <div className='flex flex-wrap w-full p-1 gap-3 items-center'>
            <SearchModalRadioButton
              radioName="mobile-radio-howtoview"
              data={[
                { filterId: "0", labelStr: "すべて" },
                { filterId: "1", labelStr: "無料" },
                { filterId: "2", labelStr: "プレ会員読み放題" },
                { filterId: "3", labelStr: "有償購入" },
              ]}
              selectedId={values.howToView.toString()}
              onChange={(id) => {
                const newValue: SearchStoryParams = { ...values, howToView: Number(id)||0 };
                setValues(newValue);
                search(newValue);
              }}
              changeSearchParams={(id) =>switchHowToView(Number(id)||0)}
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm">プロデュースポイント（PP）</div>
          <div className='flex flex-wrap w-full p-1 gap-3 items-center'>
              <SearchModalRadioButton
              radioName="mobile-radio-pp"
              data={[
                  { filterId: "0", labelStr: "すべて" },
                  { filterId: "1", labelStr: "PP獲得対象" },
              ]}
              selectedId={values.pp.toString()}
              onChange={(id) => {
                const newValue: SearchStoryParams = { ...values, pp: Number(id)||0 };
                setValues(newValue);
                search(newValue);
              }}
              changeSearchParams={(id) =>switchPP(Number(id)||0)}
              />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm">ボイス</div>
          <div className='flex flex-wrap w-full p-1 gap-3 items-center'>
              <SearchModalRadioButton
              radioName="mobile-radio-voice"
              data={[
                  { filterId: "0", labelStr: "すべて" },
                  { filterId: "1", labelStr: "ボイスあり" },
                  { filterId: "2", labelStr: "過去ボイス実装あり" },
              ]}
              selectedId={values.voice.toString()}
              onChange={(id) => {
                const newValue: SearchStoryParams = { ...values, voice: Number(id)||0 };
                setValues(newValue);
                search(newValue);
              }}
              changeSearchParams={(id) =>switchVoice(Number(id)||0)}
              />
          </div>
        </div>
      </div>
      </div>
    </>
  )
  :(
    <>
      <div className='flex flex-row h-fit p-2 gap-4 rounded-t-xl border-2 border-zinc-400 bg-zinc-500 text-xl text-white'>
        検索フィルター
        <button 
          className="rounded-md px-1 ml-auto mr-2 bg-blue-300 text-sm font-bold text-zinc-900"
          onClick={()=>{
            clearParam();
          }}
          >
          条件クリア
        </button>
      </div>
      <div id='controllerScrollArea' className=' max-h-[70vh] overflow-y-scroll overflow-x-hidden p-2 rounded-b-xl border-b-2 border-x-2 border-zinc-400'>
        {controllerMain()}
      </div>
    </>
  );
};