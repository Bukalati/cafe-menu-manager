"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Store,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Coffee,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    const loginEmail = customEmail || email;
    const loginPass = customPass || password;

    if (!loginEmail || !loginPass) {
      setError("لطفاً ایمیل و کلمه عبور را وارد کنید");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(data.redirectUrl || "/admin");
      } else {
        setError(data.error || "ورود ناموفق بود");
      }
    } catch {
      setError("خطای ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    handleLogin(undefined, quickEmail, quickPass);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 selection:bg-rose-500 selection:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_30%,rgba(225,29,72,0.12),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Top Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-4 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            بازگشت به صفحه اصلی
          </Link>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/25 mb-3">
            <Store className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">ورود به پنل کاربری</h1>
          <p className="text-xs text-slate-400 mt-1">
            ورود صاحبان کافه‌ها، ناظر دانشگاه و مدیر ارشد سامانه
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">ایمیل یا نام کاربری:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">کلمه عبور:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-rose-600/30 transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? "در حال بررسی..." : "ورود به حساب کاربری"}
            </button>
          </form>

          {/* Quick Demo Login Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ورود سریع با نقش‌های کاربری (ویژه تست و ارائه):
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("prof@uni.ac.ir", "prof123")}
                className="w-full bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 p-2.5 rounded-xl text-xs flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">دکتر رضایی (استاد داور و ناظر دانشگاه)</span>
                </div>
                <span className="text-[10px] text-indigo-400">ورود به بازرسی</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("viona@gmail.com", "cafe123")}
                className="w-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 p-2.5 rounded-xl text-xs flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">کافه ویونا (پنل اختصاصی صاحب کافه)</span>
                </div>
                <span className="text-[10px] text-amber-400">ورود کافه‌دار</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("admin@menusaas.ir", "admin123")}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 p-2.5 rounded-xl text-xs flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-rose-400" />
                  <span className="font-semibold">علیرضا (مدیریت ارشد پلتفرم)</span>
                </div>
                <span className="text-[10px] text-slate-400">ورود سوپرادمین</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
