import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const HorizontalDots = ({ blogId }) => {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)
  const handleDelete = async () => {
    await axios.delete(`/api/posts/${blogId}`)
    router.replace()
  }
  const handleEdit = () => {
    router.push(`/blogs/${blogId}/edit`)
  }
  return (
    <div className='absolute right-0'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        className='w-14 h-auto'
        onClick={toggleMenu}>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.49984 14.1667C6.9415 14.1667 5.6665 15.4417 5.6665 17C5.6665 18.5583 6.9415 19.8333 8.49984 19.8333C10.0582 19.8333 11.3332 18.5583 11.3332 17C11.3332 15.4417 10.0582 14.1667 8.49984 14.1667ZM25.4998 14.1667C23.9415 14.1667 22.6665 15.4417 22.6665 17C22.6665 18.5583 23.9415 19.8333 25.4998 19.8333C27.0582 19.8333 28.3332 18.5583 28.3332 17C28.3332 15.4417 27.0582 14.1667 25.4998 14.1667ZM14.1665 17C14.1665 15.4417 15.4415 14.1667 16.9998 14.1667C18.5582 14.1667 19.8332 15.4417 19.8332 17C19.8332 18.5583 18.5582 19.8333 16.9998 19.8333C15.4415 19.8333 14.1665 18.5583 14.1665 17Z'
          fill='#FFFFFF'
          stroke='#000000'
        />
      </svg>
      {showMenu && (
        <div className='absolute right-6 top-9 bg-white dark:bg-[#000000EB] flex flex-col'>
          <span className='dropdown_link cursor-pointer' onClick={handleEdit}>Edit</span>
          <span className='dropdown_link cursor-pointer' onClick={handleDelete}>Delete</span>
        </div>
      )}
    </div>
  )
}

export default HorizontalDots
