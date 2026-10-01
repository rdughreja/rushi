import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'rushi';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Configure base path for GitHub Pages (repository name)
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Disable server-side features for static export
  trailingSlash: true,
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable compression
  compress: true,
  
  // Optimize bundle
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
    ],
  },
  
  // Headers for security and performance (only applied in dev/preview)
  async headers() {
    if (isGithubPages) return [];
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/:path*.(js|css|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;