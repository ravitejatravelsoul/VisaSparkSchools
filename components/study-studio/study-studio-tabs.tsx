"use client";

import { useId, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { TodayPanel } from "@/components/study-studio/today-panel";
import { Skeleton } from "@/components/ui/skeleton";

// Only the "Today" tab (lightweight -- no per-course quiz content) loads
// eagerly, since it's the default landing view. Every other tab is loaded
// on demand, so the Study Studio landing page's initial bundle never
// includes the Review flashcard engine's quiz content, the planner's
// course-selection UI, or any other tab nobody has opened yet.
const StudyPlanPanel = dynamic(
  () => import("@/components/study-studio/study-plan-panel").then((m) => m.StudyPlanPanel),
  { loading: () => <Skeleton className="h-40 w-full" /> },
);
const ReviewPanel = dynamic(
  () => import("@/components/study-studio/review-panel").then((m) => m.ReviewPanel),
  { loading: () => <Skeleton className="h-40 w-full" /> },
);
const FocusPanel = dynamic(
  () => import("@/components/study-studio/focus-panel").then((m) => m.FocusPanel),
  { loading: () => <Skeleton className="h-40 w-full" /> },
);
const InsightsPanel = dynamic(
  () => import("@/components/study-studio/insights-panel").then((m) => m.InsightsPanel),
  { loading: () => <Skeleton className="h-40 w-full" /> },
);
const SavedLearningPanel = dynamic(
  () => import("@/components/study-studio/saved-learning-panel").then((m) => m.SavedLearningPanel),
  { loading: () => <Skeleton className="h-40 w-full" /> },
);

const TABS = [
  { id: "today", label: "Today", Panel: TodayPanel },
  { id: "plan", label: "Study Plan", Panel: StudyPlanPanel },
  { id: "review", label: "Review", Panel: ReviewPanel },
  { id: "focus", label: "Focus", Panel: FocusPanel },
  { id: "insights", label: "Insights", Panel: InsightsPanel },
  { id: "saved", label: "Saved Learning", Panel: SavedLearningPanel },
] as const;

type TabId = (typeof TABS)[number]["id"];

function isTabId(value: string | null): value is TabId {
  return TABS.some((t) => t.id === value);
}

export function StudyStudioTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requested = searchParams.get("tab");
  const activeTab: TabId = isTabId(requested) ? requested : "today";
  const formId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setTab = (id: TabId) => {
    router.push(`${pathname}?tab=${id}`, { scroll: false });
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = TABS.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const nextTab = TABS[nextIndex];
    setTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  const ActivePanel = TABS.find((t) => t.id === activeTab)?.Panel ?? TodayPanel;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Study Studio sections"
        className="flex flex-wrap gap-1 border-b border-(--color-border)"
      >
        {TABS.map((tab, index) => {
          const selected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`${formId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${formId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(tab.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={
                selected
                  ? "rounded-t-lg border-b-2 border-(--color-accent) px-4 py-2.5 text-sm font-medium text-(--color-ink)"
                  : "rounded-t-lg border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-(--color-ink-muted) hover:text-(--color-ink)"
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${formId}-panel-${activeTab}`}
        aria-labelledby={`${formId}-tab-${activeTab}`}
        tabIndex={0}
        className="pt-6"
      >
        <ActivePanel />
      </div>
    </div>
  );
}
