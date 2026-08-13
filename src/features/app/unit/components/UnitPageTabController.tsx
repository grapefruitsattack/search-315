'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import UnitPageTabs from '@/features/app/unit/components/UnitPageTabs_bk';

type TabType =
  | 'story'
  | 'music'
  | 'recommend'
  | 'other';

type Props = {
  type: string;
  story: ReactNode;
  music: ReactNode;
  other: ReactNode;
  recommend: ReactNode;
};

const VALID_TYPES: TabType[] = [
  'story',
  'music',
  'recommend',
  'other',
];

const normalizeType = (
  type: string
): TabType => {
  return VALID_TYPES.includes(type as TabType)
    ? type as TabType
    : 'recommend';
};

const getTypeFromUrl = (
  fallback: string
): TabType => {
  const params = new URLSearchParams(
    window.location.search
  );

  return normalizeType(
    params.get('t') ?? fallback
  );
};

export default function UnitPageTabController({
  type: initialType,
  story,
  music,
  other,
  recommend,
}: Props) {
  const [type, setType] = useState<TabType>(
    () => {
      if (typeof window === 'undefined') {
        return normalizeType(initialType);
      }

      return getTypeFromUrl(initialType);
    }
  );

  useEffect(() => {
    const updateType = () => {
      setType(
        getTypeFromUrl(initialType)
      );
    };

    window.addEventListener(
      'popstate',
      updateType
    );

    window.addEventListener(
      'pageshow',
      updateType
    );

    return () => {
      window.removeEventListener(
        'popstate',
        updateType
      );

      window.removeEventListener(
        'pageshow',
        updateType
      );
    };
  }, [initialType]);

  const changeTab = (
    newType: TabType
  ) => {
    setType(newType);

    const url = new URL(
      window.location.href
    );

    url.searchParams.set(
      't',
      newType
    );

    window.history.replaceState(
      window.history.state,
      '',
      url
    );
  };

  return (
    <>
      <UnitPageTabs
        type={type}
        onChange={changeTab}
      />

      <div
        className={
          type === 'story'
            ? ''
            : 'hidden'
        }
      >
        {story}
      </div>

      <div
        className={
          type === 'music'
            ? ''
            : 'hidden'
        }
      >
        {music}
      </div>

      <div
        className={
          type === 'other'
            ? ''
            : 'hidden'
        }
      >
        {other}
      </div>

      <div
        className={
          type === 'recommend'
            ? ''
            : 'hidden'
        }
      >
        {recommend}
      </div>
    </>
  );
}