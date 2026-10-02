// src/app/api/restaurant/item/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { isAvailable, price } = body;

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        ...(typeof isAvailable === "boolean" ? { isAvailable } : {}),
        ...(typeof price === "number" ? { price } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, price, description, imageUrl, isAvailable, categoryId } = body;

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(typeof price === "number" ? { price } : {}),
        ...(typeof description !== "undefined" ? { description } : {}),
        ...(typeof imageUrl !== "undefined" ? { imageUrl } : {}),
        ...(typeof isAvailable === "boolean" ? { isAvailable } : {}),
        ...(categoryId ? { categoryId } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error modifying menu item:", error);
    return NextResponse.json({ error: "Failed to edit item" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.menuItem.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
