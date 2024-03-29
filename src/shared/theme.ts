import { css, keyframes } from "styled-components";

/** 자주 사용하는 색상들 ( [tailwindcss](https://tailwindcss.com/docs/customizing-colors) ) */
const colors = {
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  slate900: "#0f172a",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",
  zinc50: "#fafafa",
  zinc100: "#f4f4f5",
  zinc200: "#e4e4e7",
  zinc300: "#d4d4d8",
  zinc400: "#a1a1aa",
  zinc500: "#71717a",
  zinc600: "#52525b",
  zinc700: "#3f3f46",
  zinc800: "#27272a",
  zinc900: "#18181b",
  neutral50: "#fafafa",
  neutral100: "#f5f5f5",
  neutral200: "#e5e5e5",
  neutral300: "#d4d4d4",
  neutral400: "#a3a3a3",
  neutral500: "#737373",
  neutral600: "#525252",
  neutral700: "#404040",
  neutral800: "#262626",
  neutral900: "#171717",
  stone50: "#fafaf9",
  stone100: "#f5f5f4",
  stone200: "#e7e5e4",
  stone300: "#d6d3d1",
  stone400: "#a8a29e",
  stone500: "#78716c",
  stone600: "#57534e",
  stone700: "#44403c",
  stone800: "#292524",
  stone900: "#1c1917",
  red50: "#fef2f2",
  red100: "#fee2e2",
  red200: "#fecaca",
  red300: "#fca5a5",
  red400: "#f87171",
  red500: "#ef4444",
  red600: "#dc2626",
  red700: "#b91c1c",
  red800: "#991b1b",
  red900: "#7f1d1d",
  orange50: "#fff7ed",
  orange100: "#ffedd5",
  orange200: "#fed7aa",
  orange300: "#fdba74",
  orange400: "#fb923c",
  orange500: "#f97316",
  orange600: "#ea580c",
  orange700: "#c2410c",
  orange800: "#9a3412",
  orange900: "#7c2d12",
  amber50: "#fffbeb",
  amber100: "#fef3c7",
  amber200: "#fde68a",
  amber300: "#fcd34d",
  amber400: "#fbbf24",
  amber500: "#f59e0b",
  amber600: "#d97706",
  amber700: "#b45309",
  amber800: "#92400e",
  amber900: "#78350f",
  yellow50: "#fefce8",
  yellow100: "#fef9c3",
  yellow200: "#fef08a",
  yellow300: "#fde047",
  yellow400: "#facc15",
  yellow500: "#eab308",
  yellow600: "#ca8a04",
  yellow700: "#a16207",
  yellow800: "#854d0e",
  yellow900: "#713f12",
  lime50: "#f7fee7",
  lime100: "#ecfccb",
  lime200: "#d9f99d",
  lime300: "#bef264",
  lime400: "#a3e635",
  lime500: "#84cc16",
  lime600: "#65a30d",
  lime700: "#4d7c0f",
  lime800: "#3f6212",
  lime900: "#365314",
  green50: "#f0fdf4",
  green100: "#dcfce7",
  green200: "#bbf7d0",
  green300: "#86efac",
  green400: "#4ade80",
  green500: "#22c55e",
  green600: "#16a34a",
  green700: "#15803d",
  green800: "#166534",
  green900: "#14532d",
  emerald50: "#ecfdf5",
  emerald100: "#d1fae5",
  emerald200: "#a7f3d0",
  emerald300: "#6ee7b7",
  emerald400: "#34d399",
  emerald500: "#10b981",
  emerald600: "#059669",
  emerald700: "#047857",
  emerald800: "#065f46",
  emerald900: "#064e3b",
  teal50: "#f0fdfa",
  teal100: "#ccfbf1",
  teal200: "#99f6e4",
  teal300: "#5eead4",
  teal400: "#2dd4bf",
  teal500: "#14b8a6",
  teal600: "#0d9488",
  teal700: "#0f766e",
  teal800: "#115e59",
  teal900: "#134e4a",
  cyan50: "#ecfeff",
  cyan100: "#cffafe",
  cyan200: "#a5f3fc",
  cyan300: "#67e8f9",
  cyan400: "#22d3ee",
  cyan500: "#06b6d4",
  cyan600: "#0891b2",
  cyan700: "#0e7490",
  cyan800: "#155e75",
  cyan900: "#164e63",
  sky50: "#f0f9ff",
  sky100: "#e0f2fe",
  sky200: "#bae6fd",
  sky300: "#7dd3fc",
  sky400: "#38bdf8",
  sky500: "#0ea5e9",
  sky600: "#0284c7",
  sky700: "#0369a1",
  sky800: "#075985",
  sky900: "#0c4a6e",
  blue50: "#eff6ff",
  blue100: "#dbeafe",
  blue200: "#bfdbfe",
  blue300: "#93c5fd",
  blue400: "#60a5fa",
  blue500: "#3b82f6",
  blue600: "#2563eb",
  blue700: "#1d4ed8",
  blue800: "#1e40af",
  blue900: "#1e3a8a",
  indigo50: "#eef2ff",
  indigo100: "#e0e7ff",
  indigo200: "#c7d2fe",
  indigo300: "#a5b4fc",
  indigo400: "#818cf8",
  indigo500: "#6366f1",
  indigo600: "#4f46e5",
  indigo700: "#4338ca",
  indigo800: "#3730a3",
  indigo900: "#312e81",
  violet50: "#f5f3ff",
  violet100: "#ede9fe",
  violet200: "#ddd6fe",
  violet300: "#c4b5fd",
  violet400: "#a78bfa",
  violet500: "#8b5cf6",
  violet600: "#7c3aed",
  violet700: "#6d28d9",
  violet800: "#5b21b6",
  violet900: "#4c1d95",
  purple50: "#faf5ff",
  purple100: "#f3e8ff",
  purple200: "#e9d5ff",
  purple300: "#d8b4fe",
  purple400: "#c084fc",
  purple500: "#a855f7",
  purple600: "#9333ea",
  purple700: "#7e22ce",
  purple800: "#6b21a8",
  purple900: "#581c87",
  fuchsia50: "#fdf4ff",
  fuchsia100: "#fae8ff",
  fuchsia200: "#f5d0fe",
  fuchsia300: "#f0abfc",
  fuchsia400: "#e879f9",
  fuchsia500: "#d946ef",
  fuchsia600: "#c026d3",
  fuchsia700: "#a21caf",
  fuchsia800: "#86198f",
  fuchsia900: "#701a75",
  pink50: "#fdf2f8",
  pink100: "#fce7f3",
  pink200: "#fbcfe8",
  pink300: "#f9a8d4",
  pink400: "#f472b6",
  pink500: "#ec4899",
  pink600: "#db2777",
  pink700: "#be185d",
  pink800: "#9d174d",
  pink900: "#831843",
  rose50: "#fff1f2",
  rose100: "#ffe4e6",
  rose200: "#fecdd3",
  rose300: "#fda4af",
  rose400: "#fb7185",
  rose500: "#f43f5e",
  rose600: "#e11d48",
  rose700: "#be123c",
  rose800: "#9f1239",
  rose900: "#881337",

  main50: "#eef2ff",
  main100: "#e0e7ff",
  main200: "#c7d2fe",
  main300: "#a5b4fc",
  main400: "#818cf8",
  main500: "#6366f1",
  main600: "#4f46e5",
  main700: "#4338ca",
  main800: "#3730a3",
  main900: "#312e81",

  bg: "",
  fg: "",
  bgGray: "",
  fgGray: "",
};

/** 검정 테마 */
export const darkTheme = {
  bg: "#20262E",
  fg: "#F5F4F4",
  bgGray: "#D9D9D9",
  fgGray: "#343434",
};
/** 흰색 테마 */
export const lightTheme = {
  bg: "#F5F4F4",
  fg: "#20262E",
  bgGray: "#343434",
  fgGray: "#D9D9D9",
};

/** 반응형 사이즈 */
const mediaSize = {
  xs: `screen and (max-width: 400px)`,
  sm: `screen and (max-width: 640px)`,
  md: `screen and (max-width: 768px)`,
  lg: `screen and (max-width: 1024px)`,
  xl: `screen and (max-width: 1280px)`,
  "2xl": `screen and (max-width: 1536px)`,
  "3xl": `screen and (max-width: 1920px)`,
};

/** 폰트 크기 */
const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
};

/** 그 외의 크기 */
const size = {
  xs: "0.2em",
  sm: "0.4em",
  md: "0.6em",
  lg: "1em",
  xl: "1.4em",
  "2xl": "1.6em",
};

/** 유틸리티 */
const util = {
  /** "..." */
  truncate: () => css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  /** 스크롤 바 디자인 변경 */
  scroll: () => css`
    &::-webkit-scrollbar {
      /** 스크롤바의 너비 */
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      /** 스크롤바 길이 */
      height: 25%;
      /** 스크롤바의 색상 */
      background: ${({ theme }) => theme.colors.indigo600};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      /** 스크롤바 뒷 배경 색상 */
      background: ${({ theme }) => theme.colors.indigo300};
    }
  `,

  /** 스크롤 바 숨기기 */
  noScroll: () => css`
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  /** 2023/03/10 - 텍스트 라인 제한 - by 1-blue */
  lineClamp: (line: number) => () =>
    css`
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${line};
      overflow: hidden;
    `,
};

/** 애니메이션 */
const animation = {
  fadeUp: keyframes`
    0% {
      opacity: 0.01;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  `,
  fadeIn: keyframes`
    0% {
      opacity: 0.01;
    }
    100% {
      opacity: 1;
    }
  `,
  spinY: keyframes`
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  `,
  bounce: keyframes`
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  `,
  gradient: keyframes`
    0% {
      background-color: rgba(165, 165, 165, 0.5);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.8);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.5);
    }
  `,
};

/** 현재 상태 ( true: "dark" ) / ( false: "light" ) */
const isDark = false;

/** "styled-components"의 각종 설정 값 */
const theme = {
  colors,
  mediaSize,
  fontSize,
  size,
  util,
  animation,
  isDark,
};

export default theme;

export type Theme = typeof theme;
