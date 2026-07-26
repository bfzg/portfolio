import { NextRequest, NextResponse } from "next/server";
import { readData, addRepo, parseLocale } from "@/lib/data";

export async function GET(req: NextRequest) {
  const locale = parseLocale(req.nextUrl.searchParams.get("locale"));
  const data = await readData(locale);
  return NextResponse.json(data.repos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const locale = parseLocale(body.locale);
  const { locale: _, ...repoData } = body;
  const repo = await addRepo(repoData, locale);
  return NextResponse.json(repo, { status: 201 });
}
