'use client'
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure, 
 } from "@chakra-ui/react";


export const YoutubeModal 
= ({ title, embedUrl, disclosure }
: { title: string, embedUrl: string, disclosure: any, }) => {

  //const { isOpen, onClose, onOpen } = useDisclosure();

  return (
  <>
  {/* モーダル部 */}
  <Modal 
      isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={'xl'}
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