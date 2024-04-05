'use client'

const error = () => {
  return (
    <div className='grid place-items-center gap-6 py-40 max-w-[500px] px-8 mx-auto'>
      <h1 className='heading1 text-yellow'>Oops, something went wrong buddy</h1>
      <p className='text-black text-xl leading-[163%]'>
        Looks like this post doesn&apos;t exist. It may have been deleted or the link is broken. <br />
        Feel free to try again but we can&apos;t promise anything.
      </p>
      <img
        src='https://khqlvuznkpdsactdscrc.supabase.co/storage/v1/object/sign/Images/Static%20Images/bob%201-min.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvU3RhdGljIEltYWdlcy9ib2IgMS1taW4ucG5nIiwiaWF0IjoxNjkzNTAyODAyLCJleHAiOjI2OTM1MDI4MDF9.j1QKSGVbJxETYmmP-ORjAsz_DGwBNicOx_UlcUbCtiE&t=2023-08-31T17%3A26%3A46.607Z'
        width={500}
        height={'auto'}
        alt='404'
      />
    </div>
  )
}

export default error
