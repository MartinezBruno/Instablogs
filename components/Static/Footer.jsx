import Link from 'next/link'
import ThemeToggle from '../Theme.util'
import styles from './Footer.module.css'

const companyLinks = [
  {
    name: 'About Us',
    link: '/#about-us'
  },
  {
    name: 'Blogs',
    link: '/blogs'
  },
  {
    name: 'Support',
    link: '/#support'
  }
]
const customerServiceLinks = [
  {
    name: 'Terms & Conditions',
    link: '/terms-and-conditions'
  },
  {
    name: 'Privacy Policy',
    link: '/privacy-policy'
  }
]
const contactUsData = ['info@instablogs.com', '1-800-200-300', '1010 Sunset Blv. Palo Alto, CA United States']

const Footer = () => {
  return (
    <footer className='bg-yellow dark:bg-purple'>
      <div className='flex flex-col flex-wrap gap-6 c-container lg:flex-row'>
        <div className={`pb-12 gap-4 ${styles.column_container}`}>
          <Link href='/' title='Instablogs' className='basis-[20%]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='500'
              height='100'
              viewBox='0 0 189 338'
              fill='none'
              className='w-[25px] h-[52px] md:w-[50px] md:h-[104px]'
            >
              <path
                d='M150 24.576H52.2235C41.105 24.576 32.0917 32.4399 32.0917 42.1406V270.638C32.0917 280.339 41.105 288.203 52.2235 288.203H150C161.118 288.203 170.132 280.339 170.132 270.638V42.1406C170.132 32.4399 161.118 24.576 150 24.576Z'
                stroke='white'
                strokeWidth='1.97919'
                strokeMiterlimit='10'
              />
              <path
                d='M49.9329 278.485V272.529C55.4105 269.927 61.025 268.283 66.7765 267.599V145.791C64.0377 145.243 61.2305 144.559 58.3547 143.737C55.479 142.778 52.6717 141.751 49.9329 140.656V134.699H71.7063C74.3082 134.699 76.7731 134.63 79.1011 134.493C81.566 134.357 84.0994 134.22 86.7012 134.083C89.3031 133.946 92.1103 133.809 95.123 133.672C98.1357 133.535 101.559 133.466 105.393 133.466C110.871 133.466 116.417 133.946 122.032 134.904C127.783 135.726 132.918 137.369 137.437 139.834C142.093 142.299 145.859 145.791 148.735 150.31C151.611 154.692 153.048 160.444 153.048 167.564C153.048 171.125 152.501 174.685 151.405 178.246C150.31 181.806 148.598 185.161 146.27 188.311C144.079 191.323 141.272 193.994 137.848 196.322C134.425 198.65 130.385 200.361 125.729 201.457V202.279C129.837 202.963 133.877 204.127 137.848 205.771C141.956 207.414 145.585 209.673 148.735 212.549C151.884 215.288 154.418 218.711 156.335 222.819C158.389 226.928 159.416 231.857 159.416 237.609C159.416 245.004 157.773 251.371 154.486 256.712C151.2 262.053 146.886 266.435 141.545 269.858C136.342 273.282 130.385 275.815 123.675 277.458C116.965 278.965 110.186 279.718 103.339 279.718C98.5465 279.718 93.1374 279.512 87.112 279.102C81.0867 278.691 75.2668 278.485 69.6522 278.485H49.9329ZM104.777 269.037C109.707 269.037 114.295 268.283 118.54 266.777C122.922 265.271 126.619 263.217 129.632 260.615C132.781 257.876 135.246 254.658 137.026 250.961C138.807 247.126 139.697 243.018 139.697 238.636C139.697 233.158 138.601 228.639 136.41 225.079C134.356 221.382 131.48 218.506 127.783 216.452C124.223 214.261 120.046 212.754 115.253 211.933C110.597 211.111 105.736 210.7 100.669 210.7H85.2633V267.393C87.1805 267.941 89.44 268.352 92.0419 268.626C94.7806 268.9 99.0258 269.037 104.777 269.037ZM95.5338 200.019C97.8618 200.019 100.601 199.951 103.75 199.814C107.037 199.54 109.707 199.266 111.761 198.992C118.06 196.801 123.196 193.309 127.167 188.516C131.275 183.586 133.329 177.835 133.329 171.262C133.329 162.224 130.59 155.445 125.113 150.926C119.772 146.407 112.583 144.148 103.545 144.148C99.2996 144.148 95.6708 144.216 92.6581 144.353C89.6454 144.49 87.1805 144.695 85.2633 144.969V200.019H95.5338Z'
                fill='white'
              />
              <path
                d='M62.9177 215H9.93437V208.998C15.3155 206.514 20.8346 204.859 26.4917 204.031V81.2999C23.7321 80.748 20.9726 80.0581 18.213 79.2303C15.4535 78.2644 12.6939 77.2296 9.93437 76.1258V70.1238H62.9177V76.1258C60.4341 77.2296 57.7435 78.2644 54.846 79.2303C51.9485 80.0581 49.1199 80.748 46.3604 81.2999V204.031C49.2579 204.583 52.1554 205.273 55.053 206.1C57.9505 206.928 60.5721 207.894 62.9177 208.998V215Z'
                fill='white'
              />
            </svg>
          </Link>
          <div className='flex flex-col w-fit'>
            <h4 className={styles.column_header}>Company</h4>
            <ul>
              {companyLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.link} className={styles.column_link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col w-fit'>
            <h4 className={styles.column_header}>Contact Us</h4>
            <ul>
              {contactUsData.map((data, index) => (
                <li key={index} className={styles.column_link}>
                  {data}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col w-fit'>
            <h4 className={styles.column_header}>Customer Service</h4>
            <ul>
              {customerServiceLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.link} className={styles.column_link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='sm:col-span-full sm:max-w-[40%] md:col-span-1 md:max-w-none'>
            <h4 className={styles.column_header}>Stay up to date</h4>
            <form className='flex flex-col'>
              <label className={styles.column_link}>Subscribe to our newsletter</label>
              <input
                type='email'
                className='py-[6.5px] px-2 border-[2px] border-yellow rounded placeholder:text-yellow dark:placeholder:text-purple focus:outline-none focus:border-blue'
                placeholder='Email'
              />
            </form>
          </div>
        </div>
        <div className='flex items-center justify-between w-full'>
          <span className='text-white text-sm leading-4 flex-[1_0_50%]'>
            Designed and Developed by Martina and Bruno with a lot of ☕ and ❤️
          </span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}

export default Footer
