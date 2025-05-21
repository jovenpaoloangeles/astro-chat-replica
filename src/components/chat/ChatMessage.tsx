
import React from 'react';
import { User, Bot, ThumbsUp, ThumbsDown, Copy, MoreVertical } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  const formatMessageContent = (content: string) => {
    // Split content by newlines and map each line to a paragraph
    return content.split('\n').map((line, index) => (
      <p key={index} className={line === '' ? 'h-4' : ''}>{line}</p>
    ));
  };
  
  return (
    <div className={`p-4 rounded-lg animate-fade-in ${
      isAI ? 'bg-gemini-message-ai' : 'bg-gemini-message-user'
    }`}>
      {/* Message header */}
      <div className="flex items-center mb-2">
        <div className={`p-1 rounded-full ${
          isAI ? 'bg-gemini-accent text-black' : 'bg-purple-600'
        }`}>
          {isAI ? <Bot size={16} /> : <User size={16} />}
        </div>
        <span className="ml-2 font-medium">
          {isAI ? 'Gemini' : 'You'}
        </span>
      </div>
      
      {/* Message content */}
      <div className="ml-7 space-y-2">
        {formatMessageContent(message.content)}
      </div>
      
      {/* Message actions - only show for AI messages */}
      {isAI && (
        <div className="flex items-center mt-4 ml-7">
          <div className="flex items-center space-x-1">
            <button 
              className="p-1 rounded-full hover:bg-gemini-highlight"
              aria-label="Thumbs up"
            >
              <ThumbsUp size={16} />
            </button>
            <button 
              className="p-1 rounded-full hover:bg-gemini-highlight"
              aria-label="Thumbs down"
            >
              <ThumbsDown size={16} />
            </button>
          </div>
          <div className="flex items-center ml-4">
            <button 
              className="p-1 rounded-full hover:bg-gemini-highlight"
              aria-label="Copy message"
            >
              <Copy size={16} />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="p-1 rounded-full hover:bg-gemini-highlight"
                  aria-label="More options"
                >
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gemini-input border-gemini-border">
                <DropdownMenuItem className="text-gemini-text hover:bg-gemini-highlight cursor-pointer">
                  Report message
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gemini-text hover:bg-gemini-highlight cursor-pointer">
                  Share message
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
