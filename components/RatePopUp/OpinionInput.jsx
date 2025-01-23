const OpinionInput = ({ handleOpinion }) => {
  return (
    <input
      required
      type='text'
      placeholder='Your opinion here...'
      className='w-full h-10 p-2 border-[2px] border-gray md:min-w-[420px] max-w-[460px] border-gray-300 rounded-md dark:text-white dark:bg-[#000] dark:border-white !border-solid'
      onChange={handleOpinion}
    />
  )
}

export default OpinionInput
