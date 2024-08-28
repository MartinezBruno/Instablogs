'use client'

import BlogCard from '@/components/Blogs/BlogCard'
import { useEffect, useState } from 'react'
import './ProfileBlogsGrid.css'

const ProfileBlogsGrid = ({ blogs, user }) => {
  const allBlogs = blogs.length
  const [blogsToShow, setBlogsToShow] = useState(blogs.slice(0, 9))

  useEffect(() => {
    const handleOnScroll = () => {
      const maxScroll = document.body.scrollHeight
      const currentScroll = window.scrollY + window.innerHeight
      let loading = false

      if (currentScroll + 100 >= maxScroll && !loading && blogsToShow.length < allBlogs) {
        loading = true
        const newBlogsToShow = blogs.slice(0, blogsToShow.length + 9)
        setBlogsToShow(newBlogsToShow)
        loading = false
      }
    }
    window.addEventListener('scroll', handleOnScroll)
    return () => window.removeEventListener('scroll', handleOnScroll)
  }, [blogs, blogsToShow, allBlogs])

  return (
    <>
      {blogsToShow.length > 0 ? (
        <section className='grid sm:grid-cols-2 md:grid-cols-3 gap-7 lg:gap-11'>
          {blogsToShow.map(blog => (
            <div key={blog.id} className={'blogGridCard'}>
              <BlogCard blog={blog} userId={user.id} />
            </div>
          ))}
        </section>
      ) : (
        <div className='grid place-content-center min-h-[450px]'>
          <p className='text-2xl font-bold px-5'>No blogs found</p>
        </div>
      )}
    </>
  )
}

export default ProfileBlogsGrid
