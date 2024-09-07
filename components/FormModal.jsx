const FormModal = ({ closeModal, handleChange, handleSubmit, userInfo }) => {
  return (
    <div
      id='authentication-modal'
      className='fixed inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-transparent/25 dark:bg-transparent/40 flex justify-center items-center'
    >
      <div className="fixed inset-0 content-[' ']" onClick={closeModal} />
      <div className='relative w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow dark:bg-[#000000]'>
          <button
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 dark:hover:bg-red-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center'
            onClick={closeModal}
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
              Edit your profile
            </h3>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='fullname'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='fullname'
                  id='fullname'
                  className='bg-gray-50 dark:bg-[#DADADA57] border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  autoComplete='off'
                  value={userInfo.fullname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor='biography'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Bio
                </label>
                <input
                  type='text'
                  name='bio'
                  id='biography'
                  className='bg-gray-50 dark:bg-[#DADADA57] border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  autoComplete='off'
                  value={userInfo.bio}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor='position'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Position
                </label>
                <input
                  type='text'
                  name='position'
                  id='position'
                  className='bg-gray-50 dark:bg-[#DADADA57] border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  autoComplete='off'
                  value={userInfo.position}
                  onChange={handleChange}
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-yellow dark:bg-purple hover:brightness-75 transition-all ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Edit your profile info
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormModal
