const PageNotFound = () => {
  return (
    <div className='grid place-items-center gap-6 py-40 max-w-[374px] mx-auto'>
      <h1 className='heading1 text-yellow dark:text-purple'>Error 404...</h1>
      <p className='text-black dark:text-white text-xl leading-[163%]'>
        Do you want to join us or write blogs? Well... this is not the way :/
      </p>
      <img
        src='https://khqlvuznkpdsactdscrc.supabase.co/storage/v1/object/sign/Images/Static%20Images/bob%201-min.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvU3RhdGljIEltYWdlcy9ib2IgMS1taW4ucG5nIiwiaWF0IjoxNjkzNTAyODAyLCJleHAiOjI2OTM1MDI4MDF9.j1QKSGVbJxETYmmP-ORjAsz_DGwBNicOx_UlcUbCtiE&t=2023-08-31T17%3A26%3A46.607Z'
        width={374}
        height={367}
        alt='404'
      />
    </div>
  )
}

export default PageNotFound
