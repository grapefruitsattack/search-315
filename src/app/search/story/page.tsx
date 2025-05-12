import { FC } from "react";
import { headers } from "next/headers";
import { Metadata } from 'next'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import CommonPage from "../../../features/common/components/CommonPage";

export const revalidate = 600; // 10分ごとに再検証する

type Props = {
  params: {
    id: string;
  };
  // 全てのクエリパラメターの値を取得する
  searchParams: { [key: string]: string | string[] | undefined };
  // 特定のクエリパラメターの値のみを取得するよう型制御する。
  // searchParams: { q: string };
};

const SearchStoryPage = dynamic(() => import("../../../features/app/search/SearchStoryPage"), { ssr: true });

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const qparm = searchParams.q;
  const fparm = searchParams.f;
    return (
    <Suspense>
    <CommonPage>
    
    <SearchStoryPage />
      {"テスト"}
      {qparm}
      {fparm}
    </CommonPage>
    </Suspense>
  );
}

export default Page;