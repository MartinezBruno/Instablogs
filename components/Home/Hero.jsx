import Image from 'next/image'

const Hero = () => {
  return (
    <section className='relative min-h-[687px] pt-16'>
      <div className='bg-[rgba(11,8,2,0.33)] absolute inset-0'>
        <Image
          src='https://khqlvuznkpdsactdscrc.supabase.co/storage/v1/object/sign/Images/Static%20Images/Banner-min.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvU3RhdGljIEltYWdlcy9CYW5uZXItbWluLnBuZyIsImlhdCI6MTY5MzUwMjc2MCwiZXhwIjoyNjkzNTAyNzU5fQ.cDGtR2g-ALhDJI1GJsm23hwb7R1rspQY5I6Mfp372AM&t=2023-08-31T17%3A26%3A04.930Z'
          alt='Hero image'
          priority
          loading='eager'
          width={1920}
          height={1080}
          className='object-cover object-[top_0_right_-400px] md:object-[top_center] w-full h-full relative -z-20'
        />
      </div>
      <div className='c-container relative'>
        <div className='flex flex-col gap-8 max-w-[515px] mx-auto md:mx-0 mt-28'>
          <h1 className='heading1 text-white break-words'>Instant collaboration for remote teams</h1>
          <p className='paragraph text-white'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <form className='flex flex-col md:flex-row gap-6 mt-12'>
            <input
              type='email'
              placeholder='Email'
              className='py-[13px] px-4 border-[2px] border-[rgba(11,8,2,0.33)] rounded placeholder:text-black focus:outline-none focus:border-blue'
            />
            <button
              type='submit'
              className='text-white text-base font-bold leading-[150%] bg-yellow rounded px-6 py-3 hover:bg-yellow/90 transition-colors ease-in-out'>
              Get early access
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero
