import React from 'react'
import { useDynamicBgStore } from '../../creative/effects/DynamicBackground'

const BackgroundPanel: React.FC = () => {
  const { type, intensity, speed, setType, setIntensity, setSpeed } =
    useDynamicBgStore()

  return (
    <div className="space-y-4 p-4 border-t border-gray-700">
      <h3 className="text-sm font-semibold text-gray-200">Dynamic Background</h3>

      <div>
        <label className="text-xs text-gray-400">Type</label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {['digital-noise', 'paper-texture', 'flowing-waves'].map((t) => (
            <button
              key={t}
              onClick={() =>
                setType(t as 'digital-noise' | 'paper-texture' | 'flowing-waves')
              }
              className={`px-2 py-1 rounded text-xs transition ${
                type === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-400">
          Intensity: {(intensity * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={intensity * 100}
          onChange={(e) => setIntensity(parseFloat(e.target.value) / 100)}
          className="w-full mt-2"
        />
      </div>

      <div>
        <label className="text-xs text-gray-400">
          Speed: {speed.toFixed(1)}x
        </label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
      </div>
    </div>
  )
}

export default BackgroundPanel
