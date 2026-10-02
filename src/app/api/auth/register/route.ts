// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cafeName, ownerName, phone, email, password, planName, amount } = body;

    if (!cafeName || !ownerName || !phone || !email || !password) {
      return NextResponse.json({ error: "لطفاً تمام اطلاعات ستاره‌دار را تکمیل کنید" }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existing) {
      return NextResponse.json({ error: "این ایمیل قبلاً در سامانه ثبت شده است. لطفاً وارد شوید." }, { status: 400 });
    }

    // Create safe unique ASCII slug
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const cleanAscii = cafeName
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    const slug = cleanAscii && cleanAscii.length > 2
      ? `${cleanAscii}-${randomSuffix}`
      : `cafe-${Date.now().toString(36)}-${randomSuffix}`;

    // 1. Create User
    const user = await prisma.user.create({
      data: {
        name: ownerName,
        phone,
        email: email.trim().toLowerCase(),
        passwordHash: password,
        role: "RESTAURANT_ADMIN",
      },
    });

    // 2. Create Restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        userId: user.id,
        name: cafeName,
        slug,
        phone,
        viewCount: 1,
        themeColor: "#e11d48",
        description: `خوش‌آمدید به ${cafeName}! منوی دیجیتال آنلاین ما در خدمت شماست.`,
      },
    });

    // 3. Create Default Categories and Sample Items
    const catHot = await prisma.category.create({
      data: {
        restaurantId: restaurant.id,
        title: "نوشیدنی گرم",
        orderIndex: 1,
      },
    });

    const catCold = await prisma.category.create({
      data: {
        restaurantId: restaurant.id,
        title: "نوشیدنی سرد",
        orderIndex: 2,
      },
    });

    await prisma.menuItem.createMany({
      data: [
        {
          restaurantId: restaurant.id,
          categoryId: catHot.id,
          title: "اسپرسو دبل تخصصی",
          description: "۱۰۰٪ عربیکا با عصاره‌گیری استاندارد",
          price: 75000,
          imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 1,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catHot.id,
          title: "کافه لاته با آرت",
          description: "شات اسپرسو به همراه شیر مخملی",
          price: 95000,
          imageUrl: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 2,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catCold.id,
          title: "موهیتو دست‌ساز تازه",
          description: "نعناع تازه، لیمو طبیعی و آب گازدار",
          price: 98000,
          imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 1,
        },
      ],
    });

    // 4. Create Subscription
    const planCost = Number(amount) || 1200000;
    const planTitle = planName || "اشتراک سالانه طلایی";
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const trackingCode = "ZP-" + Math.floor(10000000 + Math.random() * 90000000);

    const subscription = await prisma.subscription.create({
      data: {
        restaurantId: restaurant.id,
        planName: planTitle,
        amount: planCost,
        status: "ACTIVE",
        startDate,
        endDate,
        paymentMethod: "ONLINE",
        trackingCode,
        isApproved: true,
      },
    });

    // 5. Create Transaction
    await prisma.transaction.create({
      data: {
        restaurantId: restaurant.id,
        subscriptionId: subscription.id,
        amount: planCost,
        status: "SUCCESS",
        trackingCode,
        gateway: "زرین‌پال (سامانه شتاب)",
        paidAt: startDate,
      },
    });

    const response = NextResponse.json({
      success: true,
      redirectUrl: `/dashboard/${slug}`,
    });

    response.cookies.set("auth_session", JSON.stringify({ id: user.id, role: user.role, name: user.name }), {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "خطا در ثبت‌نام و فعال‌سازی حساب" }, { status: 500 });
  }
}
