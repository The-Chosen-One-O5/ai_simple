# Shakthinathan AI Chatbot

A modern, dark-themed AI chatbot application built with Next.js, featuring multiple AI models and image generation capabilities.

## Features

- 🌙 **Dark Theme UI** - Beautiful, modern dark interface with smooth animations
- 🤖 **Multiple AI Models** - Support for various AI models including Claude, GPT-4, Gemini, and more
- 🎨 **Image Generation** - AI-powered image creation with FLUX model
- 💬 **Smart Chat Interface** - Intuitive conversation experience with message actions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Streaming** - Fast response streaming for better user experience

## Supported AI Models

- **Claude 4** (Anthropic) - Most capable model
- **GPT-4 Mini High** (OpenAI) - High performance variant
- **GPT-4 Mini** (OpenAI) - Fast and efficient
- **Gemini 2.5 Pro** (Google) - Google's latest model
- **Qwen 3 Coder** - Specialized for coding tasks
- **Kimi K2** - Instruction following specialist
- **Grok Vision** - Vision capabilities
- **Grok 3** - Latest from X.AI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API key for the AI service

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai_simple
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Chat Interface

1. **Start a Conversation**: Type your message in the input field at the bottom
2. **Select AI Model**: Use the dropdown in the header to choose your preferred AI model
3. **Generate Images**: Click the "Generate Image" button in the header to create AI images
4. **Message Actions**: Hover over assistant messages to see copy, regenerate, and feedback options

### Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Escape` - Close modals

### Image Generation

1. Click the "Generate Image" button in the header
2. Enter a detailed description of the image you want
3. Click "Generate Image" and wait for the AI to create your image
4. Download or generate another image as needed

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/          # Chat API endpoint
│   │   └── image/         # Image generation API
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── Chat.tsx          # Main chat container
│   ├── ChatMessages.tsx  # Message display component
│   ├── Header.tsx        # Top navigation with model selector
│   ├── ImageModal.tsx    # Image generation modal
│   ├── Logo.tsx          # Brand logo and welcome screen
│   └── MainInput.tsx     # Message input component
└── types.ts              # TypeScript type definitions
```

## Customization

### Theme Colors

The app uses CSS custom properties for theming. You can modify colors in `src/app/globals.css`:

```css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --accent: #007aff;
  /* ... other variables */
}
```

### Adding New Models

To add a new AI model:

1. Add the model ID to the `models` array in `src/components/Header.tsx`
2. Add a display name mapping in the component
3. Ensure your API endpoint supports the new model

## API Endpoints

### Chat API (`/api/chat`)
- **Method**: POST
- **Body**: `{ messages: Message[], model: string }`
- **Response**: Streaming text response

### Image API (`/api/image`)
- **Method**: POST  
- **Body**: `{ prompt: string }`
- **Response**: `{ imageUrl: string }`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Enjoy chatting with Shakthinathan AI!** 🚀
