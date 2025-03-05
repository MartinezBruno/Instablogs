import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import HorizontalDots from '../Icons/HorizontalDots'
import styles from './BlogCard.module.css'

const BlogCard = ({ blog, userId }) => {
  const { data: session } = useSession()

  return (
    <article className='swiper-card rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] dark:bg-[#000000] dark:shadow-[0px_4px_30px_0px_#00000040]'>
      {session?.user?.id === userId && userId !== undefined && (
        <HorizontalDots blogId={blog.id} />
      )}
      {blog.banner && (
        <Link href={`/blogs/${blog.id}`}>
          <div className='flex flex-[1_0_100%] overflow-hidden rounded-lg'>
            <Image
              src={blog.banner}
              width={400}
              height={400}
              loading='lazy'
              alt={blog.title}
              className='blog-img aspect-square h-full w-full object-cover object-center'
            />
          </div>
        </Link>
      )}
      <div className='p-5'>
        <h2 className='mb-2 h-[2.6em] truncate text-xl whitespace-normal sm:whitespace-nowrap lg:text-2xl dark:text-white'>
          {blog.title}
        </h2>
        <p className={`${styles.blog_content} dark:text-white`}>
          {blog.content}
        </p>
        <div className='mt-11 flex items-center justify-start gap-2'>
          <img
            src={blog.authorImage ?? 'https://via.placeholder.com/150'}
            width={40}
            height={40}
            alt='user photo'
            className='rounded-full'
          />
          <span className='text-text_gray text-sm font-semibold dark:text-white'>
            {blog.authorName ?? 'Unknown author'}{' '}
            <span className='hidden md:inline-block'>
              {' '}
              | {new Date(blog.createdAt).toDateString()}
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
