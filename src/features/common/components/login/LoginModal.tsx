'use client'
import { signIn, signOut, authClient } from "@/auth-client"
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure, 
 } from "@chakra-ui/react";
import gsiButton from '@/features/common/css/gsi-material-button.module.css';



 export default function LoginModal({ disclosure,description }: { disclosure: any,description:string }
 ) {
  return(
  <>
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay/>
      <ModalContent minW="50vw" w="calc(100vw - 20px - 2rem)">
        <ModalHeader>
          <button
            className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
            onClick={disclosure.onClose}>
            <svg 
              className="icon icon-tabler icon-tabler-x"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="h-auto mx-4 rounded-xl">
            <button className={'mx-auto '+gsiButton.gsiMaterialButton}
              onClick={() => authClient.signIn.social({ provider: "google" })}
            >
              <div className={gsiButton.gsiMaterialButtonState}></div>
              <div className={gsiButton.gsiMaterialButtonContentWrapper}>
                <div className={gsiButton.gsiMaterialButtonIcon}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: 'block'}}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className={gsiButton.gsiMaterialButtonContents}>Googleで登録・ログイン</span>
                <span style={{display: 'none'}}>Googleで登録・ログイン</span>
              </div>
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
 }
