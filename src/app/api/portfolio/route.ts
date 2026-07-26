import { NextRequest, NextResponse } from "next/server";
import { readData, updateHero, updateAbout, updateFooter, updatePricing, parseLocale } from "@/lib/data";

export async function GET(req: NextRequest) {
  const locale = parseLocale(req.nextUrl.searchParams.get("locale"));
  const data = await readData(locale);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const locale = parseLocale(body.locale);
  if (body.hero) await updateHero(body.hero, locale);
  if (body.about) await updateAbout(body.about, locale);
  if (body.pricing) await updatePricing(body.pricing, locale);
  if (body.footer) await updateFooter(body.footer, locale);
  const data = await readData(locale);
  return NextResponse.json(data);
}
