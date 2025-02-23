import ProfileBlogs from './ProfileBlogs'

const Profile = async ({ params }) => {
  const { username } = await params
  return <ProfileBlogs username={username} />
}

export default Profile
