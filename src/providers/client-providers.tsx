'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/providers/language-provider';
import { LoadingScreen } from '@/components/LoadingScreen';
import Script from 'next/script';

type Lang = 'en' | 'ro';

export default function ClientProviders({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;
    const cleanupFunctions: (() => void)[] = [];

    const hideLoading = () => {
      if (!isMounted) return;
      // Small delay for smooth transition
      setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 300);
    };

    const checkPageLoaded = () => {
      if (!isMounted || document.readyState !== 'complete') return;

      // Wait a bit for Next.js to hydrate and render components
      const hydrationDelay = setTimeout(() => {
        if (!isMounted) return;

        // Wait for all images to load
        const images = Array.from(document.querySelectorAll('img'));
        
        if (images.length === 0) {
          hideLoading();
          return;
        }

        const imagePromises = images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise<void>((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000);
            img.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            img.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Resolve even on error to not block loading
            };
          });
        });

        Promise.all(imagePromises).then(() => {
          hideLoading();
        });
      }, 100);

      cleanupFunctions.push(() => clearTimeout(hydrationDelay));
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      checkPageLoaded();
    } else {
      // Wait for window load event (fires when all resources are loaded)
      const handleLoad = () => {
        checkPageLoaded();
      };

      window.addEventListener('load', handleLoad);
      cleanupFunctions.push(() => window.removeEventListener('load', handleLoad));
    }

    // Fallback: hide loading after maximum time (5 seconds)
    const fallbackTimer = setTimeout(() => {
      if (isMounted) setIsLoading(false);
    }, 5000);
    cleanupFunctions.push(() => clearTimeout(fallbackTimer));

    return () => {
      isMounted = false;
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);
  
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
      <LoadingScreen isLoading={isLoading} />
      <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
