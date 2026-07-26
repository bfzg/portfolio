import { readData } from "@/lib/data";
import { getLocale, t } from "@/i18n/server";
import Carousel from "@/components/Carousel";
import Avatar from "@/components/Avatar";
import LanguageSwitch from "@/components/LanguageSwitch";
import TechIcons from "@/components/TechIcons";
import MobileNav from "@/components/MobileNav";

export default async function HomePage() {
  const locale = getLocale();
  const data = await readData(locale);

  const navLinks = [
    { href: "#about", label: t("nav.about", locale) },
    { href: "#projects", label: t("nav.projects", locale) },
    { href: "#opensource", label: t("nav.opensource", locale) },
    { href: "#contact", label: t("nav.contact", locale) },
  ];

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="max-w-[960px] w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col gap-16 lg:gap-20">
        {/* Header */}
        <header className="relative flex items-center justify-between">
          <nav className="hidden sm:flex items-center gap-4 md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#0A0A0A] hover:text-[#D97706] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <MobileNav links={navLinks} />
          <LanguageSwitch />
        </header>

        {/* Hero */}
        <section className="flex flex-col gap-5 sm:gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight lg:leading-[64px] text-[#0A0A0A]">
            {data.hero.greeting}
          </h1>
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-[#737373] max-w-[720px]">
            {data.hero.subline}
          </p>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F5F5F5]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="flex-shrink-0 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"
                stroke="#D97706"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22h6"
                stroke="#D97706"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm leading-[22px] text-[#737373]">
              {data.hero.tip}
            </p>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="flex flex-col lg:flex-row gap-10 lg:gap-16"
        >
          {/* Left: Avatar + Contact */}
          <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-8 sm:gap-10">
            <Avatar src={data.about.avatar} />
            <div className="flex flex-col gap-6">
              <h3 className="font-mono font-bold text-lg text-[#0A0A0A]">
                {t("about.contactTitle", locale)}
              </h3>
              <p className="font-mono text-sm sm:text-base text-[#0A0A0A] break-all">
                e-mail&nbsp;&nbsp;
                <span className="text-[#D97706]">
                  {data.about.contact.email}
                </span>
              </p>
              <p className="font-mono text-sm sm:text-base text-[#0A0A0A]">
                {t("contact.phone", locale)}/{t("contact.wechat", locale)}
                &nbsp;&nbsp;
                <span className="text-[#D97706]">
                  {data.about.contact.phone}
                </span>
              </p>
              <p className="font-mono text-sm sm:text-base text-[#0A0A0A] break-all">
                github&nbsp;&nbsp;
                <a
                  href={data.about.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D97706] hover:underline"
                >
                  {data.about.contact.github}
                </a>
              </p>
            </div>
          </div>
          {/* Right: Skills */}
          <div className="flex-1 flex flex-col gap-8 sm:gap-10">
            {/* <p className="text-sm text-[#D97706]">{t("about.tip", locale)}</p> */}
            {data.about.skills.map((skill, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h4 className="text-base font-medium text-[#D97706]">
                  {skill.title}
                </h4>
                <p className="text-base leading-7 text-[#0A0A0A]">
                  {skill.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-[32px] font-medium text-[#0A0A0A]">
              {t("tech.title", locale)}
            </h2>
            <p className="text-sm sm:text-base text-[#737373]">
              {t("tech.subtitle", locale)}
            </p>
          </div>
          <TechIcons items={data.about.techStack} />
        </section>

        {/* Projects */}
        <section id="projects" className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-[32px] font-medium text-[#0A0A0A]">
              {t("projects.title", locale)}
            </h2>
            <p className="text-sm sm:text-base text-[#737373]">
              {t("projects.subtitle", locale)}
            </p>
          </div>
          <div className="flex flex-col gap-12 sm:gap-16">
            {data.projects.map((project, idx) => (
              <div
                key={project.id}
                className="flex flex-col md:flex-row gap-6 md:gap-10"
              >
                <div className="w-full md:w-[45%] lg:w-[560px] flex-shrink-0">
                  <Carousel
                    images={project.images}
                    placeholderColor={
                      idx % 3 === 0
                        ? "#F5F5F5"
                        : idx % 3 === 1
                          ? "#F0F0F0"
                          : "#FAFAFA"
                    }
                  />
                </div>
                <div className="flex-1 flex flex-col gap-4 pt-0 md:pt-4">
                  <h3 className="text-xl sm:text-2xl font-medium text-[#0A0A0A]">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-xs text-[#92400E]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-[15px] leading-6 sm:leading-[26px] text-[#737373]">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#D97706] hover:underline"
                  >
                    {project.linkText || t("projects.viewLink", locale)}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section id="opensource" className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-[32px] font-medium text-[#0A0A0A]">
              {t("opensource.title", locale)}
            </h2>
            <p className="text-sm sm:text-base text-[#737373]">
              {t("opensource.subtitle", locale)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            {data.repos.map((repo) => (
              <div
                key={repo.id}
                className="flex-1 min-h-[200px] sm:min-h-[240px] rounded-lg border border-[#E5E5E5] p-4 flex flex-col gap-3"
              >
                <h3 className="font-mono font-semibold text-base sm:text-lg text-[#0A0A0A]">
                  {repo.name}
                </h3>
                <p className="text-sm leading-[22px] text-[#737373]">
                  {repo.description}
                </p>
                <div className="flex gap-4">
                  <span className="font-mono text-sm text-[#737373]">
                    Stars&nbsp;&nbsp;{repo.stars}
                  </span>
                  <span className="font-mono text-sm text-[#737373]">
                    {repo.language}
                  </span>
                </div>
                <a
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#D97706] hover:underline mt-auto"
                >
                  {t("opensource.viewLink", locale)}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-[32px] font-medium text-[#0A0A0A]">
              {data.pricing.title}
            </h2>
            <p className="text-sm sm:text-base text-[#737373]">
              {data.pricing.subtitle}
            </p>
          </div>
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              {" "}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-2">
                <span className="text-4xl sm:text-5xl font-medium text-[#D97706]">
                  {data.pricing.currency}
                  {data.pricing.rate}
                </span>
                <span className="text-sm sm:text-base text-[#737373]">
                  / {data.pricing.unit}
                </span>
              </div>
              <p className="text-sm text-[#737373]">{data.pricing.note}</p>
            </div>
            <img
              src="/uploads/wechat-qr-1784616677945.png"
              alt="Wechat QR code"
              className="w-48 h-48 rounded-lg overflow-hidden border border-[#E5E5E5]"
            />
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="flex flex-col gap-6 pt-10">
          <div className="w-full h-px bg-[#E5E5E5]" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium text-[#0A0A0A]">
                {data.footer.title}
              </h3>
              <p className="font-mono text-sm text-[#737373]">
                {data.footer.email}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <a
                href={data.about.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#0A0A0A] hover:text-[#D97706] transition-colors"
              >
                {data.footer.github}
              </a>
              <span className="font-mono text-sm text-[#0A0A0A]">
                {data.footer.wechat}: {data.about.contact.wechat}
              </span>
            </div>
          </div>
          <p className="font-mono text-xs text-[#737373]">
            {data.footer.copyright}
          </p>
        </footer>
      </div>
    </div>
  );
}
