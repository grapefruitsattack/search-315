"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
    <body className={inter.className}>
      <Providers>
      {children}
      </Providers>
      <Script id="holder-js" src="//cdnjs.cloudflare.com/ajax/libs/holder/2.9.6/holder.js" strategy="lazyOnload">
      </Script>
  <div id="root"></div>
      </body>
    </html>
  )
}
