"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Store,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Coffee,
  Sparkles,
  UserPlus,
  Phone,
  CheckCircle2,
  Tag,
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";

  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Register State
  const [regCafeName, setRegCafeName] = useState("");
  const [regOwnerName, setRegOwnerName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPlan, setRegPlan] = useState("اشتراک سالانه طلایی");
  const [regAmount, setRegAmount] = useState(1200000);

  useEffect(() => {
    if (searchParams.get("tab") === "register") {
      setActiveTab("register");
    }
  }, [searchParams]);

  // Handle Login
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
        window.location.href = data.redirectUrl || "/admin";
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

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regCafeName || !regOwnerName || !regPhone || !regEmail || !regPassword) {
      setError("لطفاً تمام موارد را تکمیل کنید");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cafeName: regCafeName,
          ownerName: regOwnerName,
          phone: regPhone,
          email: regEmail,
          password: regPassword,
          planName: regPlan,
          amount: regAmount,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = data.redirectUrl;
      } else {
        setError(data.error || "خطا در ثبت‌نام");
      }
    } catch {
      setError("خطای ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 selection:bg-rose-500 selection:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_30%,rgba(225,29,72,0.12),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 my-8">
        {/* Top Header */}
        <div className="text-center mb-6">
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
          <h1 className="text-2xl font-black text-white tracking-tight">حساب کاربری سامانه منوساز</h1>
          <p className="text-xs text-slate-400 mt-1">
            ورود به پنل مدیریت یا ثبت‌نام کافه جدید
          </p>
        </div>

        {/* Tab Switcher: Login / Register */}
        <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl mb-4 flex items-center shadow-lg">
          <button
            type="button"
            onClick={() => { setActiveTab("login"); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "login"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            ورود به حساب کاربری
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("register"); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "register"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            ثبت‌نام کافه جدید
          </button>
        </div>

        {/* Form Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {activeTab === "login" && (
            <>
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
                  {isLoading ? "در حال ورود..." : "ورود به حساب کاربری"}
                </button>
              </form>

              {/* Quick Demo Login Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  ورود سریع تستی با نقش‌های تعریف‌شده:
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
                      <span className="font-semibold">کافه ویونا (پنل اختصاصی کافه‌دار)</span>
                    </div>
                    <span className="text-[10px] text-amber-400">ورود کافه</span>
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
            </>
          )}

          {/* TAB 2: REGISTER FORM */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">نام کافه یا رستوران:</label>
                <div className="relative">
                  <Store className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regCafeName}
                    onChange={(e) => setRegCafeName(e.target.value)}
                    placeholder="مثلاً: کافه راشا"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">نام و نام خانوادگی صاحب کافه:</label>
                <input
                  type="text"
                  required
                  value={regOwnerName}
                  onChange={(e) => setRegOwnerName(e.target.value)}
                  placeholder="مثلاً: علیرضا محمدی"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">شماره همراه:</label>
                  <input
                    type="text"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0912..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">ایمیل حساب:</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="cafe@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">کلمه عبور دلخواه:</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="حداقل ۶ کاراکتر"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">انتخاب پلن اولیه اشتراک:</label>
                <select
                  value={regPlan}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setRegPlan(selected);
                    if (selected.includes("طلایی")) setRegAmount(1200000);
                    else if (selected.includes("نقره‌ای")) setRegAmount(750000);
                    else if (selected.includes("برنزی")) setRegAmount(380000);
                    else if (selected.includes("الماس")) setRegAmount(2400000);
                  }}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                >
                  <option value="اشتراک سالانه طلایی">پلن طلایی ۱ ساله (۱٬۲۰۰٬۰۰۰ تومان - پیشنهاد ویژه)</option>
                  <option value="اشتراک ۶ ماهه نقره‌ای">پلن نقره‌ای ۶ ماهه (۷۵۰٬۰۰۰ تومان)</option>
                  <option value="اشتراک ۳ ماهه برنزی">پلن برنزی ۳ ماهه (۳۸۰٬۰۰۰ تومان)</option>
                  <option value="اشتراک سازمانی الماس">پلن الماس زنجیره‌ای (۲٬۴۰۰٬۰۰۰ تومان)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50 mt-4"
              >
                {isLoading ? "در حال راه‌اندازی منوی کافه..." : "ثبت‌نام رسمی و ورود به پنل اختصاصی کافه"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xs">در حال بارگذاری...</div>}>
      <LoginContent />
    </Suspense>
  );
}
