"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type {
  PortfolioData,
  ProjectData,
  RepoData,
  TechStackItem,
} from "@/lib/types";
import { useI18n } from "@/i18n/context";
import { localeLabels, locales, type Locale } from "@/i18n/locales";

export default function AdminPage() {
  const { t } = useI18n();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [contentLocale, setContentLocale] = useState<Locale>("zh");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetch(`/api/portfolio?locale=${contentLocale}`)
      .then((r) => r.json())
      .then(setData);
  }, [contentLocale]);

  // ---- Save handler ----
  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hero: data.hero,
        about: data.about,
        pricing: data.pricing,
        footer: data.footer,
        locale: contentLocale,
      }),
    });
    // Save projects
    for (const project of data.projects) {
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, locale: contentLocale }),
      });
    }
    // Save repos
    for (const repo of data.repos) {
      await fetch(`/api/repos/${repo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...repo, locale: contentLocale }),
      });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // ---- Image upload ----
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const { url } = await res.json();
    return url;
  };

  // ---- Hero updates ----
  const updateHero = (key: keyof PortfolioData["hero"], value: string) => {
    setData((prev) =>
      prev ? { ...prev, hero: { ...prev.hero, [key]: value } } : prev,
    );
  };

  // ---- About updates ----
  const updateAboutContact = (key: string, value: string) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            about: {
              ...prev.about,
              contact: { ...prev.about.contact, [key]: value },
            },
          }
        : prev,
    );
  };

  const updateSkill = (index: number, key: string, value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const skills = [...prev.about.skills];
      skills[index] = { ...skills[index], [key]: value };
      return { ...prev, about: { ...prev.about, skills } };
    });
  };

  const updateTechStack = (
    index: number,
    key: keyof TechStackItem,
    value: string,
  ) => {
    setData((prev) => {
      if (!prev) return prev;
      const techStack = [...prev.about.techStack];
      techStack[index] = { ...techStack[index], [key]: value };
      return { ...prev, about: { ...prev.about, techStack } };
    });
  };

  const addSkill = () => {
    setData((prev) => {
      if (!prev) return prev;
      const techStack = [
        ...prev.about.techStack,
        { name: t("default.skillName"), image: "" },
      ];
      return { ...prev, about: { ...prev.about, techStack } };
    });
  };

  const deleteSkill = (index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const techStack = prev.about.techStack.filter((_, i) => i !== index);
      return { ...prev, about: { ...prev.about, techStack } };
    });
  };

  const handleSkillImageUpload = async (index: number, file: File) => {
    const url = await uploadImage(file);
    updateTechStack(index, "image", url);
  };

  const updateFooter = (key: keyof PortfolioData["footer"], value: string) => {
    setData((prev) =>
      prev ? { ...prev, footer: { ...prev.footer, [key]: value } } : prev,
    );
  };

  const updatePricing = (
    key: keyof PortfolioData["pricing"],
    value: string,
  ) => {
    setData((prev) =>
      prev ? { ...prev, pricing: { ...prev.pricing, [key]: value } } : prev,
    );
  };

  // ---- Project CRUD ----
  const addProject = async () => {
    const newProject: Omit<ProjectData, "id"> = {
      title: t("default.projectTitle"),
      tags: [],
      description: t("default.projectDesc"),
      link: "",
      linkText: t("default.viewLink"),
      images: [],
    };
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProject, locale: contentLocale }),
    });
    const created = await res.json();
    setData((prev) =>
      prev ? { ...prev, projects: [...prev.projects, created] } : prev,
    );
  };

  const updateProject = (id: string, updates: Partial<ProjectData>) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === id ? { ...p, ...updates } : p,
        ),
      };
    });
  };

  const deleteProject = async (id: string) => {
    await fetch(`/api/projects/${id}?locale=${contentLocale}`, {
      method: "DELETE",
    });
    setData((prev) =>
      prev
        ? { ...prev, projects: prev.projects.filter((p) => p.id !== id) }
        : prev,
    );
  };

  const handleProjectImageUpload = async (
    projectId: string,
    files: FileList,
  ) => {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      urls.push(url);
    }
    const project = data?.projects.find((p) => p.id === projectId);
    if (project) {
      updateProject(projectId, { images: [...project.images, ...urls] });
    }
  };

  const removeProjectImage = (projectId: string, imageIndex: number) => {
    const project = data?.projects.find((p) => p.id === projectId);
    if (project) {
      updateProject(projectId, {
        images: project.images.filter((_, i) => i !== imageIndex),
      });
    }
  };

  // ---- Repo CRUD ----
  const addRepo = async () => {
    const newRepo: Omit<RepoData, "id"> = {
      name: "new-repo",
      description: t("default.repoDesc"),
      stars: "0",
      language: "TypeScript",
      link: "https://github.com/",
    };
    const res = await fetch("/api/repos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newRepo, locale: contentLocale }),
    });
    const created = await res.json();
    setData((prev) =>
      prev ? { ...prev, repos: [...prev.repos, created] } : prev,
    );
  };

  const updateRepo = (id: string, updates: Partial<RepoData>) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        repos: prev.repos.map((r) => (r.id === id ? { ...r, ...updates } : r)),
      };
    });
  };

  const deleteRepo = async (id: string) => {
    await fetch(`/api/repos/${id}?locale=${contentLocale}`, {
      method: "DELETE",
    });
    setData((prev) =>
      prev ? { ...prev, repos: prev.repos.filter((r) => r.id !== id) } : prev,
    );
  };

  // ---- Avatar upload ----
  const handleAvatarUpload = async (file: File) => {
    const url = await uploadImage(file);
    setData((prev) =>
      prev ? { ...prev, about: { ...prev.about, avatar: url } } : prev,
    );
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[#737373]">{t("admin.loading")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full h-10 px-3 rounded-md border border-[#E5E5E5] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#D97706] transition-colors";
  const labelClass = "text-[13px] text-[#737373] mb-1 block";
  const textareaClass =
    "w-full px-3 py-3 rounded-md border border-[#E5E5E5] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#D97706] transition-colors resize-none";

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full">
        {/* Admin Bar */}
        <div className="sticky top-0 z-50 w-full h-16 px-10 flex items-center justify-between border-b border-[#E5E5E5] bg-white">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
                stroke="#D97706"
                strokeWidth="2"
              />
              <circle cx="12" cy="10" r="3" fill="#D97706" />
              <path
                d="M6 18c0-3 3-5 6-5s6 2 6 5"
                stroke="#D97706"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-medium text-[#0A0A0A]">
              {t("admin.title")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="px-4 py-2 text-sm text-[#0A0A0A] hover:text-[#D97706] transition-colors"
            >
              {t("admin.preview")}
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-md bg-[#D97706] text-sm font-medium text-white hover:bg-[#B45309] transition-colors disabled:opacity-50"
            >
              {saving
                ? t("admin.saving")
                : saved
                  ? t("admin.saved")
                  : t("admin.save")}
            </button>
            <a
              href="/"
              className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors"
            >
              {t("admin.exit")}
            </a>
          </div>
        </div>

        {/* Admin Content */}
        <div className="w-[960px] mx-auto py-10 flex flex-col gap-12">
          {/* Content Language Selector */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-[#FEF3C7] border border-[#FDE68A]">
            <span className="text-sm font-medium text-[#92400E]">
              {t("admin.contentLang")}:
            </span>
            <div className="flex items-center gap-1 rounded-full bg-white p-0.5 border border-[#E5E5E5]">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setContentLocale(l)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    contentLocale === l
                      ? "bg-[#D97706] text-white"
                      : "text-[#737373] hover:text-[#0A0A0A]"
                  }`}
                >
                  {localeLabels[l]}
                </button>
              ))}
            </div>
            <span className="text-xs text-[#92400E]">
              {t("admin.contentLangHint")}
            </span>
          </div>

          {/* Hero Edit */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-medium text-[#0A0A0A]">
              {t("admin.heroSection")}
            </h2>
            <div>
              <label className={labelClass}>{t("admin.greeting")}</label>
              <input
                className={inputClass}
                value={data.hero.greeting}
                onChange={(e) => updateHero("greeting", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>{t("admin.subline")}</label>
              <textarea
                className={textareaClass}
                rows={2}
                value={data.hero.subline}
                onChange={(e) => updateHero("subline", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>{t("admin.tip")}</label>
              <input
                className={inputClass}
                value={data.hero.tip}
                onChange={(e) => updateHero("tip", e.target.value)}
              />
            </div>
          </section>

          {/* About Edit */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-medium text-[#0A0A0A]">
              {t("admin.aboutSection")}
            </h2>
            <div>
              <label className={labelClass}>{t("admin.avatar")}</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-[#F5F5F5] overflow-hidden flex items-center justify-center border border-[#E5E5E5]">
                  {data.about.avatar ? (
                    <img
                      src={data.about.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-[#A3A3A3]">
                      {t("admin.noAvatar")}
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && handleAvatarUpload(e.target.files[0])
                  }
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="px-4 py-2 rounded-md border border-[#E5E5E5] text-sm text-[#0A0A0A] cursor-pointer hover:border-[#D97706] transition-colors"
                >
                  {t("admin.uploadAvatar")}
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email</label>
                <input
                  className={inputClass}
                  value={data.about.contact.email}
                  onChange={(e) => updateAboutContact("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  className={inputClass}
                  value={data.about.contact.phone}
                  onChange={(e) => updateAboutContact("phone", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>WeChat</label>
                <input
                  className={inputClass}
                  value={data.about.contact.wechat}
                  onChange={(e) => updateAboutContact("wechat", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>GitHub</label>
                <input
                  className={inputClass}
                  value={data.about.contact.github}
                  onChange={(e) => updateAboutContact("github", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[13px] text-[#737373]">
                {t("admin.skills")}
              </label>
              {data.about.skills.map((skill, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    className={`${inputClass} w-32`}
                    value={skill.title}
                    onChange={(e) => updateSkill(i, "title", e.target.value)}
                  />
                  <input
                    className={inputClass}
                    value={skill.body}
                    onChange={(e) => updateSkill(i, "body", e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[13px] text-[#737373]">
                {t("admin.techStack")}
              </label>
              {data.about.techStack.map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <label
                    htmlFor={`techstack-upload-${i}`}
                    className="w-12 h-12 flex-shrink-0 rounded bg-[#F5F5F5] border border-[#E5E5E5] overflow-hidden cursor-pointer hover:border-[#D97706] transition-colors flex items-center justify-center"
                    title={t("admin.clickToUpload")}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="#737373"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </label>
                  <input
                    id={`techstack-upload-${i}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      await handleSkillImageUpload(i, file);
                    }}
                  />
                  <input
                    className={`${inputClass} flex-1 min-w-0`}
                    value={item.name}
                    onChange={(e) => updateTechStack(i, "name", e.target.value)}
                    placeholder={t("admin.skillName")}
                  />
                  <button
                    onClick={() => deleteSkill(i)}
                    className="text-[13px] text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                  >
                    {t("admin.deleteSkill")}
                  </button>
                </div>
              ))}
              <button
                onClick={addSkill}
                className="w-full h-[80px] rounded-lg border border-dashed border-[#E5E5E5] flex items-center justify-center gap-3 hover:border-[#D97706] transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-base font-medium text-[#D97706]">
                  {t("admin.addSkill")}
                </span>
              </button>
            </div>
          </section>

          {/* Projects Edit */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-[#0A0A0A]">
                {t("admin.projectsSection")}
              </h2>
              <button
                onClick={addProject}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#D97706] text-sm font-medium text-white hover:bg-[#B45309] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("admin.addProject")}
              </button>
            </div>
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="flex gap-6 p-5 rounded-lg border border-[#E5E5E5]"
              >
                {/* Image Upload Area */}
                <div className="w-[320px] flex-shrink-0">
                  <label className={labelClass}>
                    {t("admin.projectImages")}
                  </label>
                  <div
                    className="w-[320px] h-[220px] rounded-md bg-[#F5F5F5] border border-[#E5E5E5] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#D97706] transition-colors"
                    onClick={() => fileInputRefs.current[project.id]?.click()}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                        stroke="#737373"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 8l-5-5-5 5M12 3v12"
                        stroke="#737373"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-[#737373]">
                      {t("admin.clickToUpload")}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    ref={(el) => {
                      fileInputRefs.current[project.id] = el;
                    }}
                    onChange={(e) =>
                      e.target.files &&
                      handleProjectImageUpload(project.id, e.target.files)
                    }
                  />
                  {/* Image thumbnails */}
                  {project.images.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative w-16 h-16 rounded-md overflow-hidden group"
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeProjectImage(project.id, i)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity"
                          >
                            {t("admin.delete")}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Form Fields */}
                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <label className={labelClass}>
                      {t("admin.title_label")}
                    </label>
                    <input
                      className={inputClass}
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, { title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("admin.tags")}</label>
                    <input
                      className={inputClass}
                      value={project.tags.join(", ")}
                      onChange={(e) =>
                        updateProject(project.id, {
                          tags: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t("admin.description")}
                    </label>
                    <textarea
                      className={textareaClass}
                      rows={3}
                      value={project.description}
                      onChange={(e) =>
                        updateProject(project.id, {
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t("admin.projectLink")}
                    </label>
                    <input
                      className={inputClass}
                      value={project.link}
                      onChange={(e) =>
                        updateProject(project.id, { link: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>App Store Link</label>
                      <input
                        className={inputClass}
                        value={project.appStore || ""}
                        onChange={(e) =>
                          updateProject(project.id, {
                            appStore: e.target.value,
                          })
                        }
                        placeholder="https://apps.apple.com/..."
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Google Play Link</label>
                      <input
                        className={inputClass}
                        value={project.googlePlay || ""}
                        onChange={(e) =>
                          updateProject(project.id, {
                            googlePlay: e.target.value,
                          })
                        }
                        placeholder="https://play.google.com/..."
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="self-start text-[13px] text-red-500 hover:text-red-700 transition-colors"
                  >
                    {t("admin.deleteProject")}
                  </button>
                </div>
              </div>
            ))}
            {/* Add New Project Placeholder */}
            <button
              onClick={addProject}
              className="w-full h-[120px] rounded-lg border border-dashed border-[#E5E5E5] flex items-center justify-center gap-3 hover:border-[#D97706] transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base font-medium text-[#D97706]">
                {t("admin.addNewProject")}
              </span>
            </button>
          </section>

          {/* Open Source Edit */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-[#0A0A0A]">
                {t("admin.opensourceSection")}
              </h2>
              <button
                onClick={addRepo}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#D97706] text-sm font-medium text-white hover:bg-[#B45309] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("admin.addRepo")}
              </button>
            </div>

            <p className="text-sm text-[#737373]">{t("admin.repoHint")}</p>
            {data.repos.map((repo) => (
              <div
                key={repo.id}
                className="p-5 rounded-lg border border-[#E5E5E5] flex flex-col gap-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>{t("admin.repoName")}</label>
                    <input
                      className={inputClass}
                      value={repo.name}
                      onChange={(e) =>
                        updateRepo(repo.id, { name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("admin.language")}</label>
                    <input
                      className={inputClass}
                      value={repo.language}
                      onChange={(e) =>
                        updateRepo(repo.id, { language: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{t("admin.description")}</label>
                  <textarea
                    className={textareaClass}
                    rows={2}
                    value={repo.description}
                    onChange={(e) =>
                      updateRepo(repo.id, { description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>{t("admin.stars")}</label>
                    <input
                      className={inputClass}
                      value={repo.stars}
                      onChange={(e) =>
                        updateRepo(repo.id, { stars: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t("admin.githubLink")}
                    </label>
                    <input
                      className={inputClass}
                      value={repo.link}
                      onChange={(e) =>
                        updateRepo(repo.id, { link: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() => deleteRepo(repo.id)}
                  className="self-start text-[13px] text-red-500 hover:text-red-700 transition-colors"
                >
                  {t("admin.deleteRepo")}
                </button>
              </div>
            ))}
            {/* Add New Repo Placeholder */}
            <button
              onClick={addRepo}
              className="w-full h-[120px] rounded-lg border border-dashed border-[#E5E5E5] flex items-center justify-center gap-3 hover:border-[#D97706] transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base font-medium text-[#D97706]">
                {t("admin.addRepo")}
              </span>
            </button>
          </section>

          {/* Pricing Edit */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-medium text-[#0A0A0A]">
              {t("pricing.title")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t("admin.title_label")}</label>
                <input
                  className={inputClass}
                  value={data.pricing.title}
                  onChange={(e) => updatePricing("title", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>{t("admin.subline")}</label>
                <input
                  className={inputClass}
                  value={data.pricing.subtitle}
                  onChange={(e) => updatePricing("subtitle", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Rate</label>
                <input
                  className={inputClass}
                  value={data.pricing.rate}
                  onChange={(e) => updatePricing("rate", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <input
                  className={inputClass}
                  value={data.pricing.currency}
                  onChange={(e) => updatePricing("currency", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Unit</label>
                <input
                  className={inputClass}
                  value={data.pricing.unit}
                  onChange={(e) => updatePricing("unit", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>{t("admin.tip")}</label>
                <input
                  className={inputClass}
                  value={data.pricing.note}
                  onChange={(e) => updatePricing("note", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Footer Edit */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-medium text-[#0A0A0A]">
              {t("admin.footerSection")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t("admin.footerTitle")}</label>
                <input
                  className={inputClass}
                  value={data.footer.title}
                  onChange={(e) => updateFooter("title", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>{t("admin.email")}</label>
                <input
                  className={inputClass}
                  value={data.footer.email}
                  onChange={(e) => updateFooter("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>{t("admin.githubText")}</label>
                <input
                  className={inputClass}
                  value={data.footer.github}
                  onChange={(e) => updateFooter("github", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>{t("admin.wechatText")}</label>
                <input
                  className={inputClass}
                  value={data.footer.wechat}
                  onChange={(e) => updateFooter("wechat", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>{t("admin.copyright")}</label>
              <input
                className={inputClass}
                value={data.footer.copyright}
                onChange={(e) => updateFooter("copyright", e.target.value)}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
