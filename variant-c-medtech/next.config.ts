import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy.
 * - script/style use 'unsafe-inline' for compatibility with Next's bootstrap
 *   and framer-motion's inline styles. Dev additionally needs 'unsafe-eval' and
 *   websockets for HMR. (A nonce-based strict-dynamic CSP is a recommended
 *   future hardening step — see PROJECT-NOTES.)
 */
// Trusted CDN for the Sienna accessibility widget (script + its bundled assets).
const CDN = "https://cdn.jsdelivr.net";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `img-src 'self' data: blob: https://images.unsplash.com ${CDN}`,
  `font-src 'self' data: ${CDN}`,
  "frame-src 'self' https://www.google.com https://maps.google.com",
  `style-src 'self' 'unsafe-inline' ${CDN}`,
  `script-src 'self' 'unsafe-inline' ${CDN}${isProd ? "" : " 'unsafe-eval'"}`,
  `connect-src 'self' ${CDN}${isProd ? "" : " ws: wss:"}`,
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
