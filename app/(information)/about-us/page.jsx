import Information from '@/components/Static/Information'
import data from '@/content/about-us.json'

const InfoPage = () => {
  const article = data.data[0]
  return <Information article={article} />
}

export default InfoPage
