'use client'

import OptimizedImage from '@/components/OptimizedImage'
import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'

const INITIAL_BLOG_DATA = {
  blogTitle: '',
  blogContent: ''
}

const BlogEditForm = ({ blog }) => {
  INITIAL_BLOG_DATA.blogTitle = blog.title
  INITIAL_BLOG_DATA.blogContent = blog.content

  const [blogData, setBlogData] = useState(INITIAL_BLOG_DATA)

  const handleChange = e => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value })
  }
  const updateBlog = async () => {
    // check if blogData is empty
    if (!blogData.blogTitle || !blogData.blogContent) {
      return Swal.fire({
        icon: 'warning',
        title: 'Be Careful!',
        text: 'Please make sure to fill in all fields before submitting the form.',
        timer: 3000,
        timerProgressBar: true
      })
    }

    // check if blogData is the same as the initial data
    if (blogData.blogTitle === INITIAL_BLOG_DATA.blogTitle && blogData.blogContent === INITIAL_BLOG_DATA.blogContent) {
      return Swal.fire({
        icon: 'warning',
        title: 'Be Careful!',
        text: 'Please make sure to change something before submitting the form.',
        timer: 3000,
        timerProgressBar: true
      })
    }
    console.log(blog.id)
    const res = await axios.put(`/api/posts/${blog.id}`, {
      title: blogData.blogTitle,
      content: blogData.blogContent
    })
    console.log({ res, from: 'response' })
    if (res.status === 200) {
      return Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your blog has been updated successfully.',
        timer: 3000,
        timerProgressBar: true,
        didClose: () => {
          // redirect to blog page
          window.location.href = `/blogs/${blog.id}`
        }
      })
    }
  }
  return (
    <>
      <input
        className='mx-auto text-2xl font-extrabold text-center bg-transparent md:text-5xl dark:text-white'
        style={{ textWrap: 'balance' }}
        contentEditable
        name='blogTitle'
        value={blogData.blogTitle}
        onChange={handleChange}
      />
      <OptimizedImage src={blog.banner} alt={blog.title} className='mt-7' />
      <div className='w-full mx-auto transition-all duration-300 lg:w-3/4 sm:px-14 md:px-28 mt-7'>
        <textarea
          name='blogContent'
          defaultValue={blogData.blogContent}
          className='text-text_gray dark:text-white md:text-lg lg:text-xl leading-[130%] break-words w-full bg-transparent'
          onChange={handleChange}
        ></textarea>
      </div>
      <div className='w-full mx-auto transition-all duration-300 lg:w-3/4 sm:px-14 md:px-28 mt-7'>
        <button className='btn_profile' onClick={updateBlog}>
          Save Changes
        </button>
      </div>
    </>
  )
}

export default BlogEditForm
