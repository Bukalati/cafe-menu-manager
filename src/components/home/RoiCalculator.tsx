"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowLeft, TrendingDown, DollarSign, CheckCircle2 } from "lucide-react";
import { formatToman, formatPersianNumber } from "@/lib/utils";

export default function RoiCalculator() {
  const [tables, setTables] = useState<number>(20);
  const [reprintsPerYear, setReprintsPerYear] = useState<number>(4);

  // Real-world printing economics in Iran:
  // Designing & printing a quality laminated cafe menu book or board: ~95,000 Tomans per table
  const costPerMenuPrint = 95000;
  const annualPaperCost = tables * costPerMenuPrint * reprintsPerYear;

  // Annual Gold Subscription for MenuSaaS
  const annualSaasCost = 1200000;

  // Pure profit saved
  const annualSavings = Math.max(0, annualPaperCost - annualSaasCost);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-bold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>حساب‌وکتاب دخل‌وخرج کافه‌داری</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          چقدر از هزینه‌های چاپ کاغذ در جیبتان باقی می‌ماند؟
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          با هر بار تغییر قیمت قهوه و شیر، هزینه چاپ مجدد منوی مقوایی به کافه تحمیل می‌شود. با اسلایدر زیر حساب کنید سالانه چقدر صرفه‌جویی خواهید کرد:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider: Number of tables */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-slate-200">
                تعداد میزهای فعال در کافه یا رستوران شما:
              </label>
              <span className="text-base font-black text-amber-400 font-mono">
                {formatPersianNumber(tables)} میز
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={60}
              step={2}
              value={tables}
              onChange={(e) => setTables(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
              <span>۸ میز (کافه کوچک)</span>
              <span>۳۰ میز (متوسط)</span>
              <span>۶۰ میز (لانژ بزرگ)</span>
            </div>
          </div>

          {/* Option: Menu changes per year */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <label className="block text-xs font-bold text-slate-200 mb-3">
              چند بار در سال قیمت‌ها یا آیتم‌های فصلی منو را تغییر می‌دهید؟
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { count: 2, label: "۲ بار در سال (کم)" },
                { count: 4, label: "۴ بار در سال (فصلی)" },
                { count: 6, label: "۶ بار در سال (مداوم)" },
              ].map((opt) => (
                <button
                  key={opt.count}
                  type="button"
                  onClick={() => setReprintsPerYear(opt.count)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    reprintsPerYear === opt.count
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Results Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-950/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative text-right">
            <div className="text-xs text-slate-400 mb-1">هزینه تخمینی چاپ منوی سنتی در سال:</div>
            <div className="text-xl font-bold text-rose-400 font-mono line-through opacity-80">
              {formatToman(annualPaperCost)}
            </div>

            <div className="text-xs text-slate-400 mt-4 mb-1">هزینه اشتراک یک‌ساله MenuSaaS:</div>
            <div className="text-sm font-semibold text-slate-300 font-mono">
              {formatToman(annualSaasCost)}
            </div>

            <div className="my-5 pt-4 border-t border-slate-800">
              <div className="text-xs text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" />
                سود خالص و پول ذخیره‌شده در جیب شما:
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                +{formatToman(annualSavings)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                این رقم صرفاً صرفه‌جویی در چاپ است؛ افزایش سفارشات به خاطر عکس‌های باکیفیت و حذف خطای سفارش‌گیری سود مجزای شماست.
              </p>
            </div>

            <Link
              href="/login?tab=register"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25"
            >
              فعال‌سازی اشتراک کافه و شروع صرفه‌جویی
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
