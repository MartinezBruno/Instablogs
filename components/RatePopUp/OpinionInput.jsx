const OpinionInput = ({ handleOpinion }) => {
  return (
    <input
      required
      type='text'
      className='w-full h-10 p-2 mt-4 border border-gray-300 rounded-md dark:text-white'
      onChange={handleOpinion}
    />
  )
}

export default OpinionInput
