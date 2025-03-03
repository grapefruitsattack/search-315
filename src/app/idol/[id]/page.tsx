import { Metadata } from 'next'
import dynamic from "next/dynamic";
import singingMaster from '../../../data/singingMaster.json';
import CommonPage from "../../../features/common/components/CommonPage";
import { Suspense } from "react";

export function generateStaticParams() {
  const idols = singingMaster.filter(data=>data.personFlg===1);
  return idols.map((e)=>{
    return {id: e.singingInfoId}
  });
}

const IdolPage = dynamic(() => import("../../../features/app/idol/IdolPage"), { ssr: true });
 
const Idols = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Suspense>
    <CommonPage>
    <IdolPage singingInfoId={id} />
    </CommonPage>
    </Suspense>
  );
}
export default Idols;