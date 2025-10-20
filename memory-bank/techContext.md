# Technical Context: NY PLLC Formation Service

## Technology Stack

### Core Framework
- **Frontend Framework**: Next.js 14+ with App Router
- **Runtime**: Node.js 18+ LTS
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v3+

### External Services
- **Payment Processing**: Spiffy.co forms for payment collection
- **Email Service**: SendGrid for transactional emails
- **Error Monitoring**: Sentry for error tracking
- **Analytics**: Google Analytics 4 (GA4)
- **Hosting**: Vercel (primary) or Netlify (alternative)

### Development Tools
- **Version Control**: Git + GitHub
- **Package Manager**: npm or yarn
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **API Testing**: Postman or similar

## Development Environment Setup

### Prerequisites
```bash
# Node.js 18+ required
node --version # >= 18.0.0
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd new-york-pllc

# Install dependencies
npm install

# Environment setup
cp .env.example .env.local
# Edit .env.local with actual values

# Start development server
npm run dev
```

## Environment Configuration

### Required Environment Variables
```env
# Spiffy.co Payment Forms
SPIFFY_CO_FORM_ID="your-form-id"
SPIFFY_CO_PUBLIC_KEY="your-public-key"

# SendGrid (for email notifications)
SENDGRID_API_KEY="SG...."

# Sentry (error monitoring)
SENTRY_DSN="https://..."

# Google Analytics
GA_TRACKING_ID="GA_MEASUREMENT_ID"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Technical Constraints

### Performance Requirements
- **Page Load Time**: <2 seconds on 3G networks
- **Time to First Byte (TTFB)**: <500ms
- **Core Web Vitals**: All metrics in "Good" range
- **Concurrent Users**: Support 100+ simultaneous users

### Security Constraints
- **HTTPS Only**: All traffic must be encrypted
- **Data Encryption**: Sensitive data encrypted at rest
- **PCI Compliance**: Payment data handled securely
- **GDPR/CCPA**: Privacy regulation compliance
- **Input Validation**: All user inputs sanitized

### Scalability Constraints
- **Concurrent Users**: Support 100+ simultaneous users
- **Email Volume**: Handle automated email notifications
- **Form Submissions**: Process order form submissions efficiently

## Dependencies

### Production Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@sendgrid/mail": "^7.0.0",
  "@sentry/nextjs": "^7.0.0",
  "react-hook-form": "^7.0.0",
  "zod": "^3.0.0",
  "tailwindcss": "^3.0.0",
  "@headlessui/react": "^1.0.0",
  "framer-motion": "^10.0.0",
  "lucide-react": "^0.200.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^18.0.0",
  "@types/react": "^18.0.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0",
  "jest": "^29.0.0",
  "@testing-library/react": "^14.0.0",
  "typescript": "^5.0.0"
}
```

## Deployment Strategy

### Primary Deployment (Vercel)
- **Automated Deployments**: GitHub integration
- **Environment Management**: Vercel environment variables
- **Static Generation**: ISR and SSG for optimal performance
- **Domain**: Custom domain with SSL certificate
- **Edge Functions**: For lightweight server-side functionality

### Alternative Deployment (Netlify)
- **Automated Deployments**: GitHub integration
- **Environment Management**: Netlify environment variables
- **Static Site Generation**: Optimized for static content
- **Form Handling**: Netlify Forms integration
- **CDN**: Global content delivery

## Development Workflow

### Git Workflow
- **Main Branch**: Production-ready code
- **Feature Branches**: Feature development
- **Pull Requests**: Code review required
- **Automated Testing**: CI/CD pipeline

### Code Organization
```
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin dashboard (static for now)
│   └── contact/           # Contact and support pages
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── lib/                  # Utilities and configurations
│   ├── sendgrid/         # Email utilities
│   ├── validations/      # Form validation schemas
│   └── constants/        # Application constants
├── public/               # Static assets
│   ├── images/          # Image assets
│   └── icons/           # Icon assets
└── types/                # TypeScript type definitions
```

## Monitoring & Observability

### Error Tracking
- Sentry integration for error monitoring
- Error boundaries for graceful error handling
- Logging of key user actions

### Performance Monitoring
- Core Web Vitals tracking
- Page load performance
- User interaction metrics

### Business Metrics
- Order conversion funnel
- Payment success rates
- Email delivery rates
- Customer satisfaction tracking
