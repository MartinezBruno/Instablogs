import StarSvg from '@/components/RatePopUp/StarSvg'

const RatingInput = ({ stars, starsValue, handleStars }) => {
  return (
    <div className='grid items-center justify-center grid-cols-5 gap-3 w-fit'>
      <input type='hidden' ref={stars} defaultValue={starsValue} />
      {[...Array(5)].map((_, i) => (
        <label key={i} htmlFor='stars' data-value={i + 1} onClick={handleStars}>
          {i + 1 <= starsValue ? <StarSvg isActive /> : <StarSvg />}
        </label>
      ))}
    </div>
  )
}

export default RatingInput
