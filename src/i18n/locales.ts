export type Locale = "zh" | "en";

export const locales: Locale[] = ["zh", "en"];
export const defaultLocale: Locale = "zh";

export const localeLabels: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};

// ---- UI string translations ----
export const messages = {
  zh: {
    // Nav
    "nav.about": "关于",
    "nav.projects": "项目",
    "nav.opensource": "开源",
    "nav.contact": "联系",
    // About
    "about.contactTitle": "contact",
    "about.tip": "*以下内容为示例，请根据你自己重视的关键词与理念进行修改。",
    // Tech stack
    "tech.title": "技术栈",
    "tech.subtitle": "我日常使用的开发语言与框架。",
    // Projects
    "projects.title": "项目作品",
    "projects.subtitle": "一些我参与或主导的产品与设计项目，点击卡片可查看详情。",
    "projects.viewLink": "查看项目 →",
    // Open Source
    "opensource.title": "开源产品",
    "opensource.subtitle": "我在 GitHub 上维护的一些小工具和组件库。",
    "opensource.viewLink": "在 GitHub 上查看 →",
    // Pricing
    "pricing.title": "服务定价",
    "pricing.subtitle": "按小时计费，透明公开。",
    // Contact
    "contact.phone": "电话",
    "contact.wechat": "微信",
    // Carousel
    "carousel.noImages": "暂无图片",
    // Admin
    "admin.title": "管理后台",
    "admin.preview": "预览",
    "admin.save": "保存",
    "admin.saving": "保存中...",
    "admin.saved": "已保存 ✓",
    "admin.exit": "退出",
    "admin.loading": "加载中...",
    "admin.heroSection": "Hero 区域",
    "admin.greeting": "问候语",
    "admin.subline": "副标题",
    "admin.tip": "提示框文字",
    "admin.aboutSection": "关于我",
    "admin.avatar": "头像",
    "admin.noAvatar": "无头像",
    "admin.uploadAvatar": "上传头像",
    "admin.skills": "技能关键词",
    "admin.projectsSection": "项目作品",
    "admin.addProject": "添加项目",
    "admin.addNewProject": "添加新项目",
    "admin.projectImages": "项目图片（可多选）",
    "admin.clickToUpload": "点击上传图片",
    "admin.delete": "删除",
    "admin.title_label": "标题",
    "admin.tags": "标签（用逗号分隔）",
    "admin.description": "描述",
    "admin.projectLink": "项目链接",
    "admin.deleteProject": "删除项目",
    "admin.opensourceSection": "开源产品",
    "admin.addRepo": "添加开源项目",
    "admin.repoHint": "开源项目保持卡片宫格展示，点击\"添加开源项目\"可新增仓库、编辑名称、描述、Star 数与语言标签。",
    "admin.repoName": "仓库名称",
    "admin.language": "语言",
    "admin.stars": "Stars",
    "admin.githubLink": "GitHub 链接",
    "admin.deleteRepo": "删除仓库",
    "admin.footerSection": "页脚",
    "admin.footerTitle": "标题",
    "admin.email": "邮箱",
    "admin.githubText": "GitHub 文字",
    "admin.wechatText": "微信文字",
    "admin.copyright": "版权信息",
    "admin.contentLang": "内容语言",
    "admin.contentLangHint": "切换后编辑对应语言的内容，保存后生效",
    // Default values for new items
    "default.projectTitle": "新项目",
    "default.projectDesc": "项目描述",
    "default.repoDesc": "仓库描述",
    "default.viewLink": "查看项目 →",
  },
  en: {
    // Nav
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.opensource": "Open Source",
    "nav.contact": "Contact",
    // About
    "about.contactTitle": "contact",
    "about.tip": "*The content below is an example. Please modify it with your own keywords and philosophy.",
    // Tech stack
    "tech.title": "Tech Stack",
    "tech.subtitle": "Languages and frameworks I use daily.",
    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Some product and design projects I've been involved in or led. Click cards for details.",
    "projects.viewLink": "View Project →",
    // Open Source
    "opensource.title": "Open Source",
    "opensource.subtitle": "Some small tools and component libraries I maintain on GitHub.",
    "opensource.viewLink": "View on GitHub →",
    // Pricing
    "pricing.title": "Pricing",
    "pricing.subtitle": "Transparent hourly rate.",
    // Contact
    "contact.phone": "Phone",
    "contact.wechat": "WeChat",
    // Carousel
    "carousel.noImages": "No images yet",
    // Admin
    "admin.title": "Admin Panel",
    "admin.preview": "Preview",
    "admin.save": "Save",
    "admin.saving": "Saving...",
    "admin.saved": "Saved ✓",
    "admin.exit": "Exit",
    "admin.loading": "Loading...",
    "admin.heroSection": "Hero Section",
    "admin.greeting": "Greeting",
    "admin.subline": "Subline",
    "admin.tip": "Tip Text",
    "admin.aboutSection": "About Me",
    "admin.avatar": "Avatar",
    "admin.noAvatar": "No avatar",
    "admin.uploadAvatar": "Upload Avatar",
    "admin.skills": "Skill Keywords",
    "admin.projectsSection": "Projects",
    "admin.addProject": "Add Project",
    "admin.addNewProject": "Add New Project",
    "admin.projectImages": "Project Images (multi-select)",
    "admin.clickToUpload": "Click to upload images",
    "admin.delete": "Delete",
    "admin.title_label": "Title",
    "admin.tags": "Tags (comma separated)",
    "admin.description": "Description",
    "admin.projectLink": "Project Link",
    "admin.deleteProject": "Delete Project",
    "admin.opensourceSection": "Open Source",
    "admin.addRepo": "Add Repo",
    "admin.repoHint": "Open source projects are displayed as cards. Click \"Add Repo\" to add repositories, edit name, description, stars and language.",
    "admin.repoName": "Repository Name",
    "admin.language": "Language",
    "admin.stars": "Stars",
    "admin.githubLink": "GitHub Link",
    "admin.deleteRepo": "Delete Repo",
    "admin.footerSection": "Footer",
    "admin.footerTitle": "Title",
    "admin.email": "Email",
    "admin.githubText": "GitHub Text",
    "admin.wechatText": "WeChat Text",
    "admin.copyright": "Copyright",
    "admin.contentLang": "Content Language",
    "admin.contentLangHint": "Switch to edit content for the selected language. Save to apply.",
    // Default values for new items
    "default.projectTitle": "New Project",
    "default.projectDesc": "Project description",
    "default.repoDesc": "Repository description",
    "default.viewLink": "View Project →",
  },
} as const;

export type MessageKey = keyof typeof messages["zh"];

// ---- Helper functions ----
export function isValidLocale(locale: string | undefined | null): locale is Locale {
  return !!locale && locales.includes(locale as Locale);
}

export function getLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const parsed = acceptLanguage.split(",").map((part) => {
    const [lang, q] = part.trim().split(";q=");
    return { lang: lang.toLowerCase(), q: q ? parseFloat(q) : 1 };
  });
  parsed.sort((a, b) => b.q - a.q);
  for (const { lang } of parsed) {
    if (lang.startsWith("zh")) return "zh";
    if (lang.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export function translate(locale: Locale, key: MessageKey): string {
  return messages[locale][key] ?? messages[defaultLocale][key] ?? key;
}
