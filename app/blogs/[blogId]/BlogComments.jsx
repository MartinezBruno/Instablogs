import { BASE_URL } from '@/app/services/config'
import { REM } from 'next/font/google'
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
      {comments.length >= 1 ? (
        <div className='mx-auto mt-5 flex w-full flex-col items-start justify-center gap-3 transition-all duration-300 sm:px-14 md:px-28 lg:w-3/4'>
          <h3 className='text-2xl font-bold dark:text-white'>Comments</h3>
          <div className='w-full'>
            {comments.map((comment, index) => {
              const formattedComment = JSON.stringify(
                comment.content.replace(/\n/g, '<br/>')
              )
              const replies = comment.replies

              console.log(replies)

              return (
                <div key={comment.id} className='w-full'>
                  {/* Main comment */}

                  <figure
                    className={`flex flex-col items-start justify-center border-2 bg-white p-8 text-center dark:border-white dark:bg-[#000000EB] ${replies.length === 0 ? 'border-b-0' : ''} ${comments.length === index + 1 ? '!border-b-2' : ''} `}
                  >
                    <figcaption
                      className='flex w-full flex-wrap items-center justify-end min-[460px]:justify-between'
                      id='user_comment'
                    >
                      <Link href={`/profile/${comment.author.username}`}>
                        <div className='flex flex-wrap items-center justify-end space-x-3'>
                          <img
                            className='h-9 w-9 rounded-full'
                            src={comment.author.image}
                            alt='profile'
                          />
                          <div className='space-y-0.5 text-end font-medium min-[460px]:text-left'>
                            <p className='dark:text-white'>
                              {comment.author.fullname ?? 'Unknown author'}
                            </p>
                            <span className='text-sm text-gray-500 dark:text-white'>
                              {comment.author.position ?? ''}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <span className='flex items-center justify-center text-gray-500 dark:text-white'>
                        {new Date(comment.createdAt).toDateString()}
                      </span>
                    </figcaption>
                    <blockquote className='mb-4 text-gray-500 lg:mb-8 dark:text-white'>
                      <p
                        className='my-4 w-full text-start'
                        style={{ wordBreak: 'break-word' }}
                        dangerouslySetInnerHTML={{
                          __html: JSON.parse(formattedComment)
                        }}
                      />
                    </blockquote>
                  </figure>

                  {/* Replies */}
                  <div className='ml-8 pl-4'>
                    {replies.map((reply, index) => {
                      const formattedReply = JSON.stringify(
                        reply.content.replace(/\n/g, '<br/>')
                      )
                      return (
                        <figure
                          key={reply.id}
                          className={`flex flex-col space-y-2 border-2 border-t-0 p-8 dark:border-white dark:bg-[#000000EB] ${replies.length === index + 1 ? 'border-b-0' : ''}`}
                        >
                          <figcaption className='flex w-full flex-wrap items-center justify-end min-[460px]:justify-between'>
                            <Link href={`/profile/${reply.author.username}`}>
                              <div className='flex flex-wrap items-center space-x-3'>
                                <img
                                  className='h-7 w-7 rounded-full'
                                  src={reply.author.image}
                                  alt='profile'
                                />
                                <div className='text-end font-medium min-[460px]:text-left'>
                                  <p className='text-sm dark:text-white'>
                                    {reply.author.fullname ?? 'Unknown author'}
                                  </p>
                                  <span className='text-xs text-gray-500 dark:text-white'>
                                    {reply.author.position ?? ''}
                                  </span>
                                </div>
                              </div>
                            </Link>
                            <span className='text-xs text-gray-500 dark:text-white'>
                              {new Date(reply.createdAt).toDateString()}
                            </span>
                          </figcaption>
                          <blockquote className='text-gray-500 dark:text-white'>
                            <p className='my-2'>{formattedReply}</p>
                          </blockquote>
                        </figure>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className='mx-auto mt-5 flex w-full flex-col items-start justify-center gap-3 transition-all duration-300 sm:px-14 md:px-28 lg:w-3/4'>
          <p className='mx-auto border-y py-8 dark:text-white'>
            There is no comments for this blog, be the first to comment!
          </p>
        </div>
      )}
    </>
  )
}

export default BlogComments
