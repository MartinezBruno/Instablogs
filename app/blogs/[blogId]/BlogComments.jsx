import { BASE_URL } from '@/app/services/config'
import Link from 'next/link'

const getBlogComments = async blogId => {
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
            <div className='flex flex-col items-start justify-center w-full gap-3 mx-auto mt-5 transition-all duration-300 lg:w-3/4 sm:px-14 md:px-28'>
              <h3 className='text-2xl font-bold dark:text-white'>Comments</h3>
              <div className='w-full border border-gray-200'>
                {comments.map(comment => {
                  const formattedComment = JSON.stringify(comment.content.replace(/\n/g, '<br/>'))
                  return (
                    <figure
                      key={comment.id}
                      className='flex flex-col items-start justify-center p-8 text-center bg-white dark:bg-[#000000EB] border-b rounded-t-lg md:rounded-t-none md:rounded-tl-lg'
                    >
                      <blockquote className='mb-4 text-gray-500 dark:text-white lg:mb-8'>
                        <p
                          className='w-full my-4 text-start'
                          style={{ wordBreak: 'break-word' }}
                          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(formattedComment)
                          }}
                        />
                      </blockquote>
                      <figcaption
                        className='w-full flex justify-end min-[460px]:justify-between items-end flex-wrap'
                        id='user_comment'
                      >
                        <Link href={`/profile/${comment.author.username}`}>
                          <div className='flex flex-wrap items-center justify-end space-x-3'>
                            <img className='rounded-full w-9 h-9' src={comment.author.image} alt='profile' />
                            <div className='space-y-0.5 font-medium text-end min-[460px]:text-left'>
                              <p className='dark:text-white'>{comment.author.fullname ?? 'Unknown author'}</p>
                              <span className='text-sm text-gray-500 dark:text-white'>{comment.author.position ?? ''}</span>
                            </div>
                          </div>
                        </Link>
                        <span className='flex items-center justify-center text-gray-500 dark:text-white'>
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
            <div className='flex flex-col items-start justify-center w-full gap-3 mx-auto mt-5 transition-all duration-300 lg:w-3/4 sm:px-14 md:px-28'>
              <p className='py-8 mx-auto border-y dark:text-white'>
                There is no comments for this blog, be the first to comment!
              </p>
            </div>
          )}
    </>
  )
}

export default BlogComments
