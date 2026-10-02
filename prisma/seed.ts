// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 شروع پاکسازی و ساخت دیتابیس تمیز و حرفه‌ای (Clean Seeding)...");

  // ۱. پاکسازی کامل کلیه رکوردهای تستی و ماک قبلی
  await prisma.transaction.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 دیتابیس با موفقیت از کلیه داده‌های تستی و نامنظم پاکسازی شد.");

  // ۲. ساخت اکانت مدیریت پلتفرم (Alireza)
  const superAdmin = await prisma.user.create({
    data: {
      name: "Alireza",
      email: "alireza@menusaas.ir",
      phone: "09123456789",
      passwordHash: "Alireza123456",
      role: "SUPER_ADMIN",
    },
  });

  // ۳. ساخت اکانت ناظر دانشگاه (daneshgah)
  const inspector = await prisma.user.create({
    data: {
      name: "daneshgah",
      email: "daneshgah@uni.ac.ir",
      phone: "09120000000",
      passwordHash: "daneshgah123",
      role: "INSPECTOR",
    },
  });

  console.log("✅ اکانت‌های اصلی سیستم با نام کاربری و رمز جدید ایجاد شدند:");
  console.log(`- ادمین اصلی: Alireza | رمز: Alireza123456 | نقش: SUPER_ADMIN`);
  console.log(`- ناظر دانشگاه: daneshgah | رمز: daneshgah123 | نقش: INSPECTOR`);

  // ۴. ساخت کاربر صاحب کافه دمو (نمونه بازاریابی)
  const demoOwner = await prisma.user.create({
    data: {
      name: "امیرحسین تهرانی (مدیر کافه عمارت)",
      email: "demo@menusaas.ir",
      phone: "09121112233",
      passwordHash: "cafe123",
      role: "RESTAURANT_ADMIN",
    },
  });

  // ۵. ساخت کافه شاهکار و کامل برای بازاریابی و ارائه به مشتریان (Showcase Cafe)
  const demoCafe = await prisma.restaurant.create({
    data: {
      userId: demoOwner.id,
      name: "کافه عمارت بهشت",
      slug: "emarat",
      description: "فضایی دنج و اصیل با عطر قهوه ۱۰۰٪ عربیکا تخصصی، دسرهای تازه فرانسوی و منوی کامل صبحانه و عصرانه در عمارت تاریخی بهشت.",
      address: "تهران، خیابان ولیعصر، بالاتر از زعفرانیه، پلاک ۴۲",
      phone: "021-22709080",
      instagram: "emarat_behesht",
      wifiPassword: "Emarat_Guest_2026",
      themeColor: "dark-luxury:coffee:#f59e0b",
      coverUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1400&auto=format&fit=crop&q=80",
      logoUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&auto=format&fit=crop&q=80",
      viewCount: 3420,
    },
  });

  // ۶. تعریف دسته‌بندی‌های غنی و کامل
  const catHot = await prisma.category.create({
    data: {
      restaurantId: demoCafe.id,
      title: "قهوه تخصصی و بار گرم ☕",
      orderIndex: 1,
    },
  });

  const catCold = await prisma.category.create({
    data: {
      restaurantId: demoCafe.id,
      title: "بار سرد و ماکتیل‌های دست‌ساز 🍹",
      orderIndex: 2,
    },
  });

  const catDessert = await prisma.category.create({
    data: {
      restaurantId: demoCafe.id,
      title: "کیک و دسرهای تازه بیکری 🍰",
      orderIndex: 3,
    },
  });

  const catBreakfast = await prisma.category.create({
    data: {
      restaurantId: demoCafe.id,
      title: "صبحانه و برانچ ویژه 🍳",
      orderIndex: 4,
    },
  });

  const catMain = await prisma.category.create({
    data: {
      restaurantId: demoCafe.id,
      title: "غذای اصلی و پاستا 🍝",
      orderIndex: 5,
    },
  });

  // ۷. افزودن منوی کامل و باکیفیت با تصاویر واقعی و قیمت‌های متداول تهران
  await prisma.menuItem.createMany({
    data: [
      // قهوه گرم
      {
        restaurantId: demoCafe.id,
        categoryId: catHot.id,
        title: "اسپرسو دوپیو ۱۰۰٪ عربیکا",
        description: "دبل شات عصاره‌گیری شده از دانه کلمبیا سوپریمو با نت‌های شکلاتی و مرکباتی",
        price: 75000,
        imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 1,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catHot.id,
        title: "کافه لاته با آرت باریستا",
        description: "شات اسپرسو تازه به همراه شیر فوم‌گرفته مخملی و لته‌آرت اختصاصی",
        price: 95000,
        imageUrl: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 2,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catHot.id,
        title: "کورتادو اسپانیایی",
        description: "نسبت مساوی اسپرسو غلیظ و شیر گرم فوم‌گرفته در لیوان شیشه‌ای کلاسیک",
        price: 85000,
        imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 3,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catHot.id,
        title: "کارامل ماکیاتو مخملی",
        description: "ترکیب سس کارامل دست‌ساز، شیر بخاردیده و اسپرسو معطر با تاپینگ کارامل",
        price: 98000,
        imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 4,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catHot.id,
        title: "کمکس و قهوه دمی تخصصی",
        description: "دم‌آوری تک‌خاستگاه اتیوپی یرگاچف با متد کمکس، طعم‌یاد گلی و بادی شفاف",
        price: 110000,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 5,
      },

      // بار سرد
      {
        restaurantId: demoCafe.id,
        categoryId: catCold.id,
        title: "آیس لاته وانیل ماداگاسکار",
        description: "اسپرسو تازه روی تکه‌های یخ کریستالی، شیر سرد و سیروپ ارگانیک وانیل",
        price: 98000,
        imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 1,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catCold.id,
        title: "موهیتو دست‌ساز تازه کوبیده",
        description: "برگ نعناع تازه کوبیده، لیمو ترش طبیعی، شکر قهوه‌ای و آب گازدار سودا",
        price: 105000,
        imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 2,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catCold.id,
        title: "سان‌ست ماکتیل استوایی",
        description: "لایه‌بندی طبیعی پشن‌فروت، آب انار تازه و پرتقال دست‌چین با جلوه رنگی غروب",
        price: 115000,
        imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 3,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catCold.id,
        title: "شیک نوتلا و فندق برشته",
        description: "بستنی وانیلی خالص، نوتلا اصل ایتالیایی و پودر فندق رست‌شده دست‌ساز",
        price: 135000,
        imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 4,
      },

      // کیک و دسر
      {
        restaurantId: demoCafe.id,
        categoryId: catDessert.id,
        title: "چیزکیک سن‌سباستین با سس شکلات بلژیکی",
        description: "پخت روز با بافت لطیف کرمی، لایه سوخته کاراملی و سس گاناش شکلات تلخ ۶۰٪",
        price: 145000,
        imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 1,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catDessert.id,
        title: "وافل داغ بلژیکی با میوه فصل",
        description: "وافل تازه پخته‌شده ترد، اسکوپ بستنی وانیلی، توت‌فرنگی تازه و سس شکلات",
        price: 135000,
        imageUrl: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 2,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catDessert.id,
        title: "کروسان فرانسوی کره و عسل",
        description: "نان کروسان لایه‌ای و کره‌ای داغ همراه با عسل طبیعی کوهستان",
        price: 85000,
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 3,
      },

      // صبحانه
      {
        restaurantId: demoCafe.id,
        categoryId: catBreakfast.id,
        title: "بشقاب صبحانه انگلیسی کامل",
        description: "تخم‌مرغ نیمرو، سوسیس گریل، بیکن گوشت، خوراک لوبیا گرم، قارچ تفت‌داده و نان تست",
        price: 210000,
        imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 1,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catBreakfast.id,
        title: "املت اسفناج، گوجه و پنیر فتا",
        description: "سه عدد تخم‌مرغ مزرعه، برگ اسفناج تفت‌داده با سیر تازه، گوجه گیلاسی و نان سنگک داغ",
        price: 115000,
        imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 2,
      },

      // غذای اصلی
      {
        restaurantId: demoCafe.id,
        categoryId: catMain.id,
        title: "پاستا پنه آلفردو با فیله مرغ گریل",
        description: "پنه ریگاته با خامه تازه، کره، پنیر پارمزان ۲۴ ماهه، قارچ قهوه‌ای و فیله مرغ مرینیت‌شده",
        price: 195000,
        imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 1,
      },
      {
        restaurantId: demoCafe.id,
        categoryId: catMain.id,
        title: "اسمش برگر دست‌ساز با سیب‌زمینی",
        description: "۱۸۰ گرم گوشت گوساله تازه، پنیر چدار آب‌شده، پیاز کاراملی، سس مخصوص و سیب‌زمینی سرخ‌کرده",
        price: 240000,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
        isAvailable: true,
        orderIndex: 2,
      },
    ],
  });

  // ۸. ایجاد اشتراک سالانه طلایی برای کافه دمو
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1);

  const sub = await prisma.subscription.create({
    data: {
      restaurantId: demoCafe.id,
      planName: "اشتراک سالانه طلایی (پلن نامحدود)",
      amount: 1200000,
      status: "ACTIVE",
      startDate,
      endDate,
      paymentMethod: "ONLINE",
      trackingCode: "ZP-99482012",
      isApproved: true,
    },
  });

  await prisma.transaction.create({
    data: {
      restaurantId: demoCafe.id,
      subscriptionId: sub.id,
      amount: 1200000,
      status: "SUCCESS",
      trackingCode: "ZP-99482012",
      gateway: "زرین‌پال (سامانه شتاب)",
      paidAt: startDate,
    },
  });

  console.log("🌟 منوی نمونه باکیفیت و کامل «کافه عمارت بهشت» با آدرس /menu/emarat ساخته شد.");
  console.log("🎉 عملیات پاکسازی و بازآرایی دیتابیس با موفقیت به پایان رسید!");
}

main()
  .catch((e) => {
    console.error("❌ خطا در اجرای اسکریپت دیتابیس:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
