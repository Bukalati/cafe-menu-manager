// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const cleanInput = String(body.email || body.username || "").trim().toLowerCase();
    const cleanPassword = String(body.password || "").trim();

    if (!cleanInput || !cleanPassword) {
      return NextResponse.json({ error: "نام کاربری/ایمیل و رمز عبور را وارد کنید" }, { status: 400 });
    }

    // Find user by email or username (case-insensitive)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: cleanInput, mode: "insensitive" } },
          { name: { equals: cleanInput, mode: "insensitive" } },
          ...(cleanInput === "alireza" ? [{ email: "alireza@menusaas.ir" }] : []),
          ...(cleanInput === "daneshgah" ? [{ email: "daneshgah@uni.ac.ir" }] : []),
        ],
      },
      include: {
        restaurants: true,
      },
    });

    if (!user || user.passwordHash !== cleanPassword) {
      return NextResponse.json({ error: "نام کاربری یا رمز عبور اشتباه است" }, { status: 401 });
    }

    let redirectUrl = "/";
    let restaurantSlug = null;

    if (user.role === "SUPER_ADMIN" || user.role === "INSPECTOR") {
      redirectUrl = "/admin";
    } else if (user.restaurants.length > 0) {
      restaurantSlug = user.restaurants[0].slug;
      redirectUrl = `/dashboard/${restaurantSlug}`;
    }

    const response = NextResponse.json({
      success: true,
      redirectUrl,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantSlug,
      },
    });

    // Set cookie
    response.cookies.set("auth_session", JSON.stringify({ id: user.id, role: user.role, name: user.name }), {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "خطای سرور در احراز هویت" }, { status: 500 });
  }
}
