import { BASE_URL } from '@/app/services/config'
import ProfileBlogsGrid from './ProfileBlogsGrid'

const getUserBlogs = async username => {
  const res = await fetch(`${BASE_URL}/api/posts/user/${username}`, {
    // next: { revalidate: 300 }
    cache: 'no-cache'
  })
  const userBlogs = await res.json()
  return userBlogs
}
const getUserInfo = async username => {
  const res = await fetch(`${BASE_URL}/api/user/${username}`, {
    cache: 'no-cache'
  })
  const userData = await res.json()
  return userData
}

const ProfileBlogs = async ({ username }) => {
  let userBlogs = []
  let userData = []
  try {
    ;[userBlogs, userData] = await Promise.all([getUserBlogs(username), getUserInfo(username)])
  } catch (error) {
    console.error(error)
  }

  return (
    <div className='mt-3 md:mt-10'>
      <h3 className='font-bold text-xl md:text-3xl lg:text-[40px] mb-3 dark:text-white'>Posts</h3>
      <ProfileBlogsGrid blogs={userBlogs} user={userData} />
    </div>
  )
}

export default ProfileBlogs
