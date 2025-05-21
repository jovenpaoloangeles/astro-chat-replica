
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import Header from './Header';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gemini-background text-gemini-text">
      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-20 h-full transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <Sidebar onCloseSidebar={() => setSidebarOpen(false)} />
      </div>
      
      {/* Overlay to close sidebar on mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header */}
        <Header>
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-full hover:bg-gemini-button transition-colors mr-2"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
        </Header>
        
        {/* Chat area */}
        <div className="flex-1 overflow-hidden">
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
