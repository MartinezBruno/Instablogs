import React from 'react'

const OpinionInput = ({ handleOpinion }) => {
  return (
    <div>
      <input type='text' required onChange={handleOpinion} />
    </div>
  )
}

export default OpinionInput
