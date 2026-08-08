'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { SingingMaster } from '@/data/types';
import UnitPageTabs from '@/features/app/unit/components/UnitPageTabs';

type Props = {
  type: string;
  story: ReactNode;
  music: ReactNode;
  other: ReactNode;
  recommend: ReactNode;
};

const TAB_ELEMENT_ID = 'unitpagetab';

const VALID_TYPES = [
  'story',
  'music',
  'recommend',
  'other',
] as const;

type TabType = typeof VALID_TYPES[number];

const normalizeType = (type: string): TabType => {
  return VALID_TYPES.includes(type as TabType)
    ? type as TabType
    : 'recommend';
};

export default function UnitPageTabController({
  type: initialType,
  story,
  music,
  other,
  recommend,
}: Props) {
  const [type, setType] = useState<TabType>(
    normalizeType(initialType)
  );

  // ブラウザの戻る・進む
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('t');

      setType(normalizeType(t ?? 'recommend'));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const changeTab = (newType: TabType) => {
    setType(newType);

    const url = new URL(window.location.href);

    url.searchParams.set('t', newType);

    // Next.jsのServer Componentを再実行しない
    window.history.pushState({}, '', url);
  };

  return (
    <>
      <UnitPageTabs
        type={type}
        onChange={changeTab}
      />

      <div className={type === 'story' ? '' : 'hidden'}>
        {story}
      </div>

      <div className={type === 'music' ? '' : 'hidden'}>
        {music}
      </div>

      <div className={type === 'other' ? '' : 'hidden'}>
        {other}
      </div>

      <div className={type === 'recommend' ? '' : 'hidden'}>
        {recommend}
      </div>
    </>
  );
}