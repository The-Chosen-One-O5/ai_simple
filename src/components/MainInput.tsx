import React, { useState } from 'react';

interface MainInputProps {
  onSendMessage: (content: string) => void;
  model: string;
  setModel: (model: string) => void;
  hasMessages: boolean;
}

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

const MainInput: React.FC<MainInputProps> = ({ onSendMessage, model, setModel, hasMessages }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSendMessage(content);
      setContent('');
    }
  };

  const getModelDisplayName = (modelName: string) => {
    if (modelName.includes('claude')) return 'Claude 4';
    if (modelName.includes('o4-mini-high')) return 'GPT-4 Mini High';
    if (modelName.includes('o4-mini')) return 'GPT-4 Mini';
    if (modelName.includes('gemini')) return 'Gemini 2.5 Pro';
    if (modelName.includes('Qwen')) return 'Qwen 3 Coder';
    if (modelName.includes('Kimi')) return 'Kimi K2';
    if (modelName.includes('grok-vision')) return 'Grok Vision';
    if (modelName.includes('grok-3')) return 'Grok 3';
    return 'Shakthinathan 3';
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-[#1c1c1c] border border-[#333] rounded-2xl px-4 py-3">
          <textarea
            className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-lg"
            placeholder={hasMessages ? "How can Shakthinathan AI help?" : "What do you want to know?"}
            rows={1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <button type="button" className="p-2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </button>
              <button type="button" className="flex items-center gap-1 p-2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                DeepSearch
              </button>
              <button type="button" className="flex items-center gap-1 p-2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                Think
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-transparent text-white"
              >
                {models.map((modelOption) => (
                  <option key={modelOption} value={modelOption} className="bg-[#1c1c1c]">
                    {getModelDisplayName(modelOption)}
                  </option>
                ))}
              </select>
              <button type="submit" className="p-2 text-gray-400 hover:text-white" disabled={!content.trim()}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MainInput;