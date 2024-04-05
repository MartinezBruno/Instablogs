'use client'

import { signIn } from 'next-auth/react'

const SignIn = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-4'>Sign in to create a blog</h1>
      <button onClick={() => signIn('google')} className='text-base text-white font-bold leading-[150%] rounded-[5px] py-2 px-3 bg-yellow hover:px-12 transition-[padding] ease-in-out'>
        Sign in
      </button>
    </div>
  )
}

export default SignIn
