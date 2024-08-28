'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'

import FormModal from '@/components/FormModal'

const ProfileButtons = ({ user }) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({
    fullname: user.fullname,
    bio: user.bio,
    position: user.position
  })

  const initialUserInfo = {
    fullname: user.fullname,
    bio: user.bio,
    position: user.position
  }

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (JSON.stringify(initialUserInfo) === JSON.stringify(userInfo)) {
      return Swal.fire({
        icon: 'warning',
        title: 'You have not made any changes',
        text: 'Please make some changes to update your profile',
        confirmButtonColor: '#f5b400'
      })
    }

    const res = await axios.patch(`/api/user/${user.id}`, userInfo)
    if (res.status === 200) {
      return Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully',
        confirmButtonColor: '#f5b400',
        timer: 2400,
        timerProgressBar: true
      }).then(() => {
        closeModal()
        router.refresh()
      })
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const { data: session } = useSession()
  if (session?.user?.id !== user.id) return null

  return (
    <div className='flex gap-2 items-stretch justify-start flex-wrap'>
      <button className='btn_profile' onClick={() => setIsModalOpen(true)}>
        Edit
      </button>
      <Link href={'/create-blog'} className='btn_profile'>
        Create new blog
      </Link>
      {isModalOpen && (
        <FormModal
          userInfo={userInfo}
          closeModal={closeModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default ProfileButtons
