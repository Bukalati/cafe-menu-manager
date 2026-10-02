// src/app/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ThemeShowcaseSimulator from "@/components/home/ThemeShowcaseSimulator";
import RoiCalculator from "@/components/home/RoiCalculator";
import {
  Store,
  QrCode,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Coffee,
  Check,
  Lock,
  Layers,
  Zap,
  Star,
  Crown,
  Clock,
  Award,
  XCircle,
  Smartphone,
  Flame,
  ThumbsUp,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";
import { formatToman, formatPersianNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      subscriptions: true,
    },
    orderBy: {
      viewCount: "desc",
    },
  });

  const totalScans = restaurants.reduce((acc, r) => acc + r.viewCount, 0);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-amber-600/20 shrink-0">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </div>
            <div className="flex items-center">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white shrink-0">MenuSaaS</span>
              <span className="hidden sm:inline-block mr-2 text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/25 px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                سامانه منوی دیجیتال کافه
              </span>
            </div>
          </div>

          {/* Quick Anchor Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#problems" className="hover:text-amber-400 transition-colors">چرا منوی دیجیتال؟</a>
            <a href="#simulator" className="hover:text-amber-400 transition-colors">شبیه‌ساز قالب‌ها</a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors">محاسبه صرفه‌جویی چاپ</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">پلن‌های اشتراک</a>
            <a href="#cafes" className="hover:text-amber-400 transition-colors">کافه‌های فعال</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              href="/login"
              className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all shrink-0"
            >
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span>ورود<span className="hidden sm:inline"> کافه‌داران</span></span>
            </Link>
            <Link
              href="/login?tab=register"
              className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-md shadow-rose-600/25 shrink-0 whitespace-nowrap"
            >
              <span className="sm:hidden">دریافت منو</span>
              <span className="hidden sm:inline">دریافت منوی کافه</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (No AI fluff - pure cafe utility) */}
      <section className="relative pt-16 pb-20 px-4 text-center overflow-hidden">
        {/* Subtle Warm Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/10 via-rose-600/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-bold mb-6">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>پلتفرم تخصصی صنف کافه‌ها، رستوران‌ها و کافه‌بیکری‌های ایران</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.25]">
            با منوی مقوایی و هزینه‌های چاپ مکرر <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-200">خداحافظی کنید.</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            قیمت‌ها را ظرف ۱۰ ثانیه از گوشی خود تغییر دهید، ناموجودی‌ها را بدون خط‌خطی کردن منو اعلام کنید، و یک منوی شیک متناسب با دکور کافه‌تان سر میزها بگذارید.
          </p>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-8 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>لود فوری زیر ۰.۵ ثانیه</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>بدون نیاز به نصب اپلیکیشن</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <QrCode className="w-4 h-4 text-sky-400" />
              <span>بارکد اختصاصی برای استند چوبی میز</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <DollarSign className="w-4 h-4 text-purple-400" />
              <span>صرفه‌جویی چند میلیونی در چاپ سالانه</span>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/login?tab=register"
              className="w-full sm:w-auto bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold px-8 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-rose-600/30"
            >
              <span>ثبت‌نام و راه‌اندازی منوی کافه</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <a
              href="#cafes"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold px-6 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>مشاهده نمونه‌های زنده کافه‌ها</span>
            </a>
          </div>

          {/* Social Proof Counter */}
          <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-2xl mx-auto">
            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                {formatPersianNumber(restaurants.length)} کافه
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">مشترک فعال در سامانه</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                +{formatPersianNumber(totalScans)} بار
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">اسکن موفق سر میزها</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono">
                ۱۰ ثانیه
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">زمان تغییر قیمت هر آیتم</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">
                ۱۰۰٪ ابری
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">آپ‌تایم و در دسترس دائمی</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Pain Points vs Solution (دردسرهای واقعی منوی کاغذی) */}
      <section id="problems" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>چرا دوران منوهای مقوایی به پایان رسیده است؟</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            مشکلاتی که هر روز در کافه با آن دست‌وپنجه نرم می‌کنید
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            مقایسه مستقیم منوی سنتی کاغذی با سامانه دیجیتال MenuSaaS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Traditional Paper Menu Pain Points */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4 relative">
            <div className="flex items-center gap-3 border-b border-rose-500/20 pb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                ✕
              </div>
              <div>
                <h3 className="font-bold text-base text-rose-200">دردسرهای منوی مقوایی و کاغذی</h3>
                <span className="text-[11px] text-rose-400">هزینه‌بر، فرسوده و غیرمنعطف</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-rose-200/80">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>هزینه سنگین چاپ مجدد:</strong> با هر بار گرانی شیر، قهوه یا مواد اولیه، کافه مجبور است ۲ تا ۵ میلیون تومان برای چاپ دوباره منوها هزینه کند.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>خط‌خطی کردن قیمت‌ها با خودکار یا لاک:</strong> زدن برچسب یا تغییر دستی قیمت‌ها روی منوی کاغذی جلوه بسیار نامناسبی جلوی مشتری ایجاد می‌کند.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>پارگی و چرب شدن منوها:</strong> منوهای کاغذی با ریختن قهوه یا دستمال کشیدن سریعاً کثیف و غیربهداشتی می‌شوند.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>شرمندگی برای آیتم‌های ناموجود:</strong> ویتر باید ۵ بار بین میز و باریستا بدود تا بگوید فلان کیک یا سیروپ تمام شده است.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: MenuSaaS Solution */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 relative">
            <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-base text-emerald-200">آسایش و سرعت با منوی هوشمند MenuSaaS</h3>
                <span className="text-[11px] text-emerald-400">یک‌بار برای همیشه؛ مدرن و همیشه به‌روز</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>تغییر آنی قیمت در ۱۰ ثانیه:</strong> از پشت دخل یا حتی از خانه با گوشی‌تان قیمت هر آیتم را فوری ویرایش و ذخیره کنید.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>کلید فوری موجود / ناموجود:</strong> آیتمی تمام شد؟ با ۱ لمس آن را ناموجود کنید تا مشتری روی میز بداند و معطل نشود.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>عکس‌های اشتهابرانگیز و فروش بیشتر:</strong> عکس‌های وسوسه‌انگیز دسرها و نوشیدنی‌ها مشتری را به سفارش آیتم‌های گران‌تر ترغیب می‌کند.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>اسکن فوری سفارش توسط سالن‌دار:</strong> مشتری اقلام را در سینی انتخاب می‌کند و ویتر با اسکن بارکد در کسری از ثانیه سفارش را می‌گیرد.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: Interactive Theme Showcase Simulator */}
      <section id="simulator" className="py-12 px-4 max-w-7xl mx-auto">
        <ThemeShowcaseSimulator />
      </section>

      {/* SECTION 4: How It Works on the Table (مراحل سر میز) */}
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>تجربه بی‌دردسر مشتری و سالن‌دار</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            فرآیند ساده ۳ مرحله‌ای سر میز کافه
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl relative hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-black text-lg mb-4">
              ۱
            </div>
            <h4 className="font-black text-base text-white">اسکن بارکد استند میز</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              مشتری به محض نشستن سر میز، دوربین گوشی را روی استند چوبی یا اکریلیک می‌گیرد و منو زیر نیم‌ثانیه باز می‌شود؛ بدون نیاز به نصب هیچ برنامه‌ای.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl relative hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center font-black text-lg mb-4">
              ۲
            </div>
            <h4 className="font-black text-base text-white">انتخاب و جمع فاکتور میز</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              مشتری نوشیدنی‌ها و کیک‌ها را با عکس باکیفیت می‌بیند، آیتم‌ها را به سینی اضافه می‌کند و جمع هزینه میز را با خیال راحت چک می‌کند.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl relative hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-black text-lg mb-4">
              ۳
            </div>
            <h4 className="font-black text-base text-white">اسکن سریع توسط سالن‌دار</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              وقتی سالن‌دار سر میز می‌آید، بارکد سینی مشتری را اسکن می‌کند و تمام اقلام سفارش فوراً روی گوشی او ثبت می‌شود؛ صفر درصد خطای شنیداری!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Printing Savings Calculator */}
      <section id="calculator" className="py-12 px-4 max-w-7xl mx-auto">
        <RoiCalculator />
      </section>

      {/* SECTION 6: Transparent Pricing Grid */}
      <section id="pricing" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>پلن‌های شفاف و بدون هزینه مخفی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            تعرفه‌های اشتراک منوی دیجیتال کافه
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            کمتر از هزینه چاپ یک دور منوی کاغذی؛ با پشتیبانی کامل و به‌روزرسانی نامحدود
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Plan 1: Bronze */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-800/20 text-amber-500 flex items-center justify-center mb-4 border border-amber-800/30">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-white">پلن برنزی (۳ ماهه)</h3>
              <p className="text-xs text-slate-400 mt-1">مناسب تست و راه‌اندازی اولیه</p>

              <div className="my-5 pb-5 border-b border-slate-800">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ۳۸۰٬۰۰۰ <span className="text-xs font-normal text-slate-400">تومان</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">معادل ۱۲۶ هزار تومان در ماه</div>
              </div>

              <ul className="text-xs space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ثبت تا ۳۰ آیتم در منو</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>کیو‌آرکد اختصاصی وکتور کافه</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تغییر نامحدود قیمت‌ها در لحظه</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>کلید فوری موجود / ناموجود</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login?tab=register"
              className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs text-center transition-all border border-slate-700 block"
            >
              انتخاب پلن ۳ ماهه
            </Link>
          </div>

          {/* Plan 2: Silver */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-400/20 text-slate-300 flex items-center justify-center mb-4 border border-slate-400/30">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-white">پلن نقره‌ای (۶ ماهه)</h3>
              <p className="text-xs text-slate-400 mt-1">انتخاب محبوب برای کافه‌های محلی</p>

              <div className="my-5 pb-5 border-b border-slate-800">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ۷۵۰٬۰۰۰ <span className="text-xs font-normal text-slate-400">تومان</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">معادل ۱۲۵ هزار تومان در ماه</div>
              </div>

              <ul className="text-xs space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ثبت تا ۱۰۰ آیتم در دسته‌های مختلف</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>آپلود عکس اختصاصی برای هر آیتم</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>شخصی‌سازی لوگو و رنگ تم کافه</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>سینی جمع سفارش و فاکتور میز</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login?tab=register"
              className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs text-center transition-all border border-slate-700 block"
            >
              انتخاب پلن ۶ ماهه
            </Link>
          </div>

          {/* Plan 3: Gold (Featured) */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative shadow-amber-500/10">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full shadow-md">
              پیشنهاد ویژه کافه‌داران
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-white">پلن طلایی (۱ ساله)</h3>
              <p className="text-xs text-amber-300/80 mt-1">بیشترین صرفه‌جویی و امکانات کامل</p>

              <div className="my-5 pb-5 border-b border-slate-800">
                <div className="text-2xl font-black text-amber-400 font-mono">
                  ۱٬۲۰۰٬۰۰۰ <span className="text-xs font-normal text-slate-400">تومان</span>
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">فقط ۱۰۰ هزار تومان در ماه!</div>
              </div>

              <ul className="text-xs space-y-3 text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>آیتم‌ها و دسته‌بندی‌های نامحدود</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>۵ قالب حرفه‌ای (دارک، بیکری، مینیمال، سنتی)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>بارکد اسکن سفارش توسط ویتر</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>دانلود فایل چاپی QR با لوگوی کافه</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>پشتیبانی تلفنی و واتساپی اولویت‌دار</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login?tab=register"
              className="mt-8 w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs text-center transition-all shadow-lg shadow-amber-500/25 block"
            >
              فعال‌سازی پلن ۱ ساله طلایی
            </Link>
          </div>

          {/* Plan 4: Diamond */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/30">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-white">پلن الماس (۲ ساله)</h3>
              <p className="text-xs text-slate-400 mt-1">تضمین ثبات قیمت برای ۲ سال</p>

              <div className="my-5 pb-5 border-b border-slate-800">
                <div className="text-2xl font-black text-purple-400 font-mono">
                  ۲٬۴۰۰٬۰۰۰ <span className="text-xs font-normal text-slate-400">تومان</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">معادل ۱۰۰ هزار تومان در ماه</div>
              </div>

              <ul className="text-xs space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>تمام امکانات پلن طلایی</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>ورود رایگان اطلاعات منوی اولیه توسط تیم</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>طراحی اختصاصی فایل وکتور استند رومیزی</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>تضمین عدم افزایش قیمت اشتراک تا ۲ سال</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login?tab=register"
              className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs text-center transition-all border border-slate-700 block"
            >
              انتخاب پلن ۲ ساله
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: Featured Cafes (کافه‌های شاخص و نمونه‌های زنده) */}
      <section id="cafes" className="py-16 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>شفافیت و نمونه‌های واقعی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            کافه‌های عضو و منوهای فعال در سامانه
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            روی هر کافه کلیک کنید تا منوی واقعی سر میز آن را به صورت زنده مشاهده فرمایید:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => {
            const sub = restaurant.subscriptions?.[0];
            return (
              <div
                key={restaurant.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-lg flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold overflow-hidden shadow-md"
                        style={{ backgroundColor: restaurant.themeColor || "#e11d48" }}
                      >
                        {restaurant.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={restaurant.logoUrl} alt={restaurant.name} className="w-full h-full object-cover" />
                        ) : (
                          <Coffee className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-black text-white text-sm">{restaurant.name}</h3>
                        <span className="text-xs text-slate-400 block line-clamp-1 mt-0.5">{restaurant.address || "تهران"}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0 font-medium">
                      عضو فعال
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 my-4 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">پلن فعال:</span>
                      <strong className="text-white">{sub?.planName || "اشتراک طلایی یک‌ساله"}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">اسکن کیو‌آرکد میزها:</span>
                      <strong className="text-amber-400 font-mono">{formatPersianNumber(restaurant.viewCount)} بار</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <Link
                    href={`/menu/${restaurant.slug}`}
                    target="_blank"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2.5 rounded-xl text-center font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-amber-400" />
                    <span>مشاهده زنده منوی مشتری سر میز</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 text-center text-xs text-slate-400 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-white font-extrabold text-sm">
            <Coffee className="w-4 h-4 text-amber-500" />
            <span>MenuSaaS | سامانه مدیریت و منوی دیجیتال کافه و رستوران</span>
          </div>
          <p className="text-slate-500 text-xs max-w-xl mx-auto leading-relaxed">
            طراحی‌شده برای حل دردسرهای واقعی کافه‌داران؛ خداحافظی با چاپ کاغذ، ویرایش سریع قیمت‌ها و سرعت‌بخشی به ثبت سفارشات سر میز.
          </p>
          <div className="pt-4 border-t border-slate-900 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500">
            <span>پایگاه داده ابری: Neon PostgreSQL</span>
            <span>فریم‌ورک: Next.js و Bun</span>
            <span>پروژه کارآفرینی و استارتاپی دانشگاهی</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
