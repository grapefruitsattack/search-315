"use client";
import { Metadata } from 'next'
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const SettingPage = dynamic(() => import("../../features/app/setting/SettingPage"), { ssr: false });

export default function Setting() {
  // クライアント側でリダイレクト
  redirect("/");
  // return (
  //   <SettingPage />
  // );
}