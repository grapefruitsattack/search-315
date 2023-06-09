'use client'
import { useModal } from "react-hooks-use-modal";
import { motion, AnimatePresence } from "framer-motion";

export const ShareModal: React.VFC = () => {
    const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    focusTrapOptions : { 
       clickOutsideDeactivates : true
    },  
  });
  return (
    <div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <AnimatePresence mode="wait">
          <motion.div
            key={'modal'}    
            initial={{ opacity: 0 }} // 初期状態
            animate={{ opacity: 1 }} // マウント時
            exit={{ opacity: 0 }}    // アンマウント時
          >
      <div className="bg-white px-16 py-14 rounded-md text-center">
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
        </div>
        
        </motion.div>
        </AnimatePresence>
      </Modal>
    </div>
  );
};