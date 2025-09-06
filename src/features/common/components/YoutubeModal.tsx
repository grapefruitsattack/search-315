'use client'
import Image from 'next/image';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure, 
 } from "@chakra-ui/react";


export const YoutubeModal = ({ title, embedUrl, thumbnailUrl }: { title: string, embedUrl: string, thumbnailUrl: string }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
    <>
    {/* ボタン部 */}
    <button className='rounded-lg border border-teal-500 
        text-red-500 text-sm font-sans leading-tight
        hover:bg-red-500 hover:text-red-100 
        w-fit h-fit
        transition-all duration-500 ease-out
        '
        onClick={onOpen}>
    <div className='flex flex-wrap justify-center items-center relative fill-blue-900/50 hover:fill-blue-900/80 duration-200'>
        <img
        className={`object-cover object-center  rounded-lg`}
        src={thumbnailUrl}
        alt="アートワーク"
        />
        <div className="w-full h-full bg-slate-500 mix-blend-screen absolute"></div>
        <svg className='h-[35%] absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path></svg>
        <svg className='h-[50%] absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
    </div>
    </button>
    {/* モーダル部 */}
    <Modal 
        isOpen={isOpen} onClose={onClose} size={'xl'}
    >
        <ModalOverlay />
        <ModalContent >
          <ModalCloseButton />
        <ModalBody p={1}>
        <div className="bg-white rounded-md text-center pt-10 pb-8">
            <div>
            <iframe 
                className="w-full aspect-video" 
                src={embedUrl} >
            </iframe>
            </div>
            {/* <motion.button className='rounded-lg border border-red-500 
                text-red-500 text-xl font-sans leading-tight
                hover:bg-red-500 hover:text-red-100 
                w-full h-full
                transition-all duration-500 ease-out
                '
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.05 }}
                onClick={onClose}>
                <div className='flex flex-wrap justify-center items-center'>
            閉じる
            </div>
            </motion.button> */}
            </div>
            </ModalBody>
        </ModalContent>
     </Modal>

    </>
    );
};