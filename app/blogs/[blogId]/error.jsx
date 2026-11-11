'use client'

const error = () => {
  return (
    <div className='mx-auto grid max-w-[500px] place-items-center gap-6 px-8 py-40'>
      <h1 className='heading1 text-yellow'>Oops, something went wrong buddy</h1>
      <p className='text-xl leading-[163%] text-black'>
        Looks like this post doesn&apos;t exist. It may have been deleted or the
        link is broken. <br />
        Feel free to try again but we can&apos;t promise anything.
      </p>
      <img
        src='/images/not-found.jpg'
        width={500}
        height={'auto'}
        alt='404'
      />
    </div>
  )
}

export default error
