'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export const BlogCommentDelete = ({ blogId, commentId, userData }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await axios.delete(`/api/posts/comments/${blogId}`, {
        data: {
          userId: userData.id,
          commentId: commentId
        }
      })

      if (response.status === 200) router.refresh()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className='font-mulish text-sm leading-[150%] dark:text-white'
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}
