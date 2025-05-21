
import React, { useState } from 'react';
import { Settings, HelpCircle, User, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  // Models dropdown
  const models = [
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Best for text' },
    { id: 'gemini-vision', name: 'Gemini Vision', description: 'Best for images' },
    { id: 'gemini-flash', name: 'Gemini Flash 2.5', description: 'Fast responses' },
  ];
  
  const [selectedModel, setSelectedModel] = useState(models[2]);

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-gemini-border">
      <div className="flex items-center">
        {children}
        <div className="flex items-center">
          <span className="text-xl font-medium">Gemini</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center ml-2 px-2 py-1 rounded hover:bg-gemini-button">
              <span className="text-sm text-gray-300">{selectedModel.name}</span>
              <ChevronDown size={16} className="ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gemini-input border-gemini-border">
              <DropdownMenuLabel className="text-gemini-text">AI models</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gemini-border" />
              {models.map(model => (
                <DropdownMenuItem 
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`flex flex-col items-start ${selectedModel.id === model.id ? 'bg-gemini-highlight' : ''} hover:bg-gemini-highlight cursor-pointer`}
                >
                  <span className="text-gemini-text">{model.name}</span>
                  <span className="text-sm text-gray-400">{model.description}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-gemini-button transition-colors" aria-label="Settings">
          <Settings size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gemini-button transition-colors" aria-label="Help">
          <HelpCircle size={20} />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors" aria-label="User profile">
              <User size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gemini-input border-gemini-border">
            <DropdownMenuLabel className="text-gemini-text">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gemini-border" />
            <DropdownMenuItem className="text-gemini-text hover:bg-gemini-highlight cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-gemini-text hover:bg-gemini-highlight cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gemini-border" />
            <DropdownMenuItem className="text-gemini-text hover:bg-gemini-highlight cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
