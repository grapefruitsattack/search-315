'use client'
import CommonPage from "../../../common/components/CommonPage";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

export default function UnitSongSelectorPage({ }: { }) {
  const searchParams = useSearchParams();
  const querytext :string = searchParams.get('text') || 'none';

  //フォント追加
  const exampleFontFamilyName = "Reggae One"; // 取得したいGoogleフォント名
  const urlFamilyName = exampleFontFamilyName.replace(/ /g, "+"); // URLでは空白を+に置き換える
  const googleApiUrl = `https://fonts.googleapis.com/css2?family=Reggae+One&display=swap`; // Google Fonts APIのURL
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    (async() => {
      const response = await fetch(googleApiUrl);
      if (response.ok) {
        // url()の中身のURLだけ抽出
        const cssFontFace = await response.text();
        const matchUrls = cssFontFace.match(/url\(.+?\)/g);
        if (!matchUrls) throw new Error("フォントが見つかりませんでした");
        
        for (const url of matchUrls) {
          // 後は普通にFontFaceを追加
        const font = new FontFace(exampleFontFamilyName, url);
          await font.load();
          document.fonts.add(font);
          document.body.style.fontFamily = "50px 'Reggae One'";
        }
      }
      
    if (!canvasRef.current) {
      throw new Error("objectがnull");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("context取得失敗");
    }
    // 黒い長方形を描画する
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(0, 0, ctx.canvas.width / 4, ctx.canvas.height / 4);
    ctx.fillStyle = "#ff1fff";
    ctx.fillRect(40, 60, ctx.canvas.width / 4, ctx.canvas.height / 4);
    ctx.fillStyle = "gray";
    ctx.font = "50px 'ＭＳ 明朝', serif";
    ctx.fillText('テスト', 120, 60);
    ctx.font = "50px 'Reggae One'";
    ctx.fillText('テスト', 120, 160);
    })(
      
    )
  }, []);
  

    return (
      <>
      <Head>
        <link rel="stylesheet" href="fonts/fonts.css" />
      </Head>
        <CommonPage>
        <article className="pt-32 pb-48 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="pb-20">

        <div>
            <canvas className="w-full"  ref={canvasRef} width={2000} height={450} />
        </div>
        </section>
        </article>
        </CommonPage>
        </>
      );
  }