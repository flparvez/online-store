import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const baseUrl ="https://uniquestorebd.netlify.app/"
  return {
    rules: {
      userAgent: '*',
      allow: ["/","/product"],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}