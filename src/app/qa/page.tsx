
import dynamic from "next/dynamic";
import CommonPage from "../../features/common/components/CommonPage";
import { Suspense } from "react";

const QaPage = dynamic(() => import("../../features/app/qa/QaPage"), { ssr: true });

export default function Qa() {
  return (
    <Suspense>
    <CommonPage>
    <QaPage />
    </CommonPage>
    </Suspense>
  );
}