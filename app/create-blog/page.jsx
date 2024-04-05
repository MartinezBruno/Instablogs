import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import CreateBlogForm from './CreateBlogForm'
import SignIn from './SignIn'

const CreateBlog = async () => {
  const session = await getServerSession(authOptions)
  return (
    <section className='c-container mt-28 min-h-[60%]'>
      {!session?.user
        ? (
        <div className='h-full grid place-content-center'>
          <SignIn />
        </div>
          )
        : (
        <CreateBlogForm user={session.user}/>
          )}
    </section>
  )
}

export default CreateBlog
