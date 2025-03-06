import { useState } from 'react'

function useImageToBase64() {
  const [base64, setBase64] = useState(null)

  const convertImageToBase64 = async (imageBlob) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      alert('Image converted to base64')
      setBase64(reader.result.split(',')[1]) // Remove metadata
    }

    reader.readAsDataURL(imageBlob)

    const promise = new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1])
        setBase64(reader.result.split(',')[1])
      }
    })

    await promise
    return base64
  }

  return { base64, convertImageToBase64 }
}

export default useImageToBase64
