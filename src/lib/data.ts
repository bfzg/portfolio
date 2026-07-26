import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData, ProjectData, RepoData } from "./types";
import type { Locale } from "@/i18n/locales";
import { defaultLocale, isValidLocale } from "@/i18n/locales";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function getDataFile(locale: Locale): string {
  return path.join(DATA_DIR, `portfolio.${locale}.json`);
}

export async function readData(locale: Locale = defaultLocale): Promise<PortfolioData> {
  const file = getDataFile(locale);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw);
}

export async function writeData(data: PortfolioData, locale: Locale = defaultLocale): Promise<void> {
  const file = getDataFile(locale);
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

// Parse locale from request searchParams or body
export function parseLocale(value: string | undefined | null): Locale {
  return isValidLocale(value) ? value : defaultLocale;
}

export async function updateHero(hero: PortfolioData["hero"], locale: Locale = defaultLocale): Promise<PortfolioData> {
  const data = await readData(locale);
  data.hero = hero;
  await writeData(data, locale);
  return data;
}

export async function updateAbout(about: PortfolioData["about"], locale: Locale = defaultLocale): Promise<PortfolioData> {
  const data = await readData(locale);
  data.about = about;
  await writeData(data, locale);
  return data;
}

export async function updateFooter(footer: PortfolioData["footer"], locale: Locale = defaultLocale): Promise<PortfolioData> {
  const data = await readData(locale);
  data.footer = footer;
  await writeData(data, locale);
  return data;
}

export async function updatePricing(pricing: PortfolioData["pricing"], locale: Locale = defaultLocale): Promise<PortfolioData> {
  const data = await readData(locale);
  data.pricing = pricing;
  await writeData(data, locale);
  return data;
}

export async function addProject(project: Omit<ProjectData, "id">, locale: Locale = defaultLocale): Promise<ProjectData> {
  const data = await readData(locale);
  const id = `p${Date.now()}`;
  const newProject: ProjectData = { ...project, id };
  data.projects.push(newProject);
  await writeData(data, locale);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<ProjectData>, locale: Locale = defaultLocale): Promise<ProjectData | null> {
  const data = await readData(locale);
  const idx = data.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  data.projects[idx] = { ...data.projects[idx], ...updates, id };
  await writeData(data, locale);
  return data.projects[idx];
}

export async function deleteProject(id: string, locale: Locale = defaultLocale): Promise<boolean> {
  const data = await readData(locale);
  const before = data.projects.length;
  data.projects = data.projects.filter((p) => p.id !== id);
  await writeData(data, locale);
  return data.projects.length < before;
}

export async function addRepo(repo: Omit<RepoData, "id">, locale: Locale = defaultLocale): Promise<RepoData> {
  const data = await readData(locale);
  const id = `r${Date.now()}`;
  const newRepo: RepoData = { ...repo, id };
  data.repos.push(newRepo);
  await writeData(data, locale);
  return newRepo;
}

export async function updateRepo(id: string, updates: Partial<RepoData>, locale: Locale = defaultLocale): Promise<RepoData | null> {
  const data = await readData(locale);
  const idx = data.repos.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  data.repos[idx] = { ...data.repos[idx], ...updates, id };
  await writeData(data, locale);
  return data.repos[idx];
}

export async function deleteRepo(id: string, locale: Locale = defaultLocale): Promise<boolean> {
  const data = await readData(locale);
  const before = data.repos.length;
  data.repos = data.repos.filter((r) => r.id !== id);
  await writeData(data, locale);
  return data.repos.length < before;
}

export async function saveUploadedImage(file: File): Promise<string> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || ".png";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}
