import { NextRequest, NextResponse } from "next/server";
import { updateProject, deleteProject, parseLocale } from "@/lib/data";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const locale = parseLocale(body.locale);
  const { locale: _, ...updates } = body;
  const project = await updateProject(params.id, updates, locale);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const locale = parseLocale(req.nextUrl.searchParams.get("locale"));
  const ok = await deleteProject(params.id, locale);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
