"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";
import { CVDownloadButton } from "@/components/ui/cv-download-button";
import dynamic from "next/dynamic";

// Dynamically import HeroThreeScene with SSR disabled
const HeroThreeScene = dynamic(() => import("@/components/sections/HeroThreeScene"), {
  ssr: false,
});

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if we're on mobile (lg breakpoint: 1024px)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check on mount
    checkIsMobile();

    // Debounce resize events to avoid excessive re-renders
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIsMobile, 150);
    };

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <main className="overflow-x-hidden">
        <section id="home" className="relative scroll-mt-24">
          {/* Mobile: Full background */}
          {isMobile && (
            <div className="absolute inset-0 -z-10">
              <HeroThreeScene isMobile={true} />
            </div>
          )}
          
          {/* Desktop: Right side only */}
          {!isMobile && (
            <div className="absolute inset-y-0 right-0 -z-10 w-1/2">
              <HeroThreeScene isMobile={false} />
            </div>
          )}
          
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:flex-row lg:items-center">
              <div className="mx-auto max-w-lg text-center lg:mx-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                  {t("hero.name")}
                </h1>
                <h3 className="max-w-2xl mt-2 text-balance text-2xl font-light md:text-3xl lg:mt-4 xl:text-4xl">
                  {t("hero.title")}
                </h3>
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                 {t("hero.subtitle")}
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
                    <Link href="#contact">
                      <span className="text-nowrap">{t("navigation.contact")}</span>
                    </Link>
                  </Button>
                  <CVDownloadButton
                    size="lg"
                    variant="outline"
                    className="px-5 text-base"
                  />
                </div>
              </div>
              <div className="relative mt-8 h-56 w-full sm:h-96 lg:mt-0 lg:w-1/2 lg:h-0">
                {/* Spacer for right side - 3D scene renders in absolute positioned container */}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/react-svgrepo-com.svg"
                      alt="React Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/typescript-2.svg"
                      alt="TypeScript Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/javascript-1.svg"
                      alt="JavaScript Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/nodejs-1.svg"
                      alt="Node.js Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/Threejs-logo.svg"
                      alt="Three.js Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/unity-69.svg"
                      alt="Unity Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/postgresql.svg"
                      alt="PostgreSQL Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/tailwind-css-2.svg"
                      alt="Tailwind CSS Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/vitejs.svg"
                      alt="Vite Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/github-icon-2.svg"
                      alt="GitHub Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/styled-components-1.svg"
                      alt="Styled Components Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/html-1.svg"
                      alt="HTML Logo"
                      height="32"
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/images/logos/css-3.svg"
                      alt="CSS Logo"
                      height="32"
                      width={100}
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Hero;