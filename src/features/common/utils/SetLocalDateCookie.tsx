'use client';

import { useEffect } from 'react';

export default function SetLocalDateCookie() {
  useEffect(() => {
    const dt = new Date();
    const date = [
      dt.getFullYear().toString(),
      ('0' + (dt.getMonth() + 1)).slice(-2),
      ('0' + dt.getDate()).slice(-2),
    ].join('-');

    // Cookieに保存（1日間有効）
    document.cookie = `localDate=${date}; path=/; max-age=10`;
  }, []);

  return null; // 表示UIは不要
}