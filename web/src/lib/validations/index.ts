import { z } from 'zod'

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Order form validation schema (basic version for MVP)
export const orderFormSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  customerEmail: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters').max(100, 'Business name must be less than 100 characters'),
  businessAddress: z.string().min(10, 'Business address must be at least 10 characters').max(200, 'Business address must be less than 200 characters'),
  professionalLicense: z.string().min(1, 'Please select a professional license type'),
  licenseNumber: z.string().min(3, 'License number must be at least 3 characters').max(50, 'License number must be less than 50 characters'),
  licenseState: z.string().length(2, 'Please select a valid state'),
})

export type OrderFormData = z.infer<typeof orderFormSchema>

// Utility validation functions
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

export const validateLicenseNumber = (license: string, type: string): boolean => {
  // Basic validation - in real app, this would be more sophisticated
  return license.length >= 3 && license.length <= 50
}
