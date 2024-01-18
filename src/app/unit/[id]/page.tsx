import { Metadata } from 'next'
import singingMaster from '../../../data/singingMaster.json';
import dynamic from "next/dynamic";

export function generateStaticParams() {
  const idols = singingMaster.filter(data=>data.personFlg===0);
  return idols.map((e)=>{
    return {id: e.singingInfoId}
  });
}
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const unitName: string = singingMaster.find((data)=>data.singingInfoId=== params.id)?.singingInfoName||'';
  return { 
    title: `${unitName} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー` ,
    description: `「${unitName}」の楽曲情報・サブスク配信状況をチェック！ |  サーチサイコー`
  };
}
const UnitPage = dynamic(() => import("../../../features/app/unit/UnitPage"), { ssr: false });
export default function Page({ params }: { params: { id: string } }) {

  return (
    <UnitPage id = {params.id} />
    );
  }