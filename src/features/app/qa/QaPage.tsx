'use client'
import Link from "next/link";
import CommonPage from "../../common/components/CommonPage";

export default function QaPage({ }: { }) {


    return (
        <CommonPage>
        <article className="pt-32 pb-48 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="pb-20">
        <h1 className="text-3xl pb-12 font-bold font-sans">Q&A</h1>
        <h2 className="text-2xl pb-2 font-bold">ここってどんなサイト？</h2>
        <p className=" pb-8">
            当サイトは「アイドルマスターSideM」の楽曲情報を中心に情報をまとめているサイトです。<br/>
            運営は個人によってなされており、「アイドルマスターSideM」公式とは一切関係ございません。<br/>
            詳細は
            <Link className="underline" href={`/about`} rel="noopener noreferrer">
                アバウトページ
            </Link>
            に記載しています。ご利用にあたってはこちらもご確認いただけますと幸いです。
            
        </p>
        <h2 className="text-2xl pb-2 font-bold">リンクされてる動画って無断転載動画じゃないの？</h2>
        <p className=" pb-2">
            公式から配信されている動画です。<br/>
            音楽サブスク配信サービス「Youtube Music」で配信されると、YouTube上で「アートトラック」というジャケット画像の表示された動画が自動生成される仕組みになっており、当サイトではそちらをリンクしています。<br/>
            なお、リンクの作成には細心の注意を払っていますが、万が一非公式の動画へのリンクがなされている場合はお問い合わせフォーム等から運営者へご連絡いただけますと幸いです。
        </p>
        <p className=" pb-1">
            参考リンク：
        </p>
        <p className=" pb-1">
            <a className="underline" 
                href={`https://support.google.com/youtube/answer/6007071?hl=ja`}
                target="_blank" rel="noopener noreferrer">
                アートトラックとは - YouTubeヘルプ
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        <p className=" pb-8">
            <a className="underline" 
                href={`https://support.tunecore.co.jp/hc/ja/articles/360058762912-%E8%87%AA%E5%88%86%E3%81%AE%E6%A5%BD%E6%9B%B2%E3%81%8C%E5%8B%9D%E6%89%8B%E3%81%AB-YouTube-%E3%81%AB%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B-`}
                target="_blank" rel="noopener noreferrer">
                自分の楽曲が勝手に YouTube にアップロードされている？ – TuneCore Japan ヘルプセンター
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        <h2 className="text-2xl pb-2 font-bold">このサイトのスクショをSNSや自分のサイトに載せても大丈夫？</h2>
        <p className=" pb-8">
            このサイトの画面であるとわかる状態であれば、切り取り・書き込みなどの加工含め自由に掲載いただいて問題ございませんが、掲載の際は以下の要素を含まないようご注意ください。<br/>
            <span className="text-red-700">「YouTube埋め込み動画・YouTubeサムネイル画像の表示されている画面」</span><br/>
            <span className="text-red-700">「他SNSのロゴが表示されている画面（シェア画面）」</span><br/>
        </p>
        <h2 className="text-2xl pb-2 font-bold">不完全なコンテンツはいつ完成する？/こんな機能が欲しい</h2>
        <p className=" pb-8">
            個人による運営開発のため時期は未定ですが、今後も新機能の追加を予定しています！<br/>
            ・ライブ情報の完全化（プロミや外部ライブなど）<br/>
            ・曲検索の条件にライブ披露済・未披露を追加<br/>
            ・CD収録のボイスドラマの検索<br/>
            などを現在検討しています。<br/>
            そのほか、こんな機能が欲しい！などありましたら、ぜひお問い合わせからご連絡ください。
        </p>
        <h2 className="text-2xl pb-2 font-bold">今後の新曲やサブスクは反映される？/更新頻度はどのくらいを予定している？</h2>
        <p className=" pb-8">
            新曲やサブスク追加の反映は今後も予定しています。<br/>
            ただし、迅速な対応は難しい場合もございます。予めご了承下さい。
        </p>
        <h2 className="text-2xl pb-2 font-bold">舞台版（サイステ）の楽曲の掲載予定はある？</h2>
        <p className=" pb-8">
            申し訳ありませんが、舞台版（サイステ）の楽曲の対応予定はございません。<br/>
            今後、舞台版の展開について大きく状況が変わることがない限り、このような判断とさせていただきます。<br/>
            もし舞台版（サイステ）の楽曲対応についてのお問い合わせやご要望をいただいても、お応えすることはできません。ご了承ください。
        </p>
        <h2 className="text-2xl pb-2 font-bold">このサイトのSNSアカウントはある？</h2>
        <p className=" pb-1">
            以下のアカウントをご確認ください。Mastodon、Misskey等Fediverse対応SNSの各サーバーからフォロー可能です。<br/>
        </p>
        <p className=" pb-4">
            <a className="underline" 
                href={`https://misskey.2000cho.me/@search315`}
                target="_blank" rel="noopener noreferrer">
                @search315@misskey.2000cho.me（Misskey個人サーバー）
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        <p className=" pb-1">
            または、以下の個人Twitterアカウントでもアナウンスを行う予定です。ですがあくまで個人アカウントのため、当サイトのお知らせは前者のアカウントをメインで使用する予定です。<br/>
        </p>
        <p className=" pb-8">
            <a className="underline" 
                href={`https://twitter.com/2000chome`}
                target="_blank" rel="noopener noreferrer">
                @2000chome
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
        </p>
        <h2 className="text-2xl pb-2 font-bold">連絡を取りたい（情報の間違いを見つけた、要望を送りたい）</h2>
        <p className=" pb-2">
            <a className="underline" 
                href={`https://docs.google.com/forms/d/e/1FAIpQLSdYMzA85KFDx2Qr_sigjKBAPAqlRoZB4KA8tkHbuchZQuL_9w/viewform?usp=sf_link`}
                target="_blank" rel="noopener noreferrer">
                お問い合わせフォーム
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                </span>
            </a>
            または以下のメールアドレス宛に直接ご連絡ください。
        </p>
        <p className=" pb-2">
            メールアドレス：2000chome@gmail.com
        </p>
        </section>
        </article>
        </CommonPage>
      );
  }