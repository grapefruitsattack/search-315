'use client'
import Image from 'next/image';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Tooltip} from "@chakra-ui/react";

export default function ShareModuleContent(
    { text, url }: { text: string, url: string }
  ) {
    
    const shareURLTwitter = (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    const shareURLFacebook:string = `https://www.facebook.com/share.php?u=${encodeURIComponent(`${url}`)}`;
    const shareURLMisskey = (text: string) => `https://misskeyshare.link/share.html?text=${encodeURIComponent(text)}`;
    const shareURLMastodon = (text: string) => `https://donshare.net/share.html?text=${encodeURIComponent(text)}`;

    const shareText = `${text}\n${url}`;

    const [val, setVal] = useState(shareText);
    //ツールチップ
    const [tooltipOn, setTooltipOn] = useState<boolean>(false);

    //テキストコピー
    function copyTextToClipboard(text: string) {
        navigator.clipboard.writeText(text)
        .then(function() {
            setTooltipOn(true);
            window.setTimeout(function(){setTooltipOn(false);}, 1500);
        }, function(err) {
        });
      }

    return (
        <section>
        {/* Share Modal by https://tailwindcomponents.com/component/share-modal */}
        <div className="my-4">
          {/* <p className="text-sm">Share this link via</p> */}
        <div className="flex flex-wrap justify-center my-6 gap-y-3 gap-x-4">
        {/* ツイッター */}
        <div className="flex flex-col items-center w-18">
            <a className="flex font-sans text-sm text-[#1d9bf0] justify-center">Twitter</a>
            <a
                className="w-12 h-12 border 
                hover:bg-[#1d9bf0]/10 
                text-[#1d9bf0]/80 hover:text-white font-sans
                hover:fill-white rounded-full 
                flex items-center justify-center
                border border-[#1d9bf0]/30 hover:border-white
                shadow-md
                hover:shadow-xl hover:shadow-[#1d9bf0]/50 
                cursor-pointer
                transition-all duration-500 ease-out
                "
                href={shareURLTwitter(val)}
                target="_blank"
                rel="noopener noreferrer"
            >
            {/* Twitter logo by https://about.twitter.com/ja/who-we-are/brand-toolkit */}
            <Image
              className={`h-[24px] w-[24px]`}
              src={`/twitter_Logo_blue.svg`}
              alt="アートワーク"
            />
            </a>
        </div>
        {/* マストドン */}
        <div className="flex flex-col items-center w-18">
            <a className="flex font-sans text-sm text-[#6364FF] justify-center">Mastodon</a>
            <a
                className="w-12 h-12 
                hover:bg-[#6364FF]/20
                fill-[#6364FF] hover:fill-white 
                text-[#5749ca] hover:text-white font-sans
                rounded-full flex 
                items-center justify-center
                border border-[#6364FF]/30 hover:border-white
                shadow-md
                hover:shadow-xl hover:shadow-[#6364FF]/50 
                cursor-pointer
                transition-all duration-500 ease-out
                "
                href={shareURLMastodon(val)}
                target="_blank"
                rel="noopener noreferrer"
            >
            {/* Mastodon logo by https://joinmastodon.org/ja/branding */}
            <Image
              className={`h-[24px] w-[24px]`}
              src={`/Mastodon_icon.svg`}
              alt="アートワーク"
            />
            </a>
        </div>
        {/* Misskey */}
        <div className="flex flex-col items-center w-18">
            <a className="flex font-sans text-sm text-[#5db102] justify-center">Misskey</a>
            <a
                className="w-12 h-12 
                hover:bg-[#72d704]/20 fill-[#72d704] hover:fill-white 
                text-[#5da90a] hover:text-white font-sans
                rounded-full flex 
                items-center justify-center
                border border-[#72d704]/30 hover:border-white
                shadow-md
                hover:shadow-xl hover:shadow-[#72d704]/50 
                cursor-pointer
                transition-all duration-500 ease-out
                "
                href={shareURLMisskey(val)}
                target="_blank"
                rel="noopener noreferrer"
            >
            {/* misskey logo by https://misskey-hub.net/appendix/assets.html */}
            <Image
              className={`h-[36px] w-[36px]`}
              src={`/misskey_icon.png`}
              alt="アートワーク"
            />
            </a>
        </div>
        </div>

        {/* シェアテキストを編集 */}
        {/* Textarea by https://tailwindcomponents.com/component/share-modal */}
          {/* <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" /> */}
            <div className="max-w-2xl mx-auto">

                <label className="block text-sm font-sans text-gray-900">
                    シェアテキストを編集
                </label>

                <textarea 
                    id="message" 
                    rows={4} 
                    className="block p-2.5 w-full text-xs lg:text-sm text-blue-900 
                    bg-gray-50 rounded-lg border border-blue-300 
                    focus:ring-blue-500 focus:border-blue-500 " 
                    value={val}
                    onChange={(e) => {
                        setVal(e.target.value);
                      }}
                    placeholder="シェアテキスト"
                    >
                </textarea>

                {/* <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js" strategy="lazyOnload"></script> */}
            </div>
            <div className='flex mt-1 gap-2 justify-end'>
            <motion.button 
                className='rounded-lg border-2 border-pink-500 
                    text-pink-500 text-sm font-bold leading-tight
                    hover:bg-pink-200/50
                    transition-all duration-500 ease-out
                    p-2'
               onClick={() => setVal(shareText)}
               whileHover={{ scale: 1 }}
               whileTap={{ scale: 0.85 }}
               transition={{ duration: 0.05 }}
            >リセット</motion.button>
            <Tooltip className = '' placement='bottom' label='コピーしました' isOpen = {tooltipOn}>
                <motion.button className='rounded-lg border-2 border-green-500 
                    text-green-500 text-sm font-bold leading-tight
                    hover:bg-green-200/50
                    transition-all duration-500 ease-out
                    p-2'
                onClick={() => copyTextToClipboard(val)}
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.05 }}
                >コピー</motion.button>
            </Tooltip>
            </div>


        </div>
        </section>
    )
}