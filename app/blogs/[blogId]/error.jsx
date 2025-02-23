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
        src='https://firebasestorage.googleapis.com/v0/b/instablogs-82a89.appspot.com/o/5516eb2fe1d9f10587651550f5724757.jpeg?alt=media&token=4fa7f4d9-e4f8-4259-b752-fc73022c4f5a'
        width={500}
        height={'auto'}
        alt='404'
      />
    </div>
  )
}

export default error
