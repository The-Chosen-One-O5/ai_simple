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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Image</h2>
        <textarea
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a prompt to generate an image"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;