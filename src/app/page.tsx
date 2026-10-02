// src/app/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CafeSimulator from "@/components/home/CafeSimulator";
import {
  Store,
  ShieldCheck,
  TrendingUp,
  QrCode,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Coffee,
  Building,
  Smartphone,
  Check,
  Lock,
  Layers,
  Zap,
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

  const totalRevenue = restaurants.reduce((acc, r) => {
    return acc + (r.subscriptions[0]?.amount || 0);
  }, 0);

  const totalScans = restaurants.reduce((acc, r) => acc + r.viewCount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">MenuSaaS</span>
              <span className="mr-2 text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-medium">
                سامانه هوشمند رستوران
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              ورود به حساب کاربری
            </Link>
            <Link
              href="/admin"
              className="bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              پنل نظارت دانشگاه
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.15),rgba(255,255,255,0))]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            راهکار هوشمند B2B برای کافه‌ها و رستوران‌های مدرن
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-tight">
            منوی دیجیتال کافه شما <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 bg-clip-text text-transparent">
              بدون هزینه چاپ کاغذی و با تغییر لحظه‌ای قیمت‌ها
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            با اسکن یک بارکد ساده روی میز، منوی شیک کافه شما همراه با عکس‌های اشتهاآور، توضیحات و قیمت‌های روز روی گوشی مشتری باز می‌شود.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#simulator"
              className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-rose-600/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              تست و شخصی‌سازی فوری منوی کافه
            </a>
            <Link
              href="/login"
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-rose-400" />
              ورود به پنل مدیریت کافه‌داران
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Props (Why Restaurants Love This) */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">تغییر نامحدود قیمت‌ها در لحظه</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              دیگر نیازی به هزینه‌های سنگین چاپ مجدد منوهای کاغذی یا خط زدن روی قیمت‌ها نیست. با چند لمس در گوشی، قیمت‌ها و آیتم‌های جدید را ثبت کنید.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">کیو‌آرکد وکتور اختصاصی میزها</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              بارکد هوشمند با لوگو و رنگ سازمانی کافه شما تولید شده و فایل کیفیت چاپ بالا (SVG) را دریافت می‌کنید تا روی استندهای میز نصب کنید.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">کلید فوری اعلام ناموجودی</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              اگر یک دسر یا نوشیدنی تمام شد، با یک کلیک در پنل وضعیت آن را به «ناموجود» تغییر دهید تا مشتری بیهوده آن را سفارش ندهد.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section id="simulator" className="max-w-6xl mx-auto px-4 mb-24">
        <CafeSimulator />
      </section>

      {/* Live Financial Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              آمار زنده ثبت‌شده در دیتابیس ابری (PostgreSQL)
            </span>
            <h2 className="text-lg font-bold text-white mt-1">شاخص‌های صحه‌گذاری فروش جهت ارائه دانشگاه</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-xs text-slate-400 mb-1">مجموع گردش فروش اشتراک</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                {formatToman(totalRevenue)}
              </div>
              <div className="text-[11px] text-emerald-500/80 mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                تاییدیه بانکی شتاب
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-xs text-slate-400 mb-1">تعداد اشتراک‌های فعال</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">
                {formatPersianNumber(restaurants.length)} <span className="text-xs font-normal text-slate-400">مجموعه</span>
              </div>
              <div className="text-[11px] text-rose-400 mt-1 flex items-center justify-center gap-1">
                <Store className="w-3 h-3" />
                کافه‌ها و رستوران‌ها
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-xs text-slate-400 mb-1">میانگین ارزش هر فروش</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                {formatToman(Math.round(totalRevenue / (restaurants.length || 1)))}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">پلن‌های سالیانه طلایی</div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-xs text-slate-400 mb-1">کل دفعات اسکن منو</div>
              <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono">
                {formatPersianNumber(totalScans)} <span className="text-xs font-normal text-slate-400">اسکن</span>
              </div>
              <div className="text-[11px] text-sky-400/80 mt-1">ترافیک واقعی کاربران سر میزها</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cafes Showcase */}
      <section id="restaurants" className="max-w-7xl mx-auto px-4 mb-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Store className="w-5 h-5 text-rose-500" />
              مشتریان و کافه‌های فعال در سامانه
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              منوی زنده هر کافه را با کلیک بررسی کنید یا وارد پنل مدیریت آن شوید.
            </p>
          </div>
          <Link
            href="/admin"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl transition-all"
          >
            مشاهده گزارش و جدول حسابرسی کلی ←
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => {
            const sub = restaurant.subscriptions[0];
            return (
              <div
                key={restaurant.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md font-bold text-sm"
                        style={{ backgroundColor: restaurant.themeColor }}
                      >
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{restaurant.name}</h3>
                        <span className="text-xs text-slate-400 block line-clamp-1">{restaurant.address || "تهران"}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0 font-medium">
                      اشتراک فعال
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 my-4 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">پلن خریداری‌شده:</span>
                      <strong className="text-white">{sub?.planName || "اشتراک سالانه"}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">مبلغ اشتراک:</span>
                      <strong className="text-emerald-400">{formatToman(sub?.amount || 0)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">تعداد اسکن کیو‌آرکد:</span>
                      <strong className="text-sky-400 font-mono">{formatPersianNumber(restaurant.viewCount)} بار</strong>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <Link
                    href={`/menu/${restaurant.slug}`}
                    target="_blank"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-xl text-center font-medium flex items-center justify-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                    منوی مشتری
                  </Link>
                  <Link
                    href={`/dashboard/${restaurant.slug}`}
                    className="bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs py-2 rounded-xl text-center font-medium flex items-center justify-center gap-1 transition-colors"
                  >
                    <Store className="w-3.5 h-3.5" />
                    پنل کافه
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 bg-slate-950">
        <p>طراحی و توسعه پلتفرم MenuSaaS | سامانه هوشمند منوی دیجیتال و اشتراک رستوران</p>
        <p className="mt-1 text-slate-600">پایگاه داده ابری: Neon PostgreSQL | فریم‌ورک: Next.js و Bun</p>
      </footer>
    </div>
  );
}

