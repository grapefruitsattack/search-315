"use client";
import { Metadata } from 'next'
import dynamic from "next/dynamic";

const AboutPage = dynamic(() => import("../../features/app/about/AboutPage"), { ssr: false });

export default function Songs({ params }: { params: { id: string } }) {

  return (
    <AboutPage />
  );
}