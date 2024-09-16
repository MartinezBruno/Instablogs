import { BASE_URL } from '@/app/services/config'
import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'

const getBlogDetail = async (blogId) => {
  const res = await fetch(`${BASE_URL}/api/posts/${blogId}`, {
    next: { revalidate: 5 } // Reduced revalidation time to 5 seconds
    // cache: 'no-cache'
  })
  const data = await res.json()
  return data
}

const BlogDetail = async ({ blogId }) => {
  const blogDetail = await getBlogDetail(blogId)
  const formattedContent = JSON.stringify(
    blogDetail.content.replace(/\n/g, '<br/>')
  )
  return (
    <article className='flex flex-col items-center' id='blog_article'>
      <h1
        className='text-2xl font-extrabold text-center md:text-5xl dark:text-white'
        style={{ textWrap: 'balance' }}
      >
        {blogDetail.title}
      </h1>
      <div className='flex items-center justify-start gap-2 my-3'>
        <Link
          href={`/profile/${blogDetail.authorUsername}`}
          className='flex items-center justify-start gap-3 transition-opacity hover:opacity-70'
        >
          <img
            src={blogDetail.authorPic}
            width={40}
            height={40}
            alt='user photo'
            className='rounded-full'
          />
          <span className='text-sm font-semibold text-text_gray'>
            {blogDetail.authorName} |{' '}
          </span>
        </Link>
        <span className='text-sm font-semibold text-text_gray'>
          {new Date(blogDetail.createdAt).toDateString()}
        </span>
      </div>
      <OptimizedImage src={blogDetail.banner} alt={blogDetail.title} />
      {/* <img
        src={blogDetail.banner}
        width={1920}
        height={768}
        alt={blogDetail.title}
        className='object-cover w-full max-w-[1000px] max-h-[470px] mb-9'
      /> */}
      <div className='w-full transition-all duration-300 lg:w-3/4 sm:px-14 md:px-28 mt-7'>
        <p
          className='text-text_gray md:text-lg lg:text-xl leading-[130%] break-words dark:text-white'
          dangerouslySetInnerHTML={{
            __html: JSON.parse(formattedContent)
          }}
        ></p>
        <hr className='my-5 mx-7 dark:text-white' />
      </div>
      <div className='flex gap-4'>
        <img
          src={blogDetail.authorPic}
          width={40}
          height={40}
          alt='user'
          className='rounded-full max-w-[40px] max-h-[40px]'
        />
        <div className='flex flex-col'>
          <span className='text-[#BBC8C4] font-bold tracking-[1.6px] uppercase text-base'>
            Written By
          </span>
          <span className='text-[#25313C] dark:text-white text-sm md:text-2xl font-normal'>
            {blogDetail.authorName}
          </span>
          <span className='dark:text-white'>{blogDetail.authorPos}</span>
        </div>
      </div>
    </article>
  )
}

export default BlogDetail
