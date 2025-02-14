"use client";
import { Metadata } from 'next'
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const SettingPage = dynamic(() => import("../../features/app/setting/SettingPage"), { ssr: false });

export default function Songs({ params }: { params: { id: string } }) {
  // クライアント側でリダイレクト
  redirect("/");
  // return (
  //   <SettingPage />
  // );
}