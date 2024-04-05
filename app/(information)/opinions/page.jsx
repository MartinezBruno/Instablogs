import Information from '@/components/Static/Information'
import data from '@/content/about-us.json'

const page = () => {
  const article = data.data[1]
  return <Information article={article} />
}

export default page
