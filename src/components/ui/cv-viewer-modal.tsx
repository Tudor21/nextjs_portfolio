'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { useLanguage } from '@/providers/language-provider';

interface CVViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVViewerModal({ isOpen, onClose }: CVViewerModalProps) {
  const { t } = useLanguage();
  const [selectedLang, setSelectedLang] = React.useState<'en' | 'ro' | null>(null);
  const [cvUrl, setCvUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSelectedLang(null);
      setCvUrl(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSelectLang = (lang: 'en' | 'ro') => {
    setSelectedLang(lang);
    // Use PDF for viewing (can be displayed in browser)
    const fileName = lang === 'en' 
      ? 'CV-English-Popescu Tudor.pdf'
      : 'CV-Română-Popescu Tudor.pdf';
    setCvUrl(`/cv/${encodeURIComponent(fileName)}`);
  };

  const handleDownload = () => {
    if (selectedLang) {
      // Download DOCX version
      const fileName = selectedLang === 'en' 
        ? 'CV-English-Popescu Tudor.pdf'
        : 'CV-Română-Popescu Tudor.pdf';
      const filePath = `/cv/${encodeURIComponent(fileName)}`;
      
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden md:w-screen md:h-screen md:max-w-none md:max-h-none md:rounded-none md:m-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="relative flex flex-col h-full md:h-screen">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="flex items-start justify-between p-6 border-b"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                      className="size-12 flex items-center justify-center rounded-lg bg-primary/10"
                    >
                      <FileText className="size-6 text-primary" />
                    </motion.div>
                    <h2 className="text-2xl font-semibold">{t('downloadCV.view-title')}</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full"
                  >
                    <X className="size-4" />
                  </Button>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  className="overflow-y-auto p-6 flex-1"
                >
                  {!selectedLang ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground mb-6">
                        {t('downloadCV.select-language')}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          onClick={() => handleSelectLang('en')}
                          className="p-6 rounded-lg border-2 border-border hover:border-primary transition-colors text-left group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{t('downloadCV.english')}</h3>
                            <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                              EN
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {t('downloadCV.english-description')}
                          </p>
                        </button>
                        <button
                          onClick={() => handleSelectLang('ro')}
                          className="p-6 rounded-lg border-2 border-border hover:border-primary transition-colors text-left group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{t('downloadCV.romanian')}</h3>
                            <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                              RO
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {t('downloadCV.romanian-description')}
                          </p>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 h-full flex flex-col">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">
                            {selectedLang === 'en' ? t('downloadCV.english') : t('downloadCV.romanian')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedLang === 'en' 
                              ? 'CV-English-Popescu Tudor.pdf'
                              : 'CV-Română-Popescu Tudor.pdf'}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLang(null)}
                        >
                          {t('downloadCV.change-language')}
                        </Button>
                      </div>
                      
                      <div className="flex-1 border rounded-lg bg-muted/30 overflow-hidden md:h-full">
                        {cvUrl ? (
                          <iframe
                            src={cvUrl}
                            className="w-full h-full"
                            title="CV Preview"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center space-y-4">
                              <FileText className="size-16 mx-auto text-muted-foreground" />
                              <p className="text-muted-foreground">
                                {t('downloadCV.preview-unavailable')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                  className="flex justify-between items-center p-6 border-t"
                >
                  <Button
                    variant="ghost"
                    onClick={onClose}
                  >
                    {t('downloadCV.close')}
                  </Button>
                  {selectedLang && (
                    <Button
                      onClick={handleDownload}
                      className="gap-2"
                    >
                      <Download className="size-4" />
                      {t('downloadCV.download-button')}
                    </Button>
                  )}
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

