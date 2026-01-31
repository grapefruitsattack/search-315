"use client";
import CommonPage from "../../common/components/CommonPage";

export default function AboutPage({ }: { }) {


    return (
        <>
        <title>{ `サイトについて${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        <article className=" pb-48 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="pb-20">
        <h1 className="text-3xl pb-8 font-bold">このサイトについて</h1>
        <h2 className="text-2xl pb-2 font-bold">概要</h2>
        <p className=" pb-4">
            当サイトは「アイドルマスターSideM」の楽曲情報を中心に情報をまとめているサイトです。<br/>
            運営は個人によってなされており、「アイドルマスターSideM」公式とは一切関係ございません。<br/>
            ご利用にあたっては、このページの「このサイトについて」「プライバシーポリシー」「免責事項」項目の記載をよくご確認ください。
        </p>
        <h2 className="text-2xl pb-2 font-bold">著作権</h2>
        <p className=" pb-4">
            当サイトで使用している画像データの無断転載を禁止します。<br/>
        </p>
        <p className=" pb-8">
            当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。
        </p>
        <h2 className="text-2xl pb-4 font-bold">クレジット</h2>
        <p className="text-xl pb-2">
            シェア時利用サービス
        </p>
        <p className=" pb-2">
            <a className="underline" href={`https://donshare.net/`} target="_blank" rel="noopener noreferrer">
                donshare
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        <p className=" pb-4">
            <a className="underline" href={`https://misskeyshare.link/`} target="_blank" rel="noopener noreferrer">
                Misskey Share
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        <p className="text-xl pb-2">
            シェアボタン使用ロゴ
        </p>
        <p className=" pb-2">
            Twitter： 
            <a className="underline" href={`https://about.twitter.com/ja/who-we-are/brand-toolkit`} target="_blank" rel="noopener noreferrer">
                公式ブランドツールキット 
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        <p className=" pb-2">
            Mastodon： 
            <a className="underline" href={`https://about.twitter.com/ja/who-we-are/brand-toolkit`} target="_blank" rel="noopener noreferrer">
                公式 Brand Toolkit 
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        <p className=" pb-4">
            Misskey： 
            <a className="underline" href={`https://misskey-hub.net/appendix/assets.html`} target="_blank" rel="noopener noreferrer">
                公式アセットロゴ 
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
            （
            <a className="underline" href={`https://creativecommons.org/licenses/by-nc-sa/4.0/`} target="_blank" rel="noopener noreferrer">
                CC BY-NC-SA 
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
            ）
        </p>
        <p className="text-xl pb-2">
            その他のアイコン
        </p>
        <p className=" pb-4">
            <a className="underline" href={`https://remixicon.com/`} target="_blank" rel="noopener noreferrer">
            Remix Icon 
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
            （
            <a className="underline" href={`https://github.com/Remix-Design/remixicon/blob/master/License`} target="_blank" rel="noopener noreferrer">
            Apache License 2.0
            <span className="">
            <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
            </span>
            </a>
            ）
        </p>
        <p className=" pb-4">
            <a className="underline" href={`https://www.mingcute.com/`} target="_blank" rel="noopener noreferrer">
            MingCute Icon
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
            （
            <a className="underline" href={`https://github.com/Richard9394/MingCute/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
            Apache License 2.0
            <span className="">
            <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
            </span>
            </a>
            ）
        </p>
        <p className=" pb-4">
            <a className="underline" href={`https://fonts.google.com/icons`} target="_blank" rel="noopener noreferrer">
            Google Fonts Icons
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
            （
            <a className="underline" href={`https://www.apache.org/licenses/LICENSE-2.0.html`} target="_blank" rel="noopener noreferrer">
            Apache License 2.0
            <span className="">
            <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
            </span>
            </a>
            ）
        </p>
        </section>
        <section className="pb-20">
        <h1 className="text-3xl pb-8 font-bold">プライバシーポリシー</h1>
        <h2 className="text-2xl pb-2 font-bold">個人情報の利用目的</h2>
        <p className=" pb-8">
            当サイトでは、お問い合わせや記事へのコメントの際、メールアドレス等の個人情報を入力いただく場合がございます。<br/>
            取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
        </p>
        <h2 className="text-2xl pb-2 font-bold">アクセス解析ツールについて</h2>
        <p>
        当ブログでは、Googleによるアクセス解析ツール「Google アナリティクス 4」を利用しています。「Google アナリティクス 4」はトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。<br/>
        Googleアナリティクスによって収集されたデータは、どのページにアクセス需要があるかチェックし今後の当サイトのコンテンツの拡充の参考に利用させていただくものであり、これらの目的以外では利用いたしません。<br/>
        また、Googleアナリティクスによる収集対象は日本からのアクセスのみであり、そのほかの国からのアクセスの場合Googleアナリティクスによる情報収集はされません。

        </p>
        </section>
        <section className="pb-20" >
        <h1 className="text-3xl pb-8 font-bold">免責事項</h1>
        <h2 className="text-2xl pb-2 font-bold">掲載コンテンツについて</h2>
        <p className=" pb-4">
            当サイトからのリンクなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。<br/>
        </p>
        <p className=" pb-8">
            また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。<br/>
            CD、映像商品などの購入の判断に利用される際は、購入前に公式情報もよくご確認ください。<br/>
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </p>
        <h2 className="text-2xl pb-2 font-bold">サイト運営について</h2>
        <p className=" pb-8">
            当サイトは個人運営のため、運営者の個人的事情により、突然の更新停止および運用終了となることがございます。<br/>
            また、公式から類似のサービスの提供がなされた場合には、速やかに類似箇所の閉鎖もしくはサイト全体の閉鎖の措置を取らせていただきます。<br/>
        </p>
        </section>
        <section className="pb-20" >
        <h1 className="text-3xl pb-4 font-bold">連絡先</h1>
        <p className=" pb-2">
            メールアドレス：2000chome@gmail.com
        </p>
        <p className=" pb-8">
            <a className="underline" 
                href={`https://docs.google.com/forms/d/e/1FAIpQLSdYMzA85KFDx2Qr_sigjKBAPAqlRoZB4KA8tkHbuchZQuL_9w/viewform?usp=sf_link`}
                target="_blank" rel="noopener noreferrer">
            お問い合わせフォーム
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        </section>
        </article>
        </>
      );
  }