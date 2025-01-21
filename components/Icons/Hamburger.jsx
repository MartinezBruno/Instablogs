const HamburgerIcon = ({ toggleMenu }) => {
  return (
    <svg
      className='w-full h-auto text-gray-800 cursor-pointer hamburger'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 16 12'
      onClick={toggleMenu}
    >
      <path
        className="path"
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M1 1h14M1 6h14M1 11h7'
      />
    </svg>
  )
}

export default HamburgerIcon
