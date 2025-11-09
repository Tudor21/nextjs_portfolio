'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/providers/language-provider';
import Script from 'next/script';

type Lang = 'en' | 'ro';

export default function ClientProviders({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  if (!siteKey) {
    console.warn("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured");
  }
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`}
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event("grecaptcha-loaded"));
            }
          }}
        />
      )}
      <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
