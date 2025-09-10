import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress.restaurantmahzen.nl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '123noodklaar.nl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wordpress.123noodklaar.nl',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'wordpress.overlevingstotaal.com',
        pathname: '/**',
      },
      // Add other image domains if needed
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    unoptimized: process.env.NODE_ENV === 'development' ? false : false,
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },


  // Compress output
  compress: true,

  // Optimize CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Power optimizations
  poweredByHeader: false,

  // Strict mode for better error detection
  reactStrictMode: true,

  // Generate static pages at build time when possible
  output: 'standalone', // Required for Docker/CapRover deployment
};

export default nextConfig;