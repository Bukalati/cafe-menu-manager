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
  const decodedSlug = decodeURIComponent(slug);

  // Fetch full restaurant details with categories and items in a single query
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      OR: [
        { slug: slug },
        { slug: decodedSlug },
      ],
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
  });

  if (!restaurant) {
    notFound();
  }

  // Non-blocking scan activity counter (ensures menu always loads with zero delay)
  prisma.restaurant
    .update({
      where: { id: restaurant.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch((err) => {
      console.warn("ViewCount update non-critical warning:", err);
    });

  return <CustomerMenu restaurant={restaurant} />;
}
