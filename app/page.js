import Hero from '@/components/Home/Hero'
import AboutUs from '@/components/Home/AboutUs'
import RateUs from '@/components/Home/RateUs'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <RateUs />
    </>
  )
}
