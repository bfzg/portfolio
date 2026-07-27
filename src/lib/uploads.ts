import path from "path";

export function getUploadDir(): string {
  if (process.env.UPLOAD_DIR) {
    return path.resolve(process.env.UPLOAD_DIR);
  }

  if (process.cwd().endsWith(path.join(".next", "standalone"))) {
    return path.resolve(process.cwd(), "..", "..", "public", "uploads");
  }

  return path.join(process.cwd(), "public", "uploads");
}
