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
- **Styling**: Tailwind CSS utility-first approach
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
- **Public Pages**: Home, Pricing, FAQ, About (static generation)
- **Interactive Pages**: Order form, Contact (client-side rendering)
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
    defaultValues: defaultOrderValues
  });

  const onSubmit = useCallback(async (data: OrderData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(data)
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
  RECEIVED: 'received',
  FILED_STATE: 'filed_state',
  PUBLISHING_STARTED: 'publishing_started',
  PUBLISHED_COMPLETE: 'published_complete',
  CLOSED: 'closed'
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
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

## Performance Patterns

### Caching Strategy
- Static pages: ISR (Incremental Static Regeneration)
- Dynamic content: SWR for client-side caching
- API responses: Response caching headers

### Optimization
- Image optimization with Next.js Image component
- Bundle splitting and code splitting
- CDN integration for static assets
