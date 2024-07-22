'use client'

import { useState, useEffect } from 'react'

import Script from 'next/script'

import './ThemeSwitch.css'

export default function SetTheme() {
  const [theme, setTheme] = useState()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const maybeTheme = () => {
    const themeLocalStorage = localStorage.getItem('theme')
    const themeSystem = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'

    return themeLocalStorage ?? themeSystem
  }

  useEffect(() => {
    document.querySelector(':root').dataset.theme = theme ?? maybeTheme()
    localStorage.setItem('theme', theme ?? maybeTheme())
    setTheme(theme ?? maybeTheme())

    const useSetTheme = (e) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)')

    watchSysTheme.addEventListener('change', useSetTheme)

    return () => {
      watchSysTheme.removeEventListener('change', useSetTheme)
    }
  }, [theme])

  return (
    <>
      <Script id='theme.util.jsx' strategy='beforeInteractive'>
        {`
          let themeLocalStorage = localStorage.getItem('theme')
          let themeSystem       = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

          document.querySelector(':root').dataset.theme = themeLocalStorage ?? themeSystem
        `}
      </Script>
      {/* <button>{buttonIcon(theme)}</button> */}
      <label htmlFor='theme' className='theme'>
        <span className='theme__toggle-wrap'>
          <input
            key='themeToggle'
            onChange={toggleTheme}
            id='theme'
            className='theme__toggle'
            type='checkbox'
            role='switch'
            name='theme'
            value={theme === 'dark' ? 'dark' : 'light'} // Set value based on current theme
            checked={theme === 'dark'} // Set checked based on current theme
          />
          <span className='theme__icon'>
            <span className='theme__icon-part'></span>
            <span className='theme__icon-part'></span>
            <span className='theme__icon-part'></span>
            <span className='theme__icon-part'></span>
            <span className='theme__icon-part'></span>
            <span className='theme__icon-part'></span>
            <span className='theme__icon-part'></span>
            <span className='theme__icon-part'></span>
            <span className='theme__icon-part'></span>
          </span>
        </span>
      </label>
    </>
  )
}
