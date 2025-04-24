'use client'

import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Grid, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import BlogCard from '@/components/Blogs/BlogCard'
import './BlogsSwiper.css'

const BlogsSwiper = ({ blogs }) => {
  const slidesPerView = 2
  return (
    <Swiper
      className='rounded-lg !px-5 !pt-4 !pb-20'
      modules={[Navigation, Pagination, Grid]}
      spaceBetween={25}
      slidesPerView={1.1}
      breakpoints={{
        780: {
          slidesPerView,
          spaceBetween: 45
        },
        1200: {
          slidesPerView: slidesPerView + 1
        }
      }}
      pagination={{
        type: 'fraction'
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
      grid={{
        fill: 'row',
        rows: 2
      }}
    >
      {blogs?.map((blog) => (
        <SwiperSlide
          key={blog.id}
          className='mr-5 !flex max-w-[380px] flex-col gap-3'
        >
          <BlogCard blog={blog} />
        </SwiperSlide>
      ))}
      <div className='swiper-button-next'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='41'
          height='41'
          viewBox='0 0 41 41'
          fill='none'
          className='h-auto w-full'
        >
          <path
            d='M8.89827 22.2083H27.9804L19.6437 30.545C18.9774 31.2112 18.9774 32.3046 19.6437 32.9708C20.3099 33.6371 21.3862 33.6371 22.0524 32.9708L33.3104 21.7129C33.9766 21.0466 33.9766 19.9704 33.3104 19.3041L22.0695 8.02914C21.7504 7.70925 21.317 7.52948 20.8651 7.52948C20.4133 7.52948 19.9799 7.70925 19.6608 8.02914C18.9945 8.69539 18.9945 9.77164 19.6608 10.4379L27.9804 18.7916H8.89827C7.95869 18.7916 7.18994 19.5604 7.18994 20.5C7.18994 21.4396 7.95869 22.2083 8.89827 22.2083Z'
            fill='#25313C'
          />
        </svg>
      </div>
      <div className='swiper-button-prev'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='41'
          height='41'
          viewBox='0 0 41 41'
          fill='none'
          className='h-auto w-full'
        >
          <path
            d='M32.1017 18.8002H13.0196L21.3563 10.4635C22.0225 9.79727 22.0225 8.70394 21.3563 8.03769C21.0371 7.7178 20.6038 7.53802 20.1519 7.53802C19.7 7.53802 19.2667 7.7178 18.9475 8.03769L7.68963 19.2956C7.02338 19.9619 7.02338 21.0381 7.68963 21.7044L18.9475 32.9623C19.6138 33.6285 20.69 33.6285 21.3563 32.9623C22.0225 32.296 22.0225 31.2198 21.3563 30.5535L13.0196 22.2169H32.1017C33.0413 22.2169 33.81 21.4481 33.81 20.5085C33.81 19.5689 33.0413 18.8002 32.1017 18.8002Z'
            fill='#25313C'
          />
        </svg>
      </div>
    </Swiper>
  )
}

export default BlogsSwiper
