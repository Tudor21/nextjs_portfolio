"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/providers/language-provider";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

async function waitForRecaptcha(timeoutMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (typeof window !== "undefined" && window.grecaptcha?.enterprise) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("reCAPTCHA not ready");
}

async function getEnterpriseToken(siteKey: string, action: string): Promise<string> {
  // Runtime guard
  if (typeof window === "undefined" || !window.grecaptcha?.enterprise) {
    throw new Error("reCAPTCHA not ready");
  }

  // After the guard, we can safely use non-null assertions
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha!.enterprise!.ready(async () => {
      try {
        const t = await window.grecaptcha!.enterprise!.execute(siteKey, { action });
        resolve(t);
      } catch (err) {
        reject(err);
      }
    });
  });
}

export default function Contact() {
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [captchaReady, setCaptchaReady] = useState(false);

useEffect(() => {
  const markReady = () => setCaptchaReady(!!window.grecaptcha?.enterprise);
  // fire on script load
  window.addEventListener("grecaptcha-loaded", markReady);
  // also poll in case onLoad fired before mount
  const id = setInterval(markReady, 200);
  markReady();
  return () => {
    window.removeEventListener("grecaptcha-loaded", markReady);
    clearInterval(id);
  };
}, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);

  try {
    // 1) Get Enterprise token
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      throw new Error("reCAPTCHA site key not configured");
    }
    
    const action = "contact_submit";
    await waitForRecaptcha();
    let token: string;
try {
  token = await getEnterpriseToken(siteKey, action);
} catch (err) {
  console.error("Failed to get reCAPTCHA token:", err);
  alert("Captcha not ready. Please try again in a moment.");
  setLoading(false);
  return;
}

    // 2) VERIFY token on your server (DROP THIS IN HERE)
    const res = await fetch("/api/recaptcha-enterprise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action }),
    });

    if (!res.ok) {
      const err = await res.json().catch(async () => ({ text: await res.text() }));
      console.error("recaptcha-enterprise failed:", err);
      alert("Captcha failed. See console for details.");
      setLoading(false);
      return;
    }

    const verify = await res.json();
    if (!verify.ok) {
      console.error("recaptcha-enterprise verify:", verify);
      alert("Captcha rejected. See console for details.");
      setLoading(false);
      return;
    }

      // 3) Send via EmailJS
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("EmailJS configuration is incomplete");
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_name: "Tudor",
          site_name: "https://www.popescutudor.com/",
          name: formData.name,
          email: formData.email,
          phone: "",
          message: formData.message,
          submitted_at: new Date().toLocaleString(),
          linkedin: "https://www.linkedin.com/in/popescu-tudor-540329174/",
          reply_to: formData.email,
        },
        { publicKey: PUBLIC_KEY }
      );

      alert(t("contact.success"));
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert(t("contact.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
        <div className="relative mx-auto max-w-6xl px-6 lg:block">
          {/* Heading */}
          <div className="mb-8 sm:mb-10 lg:mb-14">
            <h1 className="text-balance text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
              {t("contact.title")}
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl text-base sm:text-lg">
              {t("contact.description")}
            </p>
          </div>

          {/* Split View */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Left: Form */}
            <div>
              <Card className="h-full gap-0 border border-border py-16 shadow-sm">
                <CardHeader className="p-6 pb-4 sm:p-8">
                  <CardTitle className="text-2xl">{t("contact.title")}</CardTitle>
                  <CardDescription className="text-base">
                    {t("contact.description")}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-4 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        {t("contact.name")}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="h-11 w-full"
                        placeholder={t("contact.name")}
                        aria-label={t("contact.name")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        {t("contact.email")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="h-11 w-full"
                        placeholder="you@email.com"
                        aria-label={t("contact.email")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        {t("contact.message")}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder={t("contact.message")}
                        className="w-full resize-none"
                        aria-label={t("contact.message")}
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={loading || !formData.name || !formData.email|| !captchaReady}
                        className="h-11 w-full text-base font-medium"
                      >
                        {loading ? t("contact.sending") : t("contact.send")}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Info (Email / LinkedIn / Phone) */}
            <div>
              <div className="grid h-full grid-cols-1 gap-8 sm:gap-10 lg:gap-12 lg:content-start">
                {/* Email */}
                <div className="space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-background">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {t("contact.emailLabel")}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {t("contact.emailDescription")}
                    </p>
                  </div>
                  <div className="pt-1">
                    <a
                      href={`mailto:${t("contact.emailAddress")}`}
                      className="inline-block text-base font-semibold text-foreground underline-offset-4 hover:underline transition-all sm:text-lg"
                    >
                      {t("contact.emailAddress")}
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-background">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {t("contact.linkedinLabel")}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {t("contact.linkedinDescription")}
                    </p>
                  </div>
                  <div className="pt-1">
                    <a
                      href={t("contact.linkedinUrl")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-base font-semibold text-foreground underline-offset-4 hover:underline transition-all sm:text-lg"
                    >
                      {t("contact.linkedinCta")} <span aria-hidden className="text-xl">›</span>
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-background">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {t("contact.phone")}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {t("contact.phoneDescription")}
                    </p>
                  </div>
                  <div className="pt-1">
                    <a
                      href={`tel:${t("contact.phoneNumber")}`}
                      className="inline-block text-base font-semibold text-foreground underline-offset-4 hover:underline transition-all sm:text-lg"
                    >
                      {t("contact.phoneNumber")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* /Right */}
          </div>
        </div>
      </div>
    </section>
  );
}
