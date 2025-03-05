'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const postReply = async ({ blogId, reply, userEmail, parentCommentId }) => {
  try {
    const response = await axios.post(`/api/posts/comments/${blogId}`, {
      content: reply,
      email: userEmail,
      parentCommentId: parentCommentId
    })

    return response.data
  } catch (error) {
    console.error('Error posting reply:', error)
    return error
  }
}

export const BlogCommentReply = ({ parentId, userData, blogId }) => {
  const router = useRouter()

  const [showReply, setShowReply] = useState(false)
  const [reply, setReply] = useState('')
  const limitChars = 300
  const [charsLeft, setCharsLeft] = useState(limitChars)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await postReply({
      blogId,
      reply,
      userEmail: userData.email,
      parentCommentId: parentId
    })
    setShowReply(false)
    setReply('')

    if (res) {
      router.refresh()
    }
  }

  const handleReplyChange = (e) => {
    if (e.target.value.length > limitChars) return
    setReply(e.target.value)
    setCharsLeft(limitChars - e.target.value.length)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowReply(false)
      }
    }

    if (showReply) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showReply])

  return (
    <div className='grid w-full place-items-start'>
      {showReply ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex w-full flex-col items-stretch border-t pt-4 dark:border-t-white'
        >
          <div className='flex items-start gap-2'>
            <img
              src={userData.image}
              width={37}
              height={37}
              className='aspect-square rounded-full'
              alt={userData.name}
            />
            <div className='flex w-full flex-col items-start gap-2'>
              <textarea
                onChange={handleReplyChange}
                value={reply}
                name='reply'
                id='reply'
                placeholder='Say something...'
                className='border-gray h-[54px] w-full border-[2px] p-3 dark:bg-[#000000EB] dark:text-white'
              />
              <span className='dark:text-white'>
                {charsLeft} / {limitChars}
              </span>
              <button
                type='submit'
                className='bg-yellow dark:bg-purple mt-2 rounded-[5px] px-7 py-2 text-base leading-[150%] font-bold text-white transition-[background-color] ease-in-out hover:opacity-70'
              >
                Send
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowReply(true)}
          className='font-mulish text-sm leading-[150%] dark:text-white'
        >
          Reply
        </button>
      )}
    </div>
  )
}
