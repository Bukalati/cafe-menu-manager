// src/app/api/restaurant/item/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { restaurantId, categoryId, title, price, description, imageUrl } = body;

    if (!restaurantId || !categoryId || !title || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0 || numPrice > 100000000) {
      return NextResponse.json({ error: "قیمت وارد شده نامعتبر است" }, { status: 400 });
    }

    const cleanTitle = String(title).trim().slice(0, 100);
    const cleanDesc = description ? String(description).trim().slice(0, 500) : null;

    const item = await prisma.menuItem.create({
      data: {
        restaurantId: String(restaurantId).trim(),
        categoryId: String(categoryId).trim(),
        title: cleanTitle,
        price: Math.round(numPrice),
        description: cleanDesc,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
