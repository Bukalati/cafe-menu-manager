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

    const cleanName = String(name).trim().slice(0, 100);
    if (!id || !cleanName) {
      return NextResponse.json({ error: "شناسه و نام رستوران الزامی است" }, { status: 400 });
    }

    const updated = await prisma.restaurant.update({
      where: { id: String(id).trim() },
      data: {
        name: cleanName,
        description: description ? String(description).trim().slice(0, 500) : null,
        phone: phone ? String(phone).trim().slice(0, 30) : null,
        address: address ? String(address).trim().slice(0, 200) : null,
        instagram: instagram ? String(instagram).trim().replace(/^@/, "").slice(0, 50) : null,
        wifiPassword: wifiPassword ? String(wifiPassword).trim().slice(0, 60) : null,
        themeColor: themeColor ? String(themeColor).trim().slice(0, 100) : "#e11d48",
        logoUrl: logoUrl ? String(logoUrl).trim() : null,
        coverUrl: coverUrl ? String(coverUrl).trim() : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating restaurant settings:", error);
    return NextResponse.json({ error: "خطا در ذخیره تنظیمات" }, { status: 500 });
  }
}
