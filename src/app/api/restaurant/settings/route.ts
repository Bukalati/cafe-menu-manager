// src/app/api/restaurant/settings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      description,
      phone,
      address,
      instagram,
      wifiPassword,
      themeColor,
      logoUrl,
      coverUrl,
    } = body;

    if (!id || !name) {
      return NextResponse.json({ error: "شناسه و نام رستوران الزامی است" }, { status: 400 });
    }

    const updated = await prisma.restaurant.update({
      where: { id },
      data: {
        name,
        description: description || null,
        phone: phone || null,
        address: address || null,
        instagram: instagram || null,
        wifiPassword: wifiPassword || null,
        themeColor: themeColor || "#e11d48",
        logoUrl: logoUrl || null,
        coverUrl: coverUrl || null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating restaurant settings:", error);
    return NextResponse.json({ error: "خطا در ذخیره تنظیمات" }, { status: 500 });
  }
}
