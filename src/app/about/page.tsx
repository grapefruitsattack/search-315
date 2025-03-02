
import { Metadata } from 'next'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import CommonPage from "../../features/common/components/CommonPage";

const AboutPage = dynamic(() => import("../../features/app/about/AboutPage"), { ssr: true });

export default async function About() {

  return (
    <Suspense>
    <CommonPage>
    <AboutPage />
    </CommonPage>
    </Suspense>
  );
}