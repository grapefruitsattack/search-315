import { useCallback, useEffect, useState } from 'react'

const STORAGE_SUBSC_SERVICE = 'subscService';

export function getSubscService(): string {
  let text: string = 'youtube';
  if(typeof window !== 'undefined') text = localStorage.getItem(STORAGE_SUBSC_SERVICE)||text;
  return text;
};

export function useSubscService(
  defaultValue: string
): [subscService: string, setDark: (subscService: string) => void] {
  const [subscServiceInternal, setSubscServiceInternal] = useState(defaultValue)

  // クライアントでの初期レンダリング直後にローカルストレージの設定を反映
  useEffect(() => {
    const subscService: string = localStorage.getItem(STORAGE_SUBSC_SERVICE) || '';
    if (subscService !== defaultValue) {
        setSubscServiceInternal(subscService)
    }
  }, [setSubscServiceInternal]);

  // 外部からのセッター呼び出し時にローカルストレージに値を保存する
  const setSubscService = useCallback(
    (subscService: string) => {
      localStorage.setItem(STORAGE_SUBSC_SERVICE, subscService);
      setSubscServiceInternal(subscService);
    },
    [setSubscServiceInternal]
  );

  return [subscServiceInternal, setSubscService]
}