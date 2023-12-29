'use client'
import { useModal } from "react-hooks-use-modal";
import { motion, AnimatePresence } from "framer-motion";
import ShareModuleContent from "./components/ShareModuleContent";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure, 
 } from "@chakra-ui/react";


export const ShareSearch315Modal = (
  { text, pass }: { text: string, pass: string }
) => {
    //モーダル


    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>

        <motion.button className='rounded-lg border-2 border-blue-500 h-full
            text-blue-500 text-sm font-sans leading-tight
            hover:bg-blue-500 hover:text-blue-100 
            transition-all duration-500 ease-out w-full fill-blue-500 hover:fill-blue-100 
            '
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.05 }}
          onClick={onOpen}>
        <div className='flex flex-wrap justify-center items-center '>
        <div className="lg:inline-block  font-bold">このページをシェア</div> 
        <svg 
              className="icon icon-tabler icon-tabler-x " 
              xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path></svg>

          
        </div>
        </motion.button >
     <Modal 
        isOpen={isOpen} onClose={onClose}
     >
       <ModalOverlay />
       <ModalContent minW="50vw" w="calc(100vw - 20px - 2rem)">
       <ModalHeader>
       <div
          className="flex justify-between items center border-b border-gray-200 py-2"
        >
          <div className="flex items-center justify-center">
            <p className="text-xl font-bold text-gray-800">共有</p>
          </div>

          <button
            className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
            onClick={onClose}
          >
            <svg 
              className="icon icon-tabler icon-tabler-x"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>


          </button>
        </div>
       </ModalHeader>
      <ModalBody>


      <div className="h-auto mx-4  rounded-xl">


        <div className=''>
        <ShareModuleContent 
              text={text} 
              url={`https://search315.com/`+ pass+'/'}/>
      </div>
      </div>

      </ModalBody>
      </ModalContent>
     </Modal>
    </>
    );
};