'use client';

import { useEffect } from 'react';
import { hasAnalyticsConsent } from "@/lib/analytics";

export default function SetLocalDateCookie() {

  useEffect(() => {
    const dt = new Date();
    const date = [
      dt.getFullYear().toString(),
      ('0' + (dt.getMonth() + 1)).slice(-2),
      ('0' + dt.getDate()).slice(-2),
    ].join('-');
    //cookieの期限をその日の日付が変わるころに設定
    const maxage = (60 - dt.getSeconds()) + (60 - 1 - dt.getMinutes())*60 + (24 - 1 - dt.getHours())*60*60;
    // Cookieに保存
    if(hasAnalyticsConsent()) document.cookie = `localDate=${dt}; path=/; max-age=${maxage}`;
  }, []);
  
  return null; // 表示UIは不要
}