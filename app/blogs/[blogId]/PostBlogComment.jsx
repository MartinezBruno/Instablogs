'use client'

import axios from 'axios'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const postComment = async (blogId, comment, userEmail) => {
  try {
    const postComment = await axios.post(`/api/posts/comments/${blogId}`, {
      content: comment,
      email: userEmail
    })
    if (postComment.status === 200) return true
    throw new Error('Something went wrong')
  } catch (error) {
    console.log(error)
    return false
  }
}

const PostBlogComment = ({ blogId }) => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState({})
  const limitChars = 300
  const [charsLeft, setCharsLeft] = useState(limitChars)

  const handleCommentChange = (e) => {
    if (e.target.value.length > limitChars) return
    setComment(e.target.value)
    setCharsLeft(limitChars - e.target.value.length)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    const postCommentStatus = postComment(blogId, comment, session?.user.email)
    if (postCommentStatus) {
      setComment('')
      handleMessage('success')
    } else {
      console.log('Something went wrong')
      handleMessage('error')
    }
  }

  const handleMessage = (messageType) => {
    if (messageType === 'success') {
      setMessage({
        type: 'success',
        text: 'Comment posted successfully'
      })
      setTimeout(() => {
        setMessage(null)
        window.location.reload()
      }, 2000)
    }
    if (messageType === 'error') {
      setMessage({
        type: 'error',
        text: 'Something went wrong, try again later'
      })
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  useEffect(() => {
    const setProvidersData = async () => {
      const providers = await getProviders()
      setProviders(providers)
    }
    setProvidersData()
  }, [])

  return (
    <section className='mt-8 w-full lg:w-3/4 mx-auto sm:px-14 md:px-28'>
      {!session?.user
        ? (
        <div className='flex flex-col gap-2 items-start'>
          <p>Please sign in to post a comment</p>
          {providers &&
            Object.values(providers).map(provider => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='text-base text-white font-bold leading-[150%] bg-[rgba(255,255,255,0.15)] rounded-[5px] py-2 px-3 bg-yellow hover:opacity-70 transition-[background-color] ease-in-out'
              >
                Get access
              </button>
            ))}
        </div>
          )
        : (
        <form onSubmit={handleCommentSubmit} className='border-t pt-4 flex flex-col items-stretch'>
          <p className='text-base font-normal md:text-2xl w-fit pl-11 mb-2'>Join the conversation</p>
          <div className='flex items-start gap-2'>
            <img
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full aspect-square'
              alt={session?.user.name}
            />
            <div className='flex flex-col items-start w-full gap-2'>
              <textarea onChange={handleCommentChange} value={comment} name="comment" id="comment" placeholder='Comment' className='border-[2px] h-[93px] lg:h-[195px] w-full p-4'></textarea>
              <span>{charsLeft} / {limitChars}</span>
              <p className={message?.type === 'success' ? 'text-green-500' : 'text-red-600'}>{message?.text}</p>
              <button
                type='submit'
                className='text-base mt-2 text-white font-bold leading-[150%] bg-[rgba(255,255,255,0.15)] rounded-[5px] py-2 px-7 bg-yellow hover:opacity-70 transition-[background-color] ease-in-out'>
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
