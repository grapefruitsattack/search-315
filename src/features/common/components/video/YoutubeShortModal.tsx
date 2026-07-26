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


export const YoutubeShortModal 
= ({ title, embedUrl, disclosure }
: { title: string, embedUrl: string, disclosure: any, }) => {

  return (
    <>
    {/* モーダル部 */}
    <Modal 
        isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={'sm'}
    >
        <ModalOverlay />
        <ModalContent my={'auto'}>
          <ModalCloseButton />
        <ModalBody p={1}>
        <div className="bg-white rounded-md text-center pt-10 pb-0">
            <div>
            <iframe 
                className="mx-auto w-fit h-[85vh] aspect-[402/715]" 
                src={embedUrl} >
            </iframe>
            </div>
            </div>
            </ModalBody>
        </ModalContent>
     </Modal>

    </>
    );
};