'use client'

import { useState, useEffect } from 'react'

import './ThemeSwitch.css'

export default function SetTheme() {
  const [darkTheme, setDarkTheme] = useState(false)

  const toggleTheme = () => {
    const theme = darkTheme ? 'light' : 'dark'
    localStorage.setItem('theme', theme)
    setDarkTheme(!darkTheme)

    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  useEffect(() => {
    let savedMode = localStorage.getItem('theme')

    if (!savedMode) {
      savedMode = 'light'
      setDarkTheme(false)
      localStorage.setItem('theme', savedMode)
    }

    if (savedMode === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    setDarkTheme(savedMode === 'dark')
  }, [])

  return (
    <>
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
            value={darkTheme ? 'dark' : 'light'}
            checked={darkTheme}
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
