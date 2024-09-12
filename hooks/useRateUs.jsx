import { useEffect, useState } from 'react'

export default function useRateUs() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const checkRateUs = () => {
      const rateObj = JSON.parse(window.localStorage.getItem('rateUs'))
      if (!rateObj) return true

      const { rateDate } = rateObj
      const today = new Date().toDateString()

      console.log({ rateDate, today })

      // if the rate date was 1 week ago, show the rate us popup
      return today === rateDate
    }

    setShow(checkRateUs())
  }, [])

  return { show }
}
