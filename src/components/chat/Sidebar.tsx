
import React from 'react';
import { PlusCircle, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  onCloseSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCloseSidebar }) => {
  const isMobile = useIsMobile();
  
  // Mock chat history data
  const chatHistory = [
    { id: 1, title: 'React Theme Management Library', date: '2 days ago' },
    { id: 2, title: 'How to create an AI-powered chatbot', date: '1 week ago' },
    { id: 3, title: 'Building responsive web applications', date: '2 weeks ago' },
    { id: 4, title: 'Machine learning basics explained', date: '3 weeks ago' },
    { id: 5, title: 'Modern JavaScript features', date: '1 month ago' }
  ];

  return (
    <div className="h-full w-64 bg-gemini-sidebar flex flex-col border-r border-gemini-border">
      {/* Sidebar header with close button for mobile */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gemini-border">
        {isMobile && (
          <button 
            onClick={onCloseSidebar}
            className="p-2 rounded-full hover:bg-gemini-button"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
        <span className="text-lg font-medium ml-2">Recent Chats</span>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 bg-gemini-button hover:bg-gemini-highlight border-gemini-border text-gemini-text"
        >
          <PlusCircle size={18} />
          <span>New chat</span>
        </Button>
      </div>

      {/* Chat History */}
      <div className="text-sm px-3 py-2 text-gray-400">Recent</div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {chatHistory.map((chat) => (
            <div 
              key={chat.id} 
              className="group flex items-center rounded-md p-2 text-sm hover:bg-gemini-highlight cursor-pointer transition-colors"
            >
              <div className="flex-1 truncate">
                <div className="font-medium">{chat.title}</div>
                <div className="text-xs text-gray-400">{chat.date}</div>
              </div>
              <button 
                className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gemini-button transition-opacity"
                aria-label="Delete chat"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Settings & Help */}
      <div className="p-3 border-t border-gemini-border">
        <button className="w-full text-left p-2 rounded-md hover:bg-gemini-highlight text-sm flex items-center">
          <span className="ml-2">Settings and help</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
