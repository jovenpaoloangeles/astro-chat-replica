
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="p-4 rounded-lg bg-gemini-message-ai animate-fade-in">
      <div className="flex items-center mb-2">
        <div className="p-1 rounded-full bg-gemini-accent text-black">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
          </svg>
        </div>
        <span className="ml-2 font-medium">Gemini</span>
      </div>
      
      <div className="ml-7">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gemini-accent animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 rounded-full bg-gemini-accent animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 rounded-full bg-gemini-accent animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
