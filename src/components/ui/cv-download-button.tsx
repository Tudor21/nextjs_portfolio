'use client';

import * as React from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '@/components/ui/button';
import { useLanguage } from '@/providers/language-provider';

interface CVDownloadButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function CVDownloadButton({
  variant = 'default',
  size = 'default',
  className,
}: CVDownloadButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();
  const buttonRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDownload = (lang: 'en' | 'ro') => {
    const fileName = lang === 'en' 
      ? 'CV-English-Popescu Tudor.pdf'
      : 'CV-Română-Popescu Tudor.pdf';
    const filePath = `/cv/${fileName}`;
    
    // Create a temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={buttonRef}>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Download className="h-4 w-4 mr-2" />
        {t('downloadCV.download-button')}
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 rounded-md border bg-background shadow-lg z-50"
            >
              <div className="p-1">
                <button
                  onClick={() => handleDownload('en')}
                  className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-between"
                >
                  <span>{t('downloadCV.english')}</span>
                  <span className="text-xs text-muted-foreground">EN</span>
                </button>
                <button
                  onClick={() => handleDownload('ro')}
                  className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-between"
                >
                  <span>{t('downloadCV.romanian')}</span>
                  <span className="text-xs text-muted-foreground">RO</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

