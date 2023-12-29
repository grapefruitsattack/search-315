'use client'
import { Button, Img } from "@chakra-ui/react";
import CommonPage from "../../common/components/CommonPage";
import {useSnowParam} from '../../common/hooks/useSnowParam';

export default function SettingPage({ }: { }) {

  //ローカルストレージ
  const [snowParam, setSnowParam] = useSnowParam({snowIsValid:'',noticeCheckedYear:''});

  const imgsrc:string = snowParam.snowIsValid==='1'?'/parts/toggle_on.png':'/parts/toggle_off.png';
  const snowImgSrc: string ='/snow/togglesnow'+String(Math.floor(Math.random() * 2)+1)+'.png';

    return (
        <CommonPage>
        <article className="pt-32 pb-48 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="pb-20">
        <h1 className="text-3xl font-bold">設定</h1>
        <p className="pb-8 pl-4 text-sm">※設定はブラウザごとに保持されます。</p>
        <p className="tablet:text-lg text-sm pb-2 pl-4 flex">
          <span>
          <button
              className="relative w-fit"
              onClick={()=>setSnowParam(
                  {snowIsValid:snowParam.snowIsValid==='0'?'1':'0',noticeCheckedYear:''}
                  )}
          >
              <Img className="tablet:h-[30px] h-[22px] " src={imgsrc}></Img>
              <Img className={snowParam.snowIsValid==='0'
                ?'hidden'
                :`tablet:h-[18px] h-[14px] absolute left-[1px] tablet:top-[-6px] top-[-5px]`} src={snowImgSrc}></Img>
          </button>
          </span>
          <span className="item-center pl-2">画面に雪が降る演出</span>
        </p>
        </section>
        </article>
        </CommonPage>
      );
  }