import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://skissify.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://skissify.com/editor', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://skissify.com/pricing', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://skissify.com/create', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://skissify.com/for-agents', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
