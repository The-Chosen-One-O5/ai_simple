"use client";

import { useState } from "react";
import Header from "./Header";
import Logo from "./Logo";
import ChatMessages from "./ChatMessages";
import MainInput from "./MainInput";
import ImageModal from "./ImageModal";
import { Message } from "../types";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [model, setModel] = useState("openai/o4-mini-high");
  const [showImageModal, setShowImageModal] = useState(false);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage], model }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }]);
    }
  };

  const handleImageGenerate = () => {
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      <Header />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center px-6">
            <Logo />
          </div>
        )}
        
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto">
            <ChatMessages messages={messages} />
          </div>
        )}
        
        <div className="flex-shrink-0 p-6 flex justify-center">
          <MainInput
            onSendMessage={handleSendMessage}
            model={model}
            setModel={setModel}
            hasMessages={messages.length > 0}
          />
        </div>
      </div>

      {showImageModal && (
        <ImageModal onClose={handleCloseImageModal} />
      )}
    </div>
  );
};

export default Chat;