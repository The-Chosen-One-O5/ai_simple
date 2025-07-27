'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import MainInput from '@/components/MainInput';
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

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {!hasMessages ? (
          /* Empty State - Centered Layout */
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-3xl mx-auto space-y-8 text-center">
              {/* Logo Section */}
              <Logo />

              {/* Main Input Section */}
              <MainInput
                onSendMessage={handleSendMessage}
                model={model}
                setModel={setModel}
                hasMessages={false}
              />

              {/* Action Buttons Section */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors border border-[#2a2a2a] rounded-lg hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
                  onClick={() => setShowImageModal(true)}
                >
                  Create Images
                </button>
                
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors border border-[#2a2a2a] rounded-lg hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
                >
                  Edit Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Chat State - Messages with Bottom Input */
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
              <ChatMessages messages={messages} />
            </div>
            
            {/* Bottom Input Area */}
            <div className="bg-[#0a0a0a] p-4">
              <div className="w-full max-w-4xl mx-auto">
                <MainInput
                  onSendMessage={handleSendMessage}
                  model={model}
                  setModel={setModel}
                  hasMessages={true}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Image Modal */}
      {showImageModal && <ImageModal onClose={() => setShowImageModal(false)} />}
    </div>
  );
}
