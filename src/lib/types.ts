export interface HeroData {
  greeting: string;
  subline: string;
  tip: string;
}

export interface SkillData {
  title: string;
  body: string;
}

export interface TechStackItem {
  name: string;
  image: string;
}

export interface AboutData {
  avatar: string;
  contact: {
    email: string;
    phone: string;
    wechat: string;
    github: string;
  };
  skills: SkillData[];
  techStack: TechStackItem[];
}

export interface ProjectData {
  id: string;
  title: string;
  tags: string[];
  description: string;
  link: string;
  linkText: string;
  images: string[];
  appStore?: string;
  googlePlay?: string;
}

export interface RepoData {
  id: string;
  name: string;
  description: string;
  stars: string;
  language: string;
  link: string;
}

export interface PricingData {
  title: string;
  subtitle: string;
  rate: string;
  currency: string;
  unit: string;
  note: string;
}

export interface FooterData {
  title: string;
  email: string;
  github: string;
  wechat: string;
  copyright: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  projects: ProjectData[];
  repos: RepoData[];
  pricing: PricingData;
  footer: FooterData;
}
