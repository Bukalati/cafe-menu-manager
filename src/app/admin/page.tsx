// src/app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
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

  return <AdminDashboard initialRestaurants={restaurants} />;
}
