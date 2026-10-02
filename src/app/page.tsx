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
  Star,
  Crown,
  Clock,
  Award,
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
              href="/login?tab=register"
              className="bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/30"
            >
              ثبت‌نام کافه جدید
            </Link>
            <Link
              href="/admin"
              className="bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hidden sm:flex"
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
              href="#pricing"
              className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-rose-600/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Crown className="w-5 h-5 text-amber-300" />
              مشاهده تعرفه‌ها و خرید اشتراک
            </a>
            <a
              href="#simulator"
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-rose-400" />
              شبیه‌ساز و تست منو
            </a>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
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

      {/* Interactive Simulator Section (Pure Client Simulation) */}
      <section id="simulator" className="max-w-6xl mx-auto px-4 mb-24">
        <CafeSimulator />
      </section>

      {/* 4-TIER SUBSCRIPTION PLANS SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold mb-3">
            <Crown className="w-3.5 h-3.5" />
            پلن‌های اشتراک تجاری MenuSaaS
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            تعرفه شفاف و متناسب با نیاز هر کافه و رستوران
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            بدون هیچ درصد کارمزد از سفارشات مشتریان؛ فقط با یک هزینه اشتراک ثابت منوی آنلاین خود را مدیریت کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Plan 1: Bronze */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-700/20 text-amber-500 flex items-center justify-center mb-4 border border-amber-700/30">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">پلن برنزی (۳ ماهه)</h3>
              <p className="text-xs text-slate-400 mt-1">مناسب برای شروع و تست منوی دیجیتال</p>

              <div className="my-5 pb-5 border-b border-slate-800">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ۳۸۰٬۰۰۰ <span className="text-xs font-normal text-slate-400">تومان</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">معادل ۱۲۶ هزار تومان در ماه</div>
              </div>

              <ul className="text-xs space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ثبت تا ۳۰ آیتم در منوی آنلاین</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>کیو‌آرکد استاندارد اختصاصی کافه</span>
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
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-400/20 text-slate-300 flex items-center justify-center mb-4 border border-slate-400/30">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">پلن نقره‌ای (۶ ماهه)</h3>
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
                  <span>ثبت تا ۱۰۰ آیتم در دسته‌های نامحدود</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>آپلود عکس برای تمامی آیتم‌ها</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ثبت وای‌فای، شماره و پیج اینستاگرام</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>دانلود کیو‌آرکد وکتور SVG</span>
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

          {/* Plan 3: Gold (Special / Featured) */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative scale-105 z-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
              ★ پرفروش‌ترین و به‌صرفه‌ترین
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/30">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">پلن طلایی (۱ ساله ویژه)</h3>
              <p className="text-xs text-slate-400 mt-1">کامل‌ترین پکیج برای رشد فروش کافه</p>

              <div className="my-5 pb-5 border-b border-slate-800">
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  ۱٬۲۰۰٬۰۰۰ <span className="text-xs font-normal text-slate-400">تومان / سالانه</span>
                </div>
                <div className="text-[11px] text-emerald-400/80 mt-1 font-bold">فقط ۱۰۰ هزار تومان در ماه!</div>
              </div>

              <ul className="text-xs space-y-3 text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تعداد کاملاً نامحدود آیتم و عکس</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>شخصی‌سازی تم رنگی و آپلود لوگوی کافه</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>استودیو کیو‌آرکد با لوگو در مرکز</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>چاپ و ارسال رایگان ۵ استند رومیزی شفاف</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>پشتیبانی VIP و اولویت آپدیت‌ها</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login?tab=register"
              className="mt-8 w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3.5 rounded-xl text-xs text-center transition-all shadow-xl shadow-rose-600/30 block"
            >
              خرید و راه‌اندازی پلن طلایی
            </Link>
          </div>

          {/* Plan 4: Diamond / Franchise */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/30">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">پلن الماس (چند شعبه)</h3>
              <p className="text-xs text-slate-400 mt-1">برای رستوران‌های بزرگ و شعبات</p>

              <div className="my-5 pb-5 border-b border-slate-800">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ۲٬۴۰۰٬۰۰۰ <span className="text-xs font-normal text-slate-400">تومان / سالانه</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">مدیریت متمرکز شعب</div>
              </div>

              <ul className="text-xs space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>امکان اتصال تا ۳ شعبه کافه در یک پنل</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تعریف دسترسی چندکاربره (صندوق‌دار، باریستا)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>گزارشات آماری پیشرفته ترافیک اسکن‌ها</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>مشاوره و طراحی اختصاصی استند میزها</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login?tab=register"
              className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs text-center transition-all border border-slate-700 block"
            >
              انتخاب پلن الماس
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cafes Showcase (Public View Only - No Admin Access) */}
      <section id="restaurants" className="max-w-7xl mx-auto px-4 mb-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Store className="w-5 h-5 text-rose-500" />
              کافه‌ها و رستوران‌های فعال در سامانه
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              جهت مشاهده کیفیت و سرعت، روی هر کافه کلیک کنید تا منوی آنلاین مشتری سر میز را بررسی نمایید.
            </p>
          </div>
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
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md font-bold text-sm overflow-hidden"
                        style={{ backgroundColor: restaurant.themeColor }}
                      >
                        {restaurant.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={restaurant.logoUrl} alt={restaurant.name} className="w-full h-full object-cover" />
                        ) : (
                          <Coffee className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{restaurant.name}</h3>
                        <span className="text-xs text-slate-400 block line-clamp-1">{restaurant.address || "تهران"}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0 font-medium">
                      عضو فعال
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 my-4 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">پلن فعال:</span>
                      <strong className="text-white">{sub?.planName || "اشتراک سالانه"}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">تعداد اسکن کیو‌آرکد:</span>
                      <strong className="text-sky-400 font-mono">{formatPersianNumber(restaurant.viewCount)} بار</strong>
                    </div>
                  </div>
                </div>

                {/* ONLY PUBLIC MENU LINK (Admin link removed as requested) */}
                <div className="pt-2 border-t border-slate-800">
                  <Link
                    href={`/menu/${restaurant.slug}`}
                    target="_blank"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2.5 rounded-xl text-center font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-rose-400" />
                    مشاهده زنده منوی مشتری سر میز
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
