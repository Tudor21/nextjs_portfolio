"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";
import HeroThreeScene from "@/components/sections/HeroThreeScene";

const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>
      <main className="overflow-x-hidden">
        <section id="home" className="relative scroll-mt-24">
          {/* Mobile: Full background */}
          <div className="absolute inset-0 -z-10 lg:hidden">
            <HeroThreeScene />
          </div>
          
          {/* Desktop: Right side only */}
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block">
            <HeroThreeScene />
          </div>
          
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
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="outline"
                    className="px-5 text-base"
                  >
                    <Link href="#downloadcv">
                      <span className="text-nowrap">{t("downloadCV.download-button")}</span>
                    </Link>
                  </Button>
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
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Powering the best teams</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width={300}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/column.svg"
                      alt="Column Logo"
                      height="16"
                      width={300}

                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width={300}

                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nike.svg"
                      alt="Nike Logo"
                      height="20"
                      width={300}

                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                      alt="Lemon Squeezy Logo"
                      height="20"
                      width="300"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/laravel.svg"
                      alt="Laravel Logo"
                      height="16"
                      width={300}

                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/lilly.svg"
                      alt="Lilly Logo"
                      height="28"
                      width={300}

                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-6 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/openai.svg"
                      alt="OpenAI Logo"
                      height="24"
                      width={300}
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