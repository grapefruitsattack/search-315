import Link from "next/link";
import CommonPage from "@/features/common/components/common/CommonPage";

export default function NotFound() {
  return (
    <CommonPage>
      <title>{`404 not found ${"\u00a0"}|${"\u00a0\u00a0"}サーチサイコー`}</title>

      <div className="bg-white px-2 mobileS:px-4 mobileM:px-8 pb-96 lg:m-auto lg:max-w-[1000px] font-mono">
        <div className="mx-auto max-w-2xl py-24 text-center">
          <h1 className="text-6xl font-bold tracking-wider">404</h1>

          <h2 className="mt-6 text-2xl font-semibold">
            ページが見つかりません
          </h2>

          <p className="mt-6 leading-7 text-left sm:text-center">
            お探しのページは存在しないか、移動または削除されました。
            <br />
            URLをご確認いただくか、トップページから目的のページをお探しください。
          </p>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-block border border-black px-6 py-3 transition-opacity hover:opacity-70"
            >
              トップページへ戻る
            </Link>
          </div>
        </div>
      </div>
    </CommonPage>
  );
}