// src/app/api/upload/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "فایلی ارسال نشده است" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;

    return NextResponse.json({ url: base64Url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "خطا در پردازش تصویر" }, { status: 500 });
  }
}
