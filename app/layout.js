/* eslint-disable camelcase */
import axios from 'axios'
import { Mulish, PT_Serif } from 'next/font/google'
import './globals.css'

import { BASE_URL } from '@/app/services/config'

import Provider from '@/components/Provider'
import Footer from '@/components/Static/Footer'
import Nav from '@/components/Static/Nav'
import { SpeedInsights } from '@vercel/speed-insights/next'

const muslish = Mulish({
  weight: ['400', '600', '700', '800'],
  styles: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-mulish'
})

// eslint-disable-next-line no-unused-vars
const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-pt-serif'
})

export const metadata = {
  title: 'InstaBlogs',
  description:
    'InstaBlogs is a platform for sharing your thoughts and ideas with the world. It is a place where you can share your knowledge and experience with others.'
}

if (process.env.NODE_ENV !== 'production') axios.defaults.baseURL = `${BASE_URL}/api`
else axios.defaults.baseURL = 'http://localhost:3000/api'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`h-screen ${muslish.className}`}>
        <Provider>
          <Nav />
          <main className='dark:bg-[rgba(0,0,0,0.52)]'>{children}</main>
          <SpeedInsights />
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
