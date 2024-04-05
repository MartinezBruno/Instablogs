import { BASE_URL } from '@/app/services/config'
import BlogsSwiper from './BlogsSwiper'

const getBlogs = async () => {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    next: { revalidate: 360 }
    // cache: 'no-cache'
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Error fetching blogs')
  }
  const data = await res.json()
  return data
}

const BlogsPage = async () => {
  const blogs = await getBlogs()
  return (
    <section className='c-container mt-28'>
      <h2 className='text-5xl font-bold px-5'>Blogs</h2>
      {blogs.length > 0
        ? (
        <BlogsSwiper blogs={blogs} />
          )
        : (
        <div className='grid place-content-center min-h-[450px]'>
          <p className='text-2xl font-bold px-5'>No blogs found</p>
        </div>
          )}
    </section>
  )
}

export default BlogsPage
