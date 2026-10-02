// src/app/api/upload/route.ts
import { NextResponse } from "next/server";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB limit

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "فایلی ارسال نشده است" }, { status: 400 });
    }

    // Security check: File size limit (prevent Memory Exhaustion / DoS)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "حجم فایل نباید بیش از ۵ مگابایت باشد" },
        { status: 400 }
      );
    }

    // Security check: MIME whitelist (prevent SVG/HTML Stored XSS or executable upload)
    const mimeType = (file.type || "").toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        { error: "فرمت فایل مجاز نیست. لطفاً تصویر JPG، PNG، WEBP یا GIF انتخاب کنید." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;

    return NextResponse.json({ url: base64Url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "خطا در پردازش تصویر" }, { status: 500 });
  }
}
