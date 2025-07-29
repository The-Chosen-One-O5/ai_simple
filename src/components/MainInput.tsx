import React, { useState, useRef, useEffect } from 'react';

interface MainInputProps {
  onSendMessage: (content: string) => void;
  model: string;
  setModel: (model: string) => void;
  hasMessages: boolean;
}

const models = [
  { id: 'anthropic/claude-sonnet-4', name: 'Claude 4', description: 'Most capable model' },
  { id: 'openai/o4-mini-high', name: 'GPT-4 Mini High', description: 'High performance' },
  { id: 'openai/o4-mini', name: 'GPT-4 Mini', description: 'Fast and efficient' },
  { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Google\'s latest' },
  { id: 'Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8', name: 'Qwen 3 Coder', description: 'Code specialist' },
  { id: 'moonshotai/Kimi-K2-Instruct', name: 'Kimi K2', description: 'Instruction following' },
  { id: 'x-ai/grok-vision-beta', name: 'Grok Vision', description: 'Vision capabilities' },
  { id: 'x-ai/grok-3', name: 'Grok 3', description: 'Latest from X.AI' },
];

const MainInput: React.FC<MainInputProps> = ({ onSendMessage, model, setModel, hasMessages }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const selectedModel = models.find(m => m.id === model) || models[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isLoading) {
      setIsLoading(true);
      try {
        await onSendMessage(content);
        setContent('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleModelSelect = (modelId: string) => {
    setModel(modelId);
    setIsDropdownOpen(false);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [content]);

  const handleFileUpload = () => {
    console.log('File upload clicked');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Model Selector and Image Generation Row */}
      <div className="flex items-center justify-between mb-4 px-2">
        {/* Model Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--surface-hover)] transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-[var(--text-primary)]">{selectedModel.name}</span>
            </div>
            <svg
              className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-80 bg-[var(--surface)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 animate-fade-in">
              <div className="p-2">
                <div className="text-xs font-medium text-[var(--text-muted)] px-3 py-2 uppercase tracking-wide">
                  Select Model
                </div>
                {models.map((modelOption) => (
                  <button
                    key={modelOption.id}
                    onClick={() => handleModelSelect(modelOption.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-all duration-200 ${
                      model === modelOption.id
                        ? 'bg-[var(--surface-hover)] text-[var(--text-primary)]'
                        : 'hover:bg-[var(--surface-hover)] text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{modelOption.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">
                          {modelOption.description}
                        </div>
                      </div>
                      {model === modelOption.id && (
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Generation Button */}
        <button
          onClick={() => setShowImageModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">Generate Image</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-lg">
          <div className="flex items-end px-6 py-6 gap-4">
            {/* File Upload Button */}
            <button
              type="button"
              onClick={handleFileUpload}
              className="flex-shrink-0 p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-lg transition-all duration-200"
              title="Upload file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* Input Field - Made bigger */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none outline-none text-lg leading-7 min-h-[60px] max-h-[200px] overflow-y-auto py-2"
                placeholder={hasMessages ? "Type your message or use /gen [prompt] to generate images..." : "What do you want to know? (Try /gen [prompt] for images)"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Send Button */}
              <button
                type="submit"
                disabled={!content.trim() || isLoading}
                className="p-3 bg-[var(--accent)] text-white rounded-full hover:bg-[var(--accent-hover)] disabled:bg-[var(--text-muted)] disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                title="Send message"
              >
                {isLoading ? (
                  <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Character Count */}
          {content && (
            <div className="px-6 pb-4 flex justify-between items-center text-xs text-[var(--text-muted)]">
              <span>{content.length} characters</span>
              <span>Press Enter to send, Shift+Enter for new line</span>
            </div>
          )}
        </div>

        {/* Suggestions (when no messages) */}
        {!hasMessages && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {[
              "Explain quantum computing",
              "Write a Python function",
              "Plan a weekend trip",
              "Create a marketing strategy"
            ].map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setContent(suggestion)}
                className="px-4 py-2 bg-[var(--surface)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-full text-sm transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Backdrop for dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-content w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">AI Image Generator</h2>
              </div>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[var(--text-secondary)] text-center">Image generation functionality will be implemented here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainInput;