import Link from 'next/link'
import Close from './Icons/Close'

const MobileNav = ({ isActive, handleClose }) => {
  return (
    <div
      className={
        isActive
          ? 'absolute -top-[0.75rem] -left-[0.75rem] p-4 w-full h-screen bg-white z-10 translate-x-0 transition-all duration-500'
          : 'absolute -translate-x-96 transition-all h-0 duration-500'
      }>
      <Close handleClose={handleClose} />
      <div className='flex flex-col mt-5 w-full relative'>
        <Link
          href={'#about-us'}
          className='nav-link'>
          About us
        </Link>
        <Link
          href={'#support'}
          className='nav-link'>
          Support
        </Link>
        <Link
          href={'/blog'}
          className='nav-link'>
          Blog
        </Link>
      </div>
    </div>
  )
}

export default MobileNav
