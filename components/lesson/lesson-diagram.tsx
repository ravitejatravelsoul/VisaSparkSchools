/**
 * Issue 6 (visuals audit): `lesson.visual` already existed as a content
 * field (title + free-text description of a diagram), but no component
 * ever rendered it as an actual diagram -- lesson pages showed only the
 * description text. That's a real comprehension gap for a handful of
 * lessons whose concept is genuinely spatial (CSS box model, flexbox axes,
 * grid tracks, Git branch topology): prose alone under-serves "where is
 * this positioned relative to that."
 *
 * Rather than attempt to auto-generate a diagram from arbitrary free text
 * (inaccurate, uncontrolled) or add one for all ~35 lessons that carry a
 * `visual` field (most -- reasoning puzzles, interview STAR-method
 * structure -- aren't actually spatial and are already well served by
 * text), this renders a small, hand-built, accurate SVG for the specific
 * lessons where a diagram clearly earns its place, keyed by lesson slug.
 * Every other lesson with a `visual` field keeps exactly its previous
 * text-only rendering (see the lesson page's fallback).
 */
import type { SVGProps } from "react";

function DiagramFrame({
  title,
  children,
  viewBox,
}: {
  title: string;
  children: React.ReactNode;
  viewBox: string;
}) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={viewBox}
      className="h-auto w-full max-w-md"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

const textProps: SVGProps<SVGTextElement> = {
  fontSize: 12,
  fontFamily: "inherit",
  fill: "var(--color-ink)",
};

const mutedTextProps: SVGProps<SVGTextElement> = {
  fontSize: 10,
  fontFamily: "inherit",
  fill: "var(--color-ink-muted)",
};

function BoxModelDiagram({ title }: { title: string }) {
  const layers = [
    { label: "margin", size: 160, fill: "none", stroke: "var(--color-border)" },
    {
      label: "border",
      size: 130,
      fill: "var(--color-surface-sunken)",
      stroke: "var(--color-border-strong)",
    },
    {
      label: "padding",
      size: 100,
      fill: "var(--color-brand-contrast)",
      stroke: "var(--color-border)",
    },
    { label: "content", size: 60, fill: "var(--color-brand)", stroke: "none" },
  ];
  return (
    <DiagramFrame title={title} viewBox="0 0 200 200">
      {layers.map((layer) => {
        const offset = (200 - layer.size) / 2;
        return (
          <rect
            key={layer.label}
            x={offset}
            y={offset}
            width={layer.size}
            height={layer.size}
            fill={layer.fill}
            stroke={layer.stroke}
            strokeWidth={1.5}
            strokeDasharray={layer.label === "margin" ? "4 3" : undefined}
          />
        );
      })}
      <text x={100} y={16} textAnchor="middle" {...mutedTextProps}>
        margin
      </text>
      <text x={100} y={40} textAnchor="middle" {...mutedTextProps}>
        border
      </text>
      <text x={100} y={64} textAnchor="middle" {...mutedTextProps}>
        padding
      </text>
      <text x={100} y={104} textAnchor="middle" fill="var(--color-brand-contrast)" fontSize={11}>
        content
      </text>
    </DiagramFrame>
  );
}

function FlexboxAxesDiagram({ title }: { title: string }) {
  return (
    <DiagramFrame title={title} viewBox="0 0 240 160">
      <rect
        x={10}
        y={10}
        width={220}
        height={140}
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth={1.5}
        rx={8}
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={30 + i * 62}
          y={60}
          width={44}
          height={40}
          fill="var(--color-brand-contrast)"
          stroke="var(--color-border)"
          rx={4}
        />
      ))}
      {/* main axis arrow (row, left to right) */}
      <line
        x1={20}
        y1={140}
        x2={220}
        y2={140}
        stroke="var(--color-brand)"
        strokeWidth={2}
        markerEnd="url(#arrow-main)"
      />
      <text x={120} y={155} textAnchor="middle" {...textProps} fill="var(--color-brand-strong)">
        main axis — justify-content
      </text>
      {/* cross axis arrow (column, top to bottom) */}
      <line
        x1={20}
        y1={20}
        x2={20}
        y2={130}
        stroke="var(--color-accent)"
        strokeWidth={2}
        markerEnd="url(#arrow-cross)"
      />
      <text x={24} y={30} {...mutedTextProps} fill="var(--color-accent)">
        cross axis
      </text>
      <text x={24} y={42} {...mutedTextProps} fill="var(--color-accent)">
        align-items
      </text>
      <defs>
        <marker id="arrow-main" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-brand)" />
        </marker>
        <marker id="arrow-cross" markerWidth={8} markerHeight={8} refX={3} refY={6} orient="auto">
          <path d="M0,0 L3,6 L6,0 Z" fill="var(--color-accent)" />
        </marker>
      </defs>
    </DiagramFrame>
  );
}

function GridTracksDiagram({ title }: { title: string }) {
  const cols = [10, 76, 142, 208];
  return (
    <DiagramFrame title={title} viewBox="0 0 220 140">
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={cols[i] + 4}
          y={20}
          width={58}
          height={90}
          fill="var(--color-brand-contrast)"
          stroke="var(--color-border)"
          rx={4}
        />
      ))}
      {cols.map((x, i) => (
        <g key={x}>
          <line
            x1={x}
            y1={10}
            x2={x}
            y2={120}
            stroke="var(--color-border-strong)"
            strokeWidth={1.5}
            strokeDasharray="3 2"
          />
          <text x={x} y={8} textAnchor="middle" {...mutedTextProps}>
            {i + 1}
          </text>
        </g>
      ))}
      <text x={110} y={135} textAnchor="middle" {...mutedTextProps}>
        grid-template-columns: repeat(3, 1fr)
      </text>
    </DiagramFrame>
  );
}

function GitBranchDiagram({ title }: { title: string }) {
  const mainY = 100;
  const featureY = 40;
  return (
    <DiagramFrame title={title} viewBox="0 0 280 130">
      {/* main branch line */}
      <line
        x1={20}
        y1={mainY}
        x2={260}
        y2={mainY}
        stroke="var(--color-border-strong)"
        strokeWidth={2}
      />
      {/* feature branch line */}
      <path
        d={`M 80,${mainY} C 90,${mainY} 90,${featureY} 100,${featureY} L 180,${featureY} C 190,${featureY} 190,${mainY} 200,${mainY}`}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth={2}
      />
      {[
        { x: 40, y: mainY, label: "1" },
        { x: 80, y: mainY, label: "2" },
        { x: 200, y: mainY, label: "3" },
        { x: 240, y: mainY, label: "6", merge: true },
      ].map((c) => (
        <g key={`main-${c.x}`}>
          <circle
            cx={c.x}
            cy={c.y}
            r={c.merge ? 8 : 6}
            fill="var(--color-surface)"
            stroke="var(--color-border-strong)"
            strokeWidth={2}
          />
          <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize={9} fill="var(--color-ink)">
            {c.label}
          </text>
        </g>
      ))}
      {[
        { x: 130, y: featureY, label: "4" },
        { x: 170, y: featureY, label: "5" },
      ].map((c) => (
        <g key={`feature-${c.x}`}>
          <circle
            cx={c.x}
            cy={c.y}
            r={6}
            fill="var(--color-brand-contrast)"
            stroke="var(--color-brand)"
            strokeWidth={2}
          />
          <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize={9} fill="var(--color-ink)">
            {c.label}
          </text>
        </g>
      ))}
      <text x={20} y={mainY + 20} {...mutedTextProps}>
        main
      </text>
      <text x={100} y={featureY - 10} {...mutedTextProps} fill="var(--color-brand-strong)">
        feature/login-page
      </text>
      <text x={240} y={mainY + 20} textAnchor="middle" {...mutedTextProps}>
        merge commit
      </text>
    </DiagramFrame>
  );
}

const diagramsByLessonSlug: Record<string, (props: { title: string }) => React.ReactElement> = {
  "css-box-model": BoxModelDiagram,
  "css-flexbox": FlexboxAxesDiagram,
  "css-grid": GridTracksDiagram,
  "git-branching-merging": GitBranchDiagram,
};

export function LessonDiagram({ lessonSlug, title }: { lessonSlug: string; title: string }) {
  const Diagram = diagramsByLessonSlug[lessonSlug];
  if (!Diagram) return null;
  return (
    <div className="mb-3 flex justify-center rounded-lg bg-(--color-surface) p-4">
      <Diagram title={title} />
    </div>
  );
}
