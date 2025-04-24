import Arrow from '@/components/Icons/Arrow'
import data from '@/content/about-us.json'
import Link from 'next/link'

const featuredArticles = data.data

const AboutUs = () => {
  return (
    <section
      className='c-container flex scroll-mt-[104px] flex-col gap-16'
      id='about-us'
    >
      {featuredArticles.map((article, index) => (
        <article
          key={index}
          className={`${
            index % 2 ? 'flex self-end lg:flex-row-reverse' : 'flex lg:flex-row'
          } max-w-[442px] flex-col md:max-w-[650px] lg:max-w-none lg:gap-28`}
        >
          <img
            src={article.image}
            alt='Article cover image'
            loading='eager'
            className='h-full w-full object-cover md:max-w-[55%]'
          />
          <div className='basis-full'>
            <h2
              className={`${index % 2 && 'text-end'} text-yellow dark:text-purple my-3 text-xl font-extrabold lg:text-5xl`}
            >
              {article.title}
            </h2>
            <p className='text-justify text-sm leading-[140%] font-semibold tracking-[-0.26px] text-black md:text-base lg:text-xl dark:text-white'>
              {article.content.substring(0, 300)}...
            </p>
            <Link
              scroll={true}
              href={article.handle}
              className={`${
                index % 2 && 'justify-end'
              } mt-5 flex text-sm leading-[175%] font-bold underline dark:text-white`}
            >
              Learn more <Arrow />
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}

export default AboutUs
