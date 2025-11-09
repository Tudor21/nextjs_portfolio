"use client"
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";

const DownloadCV: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section>
      <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
        <div className="relative mx-auto max-w-6xl px-6 lg:block">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t('downloadCV.title')}
            </h2>
            <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg">
              {t('downloadCV.description')}
            </p>
          </div>

          <div className="mx-auto flex gap-4 items-center justify-center max-w-4xl">
            <Button size="lg" asChild>
              <a href={t('downloadCV.download-button')}>
                <Download className="h-4 w-4" />
                {t('downloadCV.download-button')}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={t('downloadCV.view-button')}>  
                <Download className="h-4 w-4" />
                {t('downloadCV.view-button')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCV;
