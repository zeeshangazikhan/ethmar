'use client'

import { useEffect, useRef } from 'react'

interface SmoothScrollOptions {
  threshold?: number
  rootMargin?: string
  staggerDelay?: number
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -80px 0px',
    staggerDelay = 80
  } = options

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const observerOptions = {
      threshold,
      rootMargin
    }

    const animateElement = (element: Element, delay: number = 0) => {
      setTimeout(() => {
        element.classList.add('animate-fade-in-up')
        element.classList.remove('opacity-0')
      }, delay)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          
          // Check for stagger children
          const children = target.querySelectorAll('[data-scroll-child]')
          if (children.length > 0) {
            children.forEach((child, index) => {
              animateElement(child, index * staggerDelay)
            })
          }
          
          // Animate main element
          const delay = target.dataset.scrollDelay 
            ? parseInt(target.dataset.scrollDelay) 
            : 0
          animateElement(target, delay)
          
          // Unobserve after animation
          observer.unobserve(target)
        }
      })
    }, observerOptions)

    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Observe all scroll-animated elements
      const scrollElements = document.querySelectorAll('[data-scroll-animate]')
      scrollElements.forEach(el => observer.observe(el))
      
      // Also observe reveal elements
      const revealElements = document.querySelectorAll('[data-scroll-reveal]')
      revealElements.forEach(el => observer.observe(el))
      
      // Also observe image elements
      const imageElements = document.querySelectorAll('[data-scroll-image]')
      imageElements.forEach(el => observer.observe(el))
    }, 150)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      initialized.current = false
    }
  }, [threshold, rootMargin, staggerDelay])
}

// Enhanced scroll animation CSS classes helper
export const scrollAnimationClasses = {
  fadeUp: 'data-scroll-animate="fade-up"',
  fadeDown: 'data-scroll-animate="fade-down"',
  fadeLeft: 'data-scroll-animate="fade-left"',
  fadeRight: 'data-scroll-animate="fade-right"',
  scaleUp: 'data-scroll-animate="scale-up"',
  fade: 'data-scroll-animate="fade"',
  zigzag: 'data-scroll-animate',
}
