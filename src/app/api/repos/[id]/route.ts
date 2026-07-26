import { NextRequest, NextResponse } from "next/server";
import { updateRepo, deleteRepo, parseLocale } from "@/lib/data";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const locale = parseLocale(body.locale);
  const { locale: _, ...updates } = body;
  const repo = await updateRepo(params.id, updates, locale);
  if (!repo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(repo);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const locale = parseLocale(req.nextUrl.searchParams.get("locale"));
  const ok = await deleteRepo(params.id, locale);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
