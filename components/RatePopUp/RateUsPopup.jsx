'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import useRateUs from '@/hooks/useRateUs'
import OpinionInput from './OpinionInput'
import RatingInput from './RatingInput'

const RateUsPopup = () => {
  const router = useRouter()

  const { data: session } = useSession()
  const { show } = useRateUs()
  const [popupOpen, setPopupOpen] = useState(false)

  const [rateData, setRateData] = useState({
    stars: 1,
    opinion: ''
  })

  const stars = useRef(null)
  const userId = session?.user.id

  const handleStars = e => {
    const star = e.target.closest('label')
    const value = star.getAttribute('data-value')
    setRateData({ ...rateData, stars: value })
  }

  const handleOpinion = e => {
    setRateData({ ...rateData, opinion: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const { stars, opinion } = rateData

    const res = await axios.post('/api/rateus', {
      content: opinion,
      authorId: userId,
      rating: +stars
    })

    if (res.status !== 200) return

    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 1)

    const day = expirationDate.getDate() + 7
    const month = expirationDate.getMonth() + 1
    const year = expirationDate.getFullYear()

    const formattedDate = `${day}/${month}/${year}`

    window.localStorage.setItem('rateUs', JSON.stringify({ rateDate: formattedDate }))
    setPopupOpen(false)

    router.refresh()
  }

  const skipRating = () => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 1)

    const day = expirationDate.getDate()
    const month = expirationDate.getMonth() + 1
    const year = expirationDate.getFullYear()

    const formattedDate = `${day}/${month}/${year}`

    window.localStorage.setItem('rateUs', JSON.stringify({ rateDate: formattedDate }))
    setPopupOpen(false)
  }

  useEffect(() => {
    setPopupOpen(show)
  }, [show])

  if (!popupOpen) return null

  return (
    <>
      {popupOpen && (
        <div className='fixed z-10 grid w-full h-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 place-items-center bg-black/40'>
          <div className='flex flex-col items-center justify-center p-8 gap-3 bg-white dark:bg-[#000] h-fit w-fit border border-[#000] rounded-[20px]'>
            <h5 className='text-4xl font-semibold leading-10 dark:text-white'>Rate us!</h5>
            <p className='text-lg dark:text-white'>Your opinion is important for InstaBlogs!</p>
            <form onSubmit={handleSubmit} className='grid gap-6 place-items-center w-fit'>
              <RatingInput stars={stars} starsValue={rateData.stars} handleStars={handleStars} />
              <OpinionInput handleOpinion={handleOpinion} />
              <button type='submit' className='w-full !py-2 btn_profile !font-extrabold'>
                Send
              </button>
              <button type='button' className='font-extrabold underline text-[#94A3B1]' onClick={skipRating}>
                Skip
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default RateUsPopup
