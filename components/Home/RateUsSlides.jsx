'use client'

import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Link from 'next/link'
import ArrowLeft from '../Icons/ArrowLeft'
import ArrowRight from '../Icons/ArrowRight'
import Stars from '../Icons/Stars'
import './Slides.css'

const RateUsSlides = ({ reviews }) => {
  return (
    <Swiper
      style={{ paddingBottom: '110px' }}
      spaceBetween={16}
      slidesPerView={1.1}
      centerInsufficientSlides={true}
      breakpoints={{
        768: {
          slidesPerView: 2.4
        },
        1024: {
          slidesPerView: 3.4
        },
        1440: {
          slidesPerView: 4.2
        }
      }}
      modules={[Navigation]}
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }}
      autoHeight={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
    >
      {reviews?.map((review, index) => {
        const reviewDate = new Date(review.updatedAt)
        const monthNames = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
        ];

        const day = reviewDate.getUTCDate() // Day of the month
        const month = monthNames[reviewDate.getUTCMonth()]
        const year = reviewDate.getUTCFullYear() // Year

        return (
          <SwiperSlide
            key={index}
            className='cursor-grab rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] h-full border dark:border-none dark:bg-[#000000]'
          >
            <div className='flex flex-col m-10'>
              <div className='flex items-center justify-between w-full'>
                <Stars rating={review.rating} />
                <span className='text-xs text-slate-400'>
                  {day} {month}, {year}
                </span>
              </div>
              <p className='mt-4 dark:text-white mb-11'>{review.content}</p>
              <Link href={`/profile/${review.authorUsername}`}>
                <div className='flex gap-4' id='user_rateus'>
                  <img
                    src={
                      review.authorImage ?? 'https://via.placeholder.com/150'
                    }
                    alt='Review author'
                    width={60}
                    height={60}
                    className='object-scale-down rounded-full h-[60px] w-[60px] aspect-square'
                  />
                  <div>
                    <p className='text-black heading4'>
                      {review.authorName ?? 'Unknown author'}
                    </p>
                    <span className='text-black dark:text-white'>
                      {review.authorPosition ?? 'Unknown position'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )
      })}
      <div className='flex justify-end mt-4 mr-8'>
        <span className='swiper-button-prev cursor-pointer !static'>
          <ArrowLeft />
        </span>
        <span className='swiper-button-next cursor-pointer !static'>
          <ArrowRight />
        </span>
      </div>
    </Swiper>
  )
}

export default RateUsSlides
