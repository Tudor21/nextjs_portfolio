// TypeScript declarations for Google reCAPTCHA Enterprise
interface GrecaptchaEnterprise {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface Grecaptcha {
  enterprise?: GrecaptchaEnterprise;
}

interface Window {
  grecaptcha?: Grecaptcha;
}