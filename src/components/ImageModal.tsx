import React, { useState } from 'react';

interface ImageModalProps {
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch('/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setImageUrl(data.imageUrl);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1c1c1c] p-6 rounded-2xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Create Image</h2>
        <textarea
          className="w-full bg-[#2c2c2c] border border-[#333] rounded-lg p-3 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a prompt to generate an image"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {imageUrl && (
          <div className="mt-4">
            <img src={imageUrl} alt="Generated" className="w-full rounded-lg" />
          </div>
        )}
        <button
          className="w-full bg-[#2c2c2c] hover:bg-[#3c3c3c] text-white font-bold py-3 px-4 rounded-lg mt-4 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;