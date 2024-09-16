'use client'

import OptimizedImage from '@/components/OptimizedImage'
import axios from 'axios'
import { useState } from 'react'

const INITIAL_BLOG_DATA = {
  blogTitle: '',
  blogContent: ''
}

const BlogEditForm = ({ blog }) => {
  INITIAL_BLOG_DATA.blogTitle = blog.title
  INITIAL_BLOG_DATA.blogContent = blog.content

  const [blogData, setBlogData] = useState({
    blogTitle: INITIAL_BLOG_DATA.blogTitle,
    blogContent: INITIAL_BLOG_DATA.blogContent
  })
  const [isChanged, setIsChanged] = useState(false)
  const [putResult, setPutResult] = useState({
    code: 0,
    message: ''
  })

  const handleChange = e => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value
    })
    checkIfBlogDataChanged()
  }

  const checkIfBlogDataChanged = () => {
    // blogData.blogTitle === INITIAL_BLOG_DATA.blogTitle &&
    // blogData.blogContent === INITIAL_BLOG_DATA.blog
    const isChanged =
      blogData.blogTitle !== INITIAL_BLOG_DATA.blogTitle || blogData.blogContent !== INITIAL_BLOG_DATA.blogContent
    setIsChanged(isChanged)
  }

  const updateBlog = async ({ title, content }) => {
    const res = await axios.put(`/api/posts/${blog.id}`, {
      title,
      content
    })

    setPutResult({
      code: res.status,
      message: res.data.message
    })

    if (res.status === 200) {
      setTimeout(() => {
        window.location.href = `/blogs/${blog.id}`
      }, 2000)
    }
  }

  return (
    <>
      <textarea
        className='mx-auto text-2xl font-extrabold text-center bg-[#DAE3EA] dark:bg-[#000] md:text-5xl dark:text-white'
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
          className='text-text_gray dark:text-white md:text-lg lg:text-xl leading-[130%] break-words w-full bg-[#DAE3EA] dark:bg-[#000]'
          onChange={handleChange}
        />
      </div>
      <div className='w-full mx-auto transition-all duration-300 lg:w-3/4 sm:px-14 md:px-28 mt-7'>
        <button
          type='button'
          className='btn_profile disabled:cursor-not-allowed disabled:opacity-30'
          disabled={!isChanged}
          onClick={() =>
            updateBlog({
              title: blogData.blogTitle,
              content: blogData.blogContent
            })
          }
        >
          Save Changes
        </button>
        {putResult.code === 200 && <div className='mt-5 text-green-500'>{putResult.message}</div>}
      </div>
    </>
  )
}

export default BlogEditForm
