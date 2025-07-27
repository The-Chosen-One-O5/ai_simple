import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSendMessage(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          className="w-full bg-gray-800 border border-gray-700 rounded-full p-4 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What do you want to know?"
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
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;