const starSvg = ({ isActive })=> {
  return (
    <svg
      width='54'
      height='51'
      viewBox='0 0 54 51'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='transition-all cursor-pointer'
    >
      <path
        d='M27.1221 1.88658L32.854 19.5277L32.9849 19.9305H33.4085H51.9574L36.951 30.8333L36.6083 31.0823L36.7392 31.4851L42.4712 49.1262L27.4647 38.2234L27.1221 37.9744L26.7794 38.2234L11.773 49.1262L17.5049 31.4851L17.6358 31.0823L17.2931 30.8333L2.28673 19.9305H20.8357H21.2592L21.3901 19.5277L27.1221 1.88658Z'
        fill={isActive ? '#FBB500' : 'white'}
        stroke='#FBB500'
        strokeWidth='1.16597'
      />
    </svg>
  )
}

export default starSvg
