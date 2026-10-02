// src/app/api/admin/sale/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, ownerName, phone, amount, planName } = body;

    if (!name || !ownerName || !phone) {
      return NextResponse.json({ error: "فیلدهای ضروری را وارد کنید" }, { status: 400 });
    }

    // Clean, URL-safe ASCII slug to prevent any 404 issues in Next.js routing
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const cleanAscii = name
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    const slug = cleanAscii && cleanAscii.length > 2
      ? `${cleanAscii}-${randomSuffix}`
      : `cafe-${Date.now().toString(36)}-${randomSuffix}`;

    const email = `owner_${Date.now()}@example.com`;

    // 1. Create owner User
    const user = await prisma.user.create({
      data: {
        name: ownerName,
        phone,
        email,
        passwordHash: "cafe123",
        role: "RESTAURANT_ADMIN",
      },
    });

    // 2. Create Restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        userId: user.id,
        name,
        slug,
        phone,
        viewCount: 1,
        themeColor: "#e11d48",
        description: `خوش‌آمدید به ${name}! منوی آنلاین ما در خدمت شماست.`,
      },
    });

    // 3. Create Default Categories and Sample Items so dashboard is never empty
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

    // 4. Create Subscription (1 year)
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const trackingCode = "ZP-" + Math.floor(10000000 + Math.random() * 90000000);

    const subscription = await prisma.subscription.create({
      data: {
        restaurantId: restaurant.id,
        planName: planName || "اشتراک سالانه طلایی",
        amount: Number(amount) || 1200000,
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
        amount: Number(amount) || 1200000,
        status: "SUCCESS",
        trackingCode,
        gateway: "زرین‌پال (سامانه شتاب)",
        paidAt: startDate,
      },
    });

    // Return the restaurant with relations
    const fullRestaurant = await prisma.restaurant.findUnique({
      where: { id: restaurant.id },
      include: {
        user: true,
        subscriptions: true,
        transactions: true,
        categories: {
          include: {
            items: true,
          },
        },
      },
    });

    return NextResponse.json(fullRestaurant);
  } catch (error) {
    console.error("Error creating sale:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
