
import Link from 'next/link'
import { getAllPosts } from './lib/api'

// Server Component — the fetch happens on the server, not in the browser
export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let posts: any[] = []
  let error = null
 
  try {
    posts = await getAllPosts()
    console.log(
      "posts",posts
    )
  } catch (e) {
    error = 'Could not load posts. Please try again later.'
  }
 
  if (error) return <div>{error}</div>
 
  return (
    <main>
      <h1>My Blog</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(post => (
        <article key={post.id}>
          <h2>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p>{post.excerpt}</p>
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
        </article>
      ))}
    </main>
  )
}

