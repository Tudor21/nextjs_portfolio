"use client"
import { useLanguage } from "@/providers/language-provider";
import AboutMeThreeScene from "../three/AboutMeThreeScene";

const AboutMe: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative scroll-mt-24">
      {/* Mobile: Full background */}
      <div className="absolute inset-0 -z-10 md:hidden">
        <AboutMeThreeScene />
      </div>
      
      {/* Desktop: Right side only */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden md:block md:w-1/2">
        <AboutMeThreeScene />
      </div>
      
      <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="relative flex items-center md:flex-row md:gap-8 lg:gap-12">
            {/* Content - Left side on desktop */}
            <div className="relative z-10 flex flex-col gap-4 md:w-1/2">
              <h2 className="relative z-10 mb-4 max-w-xl text-4xl font-medium lg:text-5xl">
                {t("about.title")}
              </h2>
              <p>
                {t("about.description1")}
              </p>
              <p>
                {t("about.description2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;