const PageNotFound = () => {
  return (
    <div className='grid place-items-center gap-6 py-40 max-w-[374px] mx-auto'>
      <h1 className='heading1 !text-yellow dark:!text-purple'>Error 404...</h1>
      <p className='text-black dark:text-white text-xl leading-[163%]'>
        Do you want to join us or write blogs? Well... this is not the way :/
      </p>
      <img
        src='https://firebasestorage.googleapis.com/v0/b/instablogs-82a89.appspot.com/o/5516eb2fe1d9f10587651550f5724757.jpeg?alt=media&token=4fa7f4d9-e4f8-4259-b752-fc73022c4f5a'
        width={374}
        height={367}
        alt='404'
      />
    </div>
  )
}

export default PageNotFound
