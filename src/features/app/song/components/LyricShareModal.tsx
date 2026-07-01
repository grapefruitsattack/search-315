'use client'
import Image from 'next/image';
import { useEffect, useState } from "react";
import type { Lyric,LyricData,SongMaster } from '@/data/types';
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
import {Tooltip} from "@chakra-ui/react";

export const LyricShareModal = (
  { song, lyric, targetRows, disclosure, }
  : { song: SongMaster, lyric: Lyric, targetRows: {startRow: number, endRow: number}, disclosure: any, }
) => {
  
  const [selectedRows, setSelectedRows] = useState(targetRows);
  const [selectedChars, setSelectedChars] = useState({startChar: 0, endChar: 0});
  const [selectionStep, setSelectionStep] 
    = useState<'rowStart' | 'rowEnd' | 'rowSelected' | 'charStart'| 'charEnd' | 'charSelected' |'share'>(
      targetRows.startRow===0 
        ?'rowStart' 
        :targetRows.endRow ===0 ?'rowEnd':'rowSelected'
    );

  function scrollRowArea(){
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
  }

  useEffect(() => {
    setSelectedRows(targetRows);
    setSelectedChars({startChar: 0, endChar: 0});
    setSelectionStep(
      targetRows.startRow===0 
        ?'rowStart' 
        :targetRows.endRow ===0 ?'rowEnd': 'rowSelected'
    );;

    if (!disclosure.isOpen) return;

    scrollRowArea();

  }, [disclosure.isOpen, targetRows]);

    
  // #region 歌詞表示部分(行選択)
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
                }else if(selectionStep === 'rowEnd'){
                  const startRow = selectedRows.startRow;
                  setSelectedRows({
                    startRow: Math.min(startRow, currentRowSeq),
                    endRow: Math.max(startRow, currentRowSeq),
                  });
                  setSelectionStep('rowSelected');
                }else if(selectionStep === 'rowSelected'){
                  setSelectedRows({
                    startRow: currentRowSeq,
                    endRow: currentRowSeq,
                  });
                  setSelectionStep('rowEnd');
                }

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
  // #endregion 歌詞表示部分(行選択)

  // #region 歌詞表示部分(文字選択)
  const selectedRowData: LyricData[] = lyric.data.filter(
    x => x.row_seq === selectedRows.startRow
  );
  type SelectableUnit = {
    index: number;
    text: string;
    ruby?: string;
  };
  const selectableUnits: SelectableUnit[] = [];
  let unitIndex = 1;
  selectedRowData.forEach(item => {
    if (item.ruby) {
      selectableUnits.push({
        index: unitIndex++,
        text: item.lyric,
        ruby: item.ruby,
      });
      return;
    }
    item.lyric.split('').forEach(char => {
      selectableUnits.push({
        index: unitIndex++,
        text: char,
      });
    });
  });
  const lyricCharList: JSX.Element[] = [];
  selectableUnits.forEach(unit => {
    const currentCharSeq = unit.index;
    lyricCharList.push(
      <button
        key={currentCharSeq}
        className={`text-3xl
          mt-auto hover:bg-green-200
          ${selectionStep==='charEnd' && selectedChars.startChar === currentCharSeq
            && 'bg-green-200 rounded'
          }
          ${selectionStep==='charSelected' && selectedChars.startChar < currentCharSeq && currentCharSeq < selectedChars.endChar
            && 'bg-green-200'}
          ${selectionStep==='charSelected' && selectedChars.startChar === currentCharSeq
            && 'bg-green-200 rounded-l-md '}
          ${selectionStep==='charSelected' && selectedChars.endChar === currentCharSeq
            && 'bg-green-200 rounded-r-md '}
        `}
        onClick={() => {

          if (selectionStep === 'charStart'||selectionStep === 'charSelected') {
            setSelectedChars({startChar:currentCharSeq,endChar:currentCharSeq});
            setSelectionStep('charEnd');
          }

          if (selectionStep === 'charEnd') {
            const startChar = selectedChars.startChar;
            setSelectedChars({
              startChar: Math.min(startChar, currentCharSeq),
              endChar: Math.max(startChar, currentCharSeq),
            });
            setSelectionStep('charSelected');
          }
        }}
      >
        {unit.ruby
          ? (
            <ruby>
              {unit.text}
              <rp>(</rp>
              <rt>{unit.ruby}</rt>
              <rp>)</rp>
            </ruby>
          )
          :unit.text===' '
            ?'\u00A0'
            :unit.text
        }
      </button>
    );
  })
  // #endregion 歌詞表示部分(文字選択)


  // #region シェア機能
  function createDefaultShareUrl(rows: {startRow: number, endRow: number},chars: {startChar: number, endChar: number}) {
    const queryArray: string[] = [];
    queryArray.push(`v=${lyric.version}`);
    queryArray.push(`startrow=${rows.startRow}`);
    if(rows.endRow>0&&rows.endRow!==rows.startRow) queryArray.push(`endrow=${rows.endRow}`);
    if(chars.startChar>0) queryArray.push(`startchar=${chars.startChar}`);
    if(chars.endChar>0) queryArray.push(`endchar=${chars.endChar}`);
    return `${process.env.NEXT_PUBLIC_HOME_URL}song/${song.songId}/lyricshare/?${queryArray.join('&')}`;
  };
  const [shareText, setShareText] = useState('');
  const shareURLTwitter = (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const shareURLMisskey = (text: string) => `https://misskeyshare.link/share.html?text=${encodeURIComponent(shareText)}`;
  const shareURLMastodon = (text: string) => `https://donshare.net/share.html?text=${encodeURIComponent(shareText)}`;

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
  // #endregion シェア機能
  

  return(
  <>
    <Modal size={'xl'} scrollBehavior="inside" isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          歌詞をシェア
            <a 
              className={`${selectionStep !== 'share'&&'hidden'}
              flex w-fit text-base
              underline text-slate-600 hover:text-sky-300 fill-slate-500 hover:fill-sky-500
              `}
              href={createDefaultShareUrl(selectedRows,selectedChars)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="">
              {'シェアページを確認する'}
              <span className="pl-0.5">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
              </span>
            </span>
            </a>
          <div className="text-base text-gray-400">
            {selectionStep === 'rowStart' && '開始行を選択'}
            {selectionStep === 'rowEnd' && '終了行を選択'}
            {selectionStep === 'rowSelected' && '選択済み（再選択で選びなおし）'}
            {selectionStep === 'charStart' && '開始文字を選択'}
            {selectionStep === 'charEnd' && '開始文字を選択'}
            {selectionStep === 'charSelected' && '選択済み（再選択で選びなおし）'}
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          className=''
        >
        {['rowStart','rowEnd','rowSelected'].includes(selectionStep)
        &&
          <div 
            className="flex flex-col gap-0 select-none print:hidden font-sans"
          >
            {lyricList}
          </div>
        }
        {['charStart','charEnd','charSelected'].includes(selectionStep)
        &&
          <div className="flex flex-wrap gap-y-2 select-none print:hidden font-sans">
            {lyricCharList}
          </div>
        }
        {selectionStep=='share'
        &&
          <div>
            {/* Share Modal by https://tailwindcomponents.com/component/share-modal */}
            <div className="my-0">
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
                        href={shareURLTwitter(shareText)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    {/* Twitter logo by https://about.twitter.com/ja/who-we-are/brand-toolkit */}
                    <Image
                      className={`h-[24px] w-[24px]`}
                      src={`/twitter_Logo_blue.svg`}
                      alt="アートワーク"
                      width={24}
                      height={24}
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
                        href={shareURLMastodon(shareText)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    {/* Mastodon logo by https://joinmastodon.org/ja/branding */}
                    <Image
                      className={`h-[24px] w-[24px]`}
                      src={`/Mastodon_icon.svg`}
                      alt="アートワーク"
                      width={24}
                      height={24}
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
                      href={shareURLMisskey(shareText)}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                  {/* misskey logo by https://misskey-hub.net/appendix/assets.html */}
                  <Image
                    className={`h-[36px] w-[36px]`}
                    src={`/misskey_icon.png`}
                    alt="アートワーク"
                    width={36}
                    height={36}
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
                    value={shareText}
                    onChange={(e) => {
                        setShareText(e.target.value);
                      }}
                    placeholder="シェアテキスト"
                    >
                </textarea>
              </div>
              <div className='flex mt-1 gap-2 justify-end'>
                <button 
                    className='rounded-lg border-2 border-pink-500 
                        text-pink-500 text-sm font-bold leading-tight
                        hover:bg-pink-200/50
                        transition-all duration-500 ease-out
                        p-2'
                    onClick={() => 
                      setShareText(`「${song.songTitle}」歌詞のココがスキ！  |  サーチサイコー\n#SideM #search315\n${createDefaultShareUrl(selectedRows,selectedChars)}`)
                    }
                >リセット</button>
                <Tooltip className = '' placement='bottom' label='コピーしました' isOpen = {tooltipOn}>
                    <button className='rounded-lg border-2 border-green-500 
                        text-green-500 text-sm font-bold leading-tight
                        hover:bg-green-200/50
                        transition-all duration-500 ease-out
                        p-2'
                    onClick={() => copyTextToClipboard(shareText)}
                    >コピー</button>
                </Tooltip>
              </div>
            </div>
          </div>
        }
        </ModalBody>
        <ModalFooter > 
          <div className="flex flex-wrap-reverse justify-between w-full gap-2">
            {['rowStart','rowEnd','rowSelected'].includes(selectionStep)&&
              <div className="flex gap-2 flex-wrap-reverse ml-auto mr-0">
                <Button className="ml-auto mr-0"
                  size={'sm'}
                  onClick={() => {
                    setSelectionStep('charStart');
                  }}
                  disabled={!((selectionStep === 'rowEnd')||(selectionStep === 'rowSelected'&&selectedRows.startRow===selectedRows.endRow))}
                >
                  さらに細かく選択
                </Button>
                <Button className="ml-auto mr-0"
                  size={'sm'}
                  onClick={() => {
                    setShareText(`「${song.songTitle}」歌詞のココがスキ！  |  サーチサイコー\n#SideM #search315\n${createDefaultShareUrl(selectedRows,selectedChars)}`);
                    setSelectionStep('share');
                  }}
                  disabled={['rowStart'].includes(selectionStep)}
                >
                  {selectionStep === 'rowStart' && '歌詞を共有'}
                  {selectionStep === 'rowEnd' && '1行のみ共有'}
                  {(selectionStep === 'rowSelected')&&(selectedRows.startRow===selectedRows.endRow) && '1行のみ共有'}
                  {(selectionStep === 'rowSelected')&&(selectedRows.startRow!==selectedRows.endRow) && '歌詞を共有'}
                </Button>
              </div>
            }
            {['charStart','charEnd','charSelected'].includes(selectionStep)&&
              <div className="flex justify-between gap-2 flex-wrap-reverse ml-auto mr-0">
                <Button className="ml-auto mr-0"
                  color={'blue'}
                  size={'sm'}
                  onClick={() => {
                    setSelectedChars({startChar:0,endChar:0});
                    if(selectedRows.endRow===0||selectedRows.endRow===selectedRows.startRow){
                      setSelectionStep('rowEnd');
                    }else{
                      setSelectionStep('rowSelected');
                    }
                    scrollRowArea();
                  }}
                >
                  戻る
                </Button>
                <Button className="ml-auto mr-0"
                  size={'sm'}
                  onClick={() => {
                    setShareText(`「${song.songTitle}」歌詞のココがスキ！  |  サーチサイコー\n#SideM #search315\n${createDefaultShareUrl(selectedRows,selectedChars)}`);
                    setSelectionStep('share');
                  }}
                  disabled={['rowStart','rowEnd'].includes(selectionStep)}
                >
                  {'歌詞を共有'}
                </Button>
              </div>
            }
            {['share'].includes(selectionStep)&&
              <div className="flex justify-between gap-2 flex-wrap-reverse ml-auto mr-0">
                <Button className="ml-auto mr-0"
                  color={'blue'}
                  size={'sm'}
                  onClick={() => {
                    if(selectedChars.startChar!==0&&selectedChars.endChar!==0){
                      setSelectionStep('charSelected');
                    }else if(selectedRows.endRow===0||selectedRows.endRow===selectedRows.startRow){
                      setSelectionStep('rowEnd');
                      scrollRowArea();
                    }else{
                      setSelectionStep('rowSelected');
                      scrollRowArea();
                    }
                  }}
                >
                  戻る
                </Button>
              </div>
            }
            {/* <div>
              <Button className="ml-0 mr-auto" onClick={disclosure.onClose} size={'sm'}>
                閉じる
              </Button>
            </div> */}
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}