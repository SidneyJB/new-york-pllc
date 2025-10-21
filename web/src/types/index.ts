// Core application types
export interface OrderData {
  id?: string
  customerName: string
  customerEmail: string
  businessName: string
  businessAddress: string
  professionalLicense: string
  licenseNumber: string
  licenseState: string
  entityType: 'PLLC'
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

export type OrderStatus =
  | 'received'
  | 'filed_state'
  | 'publishing_started'
  | 'published_complete'
  | 'closed'

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  subject?: string
}

// UI Component Props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LayoutProps extends BaseComponentProps {
  title?: string
  description?: string
}

// Form validation schemas (for use with react-hook-form + zod)
export type ValidationSchema<T> = {
  [K in keyof T]: {
    required?: string
    min?: { value: number; message: string }
    max?: { value: number; message: string }
    pattern?: { value: RegExp; message: string }
    custom?: (value: T[K]) => string | true
  }
}
