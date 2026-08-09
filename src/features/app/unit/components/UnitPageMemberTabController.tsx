'use client';

import {
  useEffect,
  useState,
} from 'react';

import type { SingingMaster } from '@/data/types';

type Props = {
  unitId: string;
  unitMember: SingingMaster[];
  children: (
    member: string
  ) => React.ReactNode;
};

const getMemberFromUrl = (
  unitId: string,
  unitMember: SingingMaster[],
): string => {
  const params = new URLSearchParams(
    window.location.search
  );

  const m = params.get('m');

  if (m === 'unit' || m === unitId) {
    return 'unit';
  }

  if (
    m !== null &&
    unitMember.some(
      data =>
        data.singingInfoId === m
    )
  ) {
    return m;
  }

  return 'unit';
};

export default function UnitPageMemberTabController({
  unitId,
  unitMember,
  children,
}: Props) {
  const [member, setMember] = useState(
    'unit'
  );

  useEffect(() => {
    const updateMember = () => {
      setMember(
        getMemberFromUrl(
          unitId,
          unitMember
        )
      );
    };

    window.addEventListener(
      'popstate',
      updateMember
    );

    window.addEventListener(
      'pageshow',
      updateMember
    );

    // 初期状態もURLから取得
    updateMember();

    return () => {
      window.removeEventListener(
        'popstate',
        updateMember
      );

      window.removeEventListener(
        'pageshow',
        updateMember
      );
    };
  }, [unitId, unitMember]);

  const changeMember = (
    newMember: string
  ) => {
    setMember(newMember);

    const url = new URL(
      window.location.href
    );

    url.searchParams.set(
      'm',
      newMember
    );

    window.history.replaceState(
      window.history.state,
      '',
      url
    );
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-1 font-bold px-2">
        <button
          type="button"
          className={`
            border border-2 rounded-xl px-2 py-[2px]
            ${
              member === 'unit'
                ? 'bg-green-400 border-green-400 text-stone-50 pointer-events-none'
                : 'bg-stone-200/20 border-stone-200 text-stone-500'
            }
          `}
          disabled={member === 'unit'}
          onClick={() =>
            changeMember('unit')
          }
        >
          ユニット
        </button>

        {unitMember.map((data) => (
          <button
            type="button"
            key={data.singingInfoId}
            className={`
              border border-2 rounded-xl px-2 py-[2px]
              ${
                member ===
                data.singingInfoId
                  ? 'bg-green-400 border-green-400 text-stone-50 pointer-events-none'
                  : 'bg-stone-200/20 border-stone-200 text-stone-500'
              }
            `}
            disabled={
              member ===
              data.singingInfoId
            }
            onClick={() =>
              changeMember(
                data.singingInfoId
              )
            }
          >
            {data.singingInfoId === 'CFP03'
              ? 'アスラン＝BBⅡ世'
              : data.singingInfoName}
          </button>
        ))}
      </div>

      {children(member)}
    </>
  );
}