const Information = ({ article }) => {
  return (
    <section className='c-container flex max-w-[442px] scroll-mt-[104px] flex-col self-end lg:flex-row lg:gap-28'>
      <img
        src={article.image}
        alt='Article cover'
        loading='eager'
        className='h-full w-full object-cover lg:max-w-[44%]'
      />
      <div className='basis-full'>
        <h2 className='text-yellow dark:text-purple my-3 text-xl font-extrabold lg:text-5xl'>
          {article.title}
        </h2>
        <p className='text-justify text-sm leading-[140%] font-semibold tracking-[-0.26px] text-black md:text-base lg:text-xl dark:text-white'>
          {article.content}
        </p>
      </div>
    </section>
  )
}

export default Information
