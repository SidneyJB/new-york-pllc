# System Patterns: NY PLLC Formation Service

## Architecture Overview

Modern static-first web application using Next.js with external service integrations:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Static Site   │    │   External      │
│   Frontend      │◄──►│   Generation    │    │   Services      │
│                 │    │                 │    │                 │
│ - Pages         │    │ - Home          │    │ - Spiffy.co     │
│ - Components    │    │ - Pricing       │    │ - SendGrid      │
│ - Styling       │    │ - FAQ           │    │ - Analytics     │
│ - Forms         │    │ - Contact       │    │ - Monitoring    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Key Technical Decisions

### Frontend Architecture

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS v4 utility-first approach with centralized CSS variables
- **State Management**: React hooks + Context API (minimal state)
- **Form Handling**: React Hook Form with validation
- **UI Components**: Custom components + Headless UI for complex interactions

### Site Architecture

- **Static Generation**: Next.js SSG/ISR for optimal performance
- **Form Handling**: Spiffy.co forms for payment processing
- **Email Integration**: SendGrid for customer notifications
- **Analytics**: Google Analytics for conversion tracking

### Data Flow Patterns

#### Order Creation Flow

```
Customer Form → Form Validation → Spiffy.co Payment → Email Notification → Admin Notification
     ↓              ↓              ↓              ↓              ↓
  React Hook    Zod Schema    Payment Form     SendGrid       Email          Static
  Form         Validation     Processing       Template       Alert          Dashboard
```

#### Status Update Flow (Future)

```
Admin Action → Email Notification → Customer Update → Manual Processing
     ↓              ↓              ↓              ↓
  Static        SendGrid       Email          External
  Dashboard     Template       Delivery       Systems
```

## Component Relationships

### Page Components

- **Public Pages**: Home, Pricing, FAQ, Contact (static generation)
- **Legal Pages**: Privacy Policy, Terms of Service (static generation)
- **Interactive Pages**: Order form (client-side rendering with Spiffy integration)
- **Static Pages**: Admin dashboard (static HTML for now)

### Shared Components

- **Layout Components**: Navbar, Footer, Sidebar
- **Form Components**: Input fields, Select dropdowns, File uploads, ContactForm
- **Display Components**: Order cards, Status badges, Progress bars
- **Modal Components**: Document upload, Confirmation dialogs
- **Analytics Components**: TrackedCTAButton, TrackedPhoneLink, TrackedEmailLink, ScrollTracking
- **Tracking Hooks**: useFormTracking, useCheckoutTracking, useScrollDepthTracking

## Design Patterns

### Form Handling Pattern

```typescript
// Standardized form pattern across application
const useOrderForm = () => {
  const form = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: defaultOrderValues,
  });

  const onSubmit = useCallback(async (data: OrderData) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(data),
      });
      // Handle success/error
    } catch (error) {
      // Error handling
    }
  }, []);

  return { form, onSubmit };
};
```

### Status Management Pattern

```typescript
// Centralized status handling
export const ORDER_STATUS = {
  RECEIVED: "received",
  FILED_STATE: "filed_state",
  PUBLISHING_STARTED: "publishing_started",
  PUBLISHED_COMPLETE: "published_complete",
  CLOSED: "closed",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
```

### Document Upload Pattern

```typescript
// Secure document handling
const uploadDocument = async (file: File, orderId: string) => {
  const presignedUrl = await getUploadUrl(orderId, file.name);
  await uploadToS3(presignedUrl, file);
  await saveDocumentUrl(orderId, presignedUrl);
};
```

## Page Structure

### Public Pages
- Home (`/`) - Hero, features, process, CTA
- About (`/about`) - Company story, founders, values
- FAQ (`/faq`) - Comprehensive PLLC questions with link to DIY guide and virtual address services section
- Contact (`/contact`) - Support form and contact info
- Order (`/order`) - Spiffy checkout integration
- DIY Guide (`/how-to-form-a-pllc-in-ny`) - Step-by-step guide with hero section, strategic CTAs, Article structured data
- Virtual Address Services (`/virtual-address-services`) - Service explanation page with features, pricing, and benefits
- Mail Forwarding Agreement (`/mail-forwarding-agreement`) - Legal agreement page with full terms and conditions
- Profession pages (9 total) - Dentist, LCSW, MHC, Physical Therapist, Psychologist, SLP, Physician, Massage Therapist, Chiropractor
- Legal pages - Privacy, Terms, Disclaimer

## Integration Patterns

### Payment Integration

**Spiffy.co Implementation**:
- Spiffy script loaded in root layout (`layout.tsx`) with account "nypllc"
- Checkout component embedded in order page: `<spiffy-checkout url="https://nypllc.spiffy.co/checkout/new-york-pllc-formation">`
- Customer data collection and payment processing handled entirely by Spiffy
- Analytics tracking detects checkout form load and tracks `checkout_start` event
- Order confirmation page receives payment success data via URL parameters

**Implementation Pattern**:
```typescript
// Root layout - Spiffy script loading
<Script
  id="spiffy-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `/* Spiffy initialization script */`
  }}
/>

// Order page - Checkout component embedding
<div dangerouslySetInnerHTML={{
  __html: `<spiffy-checkout url="https://nypllc.spiffy.co/checkout/new-york-pllc-formation"></spiffy-checkout>`
}}/>

// Analytics - Automatic checkout detection
useCheckoutTracking() // Detects <spiffy-checkout> element and tracks checkout_start
```

- Form submission handling and validation (handled by Spiffy)
- Email notifications via Zapier webhooks (handled by Spiffy → Zapier)
  - Customer order confirmation emails
  - Admin notification emails on new orders
  - Automated via Spiffy webhook triggers

### External Service Integration

- Google Analytics for conversion tracking
- Vercel Analytics for privacy-friendly conversion funnel tracking
- Bing Ads Universal Event Tracking (UET) for Bing Ads conversion tracking
- Sentry for error monitoring and reporting
- Zapier webhooks for email notifications (triggered by Spiffy.co)
- Static content management for admin dashboard

### Domain Consolidation Pattern

**Canonical Domain Enforcement**: Site lives exclusively on `https://www.nypllc.com`

**Implementation**:
- `vercel.json` at repository root with 301 redirects for old domain variants (`newyorkpllc.com` → `www.nypllc.com`)
- Hardcoded `siteUrl: 'https://www.nypllc.com'` in `SEO_CONFIG` (removed env var fallback)
- Canonical URLs set via `metadataBase` and `alternates.canonical` in root layout
- Sitemap, structured data, and all metadata use canonical domain
- Vercel dashboard configuration: old domains set to redirect to primary domain

**Key Files**:
- `vercel.json`: Platform-level 301 redirects for old domain variants
- `web/src/lib/seo/config.ts`: Hardcoded canonical domain
- `web/src/app/layout.tsx`: `metadataBase` and `alternates.canonical` configuration

### Analytics Tracking Pattern

**Vercel Custom Events**: Lean, privacy-friendly conversion tracking

```typescript
// Tracking utilities with UTM auto-capture
import { trackCTAClick, trackLeadStart, trackLeadSubmit, trackCheckoutStart, trackPurchase } from '@/lib/analytics/track'

// Tracked components encapsulate tracking logic
<TrackedCTAButton href="/order" cta="start-now" location="hero">
  Start your PLLC
</TrackedCTAButton>

// Form tracking hooks
const { handleFirstInput } = useFormTracking('contact')
// Tracks lead_start on first keystroke

// Checkout tracking
useCheckoutTracking() // Tracks checkout_start when Spiffy form loads

// Purchase tracking with time spent, engagement metrics, and order ID
trackPurchase({ 
  value: 885, 
  plan: 'PLLC Formation', 
  entityType: 'PLLC',
  timeSpentSeconds: 180, // Optional: total checkout duration from page load
  orderId: 'spiffy-12345', // Optional: extracted from URL
  engagementTimeSeconds: 120, // Optional: active form engagement time
  fieldChangeCount: 8 // Optional: number of fields interacted with
})
```

**Key Events Tracked**:
- `cta_click` - CTA button clicks with location and value
- `lead_start` - First keystroke on forms (tracked once per form) or first Spiffy field interaction
- `lead_submit` - Form submissions
- `checkout_start` - Checkout initiation (when Spiffy form loads, stores start time)
- `purchase` - Purchase completion (on order confirmation, includes time spent, engagement metrics, and order ID)
- `phone_click` - Phone link clicks
- `email_click` - Email link clicks
- `scroll_depth` - Scroll depth milestones (25%, 50%, 75%, 100%) with page path and time-to-depth

**Event Properties** (≤8 to meet Pro plan limits):
- `cta`, `location`, `value`, `variant` (for CTA clicks)
- `form`, `step`, `value` (for form events)
- `plan`, `price`, `entityType` (for checkout/purchase)
- `time_spent`, `order_id`, `engagement_time`, `field_changes` (for purchase events - optional)
- `page`, `depth`, `time_to_depth` (for scroll depth events)
- `utm_source`, `utm_campaign` (auto-captured from URL)

**Time Tracking Implementation**:
- Checkout start time stored in `sessionStorage` when Spiffy form loads
- Duration calculated on purchase completion (confirmation page)
- Time spent included in purchase event as `time_spent` (seconds)
- Order ID extracted from URL parameters (`order_id`, `id`, or `orderId`)

**Spiffy Form Engagement Tracking**:
- Uses Spiffy JavaScript API (`checkout.ready()` and `checkout.on()`)
- Tracks first field interaction via `change:field` event (triggers `lead_start`)
- Counts field changes to measure form engagement
- Calculates engagement duration from first to last field interaction
- Tracks order changes (`change:order`) and payment method selection (`change:paymethod`)
- Engagement metrics stored in `sessionStorage` and included in purchase event
- Distinguishes between active form filling time and total checkout duration

**Bing Ads UET Tracking**: Component-based implementation
```typescript
// Bing Ads Universal Event Tracking component
import { BingAdsTracking } from '@/components/analytics/bing-ads-tracking'

// In layout.tsx <head> section
<BingAdsTracking />
```

- Tracks conversions and page views for Bing Ads campaigns
- Uses Next.js Script component with `afterInteractive` strategy
- Enables auto SPA tracking for Next.js routing
- Tracking ID: `187221859`

**Scroll Depth Tracking**: Page-level engagement tracking
```typescript
// Scroll depth tracking component
import { ScrollTracking } from '@/components/analytics/scroll-tracking'

// Add to any page component
export default function Page() {
  return (
    <>
      <ScrollTracking />
      {/* page content */}
    </>
  )
}
```

- Tracks scroll milestones at 25%, 50%, 75%, and 100% depth
- Includes time-to-depth metric (seconds from page load to milestone)
- Tracks each milestone only once per page
- Resets tracking state when navigating to new page
- Uses requestAnimationFrame throttling for performance
- Implemented on all 18 pages (home, about, contact, FAQ, order, confirmation, legal pages, all profession pages)
- Event: `scroll_depth` with properties: `page`, `depth`, `time_to_depth`, `utm_source`, `utm_campaign`

## Security Patterns

### Security (Future Implementation)

- Form validation and input sanitization
- HTTPS enforcement for all communications
- Secure payment form integration

### Data Protection

- Sensitive data encryption at rest
- PCI compliance for payment processing
- Secure file storage with access controls
- GDPR/CCPA compliance for privacy protection
- Legal disclaimers on all key pages
- Professional license verification requirements

## Tailwind CSS v4 Configuration Pattern

**Critical Pattern**: Tailwind v4 requires explicit configuration loading for custom themes to work.

```css
/* globals.css - Must include @config directive */
@import "tailwindcss";
@config "../../tailwind.config.js";

/* CSS Variables in :root and .dark for theme switching */
:root {
  --primary: 199 89% 48%; /* Blue */
  --background: 210 40% 98%; /* Light gray */
  /* ... more variables */
}

.dark {
  --primary: 199 89% 48%; /* Same blue (consistent branding) */
  --background: 222 84% 4.9%; /* Dark background */
  /* ... dark mode overrides */
}
```

```javascript
// tailwind.config.js - Maps Tailwind classes to CSS variables
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... all colors mapped to CSS variables
      },
    },
  },
};
```

```javascript
// postcss.config.js - Required for v4
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**Key Behaviors**:

- **Configuration Loading**: `@config` directive required in globals.css to load JS config
- **CSS Variables**: All colors defined as `hsl(var(--variable))` for theme switching
- **Dark Mode**: `.dark` class triggers CSS variable swaps in `:root` and `.dark` selectors
- **Server Component Requirement**: Root layout must be Server Component (no 'use client')

## Performance Patterns

### Caching Strategy

- Static pages: ISR (Incremental Static Regeneration)
- Dynamic content: SWR for client-side caching
- API responses: Response caching headers

### Optimization

- Image optimization with Next.js Image component
- Bundle splitting and code splitting
- CDN integration for static assets

## Legal Compliance Patterns

### Legal Disclaimer Pattern

```typescript
// Consistent legal disclaimer across all key pages
const LegalDisclaimer = () => (
  <Card className="border-orange-200 bg-orange-50">
    <CardHeader>
      <CardTitle className="text-orange-800">
        Important Legal Disclaimer
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-orange-700 text-sm">
        <strong>This is not legal advice.</strong> We provide administrative
        filing services for PLLC formation in New York. We recommend consulting
        with a licensed attorney for legal advice regarding your specific
        situation.
      </p>
    </CardContent>
  </Card>
);
```

### Privacy Compliance Pattern

- **GDPR/CCPA Compliance**: Comprehensive privacy policy with user rights
- **Data Collection Transparency**: Clear disclosure of information collection
- **User Consent**: Explicit consent for data processing
- **Data Retention**: Clear retention policies and user rights

### Professional License Verification Pattern

- **License Requirements**: Clear eligibility requirements for PLLC formation
- **Verification Process**: Professional license verification as part of service
- **Compliance Documentation**: Legal requirements clearly stated
- **Professional Focus**: Services limited to licensed professionals only
