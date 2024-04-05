'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import './ThemeSwitch.css'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    if (systemTheme === 'dark') setTheme('dark')
    else if (systemTheme === 'light') setTheme('light')
  }, [systemTheme])

  if (!mounted) {
    return null
  }

  return (
    <label for='theme' class='theme'>
      <span class='theme__toggle-wrap'>
        <input
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          id='theme'
          class='theme__toggle'
          type='checkbox'
          role='switch'
          name='theme'
          value={theme === 'dark' ? 'dark' : 'light'} // Set value based on current theme
          checked={theme === 'dark'} // Set checked based on current theme
        />
        <span class='theme__icon'>
          <span class='theme__icon-part'></span>
          <span class='theme__icon-part'></span>
          <span class='theme__icon-part'></span>
          <span class='theme__icon-part'></span>
          <span class='theme__icon-part'></span>
          <span class='theme__icon-part'></span>
          <span class='theme__icon-part'></span>
          <span class='theme__icon-part'></span>
          <span class='theme__icon-part'></span>
        </span>
      </span>
    </label>
  )
}
