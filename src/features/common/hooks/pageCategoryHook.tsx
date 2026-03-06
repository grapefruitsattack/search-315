import { useCallback, useEffect, useState } from 'react';
import { hasAnalyticsConsent } from "@/lib/analytics";

const STORAGE_PAGE_CATEGORY = 'pageCategory';

export function getPageCategory(){
  return localStorage.getItem(STORAGE_PAGE_CATEGORY) || '';
}

export function usePageCategory(
  defaultValue: string
): [pageCategory: string, setPageCategory: (pageCategory: string) => void] {
  const [pageCategoryInternal, setPageCategoryInternal] = useState(defaultValue)

  // クライアントでの初期レンダリング直後にローカルストレージの設定を反映
  useEffect(() => {
    const pageCategory: string = localStorage.getItem(STORAGE_PAGE_CATEGORY) || '';
    if (pageCategory !== defaultValue) {
        setPageCategoryInternal(pageCategory);
        if(hasAnalyticsConsent()) document.cookie = `pageCategory=${pageCategory}; path=/;`;
    }
  }, [setPageCategoryInternal]);

  // 外部からのセッター呼び出し時にローカルストレージに値を保存する
  const setPageCategory = useCallback(
    (pageCategory: string) => {
      localStorage.setItem(STORAGE_PAGE_CATEGORY, pageCategory);
      setPageCategoryInternal(pageCategory);
      if(hasAnalyticsConsent()) document.cookie = `pageCategory=${pageCategory}; path=/;`;
    },
    [setPageCategoryInternal]
  );

  return [pageCategoryInternal, setPageCategory]
}