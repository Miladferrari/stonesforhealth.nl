import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration (Next.js 16+ default)
  turbopack: {},

  // Webpack configuration to handle react-pdf
  webpack: (config, { isServer }) => {
    // Exclude react-pdf from server-side builds to prevent module issues
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@react-pdf/renderer': 'commonjs @react-pdf/renderer',
      });
    }

    // Add fallbacks for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      encoding: false,
    };

    // Optimize file watching for faster dev server startup
    config.watchOptions = {
      ignored: ['**/node_modules', '**/.git', '**/.next'],
      poll: false,
    };

    return config;
  },

  // Enable image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress.stonesforhealth.nl',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'wordpress.123noodboxen.nl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      // Add other image domains as needed
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
  // Only use standalone in production for deployment
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
};

export default nextConfig;