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
- **Form Components**: Input fields, Select dropdowns, File uploads
- **Display Components**: Order cards, Status badges, Progress bars
- **Modal Components**: Document upload, Confirmation dialogs

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

## Integration Patterns

### Payment Integration

- Spiffy.co forms for payment collection
- Form submission handling and validation
- Email notifications on form submission

### Email Integration

- SendGrid for transactional emails
- Template-based email generation
- Customer notification automation

### External Service Integration

- Google Analytics for conversion tracking
- Sentry for error monitoring and reporting
- Static content management for admin dashboard

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
