import { NextResponse } from "next/server";

interface RecaptchaRequestBody {
  token?: string;
  action?: string;
}

interface StandardRecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  score?: number;
  action?: string;
}

export async function POST(req: Request) {
  try {
    const { token, action } = (await req.json()) as RecaptchaRequestBody;
    
    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing reCAPTCHA token" }, { status: 400 });
    }

    // Validate environment variables for standard reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const expectedSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    const missing: string[] = [];
    if (!secretKey) missing.push("RECAPTCHA_SECRET_KEY");
    if (!expectedSiteKey) missing.push("NEXT_PUBLIC_RECAPTCHA_SITE_KEY");
    
    if (missing.length > 0) {
      console.error("Missing required environment variables:", missing.join(", "));
      return NextResponse.json(
        { ok: false, error: `Server configuration error. Missing: ${missing.join(", ")}` },
        { status: 500 }
      );
    }

    // Validate secret key format (should be 40 characters for standard reCAPTCHA)
    if (secretKey && secretKey.length < 30) {
      console.error("Invalid RECAPTCHA_SECRET_KEY format");
      return NextResponse.json(
        { ok: false, error: "Invalid server configuration" },
        { status: 500 }
      );
    }

    // Standard reCAPTCHA verification endpoint
    const url = "https://www.google.com/recaptcha/api/siteverify";
    const params = new URLSearchParams({
      secret: secretKey!,
      response: token,
    });

    let resp: Response;
    try {
      resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
        cache: "no-store"
      });
    } catch (fetchError) {
      console.error("Failed to connect to Google reCAPTCHA API:", fetchError);
      return NextResponse.json(
        { ok: false, error: "Failed to verify reCAPTCHA. Please try again." },
        { status: 503 }
      );
    }

    // Surface Google’s response when it isn’t OK
    if (!resp.ok) {
      const errorText = await resp.text();
      console.error(`Google reCAPTCHA API error (${resp.status}):`, errorText);
      return NextResponse.json(
        { ok: false, error: "reCAPTCHA verification failed", status: resp.status },
        { status: 500 }
      );
    }

    let data: StandardRecaptchaResponse;
    try {
      data = await resp.json() as StandardRecaptchaResponse;
    } catch (parseError) {
      console.error("Failed to parse Google reCAPTCHA response:", parseError);
      return NextResponse.json(
        { ok: false, error: "Invalid response from reCAPTCHA service" },
        { status: 500 }
      );
    }

    // Validate standard reCAPTCHA response
    const success = data?.success === true;
    const score = typeof data?.score === "number" ? data.score : undefined;
    const pass = score === undefined ? true : score >= 0.5;

    if (!success || !pass) {
      const failureReasons = [];
      if (!success) failureReasons.push("verification failed");
      if (data?.["error-codes"]) failureReasons.push(...data["error-codes"]);
      if (!pass) failureReasons.push(`score too low (${score})`);
      
      console.warn("reCAPTCHA validation failed:", failureReasons.join(", "));
      return NextResponse.json(
        { ok: false, error: "reCAPTCHA verification failed", reasons: failureReasons, score },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, score, details: data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Unexpected error in reCAPTCHA verification:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error during reCAPTCHA verification" },
      { status: 500 }
    );
  }
}

// Health check endpoint to confirm the route is live
export async function GET() {
  const requiredEnvVars = [
    "RECAPTCHA_SECRET_KEY",
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY"
  ];
  
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  return NextResponse.json({ 
    ok: true, 
    status: "recaptcha route is live",
    environment: {
      configured: missing.length === 0,
      missingVars: missing
    }
  });
}
