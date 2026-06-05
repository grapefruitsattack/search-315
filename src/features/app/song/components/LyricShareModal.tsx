'use client'
import { useEffect, useState } from "react";
import type { Lyric,LyricData } from '@/data/types';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  useDisclosure, 
 } from "@chakra-ui/react";

export const LyricShareModal = (
  { lyric, targetRows, disclosure, }
  : { lyric: Lyric, targetRows: {startRow: number, endRow: number}, disclosure: any, }
) => {
  
  const [selectedRows, setSelectedRows] = useState(targetRows);
  const [selectionStep, setSelectionStep] 
    = useState<'rowStart' | 'rowEnd' | 'rowSelected'>(
      targetRows.startRow===0 
        ?'rowStart' 
        :targetRows.endRow ===0 ?'rowEnd': 'rowSelected'
    );

  useEffect(() => {
    setSelectedRows(targetRows);
    setSelectionStep(
      targetRows.startRow===0 
        ?'rowStart' 
        :targetRows.endRow ===0 ?'rowEnd': 'rowSelected'
    );;

    if (!disclosure.isOpen) return;

    const timer = setTimeout(() => {
      const element = document.querySelector(
        `[data-row-seq="${targetRows.startRow === 0 ? 1 : targetRows.startRow}"]`
      );

      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [disclosure.isOpen, targetRows]);

  
  // 歌詞表示部分
  const lyricList: JSX.Element[] = [];
  let rowList:LyricData[] = [];
  lyric.data.forEach((data, index) => {
    rowList.push(data);
    const nextData = lyric.data[index + 1];
    const isLast =
      !nextData || (nextData.row_seq !== data.row_seq);
    if(isLast){
      if(rowList.length<=1&&rowList[0]?.lyric==='') {
        lyricList.push(
          <div key={rowList[0]?.row_seq} className={`flex h-[20px] `}>
          </div>
        )
      }else{
        const currentRowSeq = rowList[0]?.row_seq;
        lyricList.push(
          <div 
            data-row-seq={currentRowSeq}
            key={currentRowSeq} 
            className={`
              flex text-gray-700 mt-auto w-full cursor-pointer hover:bg-green-300 
              ${selectionStep==='rowEnd' && selectedRows.startRow === rowList[0].row_seq 
                && 'bg-green-200 rounded'
              }
              ${selectionStep==='rowSelected' && selectedRows.startRow <= rowList[0].row_seq && rowList[0].row_seq <= selectedRows.endRow 
                && 'bg-green-200'}
              ${selectionStep==='rowSelected' && selectedRows.startRow === rowList[0].row_seq
                && 'rounded-t'}
              ${selectionStep==='rowSelected' && selectedRows.endRow === rowList[0].row_seq
                && 'rounded-b'}
              `}
              onClick={() => {

                if (selectionStep === 'rowStart') {

                  setSelectedRows({
                    startRow: currentRowSeq,
                    endRow: currentRowSeq,
                  });

                  setSelectionStep('rowEnd');

                  return;
                }

                const startRow = selectedRows.startRow;

                setSelectedRows({
                  startRow: Math.min(startRow, currentRowSeq),
                  endRow: Math.max(startRow, currentRowSeq),
                });

              }}
          >
            {rowList.map((rowListData, rowListIndex) => {
            if(rowListData.ruby===undefined){
              return(
                <p className="mt-auto" key={rowListIndex}>{rowListData.lyric}</p>
              )
            }else{
              return(
                <ruby key={rowListIndex} className="mt-auto">{rowListData.lyric}
                  <rp>(</rp>
                  <rt>{rowListData.ruby}</rt>
                  <rp>)</rp>
                </ruby>
              )
            }
            })}
          </div>
      );
    }
      rowList=[];
    }
  })


  return(
  <>
    <Modal size={'xl'} scrollBehavior="inside" isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>シェアしたい歌詞を選択</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          className=''
        >
          <div className="sticky top-0 z-10 bg-white border-b pb-3 mb-3">
            {selectionStep === 'rowStart' && (
              <>
                <p className="font-semibold">
                  ① 開始行を選択してください
                </p>
                <p className="text-sm text-gray-500">
                  共有したい歌詞の最初の行をタップ
                </p>
              </>
            )}

            {selectionStep === 'rowEnd' && (
              <>
                <p className="font-semibold">
                  ② 終了行を選択してください
                </p>
                <p className="text-sm text-gray-500">
                  同じ行を選ぶと1行のみ共有します
                </p>

                <div className="mt-2 text-sm">
                  開始: {selectedRows.startRow}行目
                </div>
              </>
            )}

            {selectionStep === 'rowSelected' &&
              selectedRows.startRow === selectedRows.endRow && (
                <div className="mt-2 text-sm text-gray-500">
                  現在: {selectedRows.startRow}行目
                </div>
              )}
          </div>
          <div 
            className="flex flex-col gap-0 select-none print:hidden"
          >
            {lyricList}
          </div>
        </ModalBody>
        <ModalFooter> 
          <div className="flex justify-between w-full">
            <div>
              <Button className="ml-0 mr-auto" onClick={disclosure.onClose}>閉じる</Button>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setSelectionStep('rowStart');
                  setSelectedRows({startRow: 0, endRow: 0});
                }}
                disabled={['rowStart'].includes(selectionStep) }
              >
                選択しなおす
              </Button>
              <Button 
                onClick={disclosure.onClose}
                disabled={['rowStart'].includes(selectionStep) }
              >
                {selectionStep === 'rowStart' && '歌詞を選択してください'}
                {selectionStep === 'rowEnd' && 'この1行のみ共有'}
                {selectionStep === 'rowSelected' && '選択した歌詞を共有'}
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}