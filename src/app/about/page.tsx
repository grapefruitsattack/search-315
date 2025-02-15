"use client";
import { Metadata } from 'next'
import dynamic from "next/dynamic";

const AboutPage = dynamic(() => import("../../features/app/about/AboutPage"), { ssr: false });

export default function About() {

  return (
    <AboutPage />
  );
}