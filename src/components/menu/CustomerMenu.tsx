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
} from "lucide-react";
import { formatToman, formatPersianNumber } from "@/lib/utils";

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
    categories: Category[];
  };
}

export default function CustomerMenu({ restaurant }: CustomerMenuProps) {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [copiedWifi, setCopiedWifi] = useState(false);

  // Filter items
  const allCategories = restaurant.categories;

  const handleCopyWifi = () => {
    if (restaurant.wifiPassword) {
      navigator.clipboard.writeText(restaurant.wifiPassword);
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-20 selection:bg-rose-500 selection:text-white">
      {/* Top Cafe Header Banner */}
      <div
        className="relative pt-12 pb-8 px-4 text-center shadow-2xl overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${restaurant.themeColor}cc 0%, #0f172a 100%)`,
        }}
      >
        <div className="max-w-md mx-auto relative z-10">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
            <Coffee className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">{restaurant.name}</h1>

          {restaurant.description && (
            <p className="text-xs text-white/80 mt-1.5 line-clamp-2 px-4">
              {restaurant.description}
            </p>
          )}

          {/* Badges / Quick Info */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            {restaurant.wifiPassword && (
              <button
                onClick={handleCopyWifi}
                className="bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-white/90"
              >
                <Wifi className="w-3.5 h-3.5 text-rose-400" />
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
                className="bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-white/90"
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
                className="bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-white/90"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono">{restaurant.phone}</span>
              </a>
            )}
          </div>

          {restaurant.address && (
            <div className="text-[11px] text-white/70 mt-2 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-white/60" />
              <span>{restaurant.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Search and Category Filter */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-md mx-auto space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در منو (مثلاً اسپرسو، پاستا...)"
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500 transition-colors shadow-inner"
            />
          </div>

          {/* Category Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCat("ALL")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === "ALL"
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              همه منو
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCat === cat.id
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                    : "bg-slate-800 text-slate-300 hover:text-white"
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
              <div key={cat.id} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: restaurant.themeColor }}
                  ></span>
                  <h2 className="font-extrabold text-sm text-slate-200">{cat.title}</h2>
                  <span className="text-[11px] text-slate-500 font-mono">
                    ({formatPersianNumber(filteredItems.length)})
                  </span>
                </div>

                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`relative bg-slate-800/80 border rounded-2xl p-3.5 shadow-md flex items-center justify-between gap-3 transition-all ${
                        item.isAvailable
                          ? "border-slate-700/80 hover:border-slate-600"
                          : "border-slate-800/40 opacity-50 grayscale-[50%]"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-sm truncate">{item.title}</h3>
                          {!item.isAvailable && (
                            <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.2 rounded font-medium shrink-0">
                              ناموجود
                            </span>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        <div className="mt-2 text-sm font-extrabold text-emerald-400 font-mono">
                          {formatToman(item.price)}
                        </div>
                      </div>

                      {item.imageUrl && (
                        <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer Branding */}
      <div className="max-w-md mx-auto text-center pt-12 pb-4 text-xs text-slate-500">
        <div className="flex items-center justify-center gap-1.5 text-slate-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>طراحی شده با پلتفرم منوی هوشمند MenuSaaS</span>
        </div>
        <p className="text-[10px] text-slate-600 mt-1">پروژه کارآفرینی و فروش دانشگاهی | نسخه دمو</p>
      </div>
    </div>
  );
}
