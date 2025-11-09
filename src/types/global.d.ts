// src/types/global.d.ts
export {};

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready(cb: () => void): void;
        execute(
          siteKey: string,
          opts: { action: string }
        ): Promise<string>;
      };
    };
  }
}
