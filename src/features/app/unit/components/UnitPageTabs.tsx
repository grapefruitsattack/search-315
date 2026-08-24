'use client';

import { useState, useEffect } from 'react';
import {
  MessageCircleWarning,
  Music,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const sections = [
  {
    id: 'unit-music',
    label: '楽曲',
    icon: Music,
  },
  {
    id: 'unit-story',
    label: 'ストーリー',
    icon: BookOpen,
  },
  {
    id: 'unit-other',
    label: 'その他',
    icon: Sparkles,
  },
] as const;

type SectionId = typeof sections[number]['id'];

export default function UnitPageTabs() {
  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);

    if (!element) return;

    const headerHeight =
      window.innerWidth < 1000
        ? window.innerWidth >= 768
          ? 66
          : 58
        : 0;

    const rect = element.getBoundingClientRect();

    window.scrollTo({
      top:
        window.scrollY +
        rect.top -
        headerHeight -
        48, // セクションナビ自身の高さ
      behavior: 'smooth',
    });
  };

  const [activeSection, setActiveSection] =
  useState<SectionId>('unit-music');

  useEffect(() => {
    const elements = sections
      .map(section =>
        document.getElementById(section.id)
      )
      .filter(
        (element): element is HTMLElement =>
          element !== null
      );

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        const active =
          visibleEntries[0]?.target.id;

        if (active) {
          setActiveSection(
            active as SectionId
          );
        }
      },
      {
        rootMargin: '-120px 0px -60% 0px',
        threshold: 0,
      }
    );

    elements.forEach(element =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="
        sticky
        top-[58px]
        tablet:top-[66px]
        lg:top-0
        z-40 bg-white
      "
      aria-label="ページ内ナビゲーション"
    >
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-[950px] gap-1 mobileL:gap-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  scrollToSection(section.id)
                }
                className={`
                  flex flex-1 items-center justify-center
                  gap-1 px-1 text-xs mobileL:text-base
                  py-3 mobileL:py-2
                  rounded-xl
                  transition-all duration-300
                  hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 
                  ${
                    activeSection === section.id
                      ? 'bg-gray-500 font-bold text-white'
                      : 'text-gray-600 bg-gray-100'
                  }
                `}
              >
                <Icon
                  className="
                    h-[19px]
                    w-[19px]
                    tablet:h-[21px]
                    tablet:w-[21px]
                  "
                />

                <span>
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}