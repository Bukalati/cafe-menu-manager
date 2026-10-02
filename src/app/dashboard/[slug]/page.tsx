// src/app/dashboard/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RestaurantDashboard from "@/components/restaurant/RestaurantDashboard";

export const dynamic = "force-dynamic";

export default async function RestaurantDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const rawRestaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      categories: {
        orderBy: { orderIndex: "asc" },
        include: {
          items: {
            orderBy: { orderIndex: "asc" },
          },
        },
      },
      subscriptions: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!rawRestaurant) {
    notFound();
  }

  // Serialize dates
  const restaurant = {
    ...rawRestaurant,
    createdAt: rawRestaurant.createdAt.toISOString(),
    updatedAt: rawRestaurant.updatedAt.toISOString(),
    subscriptions: rawRestaurant.subscriptions.map((s) => ({
      ...s,
      startDate: s.startDate.toISOString(),
      endDate: s.endDate.toISOString(),
    })),
  };

  return <RestaurantDashboard restaurant={restaurant} />;
}
