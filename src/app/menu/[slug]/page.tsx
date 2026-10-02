// src/app/menu/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CustomerMenu from "@/components/menu/CustomerMenu";

export const dynamic = "force-dynamic";

export default async function PublicMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Increment view count to record scan activity
  const restaurant = await prisma.restaurant.update({
    where: { slug },
    data: {
      viewCount: {
        increment: 1,
      },
    },
    include: {
      categories: {
        orderBy: { orderIndex: "asc" },
        include: {
          items: {
            orderBy: { orderIndex: "asc" },
          },
        },
      },
    },
  }).catch(() => null);

  if (!restaurant) {
    notFound();
  }

  return <CustomerMenu restaurant={restaurant} />;
}
