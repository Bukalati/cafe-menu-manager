"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  Sparkles,
  Coffee,
  Check,
  Smartphone,
  ArrowLeft,
  QrCode,
  Wifi,
  ExternalLink,
  Sliders,
} from "lucide-react";

const PALETTES = [
  { name: "زرشکی سلطنتی", color: "#e11d48" },
  { name: "کافی کهربایی", color: "#b45309" },
  { name: "سبز کورتادو", color: "#059669" },
  { name: "آبی کافه‌ای", color: "#0284c7" },
  { name: "بنفش مدرن", color: "#9333ea" },
];

export default function CafeSimulator() {
  const [name, setName] = useState("کافه دیپلمات");
  const [color, setColor] = useState("#e11d48");
  const [activeItemAvailable, setActiveItemAvailable] = useState(true);
  const [samplePrice, setSamplePrice] = useState("85000");

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          شبیه‌ساز تستی (آزمایشی و بدون نیاز به ثبت‌نام)
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          منوی کافه خود را همین الان شبیه‌سازی کنید
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          نام، رنگ سازمانی و قیمت‌های کافه خود را تغییر دهید تا در لحظه نحوه نمایش آن را در موبایل مشتری مشاهده فرمایید (این بخش صرفاً شبیه‌ساز است و در دیتابیس ثبت نمی‌شود).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Controls (Client-only simulation) */}
        <div className="lg:col-span-7 space-y-5 text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              نام کافه یا رستوران شما:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً: کافه دیپلمات"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              تغییر رنگ تم و هویت بصری منو:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PALETTES.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setColor(p.color)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    color === p.color
                      ? "border-white bg-slate-800 ring-2 ring-rose-500/50 scale-105"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700"
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shadow"
                    style={{ backgroundColor: p.color }}
                  ></span>
                  <span className="text-[10px] text-slate-300">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                تغییر تستی قیمت اسپرسو (تومان):
              </label>
              <input
                type="number"
                value={samplePrice}
                onChange={(e) => setSamplePrice(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                وضعیت موجودی در لحظه:
              </label>
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

          <div className="pt-2">
            <Link
              href="/login?tab=register"
              className="w-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-rose-600/25"
            >
              ثبت‌نام رسمی و دریافت منوی کافه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Live Interactive Phone Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-72 bg-slate-950 border-4 border-slate-800 rounded-[36px] p-3 shadow-2xl relative overflow-hidden">
            {/* Phone Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-b-xl mx-auto mb-3"></div>

            {/* Screen */}
            <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-center text-slate-200">
              {/* Header with selected color */}
              <div
                className="p-4 transition-colors"
                style={{
                  background: `linear-gradient(180deg, ${color}ee 0%, #0f172a 100%)`,
                }}
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 shadow">
                  <Coffee className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-sm text-white truncate px-2">{name || "کافه شما"}</h4>
                <div className="flex items-center justify-center gap-2 text-[10px] text-white/80 mt-1">
                  <span className="flex items-center gap-0.5">
                    <Wifi className="w-2.5 h-2.5" /> وای‌فای فعال
                  </span>
                  <span className="flex items-center gap-0.5">
                    <QrCode className="w-2.5 h-2.5" /> منوی QR
                  </span>
                </div>
              </div>

              {/* Sample Items in Mini Phone */}
              <div className="p-3 space-y-2 text-right">
                <div className="text-[10px] font-bold text-slate-400 border-b border-slate-800 pb-1 flex justify-between">
                  <span>منوی تست آنلاین</span>
                  <span className="text-[9px] text-emerald-400">زنده</span>
                </div>

                <div
                  className={`p-2.5 rounded-xl flex items-center justify-between text-[11px] border transition-all ${
                    activeItemAvailable
                      ? "bg-slate-800/80 border-slate-700/80"
                      : "bg-slate-900/40 border-slate-800/60 opacity-60"
                  }`}
                >
                  <div>
                    <div className="font-bold text-white">اسپرسو دوبل تخصصی</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                      {Number(samplePrice || 0).toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-medium ${
                      activeItemAvailable
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {activeItemAvailable ? "موجود" : "ناموجود"}
                  </span>
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-xl flex items-center justify-between text-[11px] border border-slate-700/80">
                  <div>
                    <div className="font-bold text-white">کافه لاته با آرت باریستا</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">۹۵٬۰۰۰ تومان</div>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium border border-emerald-500/30">
                    موجود
                  </span>
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-xl flex items-center justify-between text-[11px] border border-slate-700/80">
                  <div>
                    <div className="font-bold text-white">چیزکیک نیویورکی تنوری</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">۱۲۵٬۰۰۰ تومان</div>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium border border-emerald-500/30">
                    موجود
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] text-slate-500">
              پیش‌نمایش تعاملی موبایل
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
