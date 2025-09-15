# Stripe Payment Configuration Required

## Issue Found
The Stripe API keys in your `.env.local` file are incomplete/truncated:
- Current keys end with `...` which makes them invalid
- This causes the "Invalid Stripe API key" error in checkout

## To Fix This Issue

### 1. Get Your Stripe Keys
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy your keys:
   - **Publishable key**: starts with `pk_live_` (for production) or `pk_test_` (for testing)
   - **Secret key**: starts with `sk_live_` (for production) or `sk_test_` (for testing)

### 2. Update .env.local
Replace the truncated keys in your `.env.local` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_FULL_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_FULL_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

### 3. Get Webhook Secret (Optional but recommended)
1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click on your webhook endpoint (or create one)
3. Copy the **Signing secret** (starts with `whsec_`)

### 4. Restart the Development Server
After updating the keys, restart your development server:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Testing with Test Keys
For development/testing, you can use Stripe test keys:
- Test publishable key: starts with `pk_test_`
- Test secret key: starts with `sk_test_`
- Test card number: `4242 4242 4242 4242`
- Any future expiry date and any 3-digit CVC

## Security Notes
- **Never commit** your `.env.local` file to version control
- **Never expose** your secret key in client-side code
- The publishable key is safe for client-side use
- Keep your webhook secret secure

## Current Status
✅ Error handling has been improved to gracefully handle missing/invalid keys
✅ The checkout will show a user-friendly error message instead of crashing
❌ Payments won't work until valid Stripe keys are configured

## Need Help?
- [Stripe API Keys Documentation](https://stripe.com/docs/keys)
- [Stripe Testing Documentation](https://stripe.com/docs/testing)
- [Stripe Webhook Documentation](https://stripe.com/docs/webhooks)