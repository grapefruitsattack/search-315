'use client'
import { Metadata } from 'next'
import dynamic from "next/dynamic";

const SearchPage = dynamic(() => import("../../features/app/search/SearchPage"), { ssr: false });

export default function Search() {
    return (
      <SearchPage />
    );
  }
