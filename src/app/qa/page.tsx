'use client'
import { Metadata } from 'next'
import dynamic from "next/dynamic";

const QaPage = dynamic(() => import("../../features/app/qa/QaPage"), { ssr: false });

export default function Qa() {
  return (
    <QaPage />
  );
}