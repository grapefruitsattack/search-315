
import { Metadata } from 'next'
import dynamic from "next/dynamic";


import React from "react"
import { GetStaticProps } from "next"
import StoryPage from "../../features/app/story/StoryPage";
import prisma from '../../../lib/prisma';

export default async function Page() {

    return (
        <>
        {/* @ts-expect-error Server Component */}
        <StoryPage />
        </>
      );
  }