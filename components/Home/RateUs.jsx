import { BASE_URL } from '@/app/services/config'
import RateUsSlides from './RateUsSlides'

const getReviews = async () => {
  const res = await fetch(`${BASE_URL}/api/rateus`, {
    next: { revalidate: 600 }
    // cache: 'no-cache'
  })
  if (!res.ok) {
    throw new Error('Error fetching reviews')
  }
  const data = await res.json()
  return data
}

const RateUs = async () => {
  const data = await getReviews()
  return (
    <section className='mt-[124px] scroll-mt-[125px]' id='opinions'>
      <h4 className='heading2 text-black dark:text-white text-center mb-4'>Opinions about us</h4>
      <RateUsSlides reviews={data} />
    </section>
  )
}

export default RateUs
