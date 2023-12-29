
import singingMaster from '../../../data/singingMaster.json';
import Link from 'next/link';
import { motion } from "framer-motion";

interface ItemCSS extends React.CSSProperties{
  '--c':string
}

export default function UnitBlock({ id }: { id: string }) {
  const color = singingMaster.find(data => data.singingInfoId === id)?.color;
  const colorStr:string = color ===undefined ?'' : color;

  const qStr: string = singingMaster.filter(
    data=>
      id.substring(0,3) === data.singingInfoId.substring(0,3)
      && data.personFlg === 1
    ).map(data=>data.singingInfoId).join(' ');

    return (
        <Link
          // className={`group
          // rounded-tl-3xl
          // bg-blue-950/70
          // border-l-8 border-t-8
          // px-1 py-2 
          // hover:border-gray-50/50
          // hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30
          // border-`+ id + ` hover:bg-`+id+`/50`}
          style={{"--c": '#'+colorStr}as ItemCSS}
          className={
            `group 
            px-1 py-3 middleMobile:py-5 my-auto
            transition duration-500 
            bg-blue-950/90 rounded-r-3xl 
            text-gray-100 hover:text-blue-950
            hover:bg-blue-100/10
            border-l-8 border-` + id
            }
            href={{ pathname: '/unit/'+id}}
        >
        <motion.button
          className='w-full h-full'
          whileHover={{
            scale: 1.03,
            transition: { duration: 1 },
          }}
          >
        <span className={`inline-block justify-items-center items-center transition-transform  motion-reduce:transform-none `}>
        <h2 className={`
          my-px 
          text-base mobileM:text-xl md:text-4xl lg:text-3xl
          break-all mobileS:break-normal 
          font-mono m-0 max-w-[30ch]
        `}>
              {''}{singingMaster.find(data => data.singingInfoId === id)?.singingInfoName}
          </h2>
            </span>
        </motion.button>
        </Link>
    )}
