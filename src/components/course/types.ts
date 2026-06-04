/**
 * Shared types and theme map used by every course page.
 * Each course page is a thin wrapper that hands a CourseConfig to <CourseLayout/>.
 */

export type Accent = "t-green" | "t-gold" | "t-blue" | "t-red";

export type Lecture = {
  id: string;
  label: string;     // "Lecture One"
  no: string;        // "01"
  title: string;
  body: string;
  duration: string;  // "90 min · Live"
  thumb: string;     // image path
  detailPath?: string; // optional route to lecture detail page
};

export type CurriculumItem = {
  num: string;
  title: string;
  body: string;
};

export type CourseAction = {
  /** "navigate" routes via react-router; "anchor" jumps to a page-local id. */
  type: "navigate" | "anchor";
  target: string;
  label: string;
};

export type RegisterItem = { icon: string; text: string };

export type CourseConfig = {
  /** Routing slug + UI identity */
  slug: string;          // "foundation"
  letter: string;        // "F"
  tierLabel: string;     // "Tier I — Foundation"
  title: string;         // "Foundation"
  titleSuffix?: string;  // shown highlighted below title (e.g. "Series")
  accent: Accent;
  status: "live" | "waitlist";
  statusLabel: string;   // pill text in hero (e.g. "Now Enrolling · July 2026")

  /** Hero text */
  subtitle: string;
  description: string;
  badges: string[];
  videoId: string;       // YouTube id
  videoBadgeLabel: string;
  primaryCta: CourseAction;

  /** Lecture grid section */
  lectureEyebrow: string;
  lectureTitle: string;
  lectureNote: string;
  lectureCardLink: string; // "Enroll to unlock" / "Opens after Foundation"
  lectureCardTier: string; // "Premium" / "Tier II"
  lectures: Lecture[];

  /** Ribbon banner under lectures */
  ribbon: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    meta: string[];
    rightLabel: string;
    rightSub: string;
    cta: string;
  };

  /** Why-this-course block */
  whyTitle: string;
  whyBody: string;

  /** Curriculum + side card */
  curriculumHeadline: string;
  curriculumSubhead: string;
  fullCurriculum: CurriculumItem[];
  curriculumFootnote?: string;
  asideEyebrow: string;
  asideTitle: string;
  asideDescription: string;
  asidePrice: string;
  asidePriceSub: string;
  asidePrimaryCta: CourseAction;
  asideSecondaryCta: CourseAction;
  perks: string[];

  /** Register section */
  registerEyebrow: string;
  registerTitle: string;
  registerDescription: string;
  registerItems: RegisterItem[];
  registerStartsLabel: string;
  registerStartsValue: string;
  panelEyebrow: string;
  panelTitle: string;
  panelDescription: string;
  panelCta: CourseAction;

  /** Optional extended sections (Advanced / future tiers) */
  pathway?: {
    eyebrow: string;
    title: string;
    body: string;
    steps: {
      label: string;
      desc: string;
      status: string;
      tier: "foundation" | "core" | "advanced" | "masterclass";
    }[];
  };

  progression?: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    closingQuote: string;
  };

  specialist?: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };

  notifyCard?: {
    eyebrow: string;
    title: string;
    body: string;
    fineprint: string;
  };

  whyQuote?: string;
};

/** Theme tokens grouped by accent so the layout never branches. */
export type Theme = {
  accent: Accent;
  accentHex: string;
  hoverHex: string;
  textAccent: string;        // text-t-green
  bgAccent: string;          // bg-t-green
  borderAccent: string;      // border-t-green

  darkBg: string;            // hero / register section bg
  videoFrameBg: string;      // inner frame chrome around iframe
  videoStripBg: string;      // small label badge above the video frame

  lightBg: string;           // light section bg
  cardBorder: string;        // card outer border
  cardDivider: string;       // inner divider on cards
  softAccent: string;        // bg behind pricing
  registerPanelBg: string;   // dark right-panel bg in register section
  registerStartBorder: string; // tw class for borderless top border in /10 alpha
};

export const THEMES: Record<Accent, Theme> = {
  "t-green": {
    accent: "t-green",
    accentHex: "#21864E",
    hoverHex: "#196638",
    textAccent: "text-t-green",
    bgAccent: "bg-t-green",
    borderAccent: "border-t-green",
    darkBg: "#071410",
    videoFrameBg: "#060f0c",
    videoStripBg: "#0c1d15",
    lightBg: "#f4f8f5",
    cardBorder: "#cce3d4",
    cardDivider: "#e2f0e7",
    softAccent: "#edf6f0",
    registerPanelBg: "#0a1c13",
    registerStartBorder: "border-t-green/10",
  },
  "t-gold": {
    accent: "t-gold",
    accentHex: "#D4A621",
    hoverHex: "#A88516",
    textAccent: "text-t-gold",
    bgAccent: "bg-t-gold",
    borderAccent: "border-t-gold",
    darkBg: "#1A1505",
    videoFrameBg: "#15110a",
    videoStripBg: "#221c0a",
    lightBg: "#fdf9ed",
    cardBorder: "#ead8a4",
    cardDivider: "#f1e3b3",
    softAccent: "#fbf3d1",
    registerPanelBg: "#221c0a",
    registerStartBorder: "border-t-gold/10",
  },
  "t-blue": {
    accent: "t-blue",
    accentHex: "#1E5AA6",
    hoverHex: "#164785",
    textAccent: "text-t-blue",
    bgAccent: "bg-t-blue",
    borderAccent: "border-t-blue",
    darkBg: "#0a1428",
    videoFrameBg: "#080f1f",
    videoStripBg: "#0e1a32",
    lightBg: "#eef3fb",
    cardBorder: "#cfdbef",
    cardDivider: "#dde7f6",
    softAccent: "#dee9f8",
    registerPanelBg: "#0e1a32",
    registerStartBorder: "border-t-blue/10",
  },
  "t-red": {
    accent: "t-red",
    accentHex: "#C8102E",
    hoverHex: "#a00c25",
    textAccent: "text-t-red",
    bgAccent: "bg-t-red",
    borderAccent: "border-t-red",
    darkBg: "#170709",
    videoFrameBg: "#13060a",
    videoStripBg: "#1f0a0d",
    lightBg: "#fbf0f2",
    cardBorder: "#f0cfd5",
    cardDivider: "#f5dfe3",
    softAccent: "#f9dde2",
    registerPanelBg: "#1f0a0d",
    registerStartBorder: "border-t-red/10",
  },
};
