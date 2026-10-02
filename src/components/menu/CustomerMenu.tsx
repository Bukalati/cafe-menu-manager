"use client";

import React, { useState } from "react";
import {
  Search,
  Wifi,
  MapPin,
  Coffee,
  Sparkles,
  Check,
  Phone,
  Store,
  LayoutGrid,
  List,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  Copy,
  X,
  ChevronRight,
  Info,
} from "lucide-react";
import { formatToman, formatPersianNumber } from "@/lib/utils";
import { getTheme } from "@/lib/themes";

interface MenuItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
}

interface Category {
  id: string;
  title: string;
  items: MenuItem[];
}

interface CustomerMenuProps {
  restaurant: {
    id: string;
    name: string;
    description: string | null;
    address: string | null;
    phone: string | null;
    instagram: string | null;
    wifiPassword: string | null;
    themeColor: string;
    logoUrl?: string | null;
    coverUrl?: string | null;
    categories: Category[];
  };
}

export default function CustomerMenu({ restaurant }: CustomerMenuProps) {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"visual" | "compact">("visual");

  // Table Pre-Order Tray state: { [itemId]: quantity }
  const [tray, setTray] = useState<{ [itemId: string]: number }>({});
  const [showTrayModal, setShowTrayModal] = useState(false);
  const [copiedTrayText, setCopiedTrayText] = useState(false);

  // Selected item modal for full preview
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  // Active theme from preset or hex
  const theme = getTheme(restaurant.themeColor);

  const allCategories = restaurant.categories || [];
  const allItems = allCategories.flatMap((cat) => cat.items);

  // Tray calculations
  const totalTrayCount = Object.values(tray).reduce((acc, qty) => acc + qty, 0);
  const totalTrayPrice = allItems.reduce((acc, item) => {
    const qty = tray[item.id] || 0;
    return acc + qty * item.price;
  }, 0);

  const handleCopyWifi = () => {
    if (restaurant.wifiPassword) {
      navigator.clipboard.writeText(restaurant.wifiPassword);
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2000);
    }
  };

  const handleAddToTray = (itemId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTray((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleRemoveFromTray = (itemId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTray((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const handleClearTray = () => {
    setTray({});
    setShowTrayModal(false);
  };

  const handleCopyTraySummary = () => {
    const selectedEntries = Object.entries(tray).filter(([_, qty]) => qty > 0);
    if (selectedEntries.length === 0) return;

    let text = `📋 یادداشت سفارش میز - ${restaurant.name}\n`;
    text += `─────────────\n`;
    selectedEntries.forEach(([id, qty]) => {
      const item = allItems.find((i) => i.id === id);
      if (item) {
        text += `• ${qty}× ${item.title} (${formatToman(item.price * qty)})\n`;
      }
    });
    text += `─────────────\n`;
    text += `💰 جمع کل فاکتور: ${formatToman(totalTrayPrice)}`;

    navigator.clipboard.writeText(text);
    setCopiedTrayText(true);
    setTimeout(() => setCopiedTrayText(false), 2500);
  };

  return (
    <div className={`min-h-screen ${theme.bodyBgClass} font-sans pb-28 selection:bg-rose-500 selection:text-white transition-colors duration-300`}>
      {/* Top Cafe Header Banner */}
      <div
        className="relative pt-12 pb-8 px-4 text-center shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          background: restaurant.coverUrl
            ? `linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.95) 100%), url(${restaurant.coverUrl}) center/cover no-repeat`
            : theme.headerGradient,
        }}
      >
        <div className="max-w-md mx-auto relative z-10">
          {/* Cafe Logo */}
          <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl overflow-hidden ring-4 ring-white/10">
            {restaurant.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={restaurant.logoUrl}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Store className="w-10 h-10 text-white" />
            )}
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
            {restaurant.name}
          </h1>

          {restaurant.description && (
            <p className="text-xs text-white/80 mt-1.5 line-clamp-2 px-4 leading-relaxed">
              {restaurant.description}
            </p>
          )}

          {/* Badges / Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            {restaurant.wifiPassword && (
              <button
                onClick={handleCopyWifi}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-white/90 shadow-sm"
              >
                <Wifi className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
                <span>وای‌فای: <strong className="font-mono">{restaurant.wifiPassword}</strong></span>
                {copiedWifi ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-white/60">(کپی)</span>
                )}
              </button>
            )}

            {restaurant.instagram && (
              <a
                href={`https://instagram.com/${restaurant.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-white/90 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@{restaurant.instagram}</span>
              </a>
            )}

            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone}`}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-white/90 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
                <span className="font-mono">{restaurant.phone}</span>
              </a>
            )}
          </div>

          {restaurant.address && (
            <div className="text-[11px] text-white/70 mt-2.5 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-white/60" />
              <span>{restaurant.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Search, View Switcher & Category Filter */}
      <div className={`sticky top-0 z-30 ${theme.navBgClass} px-4 py-3 shadow-md`}>
        <div className="max-w-md mx-auto space-y-3">
          {/* Search bar + Layout Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 ${theme.textMuted}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو در منو (مثلاً اسپرسو، پاستا...)"
                className={`w-full ${theme.searchBg} border ${theme.searchBorder} rounded-xl pr-9 pl-4 py-2 text-xs focus:outline-none transition-colors shadow-inner`}
              />
            </div>

            {/* Layout Mode Toggle (Visual Card vs Compact List) */}
            <div className="flex items-center bg-black/10 dark:bg-white/10 p-1 rounded-xl border border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setLayoutMode("visual")}
                className={`p-1.5 rounded-lg transition-all ${
                  layoutMode === "visual"
                    ? "bg-white text-slate-900 shadow-sm font-bold"
                    : `${theme.textMuted} hover:text-white`
                }`}
                title="نمایش کارتی عکس‌محور"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("compact")}
                className={`p-1.5 rounded-lg transition-all ${
                  layoutMode === "compact"
                    ? "bg-white text-slate-900 shadow-sm font-bold"
                    : `${theme.textMuted} hover:text-white`
                }`}
                title="نمایش فهرستی فشرده"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Category Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCat("ALL")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === "ALL" ? theme.filterActive : theme.filterInactive
              }`}
            >
              همه منو
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCat === cat.id ? theme.filterActive : theme.filterInactive
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items List */}
      <div className="max-w-md mx-auto px-4 pt-6 space-y-8">
        {allCategories
          .filter((cat) => selectedCat === "ALL" || cat.id === selectedCat)
          .map((cat) => {
            const filteredItems = cat.items.filter(
              (item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-3.5">
                {/* Category Header */}
                <div className={`flex items-center justify-between border-b ${theme.dividerClass} pb-2`}>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: theme.accentColor }}
                    ></span>
                    <h2 className={`font-black text-sm ${theme.textPrimary}`}>{cat.title}</h2>
                  </div>
                  <span className={`text-[11px] ${theme.textMuted} font-mono`}>
                    ({formatPersianNumber(filteredItems.length)})
                  </span>
                </div>

                {/* Items Container: Visual Grid vs Compact List */}
                <div className={layoutMode === "visual" ? "space-y-4" : "space-y-2.5"}>
                  {filteredItems.map((item) => {
                    const countInTray = tray[item.id] || 0;

                    if (layoutMode === "visual") {
                      // MODE 1: VISUAL CARD (Hero Image + Full Details)
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItemForModal(item)}
                          className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
                            theme.cardBgClass
                          } ${theme.cardHoverClass} ${
                            !item.isAvailable ? "opacity-60 grayscale-[40%]" : ""
                          }`}
                        >
                          {/* Item Image Banner if available */}
                          {item.imageUrl && (
                            <div className="w-full h-44 relative bg-slate-900 overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                              {!item.isAvailable && (
                                <div className="absolute top-3 left-3 bg-rose-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                                  ناموجود
                                </div>
                              )}
                            </div>
                          )}

                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className={`font-black text-sm ${theme.textPrimary} leading-tight`}>
                                {item.title}
                              </h3>
                              <div className={`text-sm ${theme.priceClass} shrink-0`}>
                                {formatToman(item.price)}
                              </div>
                            </div>

                            {item.description && (
                              <p className={`text-xs ${theme.textSecondary} mt-1.5 leading-relaxed line-clamp-2`}>
                                {item.description}
                              </p>
                            )}

                            {/* Card Footer: Table Tray Action Buttons */}
                            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
                              <span className={`text-[11px] ${theme.textMuted} flex items-center gap-1`}>
                                <Info className="w-3 h-3" />
                                برای دیدن جزئیات کلیک کنید
                              </span>

                              {item.isAvailable ? (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1 bg-black/20 dark:bg-white/10 p-1 rounded-xl border border-white/10"
                                >
                                  {countInTray > 0 ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={(e) => handleRemoveFromTray(item.id, e)}
                                        className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors"
                                      >
                                        <Minus className="w-3.5 h-3.5" />
                                      </button>
                                      <span className="w-6 text-center text-xs font-mono font-bold">
                                        {formatPersianNumber(countInTray)}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={(e) => handleAddToTray(item.id, e)}
                                        className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors"
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={(e) => handleAddToTray(item.id, e)}
                                      className="px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 transition-all"
                                      style={{ backgroundColor: `${theme.accentColor}25`, color: theme.accentColor }}
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>افزودن به سینی</span>
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full font-medium">
                                  عدم امکان سفارش
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      // MODE 2: COMPACT LIST (Barista Speed View)
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItemForModal(item)}
                          className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            theme.cardBgClass
                          } ${theme.cardHoverClass} ${
                            !item.isAvailable ? "opacity-60 grayscale-[40%]" : ""
                          }`}
                        >
                          {/* Optional Thumbnail */}
                          {item.imageUrl && (
                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-white/10">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className={`font-bold text-xs truncate ${theme.textPrimary}`}>
                                {item.title}
                              </h3>
                              {!item.isAvailable && (
                                <span className="text-[9px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded font-bold shrink-0">
                                  ناموجود
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className={`text-[10px] ${theme.textSecondary} line-clamp-1 mt-0.5`}>
                                {item.description}
                              </p>
                            )}
                            <div className={`text-xs ${theme.priceClass} mt-1`}>
                              {formatToman(item.price)}
                            </div>
                          </div>

                          {/* Tray Control */}
                          {item.isAvailable && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="shrink-0 flex items-center gap-1 bg-black/20 dark:bg-white/10 p-1 rounded-xl"
                            >
                              {countInTray > 0 ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={(e) => handleRemoveFromTray(item.id, e)}
                                    className="w-6 h-6 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-5 text-center text-xs font-mono font-bold">
                                    {formatPersianNumber(countInTray)}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => handleAddToTray(item.id, e)}
                                    className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => handleAddToTray(item.id, e)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                                  style={{ backgroundColor: `${theme.accentColor}25`, color: theme.accentColor }}
                                  title="افزودن به سینی سفارش"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Floating Bottom Bar: Table Pre-Order Tray */}
      {totalTrayCount > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-md mx-auto z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`${theme.trayBarBg} rounded-2xl p-3.5 flex items-center justify-between border shadow-2xl`}>
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white relative shadow"
                style={{ backgroundColor: theme.accentColor }}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black ring-2 ring-slate-900">
                  {formatPersianNumber(totalTrayCount)}
                </span>
              </div>
              <div>
                <div className="text-[11px] text-white/70">سینی سفارش میز:</div>
                <div className="text-sm font-black text-white font-mono">
                  {formatToman(totalTrayPrice)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTrayModal(true)}
              className={`${theme.trayButtonBg} px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md`}
            >
              <span>مشاهده فاکتور</span>
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      )}

      {/* Tray Detail Modal (سینی سفارش و خلاصه فاکتور) */}
      {showTrayModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className={`w-full max-w-md ${theme.bodyBgClass} border border-white/20 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative max-h-[85vh] flex flex-col`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" style={{ color: theme.accentColor }} />
                <h3 className={`font-black text-base ${theme.textPrimary}`}>
                  سینی سفارش میز ({formatPersianNumber(totalTrayCount)} آیتم)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTrayModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items in Tray List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {Object.entries(tray).map(([id, qty]) => {
                const item = allItems.find((i) => i.id === id);
                if (!item || qty <= 0) return null;

                return (
                  <div
                    key={id}
                    className={`p-3 rounded-xl flex items-center justify-between border ${theme.cardBgClass}`}
                  >
                    <div>
                      <h4 className={`font-bold text-xs ${theme.textPrimary}`}>{item.title}</h4>
                      <div className={`text-[11px] ${theme.priceClass} mt-0.5`}>
                        {formatToman(item.price * qty)}
                        {qty > 1 && (
                          <span className={`text-[10px] ${theme.textMuted} mr-1 font-normal`}>
                            ({formatToman(item.price)} × {formatPersianNumber(qty)})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => handleRemoveFromTray(id)}
                        className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-mono font-bold text-white">
                        {formatPersianNumber(qty)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddToTray(id)}
                        className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Summary & Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className={theme.textMuted}>جمع نهایی فاکتور میز:</span>
                <span className={`text-lg font-black font-mono ${theme.priceClass}`}>
                  {formatToman(totalTrayPrice)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyTraySummary}
                  className={`flex-1 ${theme.trayButtonBg} py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg`}
                >
                  {copiedTrayText ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>متن سفارش کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>کپی متن سفارش برای باریستا / ویتر</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClearTray}
                  className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                  title="پاک کردن سینی"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className={`text-[10px] text-center ${theme.textMuted}`}>
                این پیش‌فاکتور برای راحتی شما سر میز است؛ نیازی به پرداخت آنلاین نیست و می‌توانید آن را به سالن‌دار اعلام فرمایید.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-sm ${theme.bodyBgClass} border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative`}>
            <button
              type="button"
              onClick={() => setSelectedItemForModal(null)}
              className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {selectedItemForModal.imageUrl && (
              <div className="w-full h-56 relative bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedItemForModal.imageUrl}
                  alt={selectedItemForModal.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className={`font-black text-base ${theme.textPrimary}`}>
                  {selectedItemForModal.title}
                </h3>
                <div className={`text-base ${theme.priceClass}`}>
                  {formatToman(selectedItemForModal.price)}
                </div>
              </div>

              {selectedItemForModal.description && (
                <p className={`text-xs ${theme.textSecondary} leading-relaxed`}>
                  {selectedItemForModal.description}
                </p>
              )}

              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                {selectedItemForModal.isAvailable ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToTray(selectedItemForModal.id);
                      setSelectedItemForModal(null);
                    }}
                    className={`w-full ${theme.trayButtonBg} py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all font-bold shadow-md`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن به سینی سفارش میز</span>
                  </button>
                ) : (
                  <div className="w-full text-center py-2.5 bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold border border-rose-500/30">
                    این آیتم در حال حاضر ناموجود است
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className={`max-w-md mx-auto text-center pt-12 pb-4 text-xs ${theme.textMuted}`}>
        <div className="flex items-center justify-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
          <span>منوی دیجیتال هوشمند {restaurant.name}</span>
        </div>
        <p className="text-[10px] opacity-70 mt-1">توسعه یافته با سامانه MenuSaaS</p>
      </div>
    </div>
  );
}
