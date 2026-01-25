import { useCallback, useEffect, useState } from 'react'

const STORAGE_SHARE_SERVICE = 'shareService';

export function useShareService(
  defaultValue: string
): [shareService: string, setShareService: (shareService: string) => void] {
  const [shareServiceInternal, setShareServiceInternal] = useState(defaultValue)

  // クライアントでの初期レンダリング直後にローカルストレージの設定を反映
  useEffect(() => {
    const shareService: string = localStorage.getItem(STORAGE_SHARE_SERVICE) || '';
    if (shareService !== defaultValue) {
        setShareServiceInternal(shareService)
    }
  }, [setShareServiceInternal]);

  // 外部からのセッター呼び出し時にローカルストレージに値を保存する
  const setShareService = useCallback(
    (shareService: string) => {
      localStorage.setItem(STORAGE_SHARE_SERVICE, shareService);
      setShareServiceInternal(shareService);
    },
    [setShareServiceInternal]
  );

  return [shareServiceInternal, setShareService]
}