'use client'
import Link from 'next/link';
import { useState } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,Button ,Input, MenuButton
} from '@chakra-ui/react'


export default function HeaderDrawerButton() {

    //メニュー開閉
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);


    
    return (
        <>

            <button className="absolute left-2 fill-gray-500" onClick={()=>setIsDrawerOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" ></path></svg>
            </button>
            <Drawer
                isOpen={isDrawerOpen}
                placement='left'
                onClose={()=>setIsDrawerOpen(false)}
                size='xs'
            >
                <DrawerOverlay />
                <DrawerContent>
                <div className=" p-4">
                <button
                    className="hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
                    onClick={()=>setIsDrawerOpen(false)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
                </svg>
                </button>
                </div>

                <DrawerBody>
                    <Link className="
                        p-2
                        inline-block w-full hover:bg-gray-200 text-blue-900
                        transition-all duration-500 ease-out
                        text-xl font-sans justify-center
                    "
                        href={`/about`}
                        rel="noopener noreferrer">
                        このサイトについて
                    </Link>
                    <Link className="
                        p-2
                        inline-block w-full hover:bg-gray-200 text-blue-900
                        transition-all duration-500 ease-out
                        text-xl font-sans justify-center
                    "
                        href={`/qa`}
                        rel="noopener noreferrer">
                        Q&A
                    </Link>
                    <a className="
                        p-2
                        inline-block w-full hover:bg-gray-200 text-blue-900
                        transition-all duration-500 ease-out
                        text-xl font-sans justify-center
                    "
                        href={`https://docs.google.com/forms/d/e/1FAIpQLSdYMzA85KFDx2Qr_sigjKBAPAqlRoZB4KA8tkHbuchZQuL_9w/viewform?usp=sf_link`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        お問い合わせ 
                        <span className="fill-blue-900">
                        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                        </span>
                    </a>
                    <a className="
                        p-2
                        inline-block w-full hover:bg-gray-200 text-blue-900
                        transition-all duration-500 ease-out
                        text-xl font-sans justify-center
                    "
                        href={`https://misskey.2000cho.me/@search315`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Misskey
                        <span className="fill-blue-900">
                        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                        </span>
                    </a>
                    {/* <Link className="
                        p-2 font-semibold
                        inline-block w-full hover:bg-gray-200 text-blue-600
                        transition-all duration-500 ease-out
                        text-xl font-sans justify-center
                    "
                        href={`/setting`}
                        rel="noopener noreferrer">
                        設定
                    </Link> */}
                    <Link className="
                        p-2
                        inline-block w-full bg-gray-600 hover:bg-gray-200/0 
                        text-white hover:text-gray-600
                        transition-all duration-500 ease-out
                        text-xl font-sans justify-center
                    "
                        href={`/`}
                        rel="noopener noreferrer">
                        TOPに戻る
                    </Link>
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
        );
    }