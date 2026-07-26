import { readData } from "@/lib/data";
import { getLocale, t } from "@/i18n/server";
import Carousel from "@/components/Carousel";
import Avatar from "@/components/Avatar";
import LanguageSwitch from "@/components/LanguageSwitch";
import TechIcons from "@/components/TechIcons";

export default async function HomePage() {
  const locale = getLocale();
  const data = await readData(locale);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-[960px] py-20 flex flex-col gap-20">
        {/* Header */}
        <header className="flex items-center justify-between">
          <nav className="flex items-center gap-8">
            <a
              href="#about"
              className="text-sm text-[#0A0A0A] hover:text-[#D97706] transition-colors"
            >
              {t("nav.about", locale)}
            </a>
            <a
              href="#projects"
              className="text-sm text-[#0A0A0A] hover:text-[#D97706] transition-colors"
            >
              {t("nav.projects", locale)}
            </a>
            <a
              href="#opensource"
              className="text-sm text-[#0A0A0A] hover:text-[#D97706] transition-colors"
            >
              {t("nav.opensource", locale)}
            </a>
            <a
              href="#contact"
              className="text-sm text-[#0A0A0A] hover:text-[#D97706] transition-colors"
            >
              {t("nav.contact", locale)}
            </a>
          </nav>
          <LanguageSwitch />
        </header>

        {/* Hero */}
        <section className="flex flex-col gap-6">
          <h1 className="text-5xl font-medium leading-[64px] text-[#0A0A0A]">
            {data.hero.greeting}
          </h1>
          <p className="text-lg leading-8 text-[#737373] max-w-[720px]">
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
        <section id="about" className="flex gap-16">
          {/* Left: Avatar + Contact */}
          <div className="w-[280px] flex-shrink-0 flex flex-col gap-10">
            <Avatar src={data.about.avatar} />
            <div className="flex flex-col gap-6">
              <h3 className="font-mono font-bold text-lg text-[#0A0A0A]">
                {t("about.contactTitle", locale)}
              </h3>
              <p className="font-mono text-[#0A0A0A]">
                e-mail&nbsp;&nbsp;
                <span className="text-[#D97706]">
                  {data.about.contact.email}
                </span>
              </p>
              <p className="font-mono text-[#0A0A0A]">
                {t("contact.phone", locale)}/{t("contact.wechat", locale)}&nbsp;&nbsp;
                <span className="text-[#D97706]">
                  {data.about.contact.phone}
                </span>
              </p>
              <p className="font-mono text-[#0A0A0A]">
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
              <div className="w-28 h-28 rounded-lg overflow-hidden border border-[#E5E5E5]">
                <img
                  src="/uploads/wechat-qr-1784616677945.png"
                  alt="WeChat QR code"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Right: Skills */}
          <div className="flex-1 flex flex-col gap-10">
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
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-[32px] font-medium text-[#0A0A0A]">
              {t("tech.title", locale)}
            </h2>
            <p className="text-base text-[#737373]">
              {t("tech.subtitle", locale)}
            </p>
          </div>
          <TechIcons items={data.about.techStack} />
        </section>

        {/* Projects */}
        <section id="projects" className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-[32px] font-medium text-[#0A0A0A]">
              {t("projects.title", locale)}
            </h2>
            <p className="text-base text-[#737373]">
              {t("projects.subtitle", locale)}
            </p>
          </div>
          <div className="flex flex-col gap-12">
            {data.projects.map((project, idx) => (
              <div key={project.id} className="flex gap-10">
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
                <div className="flex-1 flex flex-col gap-4 pt-4">
                  <h3 className="text-2xl font-medium text-[#0A0A0A]">
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
                  <p className="text-[15px] leading-[26px] text-[#737373]">
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
                  {(project.appStore || project.googlePlay) && (
                    <div className="flex items-center gap-3 mt-2">
                      {project.appStore && (
                        <a
                          href={project.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 rounded-md overflow-hidden border border-[#E5E5E5] hover:border-[#D97706] transition-colors"
                        >
                          <img
                            src="/uploads/app-store.png"
                            alt="App Store"
                            className="h-full w-auto object-contain"
                          />
                        </a>
                      )}
                      {project.googlePlay && (
                        <a
                          href={project.googlePlay}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 rounded-md overflow-hidden border border-[#E5E5E5] hover:border-[#D97706] transition-colors"
                        >
                          <img
                            src="/uploads/google-play.png"
                            alt="Google Play"
                            className="h-full w-auto object-contain"
                          />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section id="opensource" className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-[32px] font-medium text-[#0A0A0A]">
              {t("opensource.title", locale)}
            </h2>
            <p className="text-base text-[#737373]">
              {t("opensource.subtitle", locale)}
            </p>
          </div>
          <div className="flex gap-6">
            {data.repos.map((repo) => (
              <div
                key={repo.id}
                className="flex-1 h-[240px] rounded-lg border border-[#E5E5E5] p-4 flex flex-col gap-3"
              >
                <h3 className="font-mono font-semibold text-lg text-[#0A0A0A]">
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
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-[32px] font-medium text-[#0A0A0A]">
              {data.pricing.title}
            </h2>
            <p className="text-base text-[#737373]">{data.pricing.subtitle}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-medium text-[#D97706]">
              {data.pricing.currency}
              {data.pricing.rate}
            </span>
            <span className="text-base text-[#737373]">
              / {data.pricing.unit}
            </span>
          </div>
          <p className="text-sm text-[#737373]">{data.pricing.note}</p>
        </section>

        {/* Footer */}
        <footer id="contact" className="flex flex-col gap-6 pt-10">
          <div className="w-full h-px bg-[#E5E5E5]" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium text-[#0A0A0A]">
                {data.footer.title}
              </h3>
              <p className="font-mono text-sm text-[#737373]">
                {data.footer.email}
              </p>
            </div>
            <div className="flex gap-6">
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
