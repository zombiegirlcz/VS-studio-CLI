import React from 'react'
import { create } from 'zustand'

interface ParticlePhysicsStore {
  useMagnetism: boolean
  magneticForce: number
  toggleMagnetism: () => void
  setMagneticForce: (force: number) => void
}

export const useParticlePhysicsStore = create<ParticlePhysicsStore>((set) => ({
  useMagnetism: false,
  magneticForce: 0.5,
  toggleMagnetism: () => set((state) => ({ useMagnetism: !state.useMagnetism })),
  setMagneticForce: (force) => set({ magneticForce: force }),
}))

const ParticlePhysicsPanel: React.FC = () => {
  const { useMagnetism, magneticForce, toggleMagnetism, setMagneticForce } =
    useParticlePhysicsStore()

  return (
    <div className="space-y-4 p-4 border-t border-gray-700">
      <h3 className="text-sm font-semibold text-gray-200">Particle Physics</h3>

      <div>
        <button
          onClick={toggleMagnetism}
          className={`w-full px-3 py-2 rounded font-semibold text-xs transition ${
            useMagnetism
              ? 'bg-violet-600 text-white hover:bg-violet-700'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {useMagnetism ? '🧲 Magnetism ON' : '🧲 Magnetism OFF'}
        </button>
      </div>

      {useMagnetism && (
        <div>
          <label className="text-xs text-gray-400">
            Magnetic Force: {magneticForce.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={magneticForce}
            onChange={(e) => setMagneticForce(parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      )}

      <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
        {useMagnetism
          ? 'Same-colored particles repel, opposite colors attract.'
          : 'Enable magnetism for particle attraction/repulsion effects.'}
      </div>
    </div>
  )
}

export default ParticlePhysicsPanel
