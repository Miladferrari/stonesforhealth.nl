/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://stonesforhealth.nl',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/checkout',
    '/checkout/*',
    '/cart',
    '/volg-je-bestelling',
    '/thank-you',
    '/payment-failed',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout',
          '/checkout/*',
          '/cart',
          '/api/*',
          '/volg-je-bestelling',
          '/thank-you',
        ],
      },
    ],
    additionalSitemaps: [
      'https://stonesforhealth.nl/server-sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/blog/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/product/')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/collections/')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path === '/alle-producten' || path === '/bestsellers') {
      priority = 0.9;
      changefreq = 'daily';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
