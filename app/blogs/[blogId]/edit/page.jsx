import { BASE_URL } from '@/app/services/config'
import BlogEditForm from './BlogEditForm'
// import Link from 'next/link'

const getBlogDetail = async (blogId) => {
  const res = await fetch(`${BASE_URL}/api/posts/${blogId}`, {
    // next: { revalidate: 360 }
    cache: 'no-cache'
  })
  const data = await res.json()
  return data
}

const BlogEdit = async ({ params }) => {
  const { blogId } = params
  const blogDetail = await getBlogDetail(blogId)

  return (
    <article className='c-container !pt-36 flex flex-col items-center'>
      <BlogEditForm blog={blogDetail} />
    </article>
  )
}

export default BlogEdit
