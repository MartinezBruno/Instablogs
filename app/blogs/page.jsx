import { BASE_URL } from '@/app/services/config'
import BlogsSwiper from './BlogsSwiper'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const getBlogs = async () => {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    next: { revalidate: 30 }
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
    <section className='c-container !pt-36'>
      <h2 className='px-5 text-5xl font-bold dark:text-white'>Blogs</h2>
      {blogs.length > 0
        ? (
            <BlogsSwiper blogs={blogs} />
          )
        : (
            <div className='grid place-content-center min-h-[450px]'>
              <p className='px-5 text-2xl font-bold dark:text-white'>No blogs found</p>
            </div>
          )}
    </section>
  )
}

export default BlogsPage
