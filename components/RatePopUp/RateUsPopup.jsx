'use client'

import { useRef, useState } from 'react'

import RatingInput from './RatingInput'
import OpinionInput from './OpinionInput'

const RateUsPopup = () => {
  const [rateData, setRateData] = useState({
    stars: 1,
    opinion: ''
  })

  const stars = useRef(null)

  const handleStars = e => {
    const star = e.target.closest('label')
    const value = star.getAttribute('data-value')
    setRateData({ ...rateData, stars: value })
  }

  const handleOpinion = e => {
    setRateData({ ...rateData, opinion: e.target.value })
  }

  return (
    <div>
      <h5>Rate us!</h5>
      <p>Your opinion is important for InstaBlogs!</p>
      <form>
        <RatingInput stars={stars} starsValue={rateData.stars} handleStars={handleStars} />
        <OpinionInput handleOpinion={handleOpinion} />
      </form>
    </div>
  )
}

export default RateUsPopup
