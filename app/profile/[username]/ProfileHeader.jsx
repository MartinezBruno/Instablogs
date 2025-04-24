import { BASE_URL } from '@/app/services/config'
import ProfileButtons from './ProfileButtons'

const getUserInfo = async (username) => {
  const res = await fetch(`${BASE_URL}/api/user/${username}`, {
    cache: 'no-cache'
  })
  const data = await res.json()
  return data
}

const ProfileHeader = async ({ username }) => {
  const userData = await getUserInfo(username)

  return (
    <div className='flex gap-3 lg:gap-10'>
      <img
        src={userData.image}
        alt={userData.name}
        width={140}
        height={140}
        className='h-auto w-10 self-start rounded-full md:w-20 lg:w-36'
      />
      <div className='flex flex-col gap-2 md:mt-5 lg:mt-8 lg:gap-6'>
        <h1 className='text-xl font-bold text-black md:text-3xl lg:text-[40px] dark:text-white'>
          {userData.fullname}
        </h1>
        {(userData.position || userData.bio) && (
          <p className='text-text_gray text-sm leading-[150%] font-semibold md:text-lg lg:text-2xl dark:text-white'>
            {userData.position && `${userData.position} |`} {userData.bio}
          </p>
        )}
        <ProfileButtons user={userData} />
      </div>
    </div>
  )
}

export default ProfileHeader
