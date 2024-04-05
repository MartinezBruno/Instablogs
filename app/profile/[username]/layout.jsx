import ProfileHeader from './ProfileHeader'

const layout = async ({ children, params }) => {
  const { username } = params
  return (
    <section className='c-container mt-28'>
      <ProfileHeader username={username}/>
      {children}
    </section>
  )
}

export default layout
