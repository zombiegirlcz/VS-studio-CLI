import React, { useEffect, useRef, useState } from 'react'

const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const animationRef = useRef<number>()

  const startVisualizer = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser

      const source = audioContext.createMediaStreamSource(stream)
      microphoneRef.current = source
      source.connect(analyser)

      setIsActive(true)
      animate()
    } catch (err) {
      setError(String(err))
    }
  }

  const stopVisualizer = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    if (microphoneRef.current) {
      microphoneRef.current.mediaStream.getTracks().forEach((track) => track.stop())
      microphoneRef.current = null
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setIsActive(false)
  }

  const animate = () => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)

    ctx.fillStyle = '#111827'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const barWidth = (canvas.width / dataArray.length) * 2.5
    let barHeight: number
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = (dataArray[i] / 255) * canvas.height

      const hue = (i / dataArray.length) * 360
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

      x += barWidth + 1
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvas.offsetWidth || 400
      canvas.height = canvas.offsetHeight || 200
    }
  }, [])

  return (
    <div className="space-y-3 p-4 border-t border-gray-700">
      <h3 className="text-sm font-semibold text-gray-200">Audio Visualizer</h3>

      {error && (
        <div className="text-xs text-red-400 bg-red-950 p-2 rounded">
          {error}
        </div>
      )}

      <button
        onClick={isActive ? stopVisualizer : startVisualizer}
        className={`w-full px-3 py-2 rounded font-semibold text-xs transition ${
          isActive
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {isActive ? '⏹️ Stop Visualizer' : '🎤 Start Visualizer'}
      </button>

      <canvas
        ref={canvasRef}
        className="w-full h-40 bg-gray-900 rounded border border-gray-700"
        style={{ display: isActive ? 'block' : 'none' }}
      />

      {!isActive && (
        <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
          Visualize audio from your microphone in real-time.
        </div>
      )}
    </div>
  )
}

export default AudioVisualizer
