'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

import useRateUs from '@/hooks/useRateUs'
import axios from 'axios'
import OpinionInput from './OpinionInput'
import RatingInput from './RatingInput'

const RateUsPopup = () => {
  const { data: session } = useSession()
  const { show } = useRateUs()
  const [popupOpen, setPopupOpen] = useState(false)

  const [rateData, setRateData] = useState({
    stars: 1,
    opinion: ''
  })

  const stars = useRef(null)
  const userId = session?.user.id

  console.log({ show, popupOpen })

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
    expirationDate.setDate(expirationDate.getDate() + 7)

    window.localStorage.setItem('rateUs', JSON.stringify({ rateDate: expirationDate.toDateString() }))

    console.log(res)
    setPopupOpen(false)
  }

  const skipRating = () => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 1)

    window.localStorage.setItem('rateUs', JSON.stringify({ rateDate: expirationDate.toDateString() }))
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
          <div
            className='flex flex-col items-center justify-center p-8 bg-white dark:bg-[#000] h-fit w-fit border border-[#000] rounded-[20px]'
          >
            <h5 className='text-4xl font-semibold leading-10 dark:text-white'>Rate us!</h5>
            <p className='text-lg dark:text-white'>Your opinion is important for InstaBlogs!</p>
            <form onSubmit={handleSubmit}>
              <RatingInput stars={stars} starsValue={rateData.stars} handleStars={handleStars} />
              <OpinionInput handleOpinion={handleOpinion} />
              <button type='submit'>Submit</button>
              <button type='button' onClick={skipRating}>
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
