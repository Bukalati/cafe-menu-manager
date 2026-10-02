// src/lib/themes.ts

export interface ThemeConfig {
  id: string;
  name: string;
  subtitle: string;
  isDark: boolean;
  accentColor: string;
  swatchColors: [string, string, string]; // 3 colors for visual preview swatch
  bodyBgClass: string;
  headerGradient: string;
  cardBgClass: string;
  cardHoverClass: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  priceClass: string;
  badgeClass: string;
  searchBg: string;
  searchBorder: string;
  filterActive: string;
  filterInactive: string;
  navBgClass: string;
  trayBarBg: string;
  trayButtonBg: string;
  dividerClass: string;
}

export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: "dark-luxury",
    name: "دارک لوکس و طلایی (Obsidian Gold)",
    subtitle: "مخصوص کافه‌بارها، لانژها و محیط‌های دنج شبانه با خطوط متالیک و جذاب",
    isDark: true,
    accentColor: "#f59e0b",
    swatchColors: ["#0b0f19", "#1e1b4b", "#f59e0b"],
    bodyBgClass: "bg-[#090d16] text-amber-50",
    headerGradient: "linear-gradient(180deg, #1e1b4b 0%, #090d16 100%)",
    cardBgClass: "bg-[#111726]/90 border border-amber-500/20 shadow-lg shadow-black/40",
    cardHoverClass: "hover:border-amber-500/40",
    textPrimary: "text-amber-50",
    textSecondary: "text-amber-200/70",
    textMuted: "text-amber-300/40",
    priceClass: "text-amber-400 font-mono font-black",
    badgeClass: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    searchBg: "bg-[#131b2e]/90 text-amber-50 placeholder:text-amber-200/40",
    searchBorder: "border-amber-500/30 focus:border-amber-400",
    filterActive: "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/30",
    filterInactive: "bg-[#131b2e] text-amber-200/80 hover:text-white border border-amber-500/15",
    navBgClass: "bg-[#090d16]/95 border-b border-amber-500/15 backdrop-blur-md",
    trayBarBg: "bg-[#111726]/95 border-t border-amber-500/30 shadow-2xl backdrop-blur-xl",
    trayButtonBg: "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/25",
    dividerClass: "border-amber-500/20",
  },
  {
    id: "warm-bakery",
    name: "کرم و قهوه گرم (Warm Ivory & Bakery)",
    subtitle: "حس چوب، شیرینی و قهوه؛ ایده‌آل برای کافه‌بیکری‌ها و کافه‌های صبحانه",
    isDark: false,
    accentColor: "#8a4f27",
    swatchColors: ["#fcf8f2", "#8a4f27", "#c4a482"],
    bodyBgClass: "bg-[#faf5ee] text-[#2b1810]",
    headerGradient: "linear-gradient(180deg, #42281d 0%, #291811 100%)",
    cardBgClass: "bg-white border border-[#e8dfd3] shadow-md shadow-[#8a4f27]/5",
    cardHoverClass: "hover:border-[#8a4f27]/50",
    textPrimary: "text-[#2b1810]",
    textSecondary: "text-[#695449]",
    textMuted: "text-[#9c8477]",
    priceClass: "text-[#8a4f27] font-mono font-black",
    badgeClass: "bg-[#8a4f27]/10 text-[#8a4f27] border border-[#8a4f27]/25",
    searchBg: "bg-white text-[#2b1810] placeholder:text-[#9c8477]",
    searchBorder: "border-[#e0d3c3] focus:border-[#8a4f27]",
    filterActive: "bg-[#8a4f27] text-white font-black shadow-md shadow-[#8a4f27]/30",
    filterInactive: "bg-[#efe7dc] text-[#523d32] hover:bg-[#e6dacb] border border-[#ded1bf]",
    navBgClass: "bg-[#faf5ee]/95 border-b border-[#e2d5c5] backdrop-blur-md",
    trayBarBg: "bg-[#2b1810]/95 text-white border-t border-[#8a4f27]/40 shadow-2xl backdrop-blur-xl",
    trayButtonBg: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/25",
    dividerClass: "border-[#e8dfd3]",
  },
  {
    id: "modern-minimal",
    name: "مینیمال مدرن (Modern Light Monochrome)",
    subtitle: "طراحی تمیز، شفاف و بدون آلایش برای کافه‌های نسل سوم و قهوه‌تخصصی",
    isDark: false,
    accentColor: "#0284c7",
    swatchColors: ["#f8fafc", "#0f172a", "#0284c7"],
    bodyBgClass: "bg-[#f8fafc] text-slate-900",
    headerGradient: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
    cardBgClass: "bg-white border border-slate-200/90 shadow-sm shadow-slate-200/50",
    cardHoverClass: "hover:border-sky-500/50 hover:shadow-md",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    textMuted: "text-slate-400",
    priceClass: "text-sky-600 font-mono font-black",
    badgeClass: "bg-sky-50 text-sky-700 border border-sky-200",
    searchBg: "bg-white text-slate-900 placeholder:text-slate-400",
    searchBorder: "border-slate-300 focus:border-sky-500",
    filterActive: "bg-slate-900 text-white font-black shadow-md shadow-slate-900/20",
    filterInactive: "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
    navBgClass: "bg-[#f8fafc]/95 border-b border-slate-200 backdrop-blur-md",
    trayBarBg: "bg-slate-900/95 text-white border-t border-slate-800 shadow-2xl backdrop-blur-xl",
    trayButtonBg: "bg-sky-500 hover:bg-sky-400 text-white font-bold shadow-lg shadow-sky-500/25",
    dividerClass: "border-slate-200",
  },
  {
    id: "persian-vintage",
    name: "سنتی ایرانی و فیروزه‌ای (Persian Turquoise)",
    subtitle: "الهام‌گرفته از کافه‌عمارت‌ها، شربت‌خانه‌ها و فضاهای تاریخی با هویت اصیل",
    isDark: true,
    accentColor: "#10b981",
    swatchColors: ["#0a1f1d", "#064e3b", "#10b981"],
    bodyBgClass: "bg-[#081716] text-emerald-50",
    headerGradient: "linear-gradient(180deg, #064e3b 0%, #081716 100%)",
    cardBgClass: "bg-[#0d2523]/90 border border-emerald-500/20 shadow-lg shadow-black/40",
    cardHoverClass: "hover:border-emerald-400/40",
    textPrimary: "text-emerald-50",
    textSecondary: "text-emerald-200/70",
    textMuted: "text-emerald-300/40",
    priceClass: "text-emerald-400 font-mono font-black",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    searchBg: "bg-[#0e2a27]/90 text-emerald-50 placeholder:text-emerald-200/40",
    searchBorder: "border-emerald-500/30 focus:border-emerald-400",
    filterActive: "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-md shadow-emerald-500/25",
    filterInactive: "bg-[#0d2523] text-emerald-200/80 hover:text-white border border-emerald-500/20",
    navBgClass: "bg-[#081716]/95 border-b border-emerald-500/15 backdrop-blur-md",
    trayBarBg: "bg-[#0d2523]/95 border-t border-emerald-500/30 shadow-2xl backdrop-blur-xl",
    trayButtonBg: "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/25",
    dividerClass: "border-emerald-500/20",
  },
  {
    id: "crimson-velvet",
    name: "زرشکی مخملی سلطنتی (Crimson Velvet)",
    subtitle: "پالت محبوب و کلاسیک با کنتراست فوق‌العاده بالا و جذابیت بصری عالی",
    isDark: true,
    accentColor: "#e11d48",
    swatchColors: ["#020617", "#881337", "#e11d48"],
    bodyBgClass: "bg-slate-950 text-slate-100",
    headerGradient: "linear-gradient(180deg, #881337 0%, #020617 100%)",
    cardBgClass: "bg-slate-900/90 border border-slate-800 shadow-lg shadow-black/40",
    cardHoverClass: "hover:border-rose-500/40",
    textPrimary: "text-white",
    textSecondary: "text-slate-400",
    textMuted: "text-slate-500",
    priceClass: "text-rose-400 font-mono font-black",
    badgeClass: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    searchBg: "bg-slate-850/90 text-white placeholder:text-slate-400",
    searchBorder: "border-slate-800 focus:border-rose-500",
    filterActive: "bg-rose-600 text-white font-black shadow-md shadow-rose-600/30",
    filterInactive: "bg-slate-900 text-slate-400 hover:text-white border border-slate-800",
    navBgClass: "bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-md",
    trayBarBg: "bg-slate-900/95 border-t border-slate-800 shadow-2xl backdrop-blur-xl",
    trayButtonBg: "bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-600/30",
    dividerClass: "border-slate-800",
  },
];

export const PATTERN_OPTIONS = [
  { id: "none", name: "ساده و مینیمال", desc: "بدون پترن، رنگ یکدست و خلوت" },
  { id: "coffee", name: "دانه‌های قهوه", desc: "پترن ظریف باریستا و دانه قهوه" },
  { id: "dots", name: "نقطه‌چین مدرن", desc: "شبکه نقطه‌ای نوردیک و کافه‌کتاب" },
  { id: "persian", name: "نقوش هندسی اسلیمی", desc: "کاشی‌کاری ظریف عمارت‌های سنتی" },
  { id: "lines", name: "بافت خطوط مورب", desc: "تکسچر متالیک و بافت‌دار بیسترو" },
] as const;

export const CUSTOM_ACCENT_COLORS = [
  { name: "طلایی کهربایی", hex: "#f59e0b" },
  { name: "زرشکی سلطنتی", hex: "#e11d48" },
  { name: "سبز کورتادو", hex: "#10b981" },
  { name: "آبی کافه‌ای", hex: "#0284c7" },
  { name: "قهوه‌ای نسکافه‌ای", hex: "#8a4f27" },
  { name: "بنفش اسپرسو", hex: "#9333ea" },
  { name: "دارچینی پاییزی", hex: "#ea580c" },
  { name: "مشکی لوکس", hex: "#334155" },
];

export const PRESET_CAFE_BANNERS = [
  {
    name: "بار اسپرسو و لانژ شبانه",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1400&auto=format&fit=crop&q=80",
    desc: "نور گرم و فضای دنج کافه‌بار",
  },
  {
    name: "حیاط عمارت و فضای باز",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&auto=format&fit=crop&q=80",
    desc: "آرامش گیاهان و معماری سنتی",
  },
  {
    name: "کافه بیکری و شیرینی‌پزی",
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1400&auto=format&fit=crop&q=80",
    desc: "عطر نان تازه و چوب روسی",
  },
  {
    name: "کافه‌کتاب و قهوه‌تخصصی",
    url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1400&auto=format&fit=crop&q=80",
    desc: "میزهای چوبی و فضای مطالعه",
  },
  {
    name: "رستوران و بیسترو ایتالیایی",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=80",
    desc: "میزهای پرنور و حس شام لوکس",
  },
];

export interface ParsedTheme {
  theme: ThemeConfig;
  themeId: string;
  pattern: string;
  accentColor: string;
}

export function parseThemeConfig(raw: string | null | undefined): ParsedTheme {
  if (!raw) {
    const defaultTheme = THEME_PRESETS[4];
    return {
      theme: defaultTheme,
      themeId: defaultTheme.id,
      pattern: "none",
      accentColor: defaultTheme.accentColor,
    };
  }

  // Check if raw is format "themeId:pattern:accentColor"
  if (raw.includes(":")) {
    const parts = raw.split(":");
    const themeId = parts[0] || "crimson-velvet";
    const pattern = parts[1] || "none";
    const accentColor = parts[2] || "";

    const baseTheme = getTheme(themeId);
    const finalAccent = accentColor && accentColor.startsWith("#") ? accentColor : baseTheme.accentColor;

    return {
      theme: {
        ...baseTheme,
        accentColor: finalAccent,
      },
      themeId: baseTheme.id,
      pattern,
      accentColor: finalAccent,
    };
  }

  const baseTheme = getTheme(raw);
  return {
    theme: baseTheme,
    themeId: baseTheme.id,
    pattern: "none",
    accentColor: baseTheme.accentColor,
  };
}

export function encodeThemeConfig(themeId: string, pattern: string, accentColor?: string): string {
  const p = pattern || "none";
  const c = accentColor || "";
  return `${themeId}:${p}:${c}`;
}

export function getPatternStyle(pattern: string | null | undefined, isDark: boolean = true): React.CSSProperties {
  if (!pattern || pattern === "none") return {};

  const opacity = isDark ? "0.04" : "0.035";
  const strokeOpacity = isDark ? "0.06" : "0.05";
  const fill = isDark ? "%23ffffff" : "%23000000";

  switch (pattern) {
    case "coffee":
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 18c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm-1.2 2.8c3.5 1.7 4.8 5.2 4.8 7.2 0 2.8-2.2 5-5 5-2.8 0-4.5-2.2-4.5-4.8 0-3.5 2.2-6.2 4.7-7.4z' fill='${fill}' fill-opacity='${opacity}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      };
    case "dots":
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1.5' fill='${fill}' fill-opacity='${opacity}'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      };
    case "persian":
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 0l22 22-22 22L0 22z' fill='none' stroke='${fill}' stroke-width='1.2' stroke-opacity='${strokeOpacity}'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      };
    case "lines":
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 24L24 0H12L0 12v12zM12 24l12-12v12H12z' fill='${fill}' fill-opacity='${opacity}'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      };
    default:
      return {};
  }
}

export function getTheme(presetIdOrHex: string | null | undefined): ThemeConfig {
  if (!presetIdOrHex) return THEME_PRESETS[4]; // Default Crimson Velvet

  // If encoded composite string
  if (presetIdOrHex.includes(":")) {
    return parseThemeConfig(presetIdOrHex).theme;
  }

  // Match by ID
  const found = THEME_PRESETS.find((p) => p.id === presetIdOrHex);
  if (found) return found;

  // Match by known colors
  const hex = presetIdOrHex.toLowerCase();
  if (hex === "#b45309" || hex.includes("b45309")) return THEME_PRESETS[1]; // Warm Bakery
  if (hex === "#059669" || hex === "#10b981" || hex.includes("059669")) return THEME_PRESETS[3]; // Persian
  if (hex === "#0284c7" || hex.includes("0284c7")) return THEME_PRESETS[2]; // Modern Minimal
  if (hex === "#f59e0b" || hex.includes("f59e0b")) return THEME_PRESETS[0]; // Dark Luxury

  // Fallback to Crimson Velvet with custom accent
  return {
    ...THEME_PRESETS[4],
    accentColor: presetIdOrHex.startsWith("#") ? presetIdOrHex : "#e11d48",
  };
}
