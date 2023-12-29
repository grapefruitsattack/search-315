import { useCallback, useEffect, useState } from 'react'

const STORAGE_SNOW_PARAM = 'snowParam';

export function useSnowParam(
  defaultValue: {snowIsValid: string, noticeCheckedYear: string}
): [snowParam: {snowIsValid: string, noticeCheckedYear: string}
  , setSnowParam: (snowParam: {snowIsValid: string, noticeCheckedYear: string}) => void
  ] {
  const [storageInternal, setStorageInternal] = useState(defaultValue);

  // クライアントでの初期レンダリング直後にローカルストレージの設定を反映
  useEffect(() => {
    const jsonStr = localStorage.getItem(STORAGE_SNOW_PARAM);
    const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string} 
      = jsonStr===null?{snowIsValid:'1',noticeCheckedYear:''}:JSON.parse(jsonStr);
    if(defaultValue!==currentSnowParam){
      setStorageInternal(currentSnowParam);
    };
  }, [setStorageInternal]);

  // 外部からのセッター呼び出し時にローカルストレージに値を保存する
  const setData = useCallback(
    (param: {snowIsValid: string, noticeCheckedYear: string} ) => {
      localStorage.setItem(STORAGE_SNOW_PARAM, JSON.stringify(param));
      setStorageInternal(param);
    },
    [setStorageInternal]
  );

  return [storageInternal, setData]
}