'use client'

import { useEffect } from 'react'

export function SmoothScrollHelper() {
  useEffect(() => {
    // Save original scroll behavior
    const originalStyle = document.documentElement.style.scrollBehavior

    // Set smooth scrolling for this page
    document.documentElement.style.scrollBehavior = 'smooth'

    // Cleanup when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = originalStyle
    }
  }, [])

  return null
}
