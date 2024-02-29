
import { Metadata } from 'next'
import dynamic from "next/dynamic";

const SettingPage = dynamic(() => import("../../features/app/setting/SettingPage"), { ssr: false });

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return { title: `設定${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー` };
}
export default function Songs({ params }: { params: { id: string } }) {

  return (
    <SettingPage />
  );
}