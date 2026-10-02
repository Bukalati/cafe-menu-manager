"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  Store,
  QrCode,
  Download,
  ExternalLink,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Wifi,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Upload,
  Edit3,
  Trash2,
  Palette,
  Image as ImageIcon,
  Save,
  Check,
  Phone,
  Sparkles,
  Camera,
  X,
  Sliders,
} from "lucide-react";
import { formatToman, formatPersianNumber, formatPersianDate } from "@/lib/utils";
import { THEME_PRESETS, getTheme } from "@/lib/themes";

interface MenuItemData {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  categoryId: string;
}

interface CategoryData {
  id: string;
  title: string;
  icon: string | null;
  items: MenuItemData[];
}

interface RestaurantDetailsProps {
  restaurant: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    phone: string | null;
    address: string | null;
    instagram: string | null;
    wifiPassword: string | null;
    themeColor: string;
    logoUrl: string | null;
    coverUrl: string | null;
    viewCount: number;
    categories: CategoryData[];
    subscriptions: {
      planName: string;
      amount: number;
      status: string;
      startDate: string;
      endDate: string;
      trackingCode: string | null;
    }[];
  };
}

// Preset food/drink photos for instant selection
const PRESET_IMAGES = [
  { name: "اسپرسو / قهوه", url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop&q=80" },
  { name: "لاته با آرت", url: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80" },
  { name: "آیس کافی / موهیتو", url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80" },
  { name: "چیزکیک و دسر", url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80" },
  { name: "پاستا و پنه", url: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=80" },
  { name: "برگر و ساندویچ", url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80" },
];

const THEME_PALETTES = [
  { name: "زرشکی سلطنتی", color: "#e11d48" },
  { name: "کافی کهربایی", color: "#b45309" },
  { name: "سبز کورتادو", color: "#059669" },
  { name: "آبی کافه‌ای", color: "#0284c7" },
  { name: "بنفش مدرن", color: "#9333ea" },
  { name: "مشکی لوکس", color: "#334155" },
];

export default function RestaurantDashboard({ restaurant }: RestaurantDetailsProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "customization" | "qr" | "subscription">("menu");

  // State for Categories and Items
  const [categories, setCategories] = useState<CategoryData[]>(restaurant.categories || []);
  const [activeCategory, setActiveCategory] = useState<string>(restaurant.categories?.[0]?.id || "");
  const [newCatTitle, setNewCatTitle] = useState("");

  // New Item State (Default image from preset)
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemImage, setNewItemImage] = useState(PRESET_IMAGES[0].url);
  const [isUploading, setIsUploading] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  // Edit Item Modal State
  const [editingItem, setEditingItem] = useState<MenuItemData | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Cafe Profile & Customization State
  const [cafeName, setCafeName] = useState(restaurant.name);
  const [cafeDesc, setCafeDesc] = useState(restaurant.description || "");
  const [cafePhone, setCafePhone] = useState(restaurant.phone || "");
  const [cafeAddress, setCafeAddress] = useState(restaurant.address || "");
  const [cafeInstagram, setCafeInstagram] = useState(restaurant.instagram || "");
  const [cafeWifi, setCafeWifi] = useState(restaurant.wifiPassword || "");
  const [cafeColor, setCafeColor] = useState(restaurant.themeColor || "#e11d48");
  const [cafeLogo, setCafeLogo] = useState(restaurant.logoUrl || "");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  const activeTheme = getTheme(cafeColor);

  const qrRef = useRef<SVGSVGElement>(null);

  // Hydration-safe menu URL calculation
  useEffect(() => {
    setMounted(true);
  }, []);

  const menuUrl = mounted && typeof window !== "undefined"
    ? `${window.location.origin}/menu/${restaurant.slug}`
    : `/menu/${restaurant.slug}`;

  // Handle Image File Upload (Item or Logo)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "new_item" | "edit_item" | "logo") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (target === "logo") setIsUploadingLogo(true);
    else setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (target === "new_item") setNewItemImage(data.url);
        if (target === "edit_item") setEditImage(data.url);
        if (target === "logo") setCafeLogo(data.url);
      }
    } catch {
      alert("خطا در بارگذاری تصویر");
    } finally {
      setIsUploading(false);
      setIsUploadingLogo(false);
    }
  };

  // Toggle Item Availability
  const handleToggleAvailability = async (itemId: string, currentStatus: boolean) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) =>
          item.id === itemId ? { ...item, isAvailable: !currentStatus } : item
        ),
      }))
    );

    try {
      await fetch(`/api/restaurant/item/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !currentStatus }),
      });
    } catch {
      alert("خطا در تغییر وضعیت");
    }
  };

  // Add Item to Menu
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle || !newItemPrice || !activeCategory) {
      alert("لطفاً نام، قیمت و دسته‌بندی را مشخص کنید");
      return;
    }

    setIsAddingItem(true);
    try {
      const res = await fetch(`/api/restaurant/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: restaurant.id,
          categoryId: activeCategory,
          title: newItemTitle,
          price: Number(newItemPrice),
          description: newItemDesc,
          imageUrl: newItemImage,
        }),
      });

      if (res.ok) {
        const createdItem = await res.json();
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === activeCategory
              ? { ...cat, items: [...cat.items, createdItem] }
              : cat
          )
        );
        setNewItemTitle("");
        setNewItemPrice("");
        setNewItemDesc("");
        alert("✅ آیتم جدید با عکس با موفقیت به منو اضافه شد!");
      }
    } catch {
      alert("خطا در ایجاد آیتم منو");
    } finally {
      setIsAddingItem(false);
    }
  };

  // Open Edit Modal for Item
  const openEditModal = (item: MenuItemData) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditPrice(String(item.price));
    setEditDesc(item.description || "");
    setEditImage(item.imageUrl || PRESET_IMAGES[0].url);
  };

  // Save Edited Item
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSavingEdit(true);
    try {
      const res = await fetch(`/api/restaurant/item/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          price: Number(editPrice),
          description: editDesc,
          imageUrl: editImage,
        }),
      });

      if (res.ok) {
        setCategories((prev) =>
          prev.map((cat) => ({
            ...cat,
            items: cat.items.map((i) =>
              i.id === editingItem.id
                ? {
                    ...i,
                    title: editTitle,
                    price: Number(editPrice),
                    description: editDesc,
                    imageUrl: editImage,
                  }
                : i
            ),
          }))
        );
        setEditingItem(null);
        alert("✅ آیتم با موفقیت ویرایش و ذخیره شد!");
      }
    } catch {
      alert("خطا در ویرایش آیتم");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Delete Item
  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("آیا از حذف این آیتم از منو مطمئن هستید؟")) return;

    try {
      await fetch(`/api/restaurant/item/${itemId}`, { method: "DELETE" });
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          items: cat.items.filter((i) => i.id !== itemId),
        }))
      );
    } catch {
      alert("خطا در حذف آیتم");
    }
  };

  // Add Category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatTitle.trim()) return;

    try {
      const res = await fetch(`/api/restaurant/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantId: restaurant.id, title: newCatTitle }),
      });
      if (res.ok) {
        const newCat = await res.json();
        setCategories([...categories, { ...newCat, items: [] }]);
        setActiveCategory(newCat.id);
        setNewCatTitle("");
      }
    } catch {
      alert("خطا در ایجاد دسته‌بندی");
    }
  };

  // Save Restaurant Customization / Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSavedSuccess(false);

    try {
      const res = await fetch(`/api/restaurant/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: restaurant.id,
          name: cafeName,
          description: cafeDesc,
          phone: cafePhone,
          address: cafeAddress,
          instagram: cafeInstagram,
          wifiPassword: cafeWifi,
          themeColor: cafeColor,
          logoUrl: cafeLogo,
        }),
      });

      if (res.ok) {
        setSettingsSavedSuccess(true);
        alert("✅ مشخصات و هویت بصری کافه با موفقیت در دیتابیس ابری ذخیره شد!");
        setTimeout(() => setSettingsSavedSuccess(false), 3000);
      }
    } catch {
      alert("خطا در ذخیره‌سازی اطلاعات کافه");
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Download QR Code
  const handleDownloadQR = () => {
    if (!qrRef.current) return;
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `QR_${restaurant.slug}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const sub = restaurant.subscriptions?.[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="بازگشت به پنل مدیریت"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg font-bold overflow-hidden"
            style={{ backgroundColor: activeTheme.accentColor }}
          >
            {cafeLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cafeLogo} alt="لوگوی کافه" className="w-full h-full object-cover" />
            ) : (
              <Store className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{cafeName}</h1>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                پنل مدیریت اختصاصی
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {cafeAddress || "تهران"}
              {cafeWifi && (
                <span className="mr-3 flex items-center gap-1 text-slate-400">
                  <Wifi className="w-3.5 h-3.5 text-rose-400" />
                  وای‌فای: <code className="text-rose-300 font-mono">{cafeWifi}</code>
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/menu/${restaurant.slug}`}
            target="_blank"
            className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-rose-600/20"
          >
            <ExternalLink className="w-4 h-4" />
            مشاهده زنده منوی مشتری
          </Link>
        </div>
      </div>

      {/* Main Tabs Navigation Bar */}
      <div className="max-w-7xl mx-auto mb-8 bg-slate-900/90 border border-slate-800 p-2 rounded-2xl shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-stretch">
        <button
          onClick={() => setActiveTab("menu")}
          className={`h-full min-h-[56px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center text-center gap-2 ${
            activeTab === "menu"
              ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
              : "bg-slate-950/60 text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400 shrink-0" />
          <span>۱. مدیریت منو و قیمت‌ها</span>
        </button>

        <button
          onClick={() => setActiveTab("customization")}
          className={`h-full min-h-[56px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center text-center gap-2 ${
            activeTab === "customization"
              ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
              : "bg-slate-950/60 text-slate-400 hover:text-white"
          }`}
        >
          <Palette className="w-4 h-4 text-sky-400 shrink-0" />
          <span>۲. ویرایش اطلاعات و تم کافه</span>
        </button>

        <button
          onClick={() => setActiveTab("qr")}
          className={`h-full min-h-[56px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center text-center gap-2 ${
            activeTab === "qr"
              ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
              : "bg-slate-950/60 text-slate-400 hover:text-white"
          }`}
        >
          <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>۳. استودیو و دانلود QR Code</span>
        </button>

        <button
          onClick={() => setActiveTab("subscription")}
          className={`h-full min-h-[56px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center text-center gap-2 ${
            activeTab === "subscription"
              ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
              : "bg-slate-950/60 text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
          <span>۴. اشتراک و فاکتور</span>
        </button>
      </div>

      {/* TAB 1: Menu Items & Photos */}
      {activeTab === "menu" && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List (Col 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              {/* Category Header & Selector */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-rose-500" />
                    دسته‌بندی‌های منو
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    دسته‌بندی مورد نظر را انتخاب کنید و آیتم‌های آن را ویرایش یا اضافه نمایید.
                  </p>
                </div>

                {/* Add Category Form */}
                <form onSubmit={handleAddCategory} className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={newCatTitle}
                    onChange={(e) => setNewCatTitle(e.target.value)}
                    placeholder="نام دسته جدید..."
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 w-36"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap"
                  >
                    + افزودن دسته
                  </button>
                </form>
              </div>

              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-800 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                        : "bg-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {cat.title} ({formatPersianNumber(cat.items?.length || 0)})
                  </button>
                ))}
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {categories.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    هنوز دسته‌بندی ایجاد نشده است. از فرم بالا اولین دسته را اضافه کنید.
                  </div>
                )}

                {categories
                  .find((c) => c.id === activeCategory)
                  ?.items?.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border gap-4 transition-all ${
                        item.isAvailable
                          ? "bg-slate-800/70 border-slate-700/80"
                          : "bg-slate-900/40 border-slate-800/60 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                          {item.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{item.title}</h4>
                            {!item.isAvailable && (
                              <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.2 rounded font-medium">
                                ناموجود
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                          <div className="text-xs font-bold text-emerald-400 mt-1 font-mono">
                            {formatToman(item.price)}
                          </div>
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleToggleAvailability(item.id, item.isAvailable)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                            item.isAvailable
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                              : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200"
                          }`}
                        >
                          {item.isAvailable ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              موجود
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-rose-400" />
                              ناموجود
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => openEditModal(item)}
                          className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs flex items-center gap-1 transition-colors border border-slate-600"
                          title="ویرایش عکس، نام و قیمت"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                          ویرایش
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors"
                          title="حذف آیتم"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Add New Item Form with Prominent Image Upload & Presets (Col 1) */}
          <div className="space-y-6">
            <div className="bg-slate-900 border-2 border-slate-700/80 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                <PlusCircle className="w-5 h-5 text-rose-500" />
                افزودن آیتم جدید به این دسته‌بندی
              </h3>

              <form onSubmit={handleAddItem} className="space-y-4">
                {/* PROMINENT IMAGE UPLOAD & PRESET SECTION */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-rose-400" />
                    انتخاب یا آپلود عکس برای این آیتم:
                  </label>

                  {/* Active Selected Image Preview */}
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border-2 border-slate-700 mb-3 bg-slate-900 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={newItemImage}
                      alt="پیش‌نمایش تصویر محصول"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-white flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      تصویر آماده ثبت
                    </div>
                  </div>

                  {/* Upload from computer/phone button */}
                  <label className="w-full bg-slate-800 hover:bg-slate-700 border-2 border-dashed border-rose-500/50 hover:border-rose-400 rounded-xl p-3 text-xs text-white font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all mb-3 shadow-md">
                    <Upload className="w-4 h-4 text-rose-400" />
                    <span>{isUploading ? "در حال آپلود تصویر..." : "📁 آپلود عکس دلخواه از گوشی یا فایل سیستم"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "new_item")}
                    />
                  </label>

                  {/* Quick Preset Images Grid */}
                  <div className="text-[11px] text-slate-400 mb-1.5">یا انتخاب سریع از عکس‌های پیشنهادی:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewItemImage(preset.url)}
                        className={`rounded-lg overflow-hidden border-2 relative h-12 transition-all ${
                          newItemImage === preset.url
                            ? "border-rose-500 ring-2 ring-rose-500/50 scale-105"
                            : "border-slate-800 opacity-60 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان آیتم (مثلاً چیزکیک پسته):</label>
                  <input
                    type="text"
                    required
                    value={newItemTitle}
                    onChange={(e) => setNewItemTitle(e.target.value)}
                    placeholder="عنوان آیتم (مثلاً چیزکیک پسته)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">قیمت به تومان (مثلاً 120000):</label>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="قیمت به تومان (مثلاً 120000)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">توضیحات کوتاه یا مواد تشکیل‌دهنده (اختیاری):</label>
                  <textarea
                    rows={2}
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="توضیحات کوتاه یا مواد تشکیل‌دهنده (اختیاری)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isAddingItem || isUploading}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold py-3 rounded-xl transition-all shadow-lg shadow-rose-600/30 disabled:opacity-50"
                >
                  {isAddingItem ? "در حال ثبت آیتم..." : "ثبت آیتم در منوی آنلاین"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Cafe Customization & Branding (Name, Address, Logo, Theme Color) */}
      {activeTab === "customization" && (
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-rose-500" />
                شخصی‌سازی هویت بصری و مشخصات کافه
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                تغییر نام کافه، آدرس، لوگو، رنگ تم و رمز وای‌فای (اعمال لحظه‌ای در دیتابیس ابری)
              </p>
            </div>

            {settingsSavedSuccess && (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
                <Check className="w-4 h-4" />
                تغییرات ذخیره شد!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6 text-sm">
            {/* Cafe Logo Upload Section */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 flex items-center justify-center shrink-0 shadow-lg">
                {cafeLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cafeLogo} alt="لوگوی کافه" className="w-full h-full object-cover" />
                ) : (
                  <Store className="w-8 h-8 text-slate-600" />
                )}
              </div>

              <div className="flex-1 text-center sm:text-right">
                <h4 className="font-bold text-white text-xs mb-1">لوگوی اختصاصی کافه</h4>
                <p className="text-[11px] text-slate-400 mb-3">
                  لوگوی شما در بالای منوی آنلاین مشتری و در مرکز کیو‌آرکد میزها قرار می‌گیرد.
                </p>
                <label className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-rose-400" />
                  <span>{isUploadingLogo ? "در حال آپلود لوگو..." : "آپلود لوگوی کافه (تصویر مربع)"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "logo")}
                  />
                </label>
              </div>
            </div>

            {/* Theme Presets Selection Studio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  قالب‌های بصری و تم‌های آماده منو (تغییر با ۱ کلیک):
                </label>
                <span className="text-[11px] text-slate-400">
                  تم فعال: <strong className="text-rose-400 font-bold">{activeTheme.name}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = cafeColor === preset.id || cafeColor === preset.accentColor;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setCafeColor(preset.id)}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? "border-rose-500 bg-slate-800/90 ring-2 ring-rose-500/40 shadow-lg"
                          : "border-slate-800 bg-slate-950 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{preset.name}</span>
                          {isSelected && (
                            <span className="text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                              فعال
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                          {preset.subtitle}
                        </p>
                      </div>

                      {/* Swatch color dots */}
                      <div className="flex items-center gap-1 shrink-0 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                        {preset.swatchColors.map((color, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full shadow"
                            style={{ backgroundColor: color }}
                          ></span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Theme Preview Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
                  <span>پیش‌نمایش زنده کارت آیتم در منوی مشتری:</span>
                  <span className="text-[10px] text-emerald-400 font-medium">✓ همگام با تم انتخابی ({activeTheme.name})</span>
                </div>
                <div className={`p-4 rounded-xl border ${activeTheme.cardBgClass} transition-all`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeTheme.accentColor }}></span>
                      <span className={`font-black text-xs ${activeTheme.textPrimary}`}>کافه لاته با آرت باریستا</span>
                    </div>
                    <span className={`text-xs ${activeTheme.priceClass}`}>۹۵٬۰۰۰ تومان</span>
                  </div>
                  <p className={`text-[11px] ${activeTheme.textSecondary} mt-1.5`}>
                    اسپرسو دوپیو ۱۰۰٪ عربیکا با شیر فوم‌گرفته مخملی
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                    <span className={activeTheme.badgeClass + " px-2 py-0.5 rounded font-medium"}>موجود در منو</span>
                    <span className={activeTheme.trayButtonBg + " px-2.5 py-1 rounded-lg font-bold"}>+ افزودن به سینی</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">نام کافه / رستوران:</label>
                <input
                  type="text"
                  required
                  value={cafeName}
                  onChange={(e) => setCafeName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">شماره تماس جهت سفارش تلفنی:</label>
                <input
                  type="text"
                  value={cafePhone}
                  onChange={(e) => setCafePhone(e.target.value)}
                  placeholder="021..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">آدرس دقیق کافه (جهت نمایش روی منو):</label>
              <input
                type="text"
                value={cafeAddress}
                onChange={(e) => setCafeAddress(e.target.value)}
                placeholder="تهران، خیابان ولیعصر..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">آیدی صفحه اینستاگرام (بدون @):</label>
                <input
                  type="text"
                  value={cafeInstagram}
                  onChange={(e) => setCafeInstagram(e.target.value)}
                  placeholder="viona_cafe"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">رمز وای‌فای کافه (جهت کپی سریع توسط مشتری):</label>
                <input
                  type="text"
                  value={cafeWifi}
                  onChange={(e) => setCafeWifi(e.target.value)}
                  placeholder="cafe1234"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">متن خوش‌آمدگویی یا بایو کافه:</label>
              <textarea
                rows={2}
                value={cafeDesc}
                onChange={(e) => setCafeDesc(e.target.value)}
                placeholder="توضیحی درباره اتمسفر کافه، سبک قهوه یا سابقه..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSavingSettings}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSavingSettings ? "در حال ذخیره‌سازی در دیتابیس ابری..." : "ذخیره تغییرات کافه در دیتابیس ابری"}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: QR Code Studio */}
      {activeTab === "qr" && (
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-white font-bold text-base">
            <QrCode className="w-5 h-5 text-rose-500" />
            استودیو کیو‌آرکد میزها
          </div>
          <p className="text-xs text-slate-400 mb-6">
            این بارکد را پرینت کنید و روی میزهای کافه بچسبانید تا مشتریان با دوربین گوشی مستقیماً منوی شما را باز کنند.
          </p>

          <div className="inline-block p-4 bg-white rounded-2xl shadow-2xl mb-6">
            <QRCodeSVG
              ref={qrRef}
              value={menuUrl}
              size={200}
              bgColor="#ffffff"
              fgColor={cafeColor || "#0f172a"}
              level="H"
              includeMargin={false}
            />
          </div>

          <div
            className="text-xs text-slate-400 font-mono mb-6 bg-slate-950 p-2.5 rounded-xl break-all border border-slate-800"
            suppressHydrationWarning
          >
            {menuUrl}
          </div>

          <button
            onClick={handleDownloadQR}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Download className="w-4 h-4 text-rose-400" />
            دانلود فایل وکتور با کیفیت چاپ (SVG)
          </button>
        </div>
      )}

      {/* TAB 4: Subscription Info */}
      {activeTab === "subscription" && (
        <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <span className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              وضعیت اشتراک تجاری و فاکتور رسمی
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
              {sub?.status === "ACTIVE" ? "فعال" : "منقضی"}
            </span>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex justify-between py-2.5 border-b border-slate-800">
              <span className="text-slate-400">نوع پلن خریداری شده:</span>
              <strong className="text-white text-sm">{sub?.planName || "اشتراک سالانه طلایی"}</strong>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-800">
              <span className="text-slate-400">مبلغ پرداخت شده:</span>
              <strong className="text-emerald-400 text-sm font-mono">{formatToman(sub?.amount || 0)}</strong>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-800">
              <span className="text-slate-400">کد پیگیری درگاه شتاب:</span>
              <span className="font-mono text-slate-200 text-sm">{sub?.trackingCode || "-"}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-800">
              <span className="text-slate-400">تاریخ تمدید بعدی:</span>
              <span>{sub ? formatPersianDate(sub.endDate) : "-"}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-slate-400">تعداد بازدید و اسکن‌های منو:</span>
              <strong className="text-sky-400 font-mono text-sm">{formatPersianNumber(restaurant.viewCount)} بار</strong>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute left-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-amber-400" />
              ویرایش آیتم «{editingItem.title}»
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">نام محصول:</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">قیمت به تومان:</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">توضیحات:</label>
                <textarea
                  rows={2}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">تصویر محصول:</label>
                <div className="relative w-full h-28 rounded-xl overflow-hidden border border-slate-700 mb-2 bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={editImage}
                    alt="ویرایش عکس"
                    className="w-full h-full object-cover"
                  />
                </div>

                <label className="w-full bg-slate-800 hover:bg-slate-700 border border-dashed border-slate-600 rounded-xl p-2 text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors mb-2">
                  <Upload className="w-3.5 h-3.5 text-rose-400" />
                  <span>{isUploading ? "در حال آپلود..." : "آپلود تصویر جدید از فایل"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "edit_item")}
                  />
                </label>

                <div className="grid grid-cols-6 gap-1">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditImage(preset.url)}
                      className={`rounded-lg overflow-hidden border relative h-9 transition-all ${
                        editImage === preset.url
                          ? "border-rose-500 ring-2 ring-rose-500/50"
                          : "border-slate-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSavingEdit || isUploading}
                  className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-50"
                >
                  {isSavingEdit ? "در حال ذخیره..." : "ثبت تغییرات"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
