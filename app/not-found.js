const PageNotFound = () => {
  return (
    <div className='grid place-items-center gap-6 py-40 max-w-[374px] mx-auto'>
      <h1 className='heading1 !text-yellow dark:!text-purple'>Error 404...</h1>
      <p className='text-black dark:text-white text-xl leading-[163%]'>
        Do you want to join us or write blogs? Well... this is not the way :/
      </p>
      <img
        src='/images/not-found.jpg'
        width={374}
        height={367}
        alt='404'
      />
    </div>
  )
}

export default PageNotFound
