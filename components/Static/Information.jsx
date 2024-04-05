const Information = ({ article }) => {
  return (
    <section className='c-container mt-28 flex lg:flex-row self-end flex-col max-w-[442px] md:max-w-[650px] lg:max-w-none lg:gap-28 scroll-mt-[104px]'>
      <img
        src={article.image}
        alt='Article cover image'
        loading='eager'
        className='object-cover w-full lg:max-w-[44%] h-full'
      />
      <div className='basis-full'>
        <h2 className='text-xl lg:text-5xl font-extrabold text-yellow dark:text-purple my-3'>
          {article.title}
        </h2>
        <p className='text-black dark:text-white font-semibold text-justify leading-[140%] tracking-[-0.26px] text-sm md:text-base lg:text-xl'>
          {article.content}
        </p>
      </div>
    </section>
  )
}

export default Information
