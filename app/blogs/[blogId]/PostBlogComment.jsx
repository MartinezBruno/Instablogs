'use client'

import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const postComment = async (blogId, comment, userEmail) => {
  try {
    const postComment = await axios.post(`/api/posts/comments/${blogId}`, {
      content: comment,
      email: userEmail
    })
    if (postComment.status === 200) return true
    throw new Error('Something went wrong')
  } catch (error) {
    console.error(error)
    return false
  }
}

const PostBlogComment = ({ blogId }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState({
    type: '',
    text: '',
    alertStyles: ''
  })
  const limitChars = 300
  const [charsLeft, setCharsLeft] = useState(limitChars)

  const handleCommentChange = e => {
    if (e.target.value.length > limitChars) return
    setComment(e.target.value)
    setCharsLeft(limitChars - e.target.value.length)
  }

  const handleCommentSubmit = async e => {
    e.preventDefault()
    if (comment.trim().length < 1) {
      handleMessage('not empty')
      return
    }
    const postCommentStatus = await postComment(blogId, comment, session?.user.email)
    if (postCommentStatus) {
      setComment('')
      handleMessage('success')
      return
    }
    handleMessage('error')
  }

  const handleMessage = messageType => {
    switch (messageType) {
      case 'success':
        setMessage({
          type: 'success',
          text: 'Comment posted successfully',
          alertStyles: 'text-green-500'
        })
        break
      case 'error':
        setMessage({
          type: 'error',
          text: 'Something went wrong, try again later',
          alertStyles: 'text-red-500'
        })
        break
      case 'not empty':
        setMessage({
          type: 'warning',
          text: 'Be careful, your comment cannot be empty',
          alertStyles: 'text-amber-400'
        })
        break
    }
    setTimeout(() => {
      setMessage({
        ...message,
        alertStyles: 'max-h-0 '
      })
      if (messageType === 'success') router.refresh()
    }, 2000)
  }

  return (
    <section className='w-full mx-auto mt-8 lg:w-3/4 sm:px-14 md:px-28'>
      {!session?.user
        ? (
          <div className='flex flex-col items-start gap-2'>
            <p>Please sign in to post a comment</p>
            <button
              type='button'
              onClick={() => signIn('google')}
              className='text-base text-white font-bold leading-[150%] bg-[rgba(255,255,255,0.15)] rounded-[5px] py-2 px-3 bg-yellow hover:opacity-70 transition-[background-color] ease-in-out'
            >
              Get access
            </button>
          </div>
          )
        : (
          <form onSubmit={handleCommentSubmit} className='flex flex-col items-stretch pt-4 border-t dark:border-t-white'>
            <p className='mb-2 text-base font-normal md:text-2xl w-fit pl-11 dark:text-white'>Join the conversation</p>
            <div className='flex items-start gap-2'>
              <img
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full aspect-square'
                alt={session?.user.name}
              />
              <div className='flex flex-col items-start w-full gap-2'>
                <textarea
                  onChange={handleCommentChange}
                  value={comment}
                  name='comment'
                  id='comment'
                  placeholder='Comment'
                  className='border-[2px] h-[93px] lg:h-[195px] w-full p-4 dark:bg-[#000000EB] dark:text-white'
                />
                <span className='dark:text-white'>
                  {charsLeft} / {limitChars}
                </span>
                <p className={`${message.alertStyles}`}>{message.text}</p>
                <button
                  type='submit'
                  className='text-base mt-2 text-white font-bold leading-[150%] bg-[rgba(255,255,255,0.15)] rounded-[5px] py-2 px-7 bg-yellow dark:bg-purple hover:opacity-70 transition-[background-color] ease-in-out'
                >
                  Send
                </button>
              </div>
            </div>
          </form>
          )}
    </section>
  )
}

export default PostBlogComment
