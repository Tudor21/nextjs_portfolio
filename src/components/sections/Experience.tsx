"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";

type Job = {
  title: string;
  company: string;
  period: string;
  mode?: string;
  description: string;
  logo?: string;
};

const Experience: React.FC = () => {
  const { t } = useLanguage();

  const heading = t<string>("experience.title", "Experience");
  const sectionDesc = t<string | null>("experience.description", null);
  const jobs = t<Job[]>("experience.jobs", []);
  return (
    <section>
      <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Section Heading */}
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              {heading}
            </h2>
            {sectionDesc && (
              <p className="text-muted-foreground mt-6">{sectionDesc}</p>
            )}
          </div>

          {/* Experience List */}
          <div className="mt-12 space-y-12">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="border-b border-border pb-6 last:border-b-0"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  {/* Left: Job info */}
                  <div className="md:w-2/3">
                    <div className="mb-2 flex items-center gap-3">
                      {job.logo && (
                        <Image
                          src={job.logo}
                          alt={`${job.company} logo`}
                          width={24}
                          height={24}
                          className="h-5 w-6 object-contain"
                        />
                      )}
                      <h3 className="text-xl font-medium">{job.title}</h3>
                    </div>

                    {job.mode && (
                      <p className="text-muted-foreground mb-2 text-sm">
                        {job.mode}
                      </p>
                    )}

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Right: Dates + company */}
                  <div className="md:w-1/3 md:text-right">
                    <p className="mb-1 text-sm font-medium">{job.period}</p>
                    <p className="text-muted-foreground text-sm">
                      {job.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
