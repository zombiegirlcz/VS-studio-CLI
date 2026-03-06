import React from 'react'
import { useDrawingStore } from '../../creative/drawing/DrawingStore'

const DrawingPanel: React.FC = () => {
  const { isEnabled, color, thickness, enable, disable, setColor, setThickness } = useDrawingStore()

  return (
    <div className="space-y-4 p-4 border-t border-gray-700">
      <h3 className="text-sm font-semibold text-gray-200">Drawing Mode</h3>

      <button
        onClick={isEnabled ? disable : enable}
        className={`w-full px-3 py-2 rounded font-semibold text-xs transition ${
          isEnabled
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isEnabled ? '✓ Drawing Mode ON' : 'Start Drawing'}
      </button>

      {isEnabled && (
        <>
          <div>
            <label className="text-xs text-gray-400">Color</label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-8 w-12 border border-gray-700 rounded cursor-pointer"
              />
              <span className="text-xs text-gray-300">{color}</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400">
              Thickness: {thickness}px
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={thickness}
              onChange={(e) => setThickness(parseInt(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
            Draw on canvas and components will be created automatically. Press ESC to exit.
          </div>
        </>
      )}
    </div>
  )
}

export default DrawingPanel
