// src/app/admin/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // ۱. بررسی امنیتی نشست کاربر (Session Auth Check)
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("auth_session");

  if (!sessionCookie || !sessionCookie.value) {
    redirect("/login?callbackUrl=/admin&error=admin_required");
  }

  let session: { id?: string; role?: string; name?: string } = {};
  try {
    session = JSON.parse(decodeURIComponent(sessionCookie.value));
  } catch {
    redirect("/login?callbackUrl=/admin&error=admin_required");
  }

  // بررسی نقش مجاز
  if (session.role !== "SUPER_ADMIN" && session.role !== "INSPECTOR") {
    redirect("/login?callbackUrl=/admin&error=unauthorized");
  }

  // ۲. اعتبارسنجی قطعی کاربر در دیتابیس برای جلوگیری از دستکاری دستی کوکی
  if (!session.id) {
    redirect("/login?callbackUrl=/admin&error=admin_required");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, role: true, name: true },
  });

  if (!dbUser || (dbUser.role !== "SUPER_ADMIN" && dbUser.role !== "INSPECTOR")) {
    redirect("/login?callbackUrl=/admin&error=unauthorized");
  }

  // ۳. بارگذاری لیست کافه‌ها و اطلاعات آماری
  const rawRestaurants = await prisma.restaurant.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
      subscriptions: {
        orderBy: {
          createdAt: "desc",
        },
      },
      transactions: {
        orderBy: {
          paidAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Serialize dates for Client Component
  const restaurants = rawRestaurants.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    subscriptions: r.subscriptions.map((s) => ({
      ...s,
      startDate: s.startDate.toISOString(),
      endDate: s.endDate.toISOString(),
    })),
    transactions: r.transactions.map((t) => ({
      ...t,
      paidAt: t.paidAt.toISOString(),
    })),
  }));

  return (
    <AdminDashboard
      initialRestaurants={restaurants}
      initialRole={dbUser.role as "SUPER_ADMIN" | "INSPECTOR"}
      adminName={dbUser.name}
    />
  );
}
