# 🚀 Quick Setup Guide

This is a **Next.js Headless WooCommerce Template** ready for your own store!

## Prerequisites

- Node.js 18+ installed
- WordPress site with WooCommerce plugin
- Stripe account (for payments)

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd stonesforhealth
npm install
```

### 2. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your credentials:

#### WooCommerce Configuration
- `NEXT_PUBLIC_WOOCOMMERCE_URL`: Your WordPress REST API URL
- `WOOCOMMERCE_CONSUMER_KEY`: From WooCommerce > Settings > Advanced > REST API
- `WOOCOMMERCE_CONSUMER_SECRET`: Keep this secret!

#### Stripe Configuration
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: From Stripe Dashboard
- `STRIPE_SECRET_KEY`: Keep this secret!
- `STRIPE_WEBHOOK_SECRET`: From Stripe Webhooks settings

### 3. Configure Image Domains

Edit `next.config.ts` and add your WordPress domain to allow images:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https', // or 'http' for local dev
      hostname: 'your-wordpress-site.com',
      pathname: '/**',
    },
  ],
}
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## WordPress/WooCommerce Setup

### Required Settings

1. **Enable REST API**
   - Go to WooCommerce > Settings > Advanced > REST API
   - Add new key with Read/Write permissions

2. **Configure Permalinks**
   - Go to Settings > Permalinks
   - Select anything except "Plain" (Post name recommended)
   - Save changes

3. **Enable Legacy API** (if needed)
   - WooCommerce > Settings > Advanced > Legacy API
   - Enable REST API

## Deployment

### Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables in project settings
4. Deploy!

### CapRover
1. Build: `npm run build`
2. Deploy using CapRover CLI
3. Set environment variables in app configs

## Troubleshooting

### No products showing?
- Check REST API is enabled
- Verify permalinks are not "Plain"
- Ensure products are published
- Check API credentials are correct

### Images not loading?
- Add your domain to `next.config.ts`
- Restart development server

### API errors?
- Check console for specific error messages
- Verify WooCommerce API keys have Read/Write permissions
- Ensure WordPress site is accessible

## Features

✅ Product catalog  
✅ Shopping cart  
✅ Stripe checkout  
✅ Order management  
✅ Responsive design  
✅ SEO optimized  
✅ TypeScript  
✅ Tailwind CSS

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT - Use this template for any project!