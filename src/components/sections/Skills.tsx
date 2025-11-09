"use client";

import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import * as React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";
import { SkillModal } from "@/components/ui/skill-modal";

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const technologies = t<Array<{
    logoPath: string;
    title: string;
    shortDescription: string;
    description: string;
  }>>("technologies", []);

  return (
    <section id="skills" className="scroll-mt-24">
      <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
        <div className="relative mx-auto max-w-6xl px-6 lg:block">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              {t("skills.title")}
            </h2>
            <p className="text-muted-foreground mt-6">
              {t("skills.techTitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <SkillCard
                key={tech.logoPath}
                title={tech.title}
                shortDescription={tech.shortDescription}
                fullDescription={tech.description}
                logoPath={tech.logoPath}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  logoPath: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  shortDescription,
  fullDescription,
  logoPath,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <>
      <Card className="p-6">
        <div className="relative">
          <div className="size-10">
            <Image
              src={logoPath}
              alt={title}
              width={40}
              height={40}
              className="size-10 object-contain"
            />
          </div>

          <div className="space-y-2 py-6">
            <h3 className="text-base font-medium">{title}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {shortDescription}
            </p>
          </div>

          <div className="flex gap-3 border-t border-dashed pt-6">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1 pr-2 shadow-none"
              onClick={() => setIsModalOpen(true)}
            >
              {t("skillsModal.learnMore")}
              <ChevronRight className="ml-0 size-3.5! opacity-50" />
            </Button>
          </div>
        </div>
      </Card>

      <SkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={fullDescription}
        closeText={t("skillsModal.close")}
      >
        <Image
          src={logoPath}
          alt={title}
          width={48}
          height={48}
          className="size-12 object-contain"
        />
      </SkillModal>
    </>
  );
};

export default Skills;
