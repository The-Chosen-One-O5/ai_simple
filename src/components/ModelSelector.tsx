import React from 'react';

const models = [
  'anthropic/claude-sonnet-4',
  'openai/o4-mini-high',
  'openai/o4-mini',
  'google/gemini-2.5-pro',
  'Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8',
  'moonshotai/Kimi-K2-Instruct',
  'x-ai/grok-vision-beta',
  'x-ai/grok-3',
];

interface ModelSelectorProps {
  setModel: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ setModel }) => {
  return (
    <div className="p-4">
      <select
        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setModel(e.target.value)}
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;