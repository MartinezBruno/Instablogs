'use client'

import Spinner from '@/components/Icons/Spinner'
import useImageToBase64 from '@/hooks/useImageToBase64'
import previewImage from '@/public/image-upload-preview.svg'
import axios from 'axios'
import Compressor from 'compressorjs'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2'

const postBlog = async (blog) => {
  try {
    const res = await axios.post('/api/posts', {
      title: blog.title,
      banner: blog.banner,
      content: blog.content,
      email: blog.email
    })
    if (res.status !== 200) throw new Error('Something went wrong')

    return res.data
  } catch (error) {
    console.error(error)
  }
}

const CreateBlogForm = ({ user }) => {
  const inputRef = useRef(null)

  const [preview, setPreview] = useState(previewImage.src)
  const [blog, setBlog] = useState({
    title: '',
    banner: '',
    content: '',
    email: user.email
  })
  const { base64, convertImageToBase64 } = useImageToBase64()
  const [errors, setErrors] = useState([
    {
      title: '',
      banner: false,
      content: ''
    }
  ])
  const [loading, setLoading] = useState(false)

  const handleImageClick = () => {
    inputRef.current.click()

    inputRef.current.onchange = () => {
      const file = inputRef.current.files[0]
      if (file.size / 1000 / 1000 < 10) {
        return new Compressor(file, {
          quality: 0.6,
          mimeType: 'image/webp',
          async success(result) {
            const imageUrl = URL?.createObjectURL(result)
            await convertImageToBase64(result)
            setErrors({ ...errors, banner: false })
            setBlog({ ...blog, banner: base64 })
            setPreview(imageUrl)
          }
        })
      }
      setErrors({ ...errors, banner: true })
    }
  }

  const handleImageDrop = (e) => {
    e.preventDefault()

    const file = e.dataTransfer.files[0]
    if (file.size / 1000 / 1000 < 10) {
      return new Compressor(file, {
        quality: 0.6,
        mimeType: 'image/webp',
        async success(result) {
          const imageUrl = URL?.createObjectURL(result)
          await convertImageToBase64(result)
          setErrors({ ...errors, banner: false })
          setBlog({ ...blog, banner: base64 })
          setPreview(imageUrl)
        }
      })
    }
    setErrors({ ...errors, banner: true })
  }

  const handleImageDragOver = (e) => {
    e.preventDefault()
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setBlog({ ...blog, [name]: value })
    // if (name === 'content') handleHeight(e)
  }

  const handleErrors = (blog) => {
    const errors = {}
    if (!blog.title) errors.title = 'Title is required'
    if (!blog.banner) errors.banner = 'Banner is required'
    if (!blog.content) errors.content = 'Content is required'

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const errors = handleErrors(blog)
    if (!errors) return setLoading(false)

    const post = await postBlog(blog)
    if (!post.id) return alert('Something went wrong')

    Swal.fire({
      title: 'Success!',
      text: 'Your blog has been posted',
      html: `You can see it on your profile! <a href="/profile/${user.username}" class="text-yellow">Go to profile</a>`,
      icon: 'success',
      confirmButtonColor: '#ffbb00',
      timer: 5000,
      timerProgressBar: true
    })
    postSuccess()
  }

  const postSuccess = () => {
    setBlog({
      title: '',
      banner: '',
      content: '',
      email: user.email
    })
    setPreview(previewImage.src)
    setLoading(false)
  }

  return (
    <form className='lg:px-[205px]' onSubmit={handleSubmit}>
      <div className='mb-4 flex w-full flex-col gap-4'>
        <div>
          <input
            type='text'
            name='title'
            placeholder='Title'
            className='w-full !border p-3 dark:border-[rgb(229,231,235)] dark:bg-black dark:text-white dark:placeholder:text-white'
            onChange={handleOnChange}
            value={blog.title}
          />
          {errors.title && <span className='text-red-500'>{errors.title}</span>}
        </div>
        <div className='overflow-hidden'>
          <div
            onClick={handleImageClick}
            onDrop={handleImageDrop}
            onDragOver={handleImageDragOver}
          >
            <input
              type='file'
              name='image'
              id='image'
              ref={inputRef}
              className='hidden'
              accept='image/*'
            />
            <img
              src={preview}
              className='aspect-video w-full cursor-pointer object-cover object-center'
              alt='Banner'
            />
          </div>
          <span className='text-xs text-gray-500 dark:text-white'>
            Recommended size: 1920x1080px (16:9) - Max weight: 10MB
          </span>
          {errors.banner && (
            <span className='block text-sm text-red-500'>{errors.banner}</span>
          )}
        </div>
        <div>
          <textarea
            name='content'
            id='content'
            placeholder='Type something'
            className='min-h-[155px] w-full border p-3 transition-[height] duration-500 lg:min-h-[310px] dark:bg-black dark:text-white'
            onChange={handleOnChange}
            value={blog.content}
            // onFocus={handleFocus}
          />
          {errors.content && (
            <span className='text-red-500'>{errors.content}</span>
          )}
        </div>
        <button
          disabled={loading}
          type='submit'
          className='bg-yellow dark:bg-purple rounded-[5px] px-3 py-2 text-base leading-[150%] font-bold text-white transition-[background-color,height] ease-in-out disabled:bg-green-500'
        >
          {loading ? (
            <span>
              Posting...
              <Spinner />
            </span>
          ) : (
            'Post your blog!'
          )}
        </button>
      </div>
    </form>
  )
}

export default CreateBlogForm
