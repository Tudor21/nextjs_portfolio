"use client"
import { useLanguage } from "@/providers/language-provider";
import { Cpu, Zap } from "lucide-react";

const AboutMe: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section>
      <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
        <div className="relative mx-auto max-w-6xl px-6 lg:block">
          <h2 className="relative mb-4 z-10 max-w-xl text-4xl font-medium lg:text-5xl">
            {t("about.title")}
          </h2>
          <div className="relative">
            <div className="relative z-10 flex flex-col gap-4 md:w-1/2">
              <p>
                {t("about.description1")}
              </p>
              <p>
                {t("about.description2")}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4" />
                    <h3 className="text-sm font-medium">Faaast</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    It supports an entire helping developers and innovate.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="size-4" />
                    <h3 className="text-sm font-medium">Powerful</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    It supports an entire helping developers and businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
