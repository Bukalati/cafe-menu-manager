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

    const item = await prisma.menuItem.create({
      data: {
        restaurantId,
        categoryId,
        title,
        price: Number(price),
        description: description || null,
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
