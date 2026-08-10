'use client'
import Link from 'next/link';
import { useState } from "react";
import CommonMenu from "./CommonMenu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


export default function HeaderDrawerButton() {

    //メニュー開閉
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);


    
    return (
        <>
          
            <button className="absolute left-2 fill-gray-500" onClick={()=>setIsDrawerOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" ></path></svg>
            </button>
            <Drawer
            
              open={isDrawerOpen}
              onOpenChange={()=>setIsDrawerOpen(false)}
              swipeDirection='left'
            >

              <DrawerContent>
                <div className=" pt-2 pl-2">
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
                <div className='px-4 overflow-y-auto'>
                  <CommonMenu />
                </div>
              </DrawerContent>

            </Drawer>

        </>
        );
    }