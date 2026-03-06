import { useEffect } from 'react'

interface SwipeCoordinates {
  startX: number
  startY: number
  endX: number
  endY: number
}

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  useEffect(() => {
    let touchStart: SwipeCoordinates | null = null

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        endX: 0,
        endY: 0,
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return

      touchStart.endX = e.changedTouches[0].clientX
      touchStart.endY = e.changedTouches[0].clientY

      const diffX = touchStart.startX - touchStart.endX
      const diffY = touchStart.startY - touchStart.endY

      // Horizontal swipe (ignore if mostly vertical)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swiped left → next tab
          onSwipeLeft()
        } else {
          // Swiped right → previous tab
          onSwipeRight()
        }
      }

      touchStart = null
    }

    document.addEventListener('touchstart', handleTouchStart, false)
    document.addEventListener('touchend', handleTouchEnd, false)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, false)
      document.removeEventListener('touchend', handleTouchEnd, false)
    }
  }, [onSwipeLeft, onSwipeRight])
}
