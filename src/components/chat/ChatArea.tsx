
import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft, Paperclip, Mic } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

// Mock user data
const user = {
  name: 'Mark Kevin',
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Function to resize textarea based on content
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle AI response
  const generateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponses = [
        "I can help you with that. What specific information are you looking for?",
        "That's an interesting question. Here's what I found...",
        "I've analyzed your request and here are some options to consider...",
        "Based on my understanding, here's what I can tell you about that topic...",
        "Here's a detailed explanation of what you asked about..."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          content: randomResponse,
          sender: 'ai' as const,
          timestamp: new Date()
        }
      ]);
      
      setIsTyping(false);
    }, 1500);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    setShowWelcome(false);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }
    
    // Generate AI response
    generateAIResponse(input.trim());
  };

  // Handle key press (Ctrl+Enter or Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Welcome message when no messages */}
          {showWelcome && (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-gemini-accent mb-6 animate-pulse-dot"></div>
              <h1 className="text-3xl font-medium mb-2">
                <span className="text-blue-400">Hello, </span>
                <span className="text-purple-400">{user.name}</span>
              </h1>
              <p className="text-gray-400 text-center max-w-md">
                How can I help you today? Ask me anything.
              </p>
            </div>
          )}
          
          {/* Chat messages */}
          {messages.map((message) => (
            <ChatMessage 
              key={message.id}
              message={message}
            />
          ))}
          
          {/* Show typing indicator when AI is generating a response */}
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <div className="p-4 border-t border-gemini-border">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-end bg-gemini-input rounded-2xl border border-gemini-border">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                resizeTextarea();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask Gemini..."
              className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none resize-none auto-resize-textarea text-gemini-text"
              rows={1}
            />
            <div className="flex items-center px-3 py-2">
              <button 
                className="p-1.5 rounded-full hover:bg-gemini-highlight mr-1"
                aria-label="Attach files"
              >
                <Paperclip size={18} />
              </button>
              <button 
                className="p-1.5 rounded-full hover:bg-gemini-highlight mr-1"
                aria-label="Voice input"
              >
                <Mic size={18} />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={input.trim() === ''}
                className={`p-2 rounded-full ${
                  input.trim() === '' ? 'text-gray-500' : 'text-gemini-accent hover:bg-gemini-highlight'
                }`}
                aria-label="Send message"
              >
                {input.trim() === '' ? <CornerDownLeft size={18} /> : <Send size={18} />}
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
