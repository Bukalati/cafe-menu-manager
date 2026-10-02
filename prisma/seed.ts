// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 شروع تزریق داده‌های اولیه (Seeding database)...");

  // 1. پاکسازی داده‌های قبلی برای شروع تمیز
  await prisma.transaction.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  // 2. ساخت کاربر سوپر ادمین (علیرضا)
  const superAdmin = await prisma.user.create({
    data: {
      name: "علیرضا (مدیریت پلتفرم)",
      email: "admin@menusaas.ir",
      phone: "09123456789",
      passwordHash: "admin123", // در نسخه نهایی هش می‌شود
      role: "SUPER_ADMIN",
    },
  });

  // 3. ساخت حساب ناظر دانشگاه (برای ورود استاد)
  const inspector = await prisma.user.create({
    data: {
      name: "دکتر رضایی (استاد داور و ناظر دانشگاه)",
      email: "prof@uni.ac.ir",
      phone: "09120000000",
      passwordHash: "prof123",
      role: "INSPECTOR",
    },
  });

  console.log("✅ اکانت‌های مدیریتی و کاربری ساخته شدند:");
  console.log(`- سوپر ادمین: admin@menusaas.ir (رمز: admin123)`);
  console.log(`- استاد ناظر: prof@uni.ac.ir (رمز: prof123)`);

  // 4. لیست ۱۲ کافه و رستوران واقعی با جزئیات فروش اشتراک
  const sampleRestaurants = [
    {
      name: "کافه ویونا (شعبه پارک‌وی)",
      slug: "viona-parkway",
      ownerName: "امیرحسین کریمی",
      email: "viona@gmail.com",
      phone: "09121112233",
      themeColor: "#b45309",
      address: "تهران، تقاطع ولیعصر و چمران، پلاک ۱۲",
      instagram: "viona_cafe",
      amount: 1200000,
      plan: "اشتراک سالانه طلایی",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-88492011",
      daysAgo: 24,
      viewCount: 1420,
    },
    {
      name: "کافه رستوران بام شیان",
      slug: "bam-shian",
      ownerName: "فرزاد اکبری",
      email: "shian.bam@gmail.com",
      phone: "09122223344",
      themeColor: "#0284c7",
      address: "تهران، پارک جنگلی لویزان، بام شیان",
      instagram: "bam_shian",
      amount: 1200000,
      plan: "اشتراک سالانه طلایی",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-91024312",
      daysAgo: 20,
      viewCount: 1890,
    },
    {
      name: "رستوران سنتی و شربت‌خانه ترنج",
      slug: "toranj",
      ownerName: "سید محمد هاشمی",
      email: "toranj@gmail.com",
      phone: "09123334455",
      themeColor: "#059669",
      address: "تهران، خیابان شریعتی، بالاتر از پل رومی",
      instagram: "toranj_complex",
      amount: 1000000,
      plan: "اشتراک سالانه نقره‌ای",
      method: "CARD_TO_CARD",
      gateway: "کارت‌به‌کارت (تایید شده توسط ادمین)",
      trackingCode: "CTC-4512903",
      daysAgo: 18,
      viewCount: 960,
    },
    {
      name: "کافه لونا (Cafe Luna)",
      slug: "cafe-luna",
      ownerName: "نیما مرادی",
      email: "luna.cafe@gmail.com",
      phone: "09124445566",
      themeColor: "#e11d48",
      address: "تهران، سعادت‌آباد، میدان کاج، نبش نهم",
      instagram: "luna_cafe_teh",
      amount: 1200000,
      plan: "اشتراک سالانه طلایی",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-77401928",
      daysAgo: 16,
      viewCount: 2310,
    },
    {
      name: "برگر بار گرند (Grand Burger)",
      slug: "grand-burger",
      ownerName: "مهدی رسولی",
      email: "grand.burger@gmail.com",
      phone: "09125556677",
      themeColor: "#d97706",
      address: "تهران، شهرک غرب، بلوار دادمان",
      instagram: "grandburger_ir",
      amount: 1000000,
      plan: "اشتراک سالانه نقره‌ای",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-66192840",
      daysAgo: 14,
      viewCount: 1650,
    },
    {
      name: "کافه کتاب صبا",
      slug: "saba-bookcafe",
      ownerName: "سارا طاهری",
      email: "saba.books@gmail.com",
      phone: "09126667788",
      themeColor: "#4f46e5",
      address: "تهران، خیابان انقلاب، روبروی دانشگاه تهران",
      instagram: "saba_bookcafe",
      amount: 950000,
      plan: "اشتراک سالانه استاندارد",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-55019283",
      daysAgo: 12,
      viewCount: 880,
    },
    {
      name: "کافه بیکری نان و نمک",
      slug: "nan-va-namak",
      ownerName: "کاوه سلطانی",
      email: "nannonamak@gmail.com",
      phone: "09127778899",
      themeColor: "#ca8a04",
      address: "تهران، نیاوران، خیابان یاسر، کوچه تبریزی",
      instagram: "nanonamak_bakery",
      amount: 1100000,
      plan: "اشتراک سالانه طلایی",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-44102938",
      daysAgo: 10,
      viewCount: 1430,
    },
    {
      name: "رستوران ایتالیایی موونا (Moona)",
      slug: "moona-italian",
      ownerName: "آرمین فراهانی",
      email: "moona.food@gmail.com",
      phone: "09128889900",
      themeColor: "#16a34a",
      address: "تهران، پاسداران، نبش بهستان پنجم",
      instagram: "moona_restaurant",
      amount: 1200000,
      plan: "اشتراک سالانه طلایی",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-33291048",
      daysAgo: 8,
      viewCount: 2750,
    },
    {
      name: "کافه رستوران هیراد",
      slug: "hirad-cafe",
      ownerName: "رضا جهانگیری",
      email: "hirad.cafe@gmail.com",
      phone: "09129990011",
      themeColor: "#9333ea",
      address: "تهران، میرداماد، میدان مادر، مجتمع پایتخت",
      instagram: "hirad_cafe",
      amount: 1000000,
      plan: "اشتراک سالانه نقره‌ای",
      method: "CARD_TO_CARD",
      gateway: "کارت‌به‌کارت (تایید شده توسط ادمین)",
      trackingCode: "CTC-7719204",
      daysAgo: 6,
      viewCount: 1120,
    },
    {
      name: "کافه بردگیم کندو (Kandoo)",
      slug: "kandoo-cafe",
      ownerName: "احسان مقدم",
      email: "kandoo.games@gmail.com",
      phone: "09120001122",
      themeColor: "#ea580c",
      address: "تهران، یوسف‌آباد، خیابان فتحی شقاقی",
      instagram: "kandoo_games",
      amount: 950000,
      plan: "اشتراک سالانه استاندارد",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-22019284",
      daysAgo: 4,
      viewCount: 1340,
    },
    {
      name: "کافه اسپشیالیتی اکسیر (Elixir)",
      slug: "elixir-coffee",
      ownerName: "پویا شمس",
      email: "elixir.roastery@gmail.com",
      phone: "09121113355",
      themeColor: "#475569",
      address: "تهران، گیشا، کوچه ۲۵، پلاک ۷",
      instagram: "elixir_coffeelab",
      amount: 1000000,
      plan: "اشتراک سالانه نقره‌ای",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-11092837",
      daysAgo: 2,
      viewCount: 790,
    },
    {
      name: "کافه گالری ایوان",
      slug: "eyvan-gallery",
      ownerName: "مهسا انصاری",
      email: "eyvan.art@gmail.com",
      phone: "09122224466",
      themeColor: "#db2777",
      address: "تهران، خیابان فرشته، انتهای کوچه مریم",
      instagram: "eyvan_gallery_cafe",
      amount: 1200000,
      plan: "اشتراک سالانه طلایی",
      method: "ONLINE",
      gateway: "زرین‌پال (سامانه شتاب)",
      trackingCode: "ZP-99018274",
      daysAgo: 1,
      viewCount: 650,
    },
  ];

  let totalSalesAmount = 0;

  for (const item of sampleRestaurants) {
    totalSalesAmount += item.amount;

    // ۱. ساخت کاربر صاحب رستوران
    const owner = await prisma.user.create({
      data: {
        name: item.ownerName,
        email: item.email,
        phone: item.phone,
        passwordHash: "cafe123",
        role: "RESTAURANT_ADMIN",
      },
    });

    // ۲. ثبت اطلاعات رستوران
    const restaurant = await prisma.restaurant.create({
      data: {
        userId: owner.id,
        name: item.name,
        slug: item.slug,
        phone: item.phone,
        address: item.address,
        instagram: item.instagram,
        themeColor: item.themeColor,
        viewCount: item.viewCount,
        wifiPassword: "cafe" + Math.floor(1000 + Math.random() * 9000),
        description: `خوش‌آمدید به ${item.name}! سفارش خود را با بهترین کیفیت و در محیطی دلنشین تجربه کنید.`,
      },
    });

    // ۳. ثبت اشتراک فعال ۱ ساله
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - item.daysAgo);
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const subscription = await prisma.subscription.create({
      data: {
        restaurantId: restaurant.id,
        planName: item.plan,
        amount: item.amount,
        status: "ACTIVE",
        startDate,
        endDate,
        paymentMethod: item.method,
        trackingCode: item.trackingCode,
        isApproved: true,
      },
    });

    // ۴. ثبت تراکنش پرداخت موفق در دیتابیس
    await prisma.transaction.create({
      data: {
        restaurantId: restaurant.id,
        subscriptionId: subscription.id,
        amount: item.amount,
        status: "SUCCESS",
        trackingCode: item.trackingCode,
        gateway: item.gateway,
        paidAt: startDate,
      },
    });

    // ۵. اضافه کردن دسته‌بندی‌ها و آیتم‌های منو
    const catHot = await prisma.category.create({
      data: {
        restaurantId: restaurant.id,
        title: "نوشیدنی گرم و بار گرم",
        orderIndex: 1,
        icon: "Coffee",
      },
    });

    const catCold = await prisma.category.create({
      data: {
        restaurantId: restaurant.id,
        title: "نوشیدنی سرد و بارتندری",
        orderIndex: 2,
        icon: "GlassWater",
      },
    });

    const catFood = await prisma.category.create({
      data: {
        restaurantId: restaurant.id,
        title: "غذا، برگر و ساندویچ",
        orderIndex: 3,
        icon: "Utensils",
      },
    });

    const catDessert = await prisma.category.create({
      data: {
        restaurantId: restaurant.id,
        title: "کیک و دسر روز",
        orderIndex: 4,
        icon: "Cake",
      },
    });

    // آیتم‌های منو
    await prisma.menuItem.createMany({
      data: [
        {
          restaurantId: restaurant.id,
          categoryId: catHot.id,
          title: "اسپرسو دبل (Double Espresso)",
          description: "۱۰۰٪ عربیکا تخصصی با عصاره‌گیری استاندارد ۳۶ ثانیه‌ای",
          price: 75000,
          imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 1,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catHot.id,
          title: "کافه لاته (Caffe Latte)",
          description: "شات اسپرسو به همراه فوم شیر مخملی و آرت باریستا",
          price: 95000,
          imageUrl: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 2,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catHot.id,
          title: "آمریکانو داغ (Americano)",
          description: "دو شات اسپرسو به همراه آب جوش با کرمای غلیظ",
          price: 80000,
          imageUrl: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 3,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catCold.id,
          title: "موهیتو دست‌ساز تازه",
          description: "نعناع تازه، لیمو ترش طبیعی، سیروپ شکر قهوه‌ای و آب گازدار",
          price: 98000,
          imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 1,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catCold.id,
          title: "آیس کارامل ماکیاتو",
          description: "شیر سرد، یخ قالبی، سیروپ وانیل، شات اسپرسو و سس کارامل لایه‌ای",
          price: 110000,
          imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 2,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catFood.id,
          title: "پنینی مرغ و بیکن دودی",
          description: "سینه مرغ گریل شده، پنیر گودا ذوب شده، سس خردل ملایم در نان چاباتا",
          price: 185000,
          imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 1,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catFood.id,
          title: "پاستا پنه آلفردو با سینه مرغ",
          description: "پنه ریگاته، سس خامه و پارمزان تازه، قارچ تفت‌داده و جعفری معطر",
          price: 240000,
          imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 2,
        },
        {
          restaurantId: restaurant.id,
          categoryId: catDessert.id,
          title: "چیزکیک نیویورکی تنوری",
          description: "بافت کرمی لطیف با کراست بیسکویت لوتوس و سس توت‌فرنگی طبیعی",
          price: 125000,
          imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80",
          isAvailable: true,
          orderIndex: 1,
        },
      ],
    });
  }

  console.log(`🎉 با موفقیت ۱۲ رستوران با تمام منوها و اشتراک‌ها ثبت شدند.`);
  console.log(`💰 مجموع درآمد ثبت‌شده برای ارائه به دانشگاه: ${totalSalesAmount.toLocaleString("fa-IR")} تومان`);
}

main()
  .catch((e) => {
    console.error("❌ خطا در اجرای Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
