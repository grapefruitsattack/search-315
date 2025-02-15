import { Metadata } from 'next'
import singingMaster from '../../../data/singingMaster.json';
import dynamic from "next/dynamic";

export function generateStaticParams() {
  const idols = singingMaster.filter(data=>data.personFlg===0);
  return idols.map((e)=>{
    return {id: e.singingInfoId}
  });
}

const UnitPage = dynamic(() => import("../../../features/app/unit/UnitPage"), { ssr: true });

  const Units = async ({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) => {
    const { id } = await params;
    return (
      <UnitPage id={id} />
    );
  }
  export default Units;