const Stars = ({ rating }) => {
  const filledStars = Array.from({ length: rating }, (_, index) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      key={index}
      fill='none'
      className='w-auto h-auto'
    >
      <path
        d='M12 17.5196L16.15 20.0296C16.91 20.4896 17.84 19.8096 17.64 18.9496L16.54 14.2296L20.21 11.0496C20.88 10.4696 20.52 9.36964 19.64 9.29964L14.81 8.88964L12.92 4.42964C12.58 3.61964 11.42 3.61964 11.08 4.42964L9.19001 8.87964L4.36001 9.28964C3.48001 9.35964 3.12001 10.4596 3.79001 11.0396L7.46001 14.2196L6.36001 18.9396C6.16001 19.7996 7.09001 20.4796 7.85001 20.0196L12 17.5196Z'
        fill='#FFBB00'
        className='dark:fill-purple'
      />
    </svg>
  ))
  const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      key={index}
      stroke='gray'
      fill='none'
      className='w-auto h-auto'
    >
      <path
        d='M12 17.5196L16.15 20.0296C16.91 20.4896 17.84 19.8096 17.64 18.9496L16.54 14.2296L20.21 11.0496C20.88 10.4696 20.52 9.36964 19.64 9.29964L14.81 8.88964L12.92 4.42964C12.58 3.61964 11.42 3.61964 11.08 4.42964L9.19001 8.87964L4.36001 9.28964C3.48001 9.35964 3.12001 10.4596 3.79001 11.0396L7.46001 14.2196L6.36001 18.9396C6.16001 19.7996 7.09001 20.4796 7.85001 20.0196L12 17.5196Z'
        fill='none'
      />
    </svg>
  ))

  return (
    <div className='flex'>
      {filledStars}
      {emptyStars}
    </div>
  )
}

export default Stars
