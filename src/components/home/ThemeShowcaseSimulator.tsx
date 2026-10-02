"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Coffee,
  Check,
  Smartphone,
  ArrowLeft,
  QrCode,
  Wifi,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { THEME_PRESETS, getTheme } from "@/lib/themes";
import { formatToman, formatPersianNumber } from "@/lib/utils";

export default function ThemeShowcaseSimulator() {
  const [cafeName, setCafeName] = useState("کافه دیپلمات");
  const [selectedThemeId, setSelectedThemeId] = useState("dark-luxury");
  const [activeItemAvailable, setActiveItemAvailable] = useState(true);
  const [samplePrice, setSamplePrice] = useState("95000");

  const currentTheme = getTheme(selectedThemeId);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>شوکیس زنده قالب‌های منوی مشتری</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          منوی کافه خود را در قالب‌های مختلف تست کنید
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          قالب‌های زیر را انتخاب کنید تا ببینید هویت بصری منوی شما چطور در یک ثانیه با دکور کافه‌تان هماهنگ می‌شود:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-5 text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              نام کافه یا رستوران شما:
            </label>
            <input
              type="text"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              placeholder="مثلاً: کافه دیپلمات"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors shadow-inner"
            />
          </div>

          {/* Theme Presets Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              سبک و قالب دلخواه منوی کافه:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {THEME_PRESETS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedThemeId(t.id)}
                  className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between ${
                    selectedThemeId === t.id
                      ? "border-rose-500 bg-slate-800 ring-2 ring-rose-500/40 shadow-md"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white flex items-center gap-1.5">
                      <span>{t.name}</span>
                      {selectedThemeId === t.id && (
                        <Check className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{t.subtitle.slice(0, 38)}...</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {t.swatchColors.map((color, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Price & Availability Test */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">تست تغییر سریع قیمت و موجودی سر میز:</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">قیمت تستی قهوه (تومان):</label>
                <input
                  type="number"
                  value={samplePrice}
                  onChange={(e) => setSamplePrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">کلید فوری موجودی:</label>
                <button
                  type="button"
                  onClick={() => setActiveItemAvailable(!activeItemAvailable)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    activeItemAvailable
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : "bg-rose-500/20 text-rose-400 border-rose-500/40"
                  }`}
                >
                  {activeItemAvailable ? "✓ موجود در منو" : "✕ اعلام ناموجودی"}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/login?tab=register"
              className="w-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-rose-600/25"
            >
              ثبت‌نام رسمی و دریافت منوی آنلاین کافه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Live Interactive Phone Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-72 bg-slate-950 border-4 border-slate-800 rounded-[38px] p-3 shadow-2xl relative overflow-hidden">
            {/* Phone Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-b-xl mx-auto mb-3"></div>

            {/* Simulated Menu Screen */}
            <div className={`rounded-2xl overflow-hidden ${currentTheme.bodyBgClass} border border-white/10 text-center transition-all duration-300 relative pb-10`}>
              {/* Header */}
              <div
                className="p-4 transition-colors"
                style={{
                  background: currentTheme.headerGradient,
                }}
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 shadow">
                  <Coffee className="w-6 h-6" />
                </div>
                <h4 className="font-black text-sm text-white truncate px-2">{cafeName || "کافه شما"}</h4>
                <div className="flex items-center justify-center gap-2 text-[10px] text-white/80 mt-1">
                  <span className="flex items-center gap-0.5">
                    <Wifi className="w-2.5 h-2.5" /> وای‌فای فعال
                  </span>
                  <span className="flex items-center gap-0.5">
                    <QrCode className="w-2.5 h-2.5" /> منوی QR
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-3 space-y-2 text-right">
                <div className={`text-[10px] font-bold ${currentTheme.textMuted} border-b ${currentTheme.dividerClass} pb-1 flex justify-between`}>
                  <span>منوی آنلاین</span>
                  <span className="text-[9px]" style={{ color: currentTheme.accentColor }}>پیش‌نمایش زنده</span>
                </div>

                {/* Item 1: Active item with toggle */}
                <div
                  className={`p-2.5 rounded-xl flex items-center justify-between text-[11px] border transition-all ${
                    currentTheme.cardBgClass
                  } ${!activeItemAvailable ? "opacity-50" : ""}`}
                >
                  <div>
                    <div className={`font-bold ${currentTheme.textPrimary}`}>اسپرسو دوبل ۱۰۰٪ عربیکا</div>
                    <div className={`text-[10px] font-mono mt-0.5 ${currentTheme.priceClass}`}>
                      {Number(samplePrice || 0).toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                      activeItemAvailable
                        ? currentTheme.badgeClass
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {activeItemAvailable ? "موجود" : "ناموجود"}
                  </span>
                </div>

                {/* Item 2 */}
                <div className={`p-2.5 rounded-xl flex items-center justify-between text-[11px] border ${currentTheme.cardBgClass}`}>
                  <div>
                    <div className={`font-bold ${currentTheme.textPrimary}`}>کافه لاته با آرت باریستا</div>
                    <div className={`text-[10px] font-mono mt-0.5 ${currentTheme.priceClass}`}>۹۵٬۰۰۰ تومان</div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-medium ${currentTheme.badgeClass}`}>
                    موجود
                  </span>
                </div>

                {/* Item 3 */}
                <div className={`p-2.5 rounded-xl flex items-center justify-between text-[11px] border ${currentTheme.cardBgClass}`}>
                  <div>
                    <div className={`font-bold ${currentTheme.textPrimary}`}>چیزکیک نیویورکی تنوری</div>
                    <div className={`text-[10px] font-mono mt-0.5 ${currentTheme.priceClass}`}>۱۲۵٬۰۰۰ تومان</div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-medium ${currentTheme.badgeClass}`}>
                    موجود
                  </span>
                </div>
              </div>

              {/* Simulated Tray bar at bottom */}
              <div className="absolute bottom-1 inset-x-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-1.5 flex items-center justify-between text-[10px] text-white">
                <div className="flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3 text-amber-400" />
                  <span>سینی میز: ۲ آیتم</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">۲۲۰٬۰۰۰ ت</span>
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] text-slate-500">
              نمایش گوشی مشتری سر میز
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
