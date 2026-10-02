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

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u0600-\u06FF\-]/g, "") + "-" + Math.floor(100 + Math.random() * 900);

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
        viewCount: 15,
      },
    });

    // 3. Create Subscription (1 year)
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

    // 4. Create Transaction
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
      },
    });

    return NextResponse.json(fullRestaurant);
  } catch (error) {
    console.error("Error creating sale:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
