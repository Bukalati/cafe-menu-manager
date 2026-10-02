// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "ایمیل و رمز عبور را وارد کنید" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: {
        restaurants: true,
      },
    });

    if (!user || user.passwordHash !== password) {
      return NextResponse.json({ error: "ایمیل یا رمز عبور اشتباه است" }, { status: 401 });
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
