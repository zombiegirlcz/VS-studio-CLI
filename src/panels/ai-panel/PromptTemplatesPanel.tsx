import React, { useState } from 'react'
import { promptTemplates, getPromptByCategory, type PromptTemplate } from '@ai/promptTemplates'
import { useAIStore } from '@store'

const PromptTemplatesPanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ui')
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const { sendMessage } = useAIStore()

  const categories = ['ui', 'logic', 'data', 'effect']
  const templatesInCategory = getPromptByCategory(selectedCategory)

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      sendMessage(selectedTemplate.prompt)
      setSelectedTemplate(null)
    }
  }

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-sm font-semibold text-gray-200">Prompt Templates</h3>

      <div>
        <label className="text-xs text-gray-400">Category</label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                setSelectedTemplate(null)
              }}
              className={`px-2 py-1 rounded text-xs transition capitalize ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-400">Templates</label>
        <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
          {templatesInCategory.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`w-full p-2 rounded text-left text-xs transition ${
                selectedTemplate?.id === template.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              <div className="font-semibold">{template.name}</div>
              <div className="text-gray-400 text-xs">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <div className="space-y-2 border-t border-gray-700 pt-4">
          <div>
            <label className="text-xs text-gray-400">Preview</label>
            <div className="bg-gray-900 p-2 rounded text-xs text-gray-300 whitespace-pre-wrap max-h-40 overflow-y-auto mt-2">
              {selectedTemplate.prompt}
            </div>
          </div>
          {selectedTemplate.suggestedComponents && (
            <div>
              <label className="text-xs text-gray-400">Suggested Components</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedTemplate.suggestedComponents.map((comp) => (
                  <span
                    key={comp}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleApplyTemplate}
            className="w-full px-3 py-2 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700 transition"
          >
            Apply Template
          </button>
        </div>
      )}
    </div>
  )
}

export default PromptTemplatesPanel
