import { getAllPosts, getPostBySlug } from '@/app/lib/api'
import { notFound } from 'next/navigation'
 
// Pre-generate all post paths at build time (for SEO and performance)
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPost({ params }: any) {
  const { slug } = await params

  console.log("params.slug", slug)
  const post = await getPostBySlug(slug)
 
  if (!post) notFound()  // Shows Next.js 404 page automatically
 
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
      {/* Rich text from Payload is a JSON structure. */}
     {/* Use @payloadcms/richtext-slate for a renderer. */}
    </article>
  )
}
