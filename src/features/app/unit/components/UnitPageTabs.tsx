'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { hasAnalyticsConsent } from "@/lib/analytics";
import { usePageCategory } from "@/features/common/hooks/pageCategoryHook";
import type { SingingMaster } from '@/data/types';
import {
  Music,
  BookOpen,
  MessageCircleWarning,
  Sparkles
} from 'lucide-react';

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const TAB_ELEMENT_ID = 'unitpagetab';
const SESSION_STORAGE_ITEM_ID = 'navigatewithtab';

const VALID_TYPES = [
  'story',
  'music',
  'recommend',
  'other',
] as const;

type TabType = typeof VALID_TYPES[number];

type Props = {
  type: string;
  onChange: (type: TabType) => void;
};

export default function UnitPageTabs({
  type,
  onChange,
}: Props) {
  const currentPath = usePathname();
  const [pageCategory, setPageCategory] = usePageCategory('');

  const scrollFunction = (targetElementId: string) => {
    const element = document.getElementById(targetElementId);

    if (element !== null) {
      const targetDOMRect = element.getBoundingClientRect();
      const targetTop =
        targetDOMRect.top + window.pageYOffset;

      const headerHeight =
        window.innerWidth >= 1000 ? 5 : 70;

      window.scrollTo({
        top: targetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (
      sessionStorage.getItem(SESSION_STORAGE_ITEM_ID) !== "1"
    ) {
      return;
    }

    requestAnimationFrame(() => {
      scrollFunction(TAB_ELEMENT_ID);
      sessionStorage.removeItem(SESSION_STORAGE_ITEM_ID);
    });
  }, []);

  const handleTabChange = (newType: TabType) => {
    setPageCategory(newType);

    sessionStorage.setItem(
      SESSION_STORAGE_ITEM_ID,
      '1'
    );

    onChange(newType);
  };

  return (
    <div>
      <div
        className="flex mb-5 gap-0 flex-wrap px-0 mobileS:px-2"
        role="tablist"
        aria-label="tab options"
        id={TAB_ELEMENT_ID}
      >
        <Tabs
          value={
            VALID_TYPES.includes(type as TabType)
              ? type
              : 'recommend'
          }
          onValueChange={(value) => {
            if (
              VALID_TYPES.includes(value as TabType)
            ) {
              handleTabChange(value as TabType);
            }
          }}
        >
          <TabsList className="h-fit">

          <TabsTrigger
            value="recommend"
            className="px-2.5 sm:px-3"
          >
            <div className="flex flex-col items-center justify-center text-xs mobileL:text-sm tablet:text-base">
              <MessageCircleWarning className="w-[40px] tablet:w-[44px]" />
              <div>オススメ</div>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="music"
            className="px-2.5 sm:px-3"
          >
            <div className="flex flex-col items-center justify-center text-xs mobileL:text-sm tablet:text-base">
              <Music className="w-[40px] tablet:w-[44px]" />
              <div>楽曲</div>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="story"
            className="px-2.5 sm:px-3"
          >
            <div className="flex flex-col items-center justify-center text-xs mobileL:text-sm tablet:text-base">
              <BookOpen className="w-[40px] tablet:w-[44px]" />
              <div>ストーリー</div>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="other"
            className="px-2.5 sm:px-3"
          >
            <div className="flex flex-col items-center justify-center text-xs mobileL:text-sm tablet:text-base">
              <Sparkles className="w-[40px] tablet:w-[44px]" />
              <div>その他</div>
            </div>
          </TabsTrigger>

          </TabsList>
        </Tabs>
      </div>


    </div>
  );
}