import { Metadata } from 'next'
import dynamic from "next/dynamic";
import singingMaster from '../../../data/singingMaster.json';
import albumMaster from '../../../data/albumMaster.json';

export function generateStaticParams() {
  const idols = singingMaster.filter(data=>data.personFlg===1);
  return idols.map((e)=>{
    return {id: e.singingInfoId}
  });
  }
  export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const idolName: string = singingMaster.find((data)=>data.singingInfoId=== params.id)?.singingInfoName||'';
    return { 
      title: `${idolName} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー` ,
      description: `「${idolName}」の楽曲情報・サブスク配信状況をチェック！ |  サーチサイコー`
    };
  }
const IdolPage = dynamic(() => import("../../../features/app/idol/IdolPage"), { ssr: true });
export default function Page({ params }: { params: { id: string } }) {

  return (
    <IdolPage id = {params.id} />
    );
  }