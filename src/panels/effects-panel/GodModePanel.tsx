import React from 'react'
import { useGodModeStore } from '../../creative/effects/GodModeOverlay'

const GodModePanel: React.FC = () => {
  const { isEnabled, power, enable, disable, setPower } = useGodModeStore()

  return (
    <div className="space-y-4 p-4 border-t border-gray-700">
      <h3 className="text-sm font-semibold text-gray-200">God Mode</h3>

      <button
        onClick={isEnabled ? disable : enable}
        className={`w-full px-3 py-2 rounded font-semibold text-xs transition ${
          isEnabled
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        {isEnabled ? '✓ God Mode ON' : '⚡ Activate God Mode'}
      </button>

      {isEnabled && (
        <div>
          <label className="text-xs text-gray-400">
            Power: {power.toFixed(2)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={power}
            onChange={(e) => setPower(parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      )}

      <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
        {isEnabled
          ? 'Move your mouse to attract/repel particles. Press button to toggle mode.'
          : 'Control particle gravity with attractor or repulsor.'}
      </div>
    </div>
  )
}

export default GodModePanel
