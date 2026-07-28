
import { Metadata } from 'next'
import dynamic from "next/dynamic";
import { Suspense } from "react";
import React from "react"
import { GetStaticProps } from "next"
import StoryPage from "../../features/app/story/StoryPage";

export default async function Page() {

    return (
      <Suspense>
        {/* @ts-ignore Server Component */}
        <StoryPage />
      </Suspense>
      ); 
  }