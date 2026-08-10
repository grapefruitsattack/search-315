
import { Metadata } from 'next'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import CommonPage from "../../features/common/components/common/CommonPage";

const SearchPage = dynamic(() => import("../../features/app/search/SearchPage"), { ssr: true });

export default function Search() {
    return (
      <Suspense>
      <CommonPage>
      <SearchPage />
      </CommonPage>
      </Suspense>
    );
  }
