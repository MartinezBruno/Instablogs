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
      {reviews?.map((review, index) => (
        <SwiperSlide
          key={index}
          className='cursor-grab rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border dark:border-none dark:bg-[#000000]'
        >
          <div className='flex flex-col m-10'>
            <Stars rating={review.rating} />
            <p className='mt-4 mb-11 dark:text-white'>{review.content}</p>
            <Link href={`/profile/${review.authorUsername}`}>
              <div className='flex gap-4 max-h-[60px]' id='user_rateus'>
                <img
                  src={review.authorImage ?? 'https://via.placeholder.com/150'}
                  alt='Review author image'
                  width={60}
                  height={60}
                  className='rounded-full'
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
      ))}
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
