import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  model: string;
  setModel: (model: string) => void;
  placeholder?: string;
  showControls?: boolean;
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

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  model, 
  setModel, 
  placeholder = "What do you want to know?",
  showControls = true 
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSendMessage(content);
      setContent('');
    }
  };

  const getModelDisplayName = (modelName: string) => {
    if (modelName.includes('grok-3')) return 'Grok 3';
    if (modelName.includes('claude-sonnet-4')) return 'Claude 4';
    if (modelName.includes('o4-mini-high')) return 'GPT-4 Mini High';
    if (modelName.includes('o4-mini')) return 'GPT-4 Mini';
    if (modelName.includes('gemini-2.5-pro')) return 'Gemini 2.5 Pro';
    return modelName.split('/').pop() || modelName;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl overflow-hidden">
          <div className="flex items-center px-6 py-4">
            {/* Attachment Button */}
            <button
              type="button"
              className="flex-shrink-0 p-2 text-gray-400 hover:text-white transition-colors mr-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* Input Field - Made bigger with increased rows and minHeight */}
            <textarea
              className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none text-lg leading-6"
              placeholder={placeholder}
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              style={{ minHeight: '80px', maxHeight: '120px' }}
            />

            {/* Right Controls */}
            <div className="flex items-center gap-2 ml-4">
              {showControls && (
                <>
                  {/* DeepSearch Button */}
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 text-sm rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>DeepSearch</span>
                  </button>

                  {/* Think Button */}
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 text-sm rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 .899-.296 1.748-.782 2.453l-1.82 2.427a1 1 0 01-1.64 0l-1.82-2.427A3.989 3.989 0 018 11a3.989 3.989 0 01.228-2z" />
                    </svg>
                    <span>Think</span>
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-500 transition-colors"
                    disabled={!content.trim()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
