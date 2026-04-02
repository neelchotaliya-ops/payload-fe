const API_URL = process.env.NEXT_PUBLIC_API_URL
 
export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  publishedAt: string
  status: 'draft' | 'published'
}
 
// Fetch all published posts, newest first
export async function getAllPosts(): Promise<Post[]> {
  const res = await fetch(
    `${API_URL}/api/posts?where[status][equals]=published&sort=-publishedAt`,
    { next: { revalidate: 60 } }  // Cache for 60 seconds (Next.js ISR)
  )
  if (!res.ok) throw new Error('Failed to fetch posts')
  const data = await res.json()
  return data.docs  // Payload wraps results in { docs: [...] }
}
 
// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(
    `${API_URL}/api/posts?where[slug][equals]=${slug}&limit=1`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs[0] || null
}
