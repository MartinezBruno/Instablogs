import { useEffect, useState } from 'react'

export default function useRateUs() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const checkRateUs = () => {
      const rateObj = JSON.parse(window.localStorage.getItem('rateUs'))
      if (!rateObj) return true

      const { rateDate } = rateObj

      const [rateDay, rateMonth, rateYear] = rateDate.split('/').map(Number)
      const expirationDate = new Date(rateYear, rateMonth - 1, rateDay)

      const today = new Date()

      console.log({
        today,
        expirationDate,
        bool: today >= expirationDate
      })

      return today >= expirationDate
    }

    setShow(checkRateUs())
  }, [])

  return { show }
}
