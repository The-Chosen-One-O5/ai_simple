'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';
import ModelSelector from '@/components/ModelSelector';
import ChatMessages from '@/components/ChatMessages';
import ImageModal from '@/components/ImageModal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatHistory');
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });
  const [model, setModel] = useState('openai/o4-mini');
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content }];
    setMessages(newMessages);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: newMessages,
      }),
    });

    if (!response.body) {
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantResponse = '';
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.substring(6);
          if (data === '[DONE]') {
            return;
          }
          try {
            const json = JSON.parse(data);
            if (json.choices && json.choices[0].delta.content) {
              assistantResponse += json.choices[0].delta.content;
              setMessages(prev => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1].content = assistantResponse;
                return updatedMessages;
              });
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }
      }
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col p-4">
          <ModelSelector setModel={setModel} />
          <ChatMessages messages={messages} />
        </div>
        <div className="p-4 border-t border-gray-700 flex gap-4">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            DeepSearch
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Think
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Image
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowImageModal(true)}
          >
            Create Images
          </button>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </main>
      {showImageModal && <ImageModal onClose={() => setShowImageModal(false)} />}
    </div>
  );
}
