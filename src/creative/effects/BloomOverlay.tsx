import React, { useEffect, useRef } from 'react'

interface BloomOverlayProps {
  trigger?: boolean
  duration?: number
  color?: string
  intensity?: number
  onComplete?: () => void
}

const BloomOverlay: React.FC<BloomOverlayProps> = ({
  trigger = false,
  duration = 300,
  color = '#3b82f6',
  intensity = 1,
  onComplete,
}) => {
  const bloomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trigger || !bloomRef.current) return

    const element = bloomRef.current
    element.style.opacity = String(intensity)
    element.style.animation = `bloom-fade ${duration}ms ease-out`

    const timer = setTimeout(() => {
      element.style.opacity = '0'
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [trigger, duration, intensity, onComplete])

  return (
    <>
      <style>{`
        @keyframes bloom-fade {
          0% {
            opacity: ${intensity};
            transform: scale(0.8);
            filter: blur(0px);
          }
          50% {
            opacity: ${intensity * 0.7};
            transform: scale(1.2);
            filter: blur(8px);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
            filter: blur(20px);
          }
        }
      `}</style>
      <div
        ref={bloomRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '100px',
          height: '100px',
          marginLeft: '-50px',
          marginTop: '-50px',
          backgroundColor: color,
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 999,
        }}
      />
    </>
  )
}

export default BloomOverlay
