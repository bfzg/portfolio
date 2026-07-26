import { NextRequest, NextResponse } from "next/server";
import { readData, addProject, parseLocale } from "@/lib/data";

export async function GET(req: NextRequest) {
  const locale = parseLocale(req.nextUrl.searchParams.get("locale"));
  const data = await readData(locale);
  return NextResponse.json(data.projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const locale = parseLocale(body.locale);
  const { locale: _, ...projectData } = body;
  const project = await addProject(projectData, locale);
  return NextResponse.json(project, { status: 201 });
}
