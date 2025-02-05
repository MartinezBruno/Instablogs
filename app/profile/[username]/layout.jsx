import ProfileHeader from './ProfileHeader'

const layout = async ({ children, params }) => {
  const { username } = await params
  return (
    <section className='c-container !pt-36'>
      <ProfileHeader username={username} />
      {children}
    </section>
  )
}

export default layout
