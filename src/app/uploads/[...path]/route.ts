import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getUploadDir } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contentTypes: Record<string, string> = {
  ".apng": "image/apng",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

type RouteContext = {
  params: {
    path: string[];
  };
};

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const uploadDir = path.resolve(getUploadDir());
  const requestedPath = path.resolve(uploadDir, ...params.path);

  if (!requestedPath.startsWith(`${uploadDir}${path.sep}`)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const stat = await fs.stat(requestedPath);
    if (!stat.isFile()) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = await fs.readFile(requestedPath);
    const contentType =
      contentTypes[path.extname(requestedPath).toLowerCase()] ||
      "application/octet-stream";

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(stat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
