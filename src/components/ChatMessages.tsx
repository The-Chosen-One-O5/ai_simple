import React from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 p-3 rounded-lg max-w-lg ${
            message.role === 'user'
              ? 'bg-blue-600 text-white self-end ml-auto'
              : 'bg-gray-700 text-white self-start mr-auto'
          }`}
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;