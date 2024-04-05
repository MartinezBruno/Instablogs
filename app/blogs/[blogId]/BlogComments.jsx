import { BASE_URL } from '@/app/services/config'
import Link from 'next/link'

const getBlogComments = async (blogId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/posts/comments/${blogId}`, {
      cache: 'no-store'
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const BlogComments = async ({ blogId }) => {
  const comments = await getBlogComments(blogId)
  return (
    <>
      {comments.length >= 1
        ? (
        <div className='w-full lg:w-3/4 mx-auto transition-all duration-300 sm:px-14 md:px-28 flex flex-col justify-center items-start mt-5 gap-3'>
          <h3 className='text-2xl font-bold'>Comments</h3>
          <div className='border border-gray-200 w-full'>
            {comments.map((comment) => {
              const formattedComment = JSON.stringify(
                comment.content.replace(/\n/g, '<br/>')
              )
              return (
                <figure
                  key={comment.id}
                  className='flex flex-col items-start justify-center p-8 text-center bg-white border-b rounded-t-lg md:rounded-t-none md:rounded-tl-lg'>
                  <blockquote className='mb-4 text-gray-500 lg:mb-8'>
                    <p
                      className='my-4 text-start w-full'
                      style={{ wordBreak: 'break-word' }}
                      dangerouslySetInnerHTML={{
                        __html: JSON.parse(formattedComment)
                      }}></p>
                  </blockquote>
                  <figcaption className='w-full flex justify-end min-[460px]:justify-between items-end flex-wrap' id='user_comment'>
                    <Link href={`/profile/${comment.author.username}`}>
                      <div className='flex flex-wrap items-center justify-end space-x-3'>
                        <img
                          className='rounded-full w-9 h-9'
                          src={comment.author.image}
                          alt='profile picture'
                        />
                        <div className='space-y-0.5 font-medium text-end min-[460px]:text-left'>
                          <p>
                            {comment.author.fullname ?? 'Unknown author'}
                          </p>
                          <span className='text-sm text-gray-500'>
                            {comment.author.position ?? ''}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <span className='text-gray-500 flex items-center justify-center'>
                      {new Date(comment.createdAt).toDateString()}
                    </span>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
          )
        : (
        <div className='w-full lg:w-3/4 mx-auto transition-all duration-300 sm:px-14 md:px-28 flex flex-col justify-center items-start mt-5 gap-3'>
          <p className='mx-auto border-y py-8'>
            There is no comments for this blog, be the first to comment!
          </p>
        </div>
          )}
    </>
  )
}

export default BlogComments
