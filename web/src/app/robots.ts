import { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONFIG.siteUrl
  const host = new URL(baseUrl).host

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/node_modules/',
        '/change-registered-agent',
        '/change-registered-agent/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host,
  }
}
