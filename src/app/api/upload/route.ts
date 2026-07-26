import { NextRequest, NextResponse } from "next/server";
import { saveUploadedImage } from "@/lib/data";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  const url = await saveUploadedImage(file);
  return NextResponse.json({ url });
}
