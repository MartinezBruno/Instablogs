import ProfileBlogs from './ProfileBlogs'

const Profile = async ({ params }) => {
  const { username } = params
  return (
    <section className=''>
      <ProfileBlogs username={username}/>
    </section>
  )
}

export default Profile
