import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        hostname: 'admin.stonesforhealth.nl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wordpress.stonesforhealth.nl',
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
    // Keep errors and warnings: without them production problems (failed mails, webhook
    // errors) are invisible in the Vercel logs
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Power optimizations
  poweredByHeader: false,

  // Permanent redirects for routes that moved or were consolidated
  async redirects() {
    return [
      // The old dual sitemap is gone; point crawlers at the single one
      { source: '/server-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      // Dutch route was replaced by /collections
      { source: '/collectie/:slug', destination: '/collections/:slug', permanent: true },
      { source: '/collectie', destination: '/collections', permanent: true },

      // --- Oude site (Search Console: 29x "Not found (404)", okt 2026) ---
      // Artikelen van de oude site (.htm) naar het best passende blog
      { source: '/nl/shilajit-de-nieuwste-ontdekkingen-over-dit-oude-natuurwonder.htm', destination: '/blog/masters-of-shilajit-himalaya', permanent: true },
      { source: '/roze-amethist-de-zachte-kracht-van-kristallijne-liefde-.htm', destination: '/blog/amethist-soorten-werking-spirituele-tips', permanent: true },
      { source: '/agaat-soorten-kleuren.htm', destination: '/blog/agaat-betekenis-soorten-kleuren-werking', permanent: true },
      { source: '/nl/steurmaan-augustus-2025-betekenis-numerologie-spirituele-inzichten.htm', destination: '/blog', permanent: true },
      { source: '/de/blogs/:path*', destination: '/blog', permanent: true },
      // Verwijderde producten naar de vervanger
      { source: '/product/s4h-tijgeroog-rood-edelstenen-armband-8-mm-kralen-size-18-cm', destination: '/product/s4h-rode-tijgeroog-armband-bescherming-innerlijke-kracht-focus-spirituele-edelsteen-8mm-energie-armband-voor-zelfvertrouwen-leiderschap-aarding', permanent: true },
      { source: '/product/s4h-citrien-armband-set-inclusief-kaart-losse-citrien-edelsteen', destination: '/product/s4h-citrien-armband-set-8-mm-kralen-18-21-cm-met-ruwe-citrien-edelsteen-informatiekaart-edelstenen-cadeauset', permanent: true },
      { source: '/product/s4h-edelsteen-armband-8mm-stabilize-emotions-emotionele-balans-rust', destination: '/product/s4h-edelstenen-armband-rust-balans-8-mm-18-cm', permanent: true },
      // Overige oude artikel- en productpagina's (.htm = artikel, .html = product)
      { source: '/:path*.htm', destination: '/blog', permanent: true },
      { source: '/:path*.html', destination: '/alle-producten', permanent: true },
      // Oude taal- en home-routes bestaan niet meer; de shop is alleen Nederlands
      { source: '/home', destination: '/', permanent: true },
      { source: '/:lang(nl|en|de)', destination: '/', permanent: true },
      { source: '/:lang(nl|en|de)/home', destination: '/', permanent: true },
      { source: '/:lang(nl|en|de)/:path*', destination: '/', permanent: true },
      // Testpagina die nooit online had mogen staan
      { source: '/test-store-api', destination: '/', permanent: true },
    ];
  },

  // Strict mode for better error detection
  reactStrictMode: true,

};

export default nextConfig;