// src/app/api/restaurant/category/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { restaurantId, title, icon } = body;

    const cleanTitle = String(title).trim().slice(0, 60);
    if (!restaurantId || !cleanTitle) {
      return NextResponse.json({ error: "عنوان دسته‌بندی الزامی است" }, { status: 400 });
    }

    const count = await prisma.category.count({ where: { restaurantId: String(restaurantId).trim() } });

    const category = await prisma.category.create({
      data: {
        restaurantId: String(restaurantId).trim(),
        title: cleanTitle,
        icon: icon ? String(icon).slice(0, 30) : "Layers",
        orderIndex: count + 1,
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "خطا در ایجاد دسته‌بندی" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "شناسه الزامی است" }, { status: 400 });
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "خطا در حذف دسته‌بندی" }, { status: 500 });
  }
}
