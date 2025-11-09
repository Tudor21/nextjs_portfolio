"use client"
import { useState, useEffect } from "react";
import { useLanguage } from "@/providers/language-provider";
import dynamic from "next/dynamic";

// Dynamically import AboutMeThreeScene only on desktop to avoid loading on mobile
const AboutMeThreeScene = dynamic(() => import("../three/AboutMeThreeScene"), {
  ssr: false,
});

const AboutMe: React.FC = () => {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if we're on desktop (md breakpoint: 768px)
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Check on mount
    checkIsDesktop();

    // Debounce resize events to avoid excessive re-renders
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIsDesktop, 150);
    };

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="about" className="relative scroll-mt-24">
      {/* Desktop: Right side only - Only render on desktop */}
      {isDesktop && (
        <div className="absolute inset-y-0 right-0 -z-10 w-1/2">
          <AboutMeThreeScene />
        </div>
      )}
      
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