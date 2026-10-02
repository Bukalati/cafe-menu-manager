"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  Sparkles,
  Coffee,
  Check,
  Smartphone,
  ArrowLeft,
  QrCode,
  Wifi,
  MapPin,
} from "lucide-react";

const PALETTES = [
  { name: "زرشکی لوکس", color: "#e11d48" },
  { name: "کافی کهربایی", color: "#b45309" },
  { name: "سبز کورتادو", color: "#059669" },
  { name: "آبی کافه‌ای", color: "#0284c7" },
  { name: "بنفش مدرن", color: "#9333ea" },
];

export default function CafeSimulator() {
  const router = useRouter();
  const [name, setName] = useState("کافه شما");
  const [color, setColor] = useState("#e11d48");
  const [phone, setPhone] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleQuickCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || name === "کافه شما") {
      alert("لطفاً نام کافه یا رستوران خود را وارد کنید");
      return;
    }

    setIsCreating(true);
    try {
      const res = await fetch("/api/admin/sale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ownerName: "مدیر " + name,
          phone: phone || "09120000000",
          amount: 1200000,
          planName: "اشتراک سالانه طلایی",
        }),
      });

      if (res.ok) {
        const created = await res.json();
        router.push(`/dashboard/${created.slug}`);
      } else {
        alert("خطا در ایجاد کافه");
      }
    } catch {
      alert("خطای ارتباط با سرور");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          شبیه‌ساز زنده شخصی‌سازی منو
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          منوی کافه خود را در ۳۰ ثانیه تست و راه‌اندازی کنید
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          نام و رنگ سازمانی کافه خود را انتخاب کنید تا پیش‌نمایش اختصاصی آن بلافاصله ظاهر شود.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <form onSubmit={handleQuickCreate} className="lg:col-span-7 space-y-5 text-sm">
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
              انتخاب رنگ سازمانی منو:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PALETTES.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setColor(p.color)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    color === p.color
                      ? "border-white bg-slate-800 ring-2 ring-rose-500/50"
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

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              شماره تماس همراه مدیر (جهت ورود به پنل):
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isCreating ? "در حال ایجاد پنل و منوی آنلاین..." : "راه‌اندازی فوری منو و ورود به پنل کافه‌دار"}
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

        {/* Live Phone Preview Column */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-72 bg-slate-950 border-4 border-slate-800 rounded-[36px] p-3 shadow-2xl relative overflow-hidden">
            {/* Phone Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-b-xl mx-auto mb-3"></div>

            {/* Mini Screen */}
            <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-center text-slate-200">
              {/* Header with selected color */}
              <div
                className="p-4 transition-colors"
                style={{
                  background: `linear-gradient(180deg, ${color}dd 0%, #0f172a 100%)`,
                }}
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 shadow">
                  <Coffee className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-sm text-white truncate px-2">{name}</h4>
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
                <div className="text-[10px] font-bold text-slate-400 border-b border-slate-800 pb-1">
                  پرفروش‌های منو
                </div>

                <div className="bg-slate-800/80 p-2 rounded-xl flex items-center justify-between text-[11px] border border-slate-700/60">
                  <div>
                    <div className="font-bold text-white">اسپرسو تخصصی</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">۷۵٬۰۰۰ تومان</div>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">موجود</span>
                </div>

                <div className="bg-slate-800/80 p-2 rounded-xl flex items-center justify-between text-[11px] border border-slate-700/60">
                  <div>
                    <div className="font-bold text-white">کافه لاته با آرت</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">۹۵٬۰۰۰ تومان</div>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">موجود</span>
                </div>

                <div className="bg-slate-800/80 p-2 rounded-xl flex items-center justify-between text-[11px] border border-slate-700/60">
                  <div>
                    <div className="font-bold text-white">چیزکیک نیویورکی</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">۱۲۵٬۰۰۰ تومان</div>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">موجود</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] text-slate-500">
              پیش‌نمایش زنده گوشی مشتری
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
