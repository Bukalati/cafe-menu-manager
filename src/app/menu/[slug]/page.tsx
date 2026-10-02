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

  // Find restaurant by raw or decoded slug
  const target = await prisma.restaurant.findFirst({
    where: {
      OR: [
        { slug: slug },
        { slug: decodedSlug },
      ],
    },
    select: { id: true },
  });

  if (!target) {
    notFound();
  }

  // Increment view count to record scan activity
  const restaurant = await prisma.restaurant.update({
    where: { id: target.id },
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
  });

  return <CustomerMenu restaurant={restaurant} />;
}
