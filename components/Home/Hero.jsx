import Image from 'next/image'

const Hero = () => {
  return (
    <section className='relative min-h-[687px] pt-16'>
      <div className='absolute inset-0 z-0 bg-[rgba(11,8,2,0.33)]'>
        <Image
          src='https://firebasestorage.googleapis.com/v0/b/instablogs-82a89.appspot.com/o/Banner-min.png?alt=media&token=addb78a5-1622-462a-96d8-bf08ed5ee7c2'
          alt='Hero image'
          priority
          loading='eager'
          width={1920}
          height={1080}
          className='relative -z-20 h-full w-full object-cover object-[top_0_left_-700px] sm:object-[top_0_left_-330px] md:object-[top_center] dark:z-0'
        />
      </div>
      <div className='c-container relative'>
        <div className='mx-auto mt-28 flex max-w-[515px] flex-col gap-8 md:mx-0'>
          <h1 className='heading1 break-words !text-white'>
            Instant collaboration for remote teams
          </h1>
          <p className='paragraph !text-white'>
            Join the InstaBlogs web, we would like to share information,
            contacts and experiences with you. Became part of our community of
            freelancers right now!
          </p>
          <form className='mt-12 flex flex-col gap-6 md:flex-row'>
            <input
              type='email'
              placeholder='Email'
              className='focus:border-blue rounded border-[2px] border-[rgba(11,8,2,0.33)] bg-white px-4 py-[13px] placeholder:text-black focus:outline-none dark:placeholder:text-white'
            />
            <button
              type='submit'
              className='bg-yellow dark:bg-purple hover:bg-yellow/90 hover:dark:bg-purple/90 rounded px-6 py-3 text-base leading-[150%] font-bold text-white transition-colors ease-in-out'
            >
              Get early access
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero
