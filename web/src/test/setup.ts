import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import React from 'react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.location
const mockLocation = {
  search: '',
  href: 'http://localhost:3000',
  pathname: '/',
}

Object.defineProperty(window, 'location', {
  writable: true,
  value: mockLocation,
})

// Helper to update location.search for tests
export function setLocationSearch(search: string) {
  mockLocation.search = search
  // Update the window.location object
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      ...mockLocation,
      search,
    },
  })
}

// Mock Vercel Analytics
vi.mock('@vercel/analytics', () => ({
  track: vi.fn(),
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    return React.createElement('img', { src, alt, ...props })
  },
}))
